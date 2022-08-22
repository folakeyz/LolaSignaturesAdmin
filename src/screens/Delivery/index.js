import React, { useEffect, useState } from "react";
import { Navigation, Header, Button, Input, Modal } from "../../components";
import {
  deleteDelivery,
  addDelivery,
  editDelivery,
  getDelivery,
} from "../../redux/actions/deliveryActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import {
  CREATE_DELIVERY_RESET,
  DELETE_DELIVERY_RESET,
  UPDATE_DELIVERY_RESET,
} from "../../redux/constants/deliveryConstants";

const Delivery = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const getDel = useSelector((state) => state.getDel);
  const { deliveries = [] } = getDel;

  const deleteDel = useSelector((state) => state.deleteDel);
  const { error, success } = deleteDel;

  const createDel = useSelector((state) => state.createDel);
  const { loading: cLoading, error: cError, success: cSuccess } = createDel;

  const updateDel = useSelector((state) => state.updateDel);
  const { loading: uLoading, error: uError, success: uSuccess } = updateDel;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: DELETE_DELIVERY_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch(getDelivery());
    dispatch({ type: DELETE_DELIVERY_RESET });
  }

  useEffect(() => {
    dispatch(getDelivery());
  }, [dispatch]);
  const columns = [
    { title: "Country", field: "country" },
    { title: "Fee", field: "fee" },
  ];

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [country, setCountry] = useState("");
  const [fee, setFee] = useState("");
  const [id, setID] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!country || !fee) {
      toast({
        title: "Error",
        description: "All Fields are Required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(addDelivery(country, fee));
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    if (!country || !fee) {
      toast({
        title: "Error",
        description: "All Fields are Required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(editDelivery(country, fee, id));
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Delivery")) {
      dispatch(deleteDelivery(id));
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
    dispatch({ type: CREATE_DELIVERY_RESET });
  }
  if (cSuccess) {
    toast({
      title: "Notification",
      description: "Added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setOpen(false);
    dispatch(getDelivery());
    dispatch({ type: CREATE_DELIVERY_RESET });
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
    dispatch(getDelivery());
    dispatch({ type: UPDATE_DELIVERY_RESET });
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
    dispatch(getDelivery());
    dispatch({ type: UPDATE_DELIVERY_RESET });
  }

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Delivery" />
        <div className="minimizeBtn">
          <Button
            type="button"
            onClick={() => setOpen(!open)}
            title="Add Delivery"
          />
        </div>
        <MaterialTable
          title=""
          columns={columns}
          data={deliveries}
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
                setCountry(rowData.country);
                setFee(rowData.fee);
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
                    title="Country/State"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    size="adult"
                  />
                  <Input
                    title="Fee ($)"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    type="text"
                    size="adult"
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

export default Delivery;
