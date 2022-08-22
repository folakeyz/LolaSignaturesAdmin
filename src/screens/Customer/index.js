import React, { useEffect } from "react";
import { Navigation, Header } from "../../components";
import { getInventory } from "../../redux/actions/inventoryActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";

const Customer = () => {
  const dispatch = useDispatch();

  const lolaInventory = useSelector((state) => state.lolaInventory);
  const { customer = [] } = lolaInventory;

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Mobile Number", field: "mobile" },
  ];

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Customers" />
        <div className="minimizeBtn"></div>
        <MaterialTable
          title=""
          columns={columns}
          data={customer}
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
        />
      </div>
    </div>
  );
};

export default Customer;
