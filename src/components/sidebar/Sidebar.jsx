import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ViewStreamOutlinedIcon from "@mui/icons-material/ViewStreamOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration : "none"}}>
          <span className="logo">Admin Panel</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{textDecoration : "none"}} > 
          <li>
            <PersonOutlineOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
          </Link>

          <Link to="/products" style={{textDecoration : "none"}}>
          <li>
            <InventoryOutlinedIcon className="icon" />
            <span>Products</span>
          </li>
          </Link>
          <Link to="/guide" style={{textDecoration : "none"}}>
          <li>
            <ViewStreamOutlinedIcon className="icon" />
            <span>Cultivation Guide</span>
          </li>
          </Link>

          <li>
            <LocalShippingIcon className="icon" />
            <span>Orders</span>
          </li>
          {/* <p className="title">USEFUL</p> */}
          <Link to="/marketnearme" style={{textDecoration : "none"}}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Markets Near me</span>
          </li>
          </Link>

          <li>
            <MonetizationOnOutlinedIcon className="icon" />
            <span>Price Listing</span>
          </li>
          <Link to="/fertilizers" style={{textDecoration : "none"}}>
          <li>
            <MonetizationOnOutlinedIcon className="icon" />
            <span>Seeds & Fertilizers </span>
          </li>
          </Link>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
