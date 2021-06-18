import React, { useRef, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styles from './styles/TopicSearch.module.css';


const TopicSearch = ({ search }: { search: (_topic: string) => Promise<void> }) => {
  const [searchText, setsearchText] = useState("");
  const textContent = useRef<HTMLInputElement>(null);

  return (
    <Row id={styles.searchrow}>
      <Col md={5} id={styles.labeltext} className="pt-2">
        <p className="fs-5 fw-lighter">Find a Topic:</p>
      </Col>
      <Col md={2} className="text-light py-2" id={styles.tboxcol}>
        <Form.Control
          className="form-control-sm"
          ref={textContent}
          id={styles.textbox}
          onChange={e => setsearchText(e.target.value)}/>
      </Col>
      <Col md={5} className="py-2" id={styles.searchbutton}>
        <Button className="btn btn-sm btn-light" onClick={() => {
          search(searchText);
          if(textContent && textContent.current)
            textContent.current.value = ""}}>
          Search
        </Button>
      </Col>
    </Row>
  )
}

export default TopicSearch;