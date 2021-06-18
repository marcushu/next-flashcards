import { Row } from "react-bootstrap";
import GuestLogin from "./GuestLogin";
import Login from "./Login";
import Signup from "./Signup";

const HomeControlls = () => {
  return (
    <Row>
      <Login />
      <Signup />
      <GuestLogin />
    </Row>
  );
}

export default HomeControlls;
