import { Col, Row } from "react-bootstrap";
import styles from './styles/LandingMessage.module.css';

const LandingMessage = () => {
  return (
    <Row id={styles.mainrow}>
      <Col md={6}
        className="d-flex justify-content-center p-4"
        style={{ backgroundColor: "#919191" }}>
        <div style={{ maxWidth: "500px" }}>
          <span className={styles.emphasized}>
            Create flash cards on any topic.
          </span>
          <br /><br />
          <p className="fw-lighter">
            Your flashcard will be available to guest users, but they are  yours to delete any time.
          </p>
        </div>
      </Col>
      <Col md={6}
        className="d-flex justify-content-center p-4"
        style={{ backgroundColor: "#616161" }}>
        <div style={{ maxWidth: "500px" }}>
          <span className={styles.emphasized}>Just want to browse? </span>
          <br /><br />
          <p className="fw-lighter">
            Sign in below as a guest and search available topics.
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default LandingMessage;
