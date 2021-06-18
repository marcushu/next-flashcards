import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import HomeHead from "../../components/HomeHead";
import styles from "../../styles/NewUser.module.css";

const NewUser = () => {
  const router = useRouter();
  const { newUser } = router.query;
  const [newTopic, setnewTopic] = useState("");
  const [wecomeText, setwecomeText] = useState("");

  useEffect(() => {
    setwecomeText(`Welcome ${newUser}!`)
  }, [newUser]);

  const addTopic = async () => {
    if (newTopic) {
      // insert a new topic
      const datas = await fetch(`http://localhost:3000/api/insertTopic?username=${newUser}&topic=${newTopic}`);

      // topicName will be an enpty string on failure.
      const { topicName } = await datas.json();

      if (topicName) {
        router.push(`/flashcard/${newUser}`);
      }
    } else {
      alert("please enter a new topic");
    }
  }

  return (
    <>
      <HomeHead titleText={wecomeText} />
      <Row id={styles.welcomebody}>
        <Col md={4} id={styles.leftcol}>
          <div style={{ color: "white" }}>
            <h2>Begin here...</h2>
          </div>
        </Col>
        <Col md={4} className="text-center">
          <input
            id={styles.newtopic}
            type="text"
            placeholder="new topic..."
            onChange={e => setnewTopic(e.target.value)} />
        </Col>
        <Col md={4} id={styles.rightcol}>
          <Button
            className="btn btn-primary btn-lg"
            onClick={addTopic} >
            Add Topic
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default NewUser;