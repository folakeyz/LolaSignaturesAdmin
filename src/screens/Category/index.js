import React, { useEffect, useState } from "react";
import { Navigation, Header, Button, Input, Modal } from "../../components";
import { getInventory } from "../../redux/actions/inventoryActions";
import {
  deleteCategory,
  addCategory,
  editCategory,
} from "../../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import {
  CREATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from "../../redux/constants/categoryConstants";

const Category = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const lolaInventory = useSelector((state) => state.lolaInventory);
  const { category: categories = [] } = lolaInventory;

  const deleteCat = useSelector((state) => state.deleteCat);
  const { error, success } = deleteCat;

  const createCat = useSelector((state) => state.createCat);
  const { loading: cLoading, error: cError, success: cSuccess } = createCat;

  const updateCat = useSelector((state) => state.updateCat);
  const { loading: uLoading, error: uError, success: uSuccess } = updateCat;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: DELETE_CATEGORY_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Category deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch(getInventory());
    dispatch({ type: DELETE_CATEGORY_RESET });
  }

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  const columns = [{ title: "Name", field: "name" }];

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [id, setID] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      toast({
        title: "Error",
        description: "Please enter name",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(addCategory(name));
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      toast({
        title: "Error",
        description: "Please enter name",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(editCategory(name, id));
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Category")) {
      dispatch(deleteCategory(id));
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
    dispatch(getInventory());
    dispatch({ type: CREATE_CATEGORY_RESET });
  }
  if (cSuccess) {
    toast({
      title: "Notification",
      description: "Category deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getInventory());
    dispatch({ type: CREATE_CATEGORY_RESET });
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
    dispatch(getInventory());
    dispatch({ type: UPDATE_CATEGORY_RESET });
  }
  if (uSuccess) {
    toast({
      title: "Notification",
      description: "Category Updated Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getInventory());
    dispatch({ type: UPDATE_CATEGORY_RESET });
  }

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Category" />
        <div className="minimizeBtn">
          <Button
            type="button"
            onClick={() => setOpen(!open)}
            title="Add Category"
          />
        </div>
        <MaterialTable
          title=""
          columns={columns}
          data={categories}
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
          title={edit ? "Edit Category" : "Add Category"}
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

export default Category;
