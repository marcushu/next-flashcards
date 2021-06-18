import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from './styles/AddQuestion.module.css';

interface QuestionType {
  question: string
  answer: string
  user?: string
  topic?: string
}

interface AddQuestionProps {
  hideMe: () => void
  submitQuestion: (input: QuestionType) => void
}

const AddQuestion = ({ hideMe, submitQuestion }: AddQuestionProps) => {
  const [questionText, setquestionText] = useState("");
  const [answerText, setanswerText] = useState("");

  const handleSubmit = () => {
    if(questionText && answerText) {
      submitQuestion({
        question: questionText,
        answer: answerText
      });
  
      hideMe();
    } else {
      alert("Please enter a question and answer");
    }
    
  }

  return (
    <>
      <Row className="p-4">
        <Col md={3} className={styles.qlabels}>
          <h3>question:</h3>
        </Col>
        <Col>
          <input
            className="form-control"
            type="text"
            onChange={e => setquestionText(e.target.value)} />
        </Col>
      </Row>
      <Row className="p-4">
        <Col md={3} className={styles.qlabels}>
          <h3>answer:</h3>
        </Col>
        <Col>
          <textarea
            className="form-control"
            rows={8}
            onChange={e => setanswerText(e.target.value)}></textarea>
        </Col>
      </Row>
      <Row className="p-4">
        <Col className={styles.qlabels}>
          <Button
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}>
            Submit
        </Button>
        &nbsp;&nbsp;
        <Button
            className="btn btn-light btn-lg"
            onClick={hideMe}>
            Cancel
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AddQuestion;
