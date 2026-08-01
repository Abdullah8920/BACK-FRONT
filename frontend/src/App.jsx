import React, { useState, useEffect } from 'react'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import "./App.css"

const App = () => {

  const [users, setusers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [targetindex, settargetindex] = useState("");

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
      toast.error("Failed To Fetch User")
    }
  };

  const adduser = async () => {
    try {
      let apiurl = "http://localhost:5000/api/users/add"
      let res = await axios({
        url: apiurl,
        method: "POST",
        data: { user: newUser }
      });

      if (res.status === 200) {
        setNewUser("");
        fetchuserdata();
        toast.success("User update SuccessFully")
      }
    }
    catch (error) {
      console.log("Err while saving user", error)
      toast.error("User Not Added")

    }
  }

  // if (editIndex !== null) {
  //   let res = await axios({
  //     url: `${apiurl}/${editIndex}`,
  //     method: "POST",
  //     data: { user: newUser }
  //   });

  //   if (res.status === 200) {
  //     setEditIndex(null);
  //     setNewUser("");
  //     fetchuserdata();
  // }
  // } else {

  const deleteUser = async (index) => {
    try {
      let apiurl = `http://localhost:5000/api/users/delete/${index}`
      let res = await axios({
        url: apiurl,
        method: "DELETE"
      });

      if (res.status === 200) {
        fetchuserdata();
        toast.success("user deleted SuccessFully")
      }
    } catch (error) {
      console.log("Err while deleting user", error)
      toast.error("Failed To Delete User")
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
        toast.success("All User Deleted SuccesFully")
      }
    } catch (err) {
      console.log("Err while deleting-all user", err)
      toast.error("Error While Delete All User")
    }
  }

  const edituser = (index) => {
    console.log("Index val", index)
    setEditIndex(true);
    setNewUser(users[index]);
    settargetindex(index);
    toast.success("edit user")
  }
  const updateuser = async () => {
    try {
      let apiurl = "http://localhost:5000/api/users/update"
      let res = await axios({
        url: apiurl,
        method: "PUT",
        data: {
          key: targetindex,
          update: newUser,
        }
      });

      if (res.status === 200) {
        setEditIndex(false);
        setNewUser("");
        settargetindex("");
        fetchuserdata();
        toast.success('Edit user Successfully');
      }
    } catch (error) {
      console.log("Err while updating user", error);
      toast.error("User Not Updated");
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
    <div className="container">
      <Toaster position="top-right" />
      <h1>API INTEGRATION</h1>

      <div className="input-row">
        <input
          type="text"
          placeholder='Enter user name'
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        {editIndex
          ? <button onClick={updateuser}>Update</button>
          : <button onClick={adduser}>Add User</button>
        }
        <button className='delete-all' onClick={DeleteALL}>Delete All</button>
      </div>

      {users.length === 0 && <h3>No data available!</h3>}

      <ul>
        {users.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <div className="actions">
              <button onClick={() => edituser(index)}>Edit</button>
              <button onClick={() => deleteUser(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;