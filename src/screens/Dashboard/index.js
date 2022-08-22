import React, { useEffect } from "react";
import { Navigation, Cards, Header, Chart } from "../../components";
import {
  FaUsers,
  FaShuttleVan,
  FaShippingFast,
  FaUserGraduate,
  FaMoneyBillWave,
  FaShoppingBag,
  FaGifts,
} from "react-icons/fa";
import { getInventory } from "../../redux/actions/inventoryActions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  const lolaInventory = useSelector((state) => state.lolaInventory);
  const { customer, products, orders, income, category } = lolaInventory;

  const admin = customer ? customer.filter((x) => x.isAdmin === true) : [];
  const delivered = orders ? orders.filter((x) => x.isDelivered === true) : [];
  const ndelivered = orders
    ? orders.filter((x) => x.isDelivered === false)
    : [];

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Dashboard" />
        <div className="cardFlex">
          <Cards
            title="Customers"
            count={customer ? customer.length : 0}
            Icon={FaUsers}
            url="/report/claim/view"
            color="red"
          />
          <Cards
            title="Products"
            count={products ? products.length : 0}
            Icon={FaGifts}
            url="/report/claim/view"
            color="blue"
          />
          <Cards
            title="Categories"
            count={category ? category.length : 0}
            Icon={FaGifts}
            url="/report/claim/view"
            color="crimson"
          />
          <Cards
            title="Orders"
            count={orders ? orders.length : 0}
            Icon={FaShoppingBag}
            url="/report/claim/view"
            color="green"
          />
          <Cards
            title="Awaiting Delivery"
            count={ndelivered ? ndelivered.length : 0}
            Icon={FaShippingFast}
            url="/report/claim/view"
            color="purple"
          />
          <Cards
            title="Fulfilled Order"
            count={delivered ? delivered.length : 0}
            Icon={FaShuttleVan}
            url="/report/claim/view"
            color="dpurple"
          />
          <Cards
            title="Admin"
            count={admin ? admin.length : 0}
            Icon={FaUserGraduate}
            url="/report/claim/view"
            color="cyan"
          />
          <Cards
            title="Total Income"
            count={`$${income ? income : 0}`}
            Icon={FaMoneyBillWave}
            url="/report/claim/view"
            color="gold"
          />
        </div>
        <div className="chartFlex">
          <div className="chart">
            <Chart
              pending={ndelivered ? ndelivered.length : 0}
              orders={orders ? orders.length : 0}
              delivered={delivered ? delivered.length : 0}
            />
          </div>
          <div className="chart">
            <Chart
              pending={ndelivered ? ndelivered.length : 0}
              orders={orders ? orders.length : 0}
              delivered={delivered ? delivered.length : 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
