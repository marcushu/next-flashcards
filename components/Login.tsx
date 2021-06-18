import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Col } from "react-bootstrap";
import styles from './styles/ControllCard.module.css';
import LoginBtn from "./svg/LoginBtn";
import host from '../components/host';

const Login = () => {
  const router = useRouter();
  const [userName, setuserName] = useState("");

  const handleClick = async () => {
    if (userName) {
      const datas = await fetch(`${host}/api/userExists?username=${userName}`);
      const { userExists } = await datas.json();

      if(userExists) {
        router.push(`flashcard/${userName}`);
      } else {
        alert(`${userName} could not be found. Please check spelling.`);
      }
      
    } else {
      alert("Please enter your username");
    }
  }

  return (
    <Col lg={4} className={styles.logincard}>
      <LoginBtn login={handleClick} />
      <p className="fw-lighter text-secondary">to create your own experience</p>
      <input
        type="text"
        className={styles.logintext}
        onChange={e => setuserName(e.target.value)} />
    </Col>
  );
}

export default Login;
