import { Col, Row } from "react-bootstrap";
import DeleteQuestionBtn from "./svg/DeleteQuestionBtn";
import AddQuestionBtn from "./svg/AddQuestionBtn";

interface AddDeleteQuestionProps {
  addQuestion: () => void
  deleteQuestion: () => void
}

const AddDeleteQuestion = ({ addQuestion, deleteQuestion }: AddDeleteQuestionProps) => {
  return (
    <Row>
      <Col sm={2} style={{width: "100px", textAlign: "end"}}>
        question
      </Col>
      <Col sm={10} style={{width: "200px"}}>
        <AddQuestionBtn addQuestion={addQuestion} />
        &nbsp;/&nbsp;
        <DeleteQuestionBtn deleteQuestion={deleteQuestion} />
      </Col>
    </Row>
  );
}

export default AddDeleteQuestion;
