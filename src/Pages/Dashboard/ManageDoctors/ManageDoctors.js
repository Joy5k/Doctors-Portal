import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null)
  const { data: doctors, isLoading,refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/doctors", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  const handleDeletingDoctor = doctor => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: 'DELETE',
      headers: {
        authorization:`bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch()
          toast.success(`Doctor ${doctor.name} is deleted successfully`)
     }

      })
  }

  if (isLoading) {
    return <Loading></Loading>;
  }
  const closeModal = () => {
    setDeletingDoctor(null)
  }
 
  return (
    <div>
      <h3 className="text-3xl">Manage Doctors: {doctors?.length}</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              doctors.length > 0 ? <>
               {doctors.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label onClick={()=>setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error text-white">
                    Delete
                  </label>
                </td>
              </tr>
            ))}
              </> :
          <h2 className=" text-6xl font-bold text-gray-200 ">No Doctors Added Yet</h2>
            }
           
          </tbody>
        </table>
      </div>
      {
        deletingDoctor && <ConfirmationModal
          title={`Are you sure! Your want to delete?`}
          message={`If you delete ${deletingDoctor.name}.It cannot be undone`}
          successAction={handleDeletingDoctor}
          successButtonName="Delete"
          modalData={deletingDoctor}
          closeModal={closeModal}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default ManageDoctors;
