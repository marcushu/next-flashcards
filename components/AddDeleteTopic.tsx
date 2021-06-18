import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AddTopicBtn from "./svg/AddTopicBtn";
import DeleteTopicBtn from "./svg/DeleteTopicBtn";

interface AddDeleteTopicProps {
  deleteAtopic: () => void
  addAtopic: (input: string) => void
}

const AddDeleteTopic = ({ deleteAtopic, addAtopic }: AddDeleteTopicProps) => {
  const inputTxt = useRef<HTMLInputElement>(null);
  const [newTopicName, setnewTopicName] = useState("");

  const addTopic = () => { 
    if (newTopicName) {
      if (inputTxt?.current?.value)
        inputTxt.current.value = "";

      addAtopic(newTopicName);
      setnewTopicName("");
    } else {
      alert("Please enter a new topic name");
    }

  }

  return (
    <Row className="py-2">
      <Col md={2} style={{width: "100px", textAlign: "end"}}>
        topic
      </Col>
      <Col md={2} style={{width: "95px"}}>
        <AddTopicBtn addAtopic={addTopic} />
        &nbsp;/&nbsp;
        <DeleteTopicBtn deleteAtopic={deleteAtopic} />
      </Col>
      <Col md={8} style={{width: "100px"}}>
        <input
          className="form-control form-control-sm"
          type="text"
          ref={inputTxt}
          placeholder="new topic..."
          onChange={e => setnewTopicName(e.target.value)}
          style={{ width: "150px" }} />
      </Col>
    </Row>
  );
}

export default AddDeleteTopic;
