import { Col, Row } from "react-bootstrap";
import styles from './styles/HomeHead.module.css';


const HomeHead = ({ titleText }: { titleText: string }) => {
  return (
    <Row id={styles.myHeader}>
      <Col>
        <div className={styles.bigtitle}>{titleText ? titleText : "Find a Topic"}</div>
        <div className={styles.headertext}>
          create
          <span className={styles.flashcards}>flashcard - </span>
          study
          <span className={styles.flashcards}>flashcards - </span>
          learn
        </div>
      </Col>
    </Row>
  )
}

export default HomeHead;
