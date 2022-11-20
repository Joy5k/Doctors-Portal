import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imgHostKey = process.env.REACT_APP_imgbb_Key;
  const navigate = useNavigate();

  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointmentSpecialty");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    // sending image to the server onimgbb and get url from imgbb
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())  
      .then(imgData => {
        if (imgData.success) {
          
          console.log(imgData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image:imgData.data.url
          }

          // sending doctor data to the server

          fetch('http://localhost:5000/doctors', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization:`bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify(doctor)
            
          })
            .then(res => res.json())
            .then(data => {
              console.log(data,'here check doctor name')
              toast.success(`${doctor.name} is added successfully`)
           navigate('/dashboard/managedoctors')
            })

        }
      })
  };

  return (
    <div className="w-96 p-7 ">
      <h4 className="text-4xl">Add A doctor</h4>

      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Enter your name",
            })}
            placeholder="Your name"
            className="input input-bordered w-full max-w-xs"
          />

          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Enter valid email account",
            })}
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {" "}
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty")}
            className="select input-bordered w-full max-w-xs"
          >
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: "Photo is required",
            })}
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image?.message}</p>
          )}
        </div>
        <input
          className="btn btn-accent w-full my-4"
          type="submit"
          value="Add Doctor"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
