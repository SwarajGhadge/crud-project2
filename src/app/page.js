"use client";

import { useState } from "react";
import { add } from "./store/features/userSlice";
import { useDispatch } from "react-redux";
import Axios from "axios";
import Link from "next/link";
export default function home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [userArray, setUserArray] = useState([]);

  const [visibility, setVisibility] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = async () => {
    const userObj = {
      name,
      email,
      phoneNumber,
    };
    await Axios.post(`http://localhost:3000/uList/userRoute`, userObj).then(
      () => {
        alert("Posted");
      }
    );
  };

  //get data
  const getData = async () => {
    try {
      const response = await Axios.get(`http://localhost:3000/uList/userRoute`);
      const user = response.data;
      setUserArray(user);
    } catch (error) {
      console.error(error);
    }
  };
  getData();

  //update data
  const handleEdit = (name, email, phoneNumber, userId) => {
    setVisibility((visibility) => !visibility);
    setName(name);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setUserId(userId);
  };

  const handleUpdate = async (id) => {
    const userObj = {
      name,
      email,
      phoneNumber,
    };
    await Axios.put(
      `http://localhost:3000/uList/userRoute/${id}`,
      userObj
    ).then(() => {
      alert("Updated");
    });
  };

  const handleDelete = async (id) => {
    const userObj = {
      name,
      email,
      phoneNumber,
    };
    await Axios.delete(
      `http://localhost:3000/uList/userRoute/${id}`,
      userObj
    ).then(() => {
      alert("Deleted");
    });
  };

  const dispatch = useDispatch();
  function sendData(user) {
    dispatch(add(user));
  }

  return (
    <>
      <div className="container">
        <h1 className="headd">CRUD Application</h1>
        <form className="tablee">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="same"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" style={{marginTop:"10px"}}>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="same"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="phoneNumber" style={{marginTop:"10px"}}>Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            className="same"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {visibility ? (
            <button className='btn' onClick={() => handleUpdate(userId)}>Update</button>
          ) : (
            <button className='btn' onClick={handleSubmit}>Submit</button>
          )}
        </form>
        <hr style={{marginTop:"50px"}} />
        <div className="container2">
          <h1>Users List</h1>
          <table className="unik">
            <thead>
              <tr>
                <th className="ek">ID</th>
                <th className="ek">Name</th>
                {/* <th>email</th>
                <th>Ph</th> */}
                <th className="ek">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userArray.map((ele, index) => {
                const { name, email, phoneNumber, _id } = ele;
                return (
                  <tr key={index} >
                    <td className="ek">{index + 1}</td>
                    <td className="ek">{name}</td>
                    {/* <td>{email}</td>
                    <td>{phoneNumber}</td> */}
                    <td className="ek">
                      <Link href={"/view"}>
                        <button className="btn2" onClick={() => sendData(ele)}>View</button>
                      </Link>
                      <button className="btn2"
                        onClick={() =>
                          handleEdit(name, email, phoneNumber, _id)
                        }
                      >
                        Edit
                      </button>
                      <button className="btn2" onClick={() => handleDelete(_id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
