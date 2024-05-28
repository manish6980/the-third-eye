import React,{useContext} from 'react'
import './UserProfile.css'
import { loginContext } from '../../contexts/loginContext'
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {

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
      <p className="display-5 text-end text-light">Welcome, {user.username}!</p>
      <p className="lead text-end text-light"><small>{user.email}</small></p>
      <img src={user.image} width="75px" className='float-end' alt="" />
      <ul className="nav justify-content-between">
      <li className="nav-item">
        <NavLink className="nav-link text-light" style={({isActive})=>{
          return isActive?activeLink:inactiveLink
          }} to="products">Know your location!</NavLink>
      </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default UserProfile