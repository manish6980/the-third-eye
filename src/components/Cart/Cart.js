import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { Table } from "react-bootstrap";

function Cart() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3500/user-api/get-users');
        const userDetails = response.data;
        setUsers(prevstate=>{
          return prevstate.concat(userDetails.payload);
        });
        console.log('list of users',users);
      } catch (error) {
        console.error('Error fetching user locations:', error);
        setErr('Error fetching user locations');
      }
    };
  

  // return (
  //   <div className='display-3 text-center'>
  //     <button onClick={() => fetchUsers()}>List of users</button>
  //     <div>
  //     {
  //       users.map((userObj) => (
          
  //         <p className="col text-center mx-auto" key={userObj._id}>
  //           <p>Hello all</p>
  //           <p className="display-5 name">Name: {userObj.username}</p>
  //           <p className="lead fs-4">{userObj.email}</p>
  //           <p className="lead fs-4">{userObj.latitude}</p>
  //           <p className="lead fs-4">{userObj.longitude}</p>
  //         </p>
  //       ))
  //     }
  //     </div>
  //   </div>
  // );

  return (
    <>
    <button className="btn btn-light d-block mx-auto mt-5 mb-5" id= 'btnn'onClick={fetchUsers}>
        Get Location
    </button>
    <Table striped bordered hover>
    <thead>
    <tr>
      <th>Username</th>
      <th>Email</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    {users.map((todos) => (<tr key={todos._id}><td>{todos.username}</td>
    <td>{todos.email}</td><td>{todos.latitude}</td><td>{todos.longitude}</td></tr>))}
</tbody>
    </Table>
    </>
)


}

export default Cart;
