"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/features/userSlice";
export default function view() {
    const dispatch = useDispatch();
    function getRemove(id){
        dispatch(remove(id))
    }
  const data = useSelector((state) => state.cart);
  return (
    <>
      <div>
        <h1>User Details</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele, index) => {
              const { name, email, phoneNumber, _id } = ele;
              return (
                <tr key={index}>
                  <td>{_id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phoneNumber}</td>
                  <td><Link href={"/"}><button onClick={()=>getRemove(ele)}>Back</button></Link></td>                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
