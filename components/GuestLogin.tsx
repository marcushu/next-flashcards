import { useRouter } from "next/dist/client/router";
import { Col } from "react-bootstrap";
import styles from './styles/ControllCard.module.css';
import GuestloginBtn from "./svg/GuestloginBtn";

const GuestLogin = () => {
  const router = useRouter();

  return (
    <Col lg={4} className={styles.logincard}>
      <GuestloginBtn login={() => router.push('/guestUser')} />
      <p className="fw-lighter text-secondary">explore all topics</p>
    </Col>
  );
}

export default GuestLogin;
