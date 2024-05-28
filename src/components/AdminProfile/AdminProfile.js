import React,{useContext} from 'react'
import './AdminProfile.css'
import { loginContext } from '../../contexts/loginContext'
import { NavLink, Outlet } from "react-router-dom";

function AdminProfile() {
    let [user]=useContext(loginContext)

  const activeLink={
    color: "#992817",
    fontSize:"3 rem",
    fontWeight:"bold",
    textDecoration: "underline"
  };

  const inactiveLink={
    color: "black",
    fontSize:"3 rem",
    fontWeight:"bold",
    textDecoration: "underline"
  };

  return (
    <div>
      <p className="display-5 text-end text-light">Welcome, Admin!</p>
      <ul className="nav justify-content-between">
      <li className="nav-item under">
        <NavLink className="nav-link text-light" style={({isActive})=>{
          return isActive?activeLink:inactiveLink
          }} to="cart">Monitor!</NavLink>
      </li>
      </ul>
      
      <Outlet/>
    </div>
  )
}

export default AdminProfile