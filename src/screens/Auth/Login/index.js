import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../components";
import styles from "../styles.module.css";
import logo from "../../../assets/lola.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import { USER_LOGOUT } from "../../../redux/constants/userConstants";
import { authLogin } from "../../../redux/actions/userActions";

const Login = () => {
  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  if (error) {
    toast({
      title: "Warning!",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: USER_LOGOUT });
  }

  const loginHandler = (e) => {
    if (!email || !password) {
      toast({
        title: "Warning!",
        description: "Enter Email and Password",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(authLogin(email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);
  return (
    <div className={styles.app}>
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate color="pink.300" />
        </Center>
      ) : (
        <div className={styles.formContainer}>
          <div className={styles.logo}>
            <img src={logo} alt="Lola Signatures" />
          </div>
          <div className={styles.textContainer}>
            <br />
            <h3>Admin Login</h3>
          </div>
          <form onSubmit={loginHandler}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              title="Email Address"
              required={true}
              type="email"
              size={styles.adult}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              title="Password"
              required={true}
              type="password"
              // size={styles.adult}
            />
            <div className={styles.textContainer}>
              <p>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </p>
            </div>

            <Button title="Login" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
