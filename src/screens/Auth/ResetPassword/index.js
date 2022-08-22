import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../components";
import styles from "../styles.module.css";
import logo from "../../../assets/lola.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import { USER_LOGOUT } from "../../../redux/constants/userConstants";
import { authLogin } from "../../../redux/actions/userActions";

const ResetPassword = () => {
  // Helpers
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userReset = useSelector((state) => state.userReset);
  const { loading, error, userInfo } = userReset;

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
    if (!password) {
      toast({
        title: "Warning!",
        description: "Enter Email",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      if (password !== confirmPassword) {
        toast({
          title: "Warning!",
          description: "Password does not match",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      } else {
        dispatch(authLogin(password));
      }
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
            <h3>Reset Password</h3>
          </div>

          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            title="New Password"
            required={true}
            type="password"
            size={styles.adult}
          />
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            title="Confirm Password"
            required={true}
            type="password"
            size={styles.adult}
          />
          <div className={styles.textContainer}>
            <p>
              <Link to="/">Login</Link>
            </p>
          </div>

          <Button title="Reset Password" type="button" onClick={loginHandler} />
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
