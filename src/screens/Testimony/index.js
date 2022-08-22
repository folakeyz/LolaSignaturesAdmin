import React, { useEffect, useState } from "react";
import { Navigation, Header, Button, Input, Modal } from "../../components";
import { getInventory } from "../../redux/actions/inventoryActions";
import {
  getTestimony,
  deleteTestimony,
  addTestimony,
  editTestimony,
} from "../../redux/actions/testimonyActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import {
  CREATE_TESTIMONY_RESET,
  DELETE_TESTIMONY_RESET,
  UPDATE_TESTIMONY_RESET,
} from "../../redux/constants/testimonyConstants";

const Testimony = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const getTest = useSelector((state) => state.getTest);
  const { testimonies = [] } = getTest;

  const deleteTest = useSelector((state) => state.deleteTest);
  const { error, success } = deleteTest;

  const createTest = useSelector((state) => state.createTest);
  const { loading: cLoading, error: cError, success: cSuccess } = createTest;

  const updateTest = useSelector((state) => state.updateTest);
  const { loading: uLoading, error: uError, success: uSuccess } = updateTest;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: DELETE_TESTIMONY_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch(getInventory());
    dispatch({ type: DELETE_TESTIMONY_RESET });
  }

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  const columns = [
    { title: "Name", field: "name" },
    { title: "Message", field: "msg" },
  ];

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setID] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !msg) {
      toast({
        title: "Error",
        description: "All Fields are Required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(addTestimony(name, msg));
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    if (!name || !msg) {
      toast({
        title: "Error",
        description: "All Fields are Required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(editTestimony(name, msg, id));
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this")) {
      dispatch(deleteTestimony(id));
    }
  };

  if (cError) {
    toast({
      title: "Error",
      description: cError,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getTestimony());
    dispatch({ type: CREATE_TESTIMONY_RESET });
  }
  if (cSuccess) {
    toast({
      title: "Notification",
      description: "Deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getTestimony());
    dispatch({ type: CREATE_TESTIMONY_RESET });
  }

  if (uError) {
    toast({
      title: "Error",
      description: uError,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getTestimony());
    dispatch({ type: UPDATE_TESTIMONY_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getTestimony());
    dispatch({ type: UPDATE_TESTIMONY_RESET });
  }

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Testimony" />
        <div className="minimizeBtn">
          <Button
            type="button"
            onClick={() => setOpen(!open)}
            title="Add Testimony"
          />
        </div>
        <MaterialTable
          title=""
          columns={columns}
          data={testimonies}
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
              tooltip: "Edit",
              onClick: (event, rowData) => {
                setOpen(true);
                setEdit(true);
                setName(rowData.name);
                setMsg(rowData.msg);
                setID(rowData._id);
              },
              title: "Edit",
              color: "black",
            },
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
          title={edit ? "Edit Delivery" : "Add Delivery"}
          content={
            <div className="nmfb__InputFlex">
              {uLoading || cLoading ? (
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
                    title="Message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    type="text"
                  />
                  <Button
                    title={edit ? "Edit" : "Add"}
                    onClick={edit ? editHandler : submitHandler}
                    type="button"
                  />
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

export default Testimony;
