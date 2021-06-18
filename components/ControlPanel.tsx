import { Col, Row } from "react-bootstrap";
import AddDeleteQuestion from "./AddDeleteQuestion";
import AddDeleteTopic from "./AddDeleteTopic";
import SelectTopic from "./SelectTopic";
import styles from './styles/ControlPanel.module.css';

interface ControlPanelProps {
  topics: string[]
  setTopic: (input: string) => void
  addTopic: (input: string) => void
  deleteTopic: () => void
  addQuestion: () => void
  deleteQuestion: () => void
  // delete question
}

const ControlPanel = ({ topics, setTopic, addTopic, deleteTopic, addQuestion, deleteQuestion }: ControlPanelProps) => {


  return (
    <>
      <Row>
        <Col className={styles.controlpanel}>
          <AddDeleteQuestion
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion} />
        </Col>
      </Row>
      <Row>
        <Col className={styles.controlpanel}>
          <AddDeleteTopic
            addAtopic={addTopic}
            deleteAtopic={deleteTopic} />
        </Col>
      </Row>
      <Row>
        <Col className={styles.controlpanel}>
          <SelectTopic
            allTopics={topics}
            setAtopic={setTopic} />
        </Col>
      </Row>
    </>
  );
}

export default ControlPanel;
