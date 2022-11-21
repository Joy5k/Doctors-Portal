import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: users = [] ,refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://doctor-portal-server-eight.vercel.app/users");
      const data = await res.json();
      return data;
    },
  });
    const handleCreateAdmin = id => {
        fetch(`https://doctor-portal-server-eight.vercel.app/users/admin/${id}`, {
          method:'PUT',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('make admin successful')
                    refetch()
                }
            } )
    }
  return (
    <div>
      <h2>All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
                  <tbody>{
                  users.map((user,i)=> <tr key={user._id}>
                      <th>{i + 1}</th>
                      <td>{user?.name }</td>
                      <td>{user.email }</td>
                    <td>{user?.role!=='admin' && <button onClick={()=>handleCreateAdmin(user._id)} className="btn btn-primary btn-xs">Make Admin</button>}</td>
                      <td><button className="btn bg-red-600 border-none btn-xs">Delete</button></td>
                  </tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
