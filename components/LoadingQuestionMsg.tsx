import { Col } from "react-bootstrap";
import styles from './styles/QuestionCard.module.css';

const LoadingQuestionMsg = () => {
  return (
    <Col>
      <div id={styles.cardhead} >
        <div>
          Q:
        </div>
      </div>
      <div id={styles.loadingmsg}>Loading...</div>
    </Col>
  );
}

export default LoadingQuestionMsg;