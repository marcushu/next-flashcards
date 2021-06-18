import { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

interface SelectTopicsProps {
  allTopics: string[]
  setAtopic: (input: string) => void
}

const SelectTopic = ({ allTopics, setAtopic }: SelectTopicsProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  // This is only necessary to update the selector after a 
  // topic is added.
  useEffect(() => {
    if(selectRef && selectRef.current) 
      selectRef.current.selectedIndex = 0;
  }, [allTopics]);

  return (
    <Row>
      <Col md={2} style={{width: "100px", textAlign: "end"}}>
        select
      </Col>
      <Col>
        <select
          className="form-select form-select-sm"
          ref={selectRef}
          onChange={e => setAtopic(e.target.value)}
          style={{ width: "245px" }}>
          {allTopics.length && allTopics.map(topic => <option value={topic} key={topic}>{topic}</option>)}
        </select>
      </Col>
    </Row>
  );
}

export default SelectTopic;
