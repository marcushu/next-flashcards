import React, { useState, useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import GuestGreeting from "../components/GuestGreeting";
import HomeHead from "../components/HomeHead";
import QuestionCard from "../components/QuestionCard";
import TopicNotFound from "../components/svg/TopicNotFound";
import TopicSearch from "../components/TopicSearch";
import RandomOffset from '../js/RandomOffset';
import { userReducer, initialUserState } from '../js/userState';
import host from '../components/host';


const guestUser = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [shownotFound, setshownotFound] = useState(false);
  const [showGreeting, setshowGreeting] = useState(true);
  const [unfound, setunfound] = useState("");


  const search = async (_topic: string) => {
    const countRes = await fetch(`${host}/api/questionCount?username=anon&topic=${_topic}`);

    const { count } = await countRes.json();

    setshowGreeting(false);

    if (count > 0) {
      const newRandGenerator = new RandomOffset(count);

      dispatch({ type: "SETUP", payload: { userTopics: [_topic], numGen: newRandGenerator } });
      getNextQuestion(_topic);
      setshownotFound(false);
    } else { // nothing found
      setshownotFound(true);
      dispatch({type: "SWITCHTOPIC", payload: { topic: "Find a Topic", numGen: new RandomOffset(0)}})
      setunfound(_topic);
    }

  }


  const getNextQuestion = async (topic: string) => {
    let offset = state.randomOffset.getRandOffset();

    // Clear out the old question and answer.  This is necessary to ensure reloads even when
    // a repeat q and a are retrieved. Repeats are much less likely as the set grows.
    dispatch({ type: "NEXTQUESTION", payload: { newQuestionAnswer: { question: " ", answer: " "} } })

    const questionRes = await fetch(`${host}/api/getQuestion?username=anon&topic=${topic}&offset=${offset}`);
    const { question, answer } = await questionRes.json();

    const newQuestionAnswer = typeof question === 'undefined'
      ? { question: "", answer: "" }
      : { question: question, answer: answer }

      dispatch({ type: "NEXTQUESTION", payload: { newQuestionAnswer: newQuestionAnswer } });

    return(topic);
  }

  return (
    <>
      <HomeHead titleText={state.currentTopic} />
      <TopicSearch search={search} />
      {showGreeting && 
        <GuestGreeting />
      } 
      {shownotFound
        ?
        <Row>
          <Col className="text-center py-4">
            <TopicNotFound topicName={unfound} />
          </Col>
        </Row>
        :
        <>
          {state.questionAnswer &&
            <QuestionCard
              answer={state.questionAnswer.answer}  
              question={state.questionAnswer.question}
              nextQuestion={() => getNextQuestion(state.currentTopic)}
              loggedIn={false} />
          }
        </>
      }
      
    </>);
}

export default guestUser;