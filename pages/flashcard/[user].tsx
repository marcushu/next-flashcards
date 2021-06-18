import { useRouter } from "next/dist/client/router";
import { useEffect, useReducer, useState } from "react";
import { userReducer, initialUserState } from '../../js/userState';
import AddQuestion from "../../components/AddQuestion";
import FlashcardTitle from "../../components/FlashcardTitle";
import FlashcardTop from "../../components/FlashcardTop";
import ModalDelete from "../../components/ModalDelete";
import QuestionCard from "../../components/QuestionCard";
import RandomOffset from '../../js/RandomOffset';
import host from '../../components/host';

interface QuestionType {
  question: string
  answer: string
  user?: string
  topic?: string
}


const Flashcard = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const router = useRouter()
  const { user } = router.query
  const [showAddQuestion, setshowAddQuestion] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [deleteHandler, setdeleteHandler] = useState<() => Promise<void>>();


  useEffect(() => {
    const getTopics = async () => {
      const datas = await fetch(`${host}/api/userTopics?username=${user}`);
      
      const _usersTopics = await datas.json();

      const newRandGenerator = await getRandNumGenerator(_usersTopics[0]);

      dispatch({ type: "SETUP", payload: { userTopics: _usersTopics, numGen: newRandGenerator } });

      getNextQuestion(_usersTopics[0]);
    }

    getTopics();
  }, []);


  const addTopic = async (newTopic: string) => {
    if(!state.userTopics.includes(newTopic)) {
      await fetch(`${host}/api/insertTopic?username=${user}&topic=${newTopic}`);

      const newRandGenerator = await getRandNumGenerator(newTopic);

      dispatch({ type: "ADDTOPIC", payload: { topic: newTopic, numGen: newRandGenerator } });
    } else {
      alert("This topic already exists.");
    }

  }


  const switchTopic = async (_topic: string) => {
    const newRandGenerator = await getRandNumGenerator(_topic);

    dispatch({type: "SWITCHTOPIC", payload:
      {
        topic: _topic,
        numGen: newRandGenerator
      }
    });
  }


  const getNextQuestion = async (topic: string) => {
    const offset = state.randomOffset.getRandOffset();

    // Clear out the old question and answer.  This is necessary to ensure reloads even when
    // a repeat q and a are retrieved. Repeats are much less likely as the set grows.
    dispatch({ type: "NEXTQUESTION", payload: { newQuestionAnswer: { question: " ", answer: " "} } })

    const questionRes = await fetch(`${host}/api/getQuestion?username=${user}&topic=${topic}&offset=${offset}`);
    const { question, answer } = await questionRes.json() as { question: string, answer: string }

    const newQuestionAnswer = typeof question === 'undefined'
      ? { question: "", answer: "" }
      : { question: question, answer: answer }

    dispatch({ type: "NEXTQUESTION", payload: { newQuestionAnswer: newQuestionAnswer } });

    return (topic);
  }


  const deleteCurrentTopic = async () => {
    await fetch(`${host}/api/deleteTopic?username=${user}&topicToDelete=${state.currentTopic}`);

    dispatch({ type: "DELETETOPIC", payload: { topic: state.currentTopic } });
    
    const newCurrent = state.userTopics.filter( topic => topic != state.currentTopic )[0];

    switchTopic(newCurrent);
  }


  // FIXME: this seems to fail to reload a question after deletion when called with 2 questions.
  const deleteAquestion = async () => {
    const url = `${host}/api/deleteQuestion`;
    const deleteThis = {
      userName: user,
      question: state.questionAnswer.question
    }

    await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deleteThis)
    });

    const newRandNumGen = await getRandNumGenerator(state.currentTopic);

    dispatch({ type: "ADDQUESTION", payload: { numGen: newRandNumGen } });
    getNextQuestion(state.currentTopic);
  }


  const addAquestion = async (newQuestion: QuestionType) => {
    const url = `${host}/api/addQuestion`;
    newQuestion.user = user as string;
    newQuestion.topic = state.currentTopic;

    await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion)
    });

    const newRandNumGen = await getRandNumGenerator(state.currentTopic);

    dispatch({ type: "ADDQUESTION", payload: { numGen: newRandNumGen } });

    getNextQuestion(state.currentTopic);
  }

  // These three methods handle deletion through the use of an "are you sure?" modal

  const setDeleteQuestion = () => {
    if (state.questionAnswer.question !== "") {
      setdeleteHandler(() => deleteAquestion);
      setshowModal(true);
    }
  }


  const setDeleteTopic = () => {
    setdeleteHandler(() => deleteCurrentTopic);
    setshowModal(true);
  }

  const handleDelete = () => {
    if (typeof deleteHandler !== 'undefined')
      deleteHandler();

    setshowModal(false);
  }


  const getRandNumGenerator = async (_topic: string) => {
    const countRes = await fetch(`${host}/api/questionCount?username=${user}&topic=${_topic}`);

    const { count } = await countRes.json();

    return new RandomOffset(count);
  }


  return (
    <>
      <FlashcardTop
        user={user ? user : ""} />

      <FlashcardTitle
        topic={state.currentTopic}
        userTopics={state.userTopics}  //FIXME: usertopics is empty on page refresh
        setcurrentTopic={switchTopic}
        getNextQuestion={getNextQuestion}
        addTopic={addTopic}
        deleteCurrentTopic={setDeleteTopic}
        setshowAddQuestion={setshowAddQuestion}
        deleteAquestion={setDeleteQuestion} />

      {showAddQuestion
        ?
        <AddQuestion
          submitQuestion={addAquestion}
          hideMe={() => {
            setshowAddQuestion(false)
          }} />
        :
        <QuestionCard
          answer={state.questionAnswer.answer}
          question={state.questionAnswer.question}
          nextQuestion={() => getNextQuestion(state.currentTopic)}
          loggedIn={true} />}

      <ModalDelete
        warningText={"OK to delete?"}
        handleClose={() => setshowModal(false)}
        handleDelete={handleDelete}
        showModal={showModal} />
    </>
  );
}

export default Flashcard;
