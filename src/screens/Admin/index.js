import React, { useEffect, useState } from "react";
import { Navigation, Header, Button, Input, Modal } from "../../components";
import { getInventory } from "../../redux/actions/inventoryActions";
import {
  addAdmin,
  deleteAdmins,
  updateAdmins,
} from "../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import {
  CREATE_ADMIN_RESET,
  DELETE_ADMIN_RESET,
} from "../../redux/constants/adminConstants";

const Category = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const lolaInventory = useSelector((state) => state.lolaInventory);
  const { customer = [] } = lolaInventory;

  const admin = customer ? customer.filter((x) => x.isAdmin === true) : [];
  const deleteAdmin = useSelector((state) => state.deleteAdmin);
  const { loading, error, success } = deleteAdmin;

  const createAdmin = useSelector((state) => state.createAdmin);
  const { loading: cLoading, error: cError, success: cSuccess } = createAdmin;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: DELETE_ADMIN_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Admin deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch(getInventory());
    dispatch({ type: DELETE_ADMIN_RESET });
  }

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Mobile", field: "mobile" },
  ];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !password) {
      toast({
        title: "Error",
        description: "All Fields are Compulsory",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Password does not match",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        dispatch(addAdmin(name, mobile, email, password));
      }
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Admin")) {
      dispatch(deleteAdmins(id));
    }
  };

  if (cError) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getInventory());
    dispatch({ type: CREATE_ADMIN_RESET });
  }
  if (cSuccess) {
    toast({
      title: "Notification",
      description: "Admin added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getInventory());
    dispatch({ type: CREATE_ADMIN_RESET });
  }

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Admin" />
        <div className="minimizeBtn">
          <Button
            type="button"
            onClick={() => setOpen(!open)}
            title="Add Admin"
          />
        </div>
        <MaterialTable
          title=""
          columns={columns}
          data={admin}
          options={{
            exportButton: true,
            actionsCellStyle: {
              backgroundColor: "#fff",
              color: "#FF00dd",
            },
            actionsColumnIndex: -1,

            headerStyle: {
              backgroundColor: "#fff",
              color: "black",
            },
          }}
          style={{ boxShadow: "none", width: "100%" }}
          actions={[
            {
              icon: "launch",
              iconProps: { style: { fontSize: "20px", color: "gold" } },
              tooltip: "Delete",
              onClick: (event, rowData) => {
                deleteHandler(rowData._id);
              },
              title: "Delete",
              color: "pink",
            },
          ]}
          components={{
            Action: (props) => (
              <button
                onClick={(event) => props.action.onClick(event, props.data)}
                className={`btn ${props.action.color}`}
              >
                {props.action.title}
              </button>
            ),
          }}
        />
        <Modal
          isVisible={open}
          title="Add Admin"
          size="lg"
          content={
            <div className="nmfb__InputFlex">
              {cLoading ? (
                <Center>
                  <CircularProgress isIndeterminate color="#087E8C" />
                </Center>
              ) : (
                <>
                  <Input
                    title="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                  <Input
                    title="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                  <Input
                    title="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    type="number"
                  />
                  <Input
                    title="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  <Input
                    title="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                  />

                  <Button title="Add" onClick={submitHandler} type="button" />
                </>
              )}
            </div>
          }
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Category;
