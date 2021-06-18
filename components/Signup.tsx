import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Col } from "react-bootstrap";
import styles from './styles/ControllCard.module.css';
import SignupBtn from "./svg/SignupBtn";

const Signup = () => {
  const router = useRouter();
  const [newUsername, setnewUsername] = useState("");

  const handleClick = async () => {
    if (newUsername) {
      const datas = await fetch(`http://localhost:3000/api/userExists?username=${newUsername}`);
      const { userExists } = await datas.json();

      if(userExists) {
        alert(`It looks like ${newUsername} is already taken.  Try another name`)
      } else {
        await fetch(`http://localhost:3000/api/insertUser?newUserName=${newUsername}`);
    
        router.push(`newUsers/${newUsername}`);
      }
    } else {
      alert("please enter a new name");
    }
  }

  return (
    <Col lg={4} className={styles.logincard} style={{ backgroundColor: "rgb(250 225 239 / 5%)" }}>
      <SignupBtn signup={handleClick} />
      <p className="fw-lighter text-secondary">create personal flash cards</p>
      <input
        type="text"
        className={styles.logintext}
        onChange={e => setnewUsername(e.target.value)} />
    </Col>
  );
}

export default Signup;
