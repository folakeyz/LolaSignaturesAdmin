import React, { useEffect, useState } from "react";
import {
  Navigation,
  Header,
  Button,
  Input,
  Select,
  Textarea,
  Modal,
} from "../../components";
import { getInventory } from "../../redux/actions/inventoryActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { useToast } from "@chakra-ui/react";

const Orders = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const lolaInventory = useSelector((state) => state.lolaInventory);
  const { orders = [] } = lolaInventory;

  const removeProducts = useSelector((state) => state.removeProducts);
  const { error, success } = removeProducts;

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  const columns = [
    { title: "Name", field: "name" },
    { title: "brand", field: "brand" },
    { title: "Price", field: "price" },
    { title: "Category", field: "category.name" },
  ];

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Orders" />
        <div className="minimizeBtn"></div>
        <MaterialTable
          title=""
          columns={columns}
          data={orders}
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
                // setOpen(true)
                // setEdit(true)
                // setBankCode(rowData.bankCode)
                // setBankName(rowData.bankName)
              },
              title: "View",
              color: "black",
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
          //   isVisible={open}
          title="Order"
          size="xl"
          content={
            <div className="nmfb__InputFlex">
              {/* <Button
                    title="Add Product"
                    onClick={submitHandler}
                    type="button"
                  />
           
             */}
            </div>
          }
          //   onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Orders;
