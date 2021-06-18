import { Col, Row } from "react-bootstrap"
import styles from './styles/GuestGreeting.module.css'

const GuestGreeting = () => {
  return (
    <Row>
      <Col id={styles.topcol}>
        <div id={styles.card}>
          <h2>Welcome</h2>
          <p className={styles.p}>
            Search available topics submitted by users.  Don't wory about case or spacing; e.g. a search for <span className={styles.searchtearms}>MongoDB</span>, <span className={styles.searchtearms}>mongoDB</span> <span className={styles.searchtearms}>mongo db</span> ... will all find <span className={styles.searchtearms}>MongoDB</span>.
          <span className="searchtearms"></span>
          </p>
          <p className={styles.p}>
             Not finding what your looking for?  Create an account and make your own.  Your contributions will be visible to all guest users.
          </p>
         
        </div>
      </Col>
    </Row>
  );
}

export default GuestGreeting;
