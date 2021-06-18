import ControlPanel from './ControlPanel';
import { Col, Row } from "react-bootstrap";
import styles from './styles/FlashcardTitle.module.css';

interface FlashcardTitleProps {
  topic: string
  userTopics: string[]
  setcurrentTopic: (newTopic: string) => void
  getNextQuestion: (newTopic: string) => void
  addTopic: (newTopic: string) => void
  deleteCurrentTopic: () => void
  setshowAddQuestion: (input: boolean) => void
  deleteAquestion: () => void
}

const FlashcardTitle = ({ topic, userTopics, setcurrentTopic, getNextQuestion, 
  addTopic, deleteCurrentTopic, setshowAddQuestion, deleteAquestion }: FlashcardTitleProps) => {
  return (
    <Row id={styles.myHeader}>
      <Col md={6} style={{display: "flex", alignItems: "center"}}>
        <div id={styles.selectedtopic}>{topic}</div>
      </Col>
      <Col md={6} className="py-3" style={{ backgroundColor: "rgb(156 112 159 / 32%)"}}>
        <ControlPanel
          topics={userTopics}
          setTopic={(newTopic: string) => {
            setcurrentTopic(newTopic);
            getNextQuestion(newTopic);
          }}
          addTopic={(newTopic: string) => addTopic(newTopic)}
          deleteTopic={deleteCurrentTopic}
          addQuestion={() => setshowAddQuestion(true)}
          deleteQuestion={deleteAquestion} />
      </Col>
    </Row>
  )
}

export default FlashcardTitle;
