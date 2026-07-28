import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./App.css"

const App = () => {

  const [users, setusers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const fetchuserdata = async () => {
    try {
      let apiurl = "http://localhost:5000/api/users"
      let res = await axios({
        url: apiurl,
        method: "GET"
      });
      const { status, data } = res;

      if (status === 200) {
        setusers(data?.data)
      }
    }
    catch (error) {
      console.log("Err while fetching api", error)
    }
  };

  const adduser = async () => {
    try {
      let apiurl = "http://localhost:5000/api/users/add"

      if (editIndex !== null) {
        // update existing user
        let res = await axios({
          url: `${apiurl}/${editIndex}`,
          method: "PATCH",
          data: { user: newUser }
        });

        if (res.status === 200) {
          setEditIndex(null);
          setNewUser("");
          fetchuserdata();
        }
      } else {
        // add new user
        let res = await axios({
          url: apiurl,
          method: "POST",
          data: { user: newUser }
        });

        if (res.status === 200) {
          setNewUser("");
          fetchuserdata();
        }
      }
    }
    catch (error) {
      console.log("Err while saving user", error)
    }
  }

  const deleteUser = async (index) => {
    try {
      let apiurl = `http://localhost:5000/api/users/delete/${index}`
      let res = await axios({
        url: apiurl,
        method: "DELETE"
      });

      if (res.status === 200) {
        fetchuserdata();
      }
    } catch (error) {
      console.log("Err while deleting user", error)
    }
  }

  const DeleteALL = async () => {
    try {
      let apiurl = "http://localhost:5000/api/users/delete-all"
      let res = await axios({
        url: apiurl,
        method: "DELETE"
      });

      if (res.status === 200) {
        // fetchuserdata();
        // setNewUser([]);
        setusers([]);
      }
    } catch (err) {
      console.log("Err while deleting-all user", err)
    }
  }

  const startEdit = (index, name) => {
    setEditIndex(index);
    setNewUser(name);
  }

  useEffect(() => {
    fetchuserdata();
  }, []);

  return (
    <div>
      <h1>API INTEGRATION</h1>
      {users.length === 0 && <h3>No data available!</h3>}

      <input
        type="text"
        placeholder='Enter user name'
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />

      <button onClick={adduser}>Add User</button>
      <button className='delete-all' onClick={DeleteALL}>Delete All</button>

      <ul>
        {
          users.map((item, index) => {
            return (
              <li key={index}>
                {item}
                <button onClick={() => deleteUser(index)}>Delete</button>
              </li>
            )
          })
        }
      </ul>
    </div >
  )
}

export default App;