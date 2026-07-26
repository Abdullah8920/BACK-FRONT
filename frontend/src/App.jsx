import React, { useState, useEffect } from 'react'
import axios from "axios"

const App = () => {

  const [users, setusers] = useState([]);
  const [newUser, setNewUser] = useState("");

  const fetchuserdata = async () => {
    try {
      let apiurl = "http://localhost:5000/api/users"
      let res = await axios({
        url: apiurl,
        method: "GET"
      });
      console.log('Api res:', res);
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
      let apiurl = "http://localhost:5000/api/users"
      let res = await axios({
        url: apiurl,
        method: "POST",
        data: { user: newUser }
      });
      console.log('Api res:', res);
      const { status, data } = res;

      if (status === 200) {
        setNewUser("");     // clear input after successful add
        fetchuserdata();
      }
    }
    catch (error) {
      console.log("Err while fetching api", error)
    }
  }

  useEffect(() => {
    fetchuserdata();
  }, []);

  return (
    <div>
      <h1>API INTERGRATION </h1>
      {users.length == 0 && <h3> No data available! </h3>}

      <input
        type="text"
        placeholder='Enter user name'
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />

      <button onClick={adduser}> Add User </button>

      <ul>
        {
          users.map((item, index) => {
            return <li key={index}> {item} </li>
          })
        }
      </ul>
    </div>
  )
}

export default App;