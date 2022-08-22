import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../components";
import styles from "../styles.module.css";
import logo from "../../../assets/lola.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import { USER_LOGOUT } from "../../../redux/constants/userConstants";
import { authLogin } from "../../../redux/actions/userActions";

const ForgotPassword = () => {
  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const userForget = useSelector((state) => state.userForget);
  const { loading, error, userInfo } = userForget;

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
    if (!email) {
      toast({
        title: "Warning!",
        description: "Enter Email",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(authLogin(email));
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
            <h3>Forgot Password</h3>
          </div>

          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            title="Email Address"
            required={true}
            type="email"
            size={styles.adult}
          />
          <div className={styles.textContainer}>
            <p>
              <Link to="/">Login</Link>
            </p>
          </div>

          <Button
            title="Forgot Password"
            type="button"
            onClick={loginHandler}
          />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
