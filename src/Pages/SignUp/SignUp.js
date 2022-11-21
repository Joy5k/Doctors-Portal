import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import toast from 'react-hot-toast';
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const { register, handleSubmit,formState: { errors } } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [signUpError, setSignUPError] = useState('')
  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const [token] = useToken(createdUserEmail);
  if (token) {
    navigate('/')
    console.log('i have a secrete token');
}
  console.log(createdUserEmail,'checking user email from signUp')
  const handleSignUp = (data) => {
    setSignUPError('')
    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user)
        
        const userInfo = {
          displayName:data.name
        }
        toast.success('userCreated Successfully')
      updateUser(userInfo)
        .then(() => {
          saveUser(data.name,data.email)
           })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error)
        setSignUPError(error.message)
    })
  };
  const saveUser = (name,email) => {
    const user = { name, email }
    fetch('https://doctor-portal-server-eight.vercel.app/users', {
      method:'POST',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    
    })
      .then(res => res.json())
      .then(data => {
        setCreatedUserEmail(email)
      })
  }
 
  return (
    <div className="flex justify-center items-center w-full mx-auto h-[800px]">
      <div className="w-96 p-7 border shadow-lg rounded-lg">
        <h3 className="text-center text-4xl my-4 ">Sign Up</h3>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
                          {...register("name", {
                  required:"Enter your name"
              })}
              placeholder="Your name"
              className="input input-bordered w-full max-w-xs"
                      />
           
      {errors.name && <p className="text-red-500">{errors.name?.message}</p>}           
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
                          {...register("email", {
                  required:'Enter valid email account'
              })}
              placeholder="Your Email"
              className="input input-bordered w-full max-w-xs"
                      />
                      {
                          errors.email && <p className="text-red-500">{errors.email?.message }</p>
                      }
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
                          {...register("password", {
                              required: true,
                            minLength: { value: 6, message: 'password should be 6 character or longer' },
                                pattern:{value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,message:'Password must have uppercase lowercase and number'}

             
                          })}
              placeholder="password"
              className="input input-bordered w-full max-w-xs"
                      />
                      {errors.password && <p className="text-red-500">{errors.password?.message }</p>}
          </div>

          <input
            className="btn btn-accent w-full my-4"
            type="submit"
            value="Sign Up"
          />
           {signUpError && <p className='text-red-600'>{signUpError}</p>}
        </form>
        <p>
          Already have an account{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default SignUp;
