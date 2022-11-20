import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
    const { register, handleSubmit, formState: { errors },getValues } = useForm();
    const [loginError, setLoginError] = useState();
  const { signIn,googleSignIn,resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const from=location.state?.from?.pathnam||'/'
  const navigate = useNavigate()
  const [useEmail, setUserEmail] = useState();
  const [loginUserEmail, setLoginUserEmail] = useState('')
  const [token] = useToken(loginUserEmail);
  if (token) {
    console.log('it is Loging page Token check');
    navigate(from,{replace:true})
}

  const handleLogin = data => {
      console.log(data.email,'this');
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user)
        setLoginUserEmail(data.email)
      
      })
      .catch(error => {
        console.log(error)
 setLoginError(error.message)
      })
  }
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
      
        const user = result.user;
        console.log(user, 'google User')
        
        navigate(from,{replace:true})
      })
      .catch(error => {
        console.log(error)
    })
  }
  const handleUserEmail = (email) => {
 setUserEmail(email)
  
  }
  const handleForgetPassword = () => {
    // console.log(data,'this is onsubmit');
    resetPassword(useEmail)
      .then(() => { 
        alert('check your inbox')
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="flex justify-center items-center h-[800px]">
      <div className="w-96 p-7  border shadow-lg rounded-lg">
        <h3 className="text-4xl text-center">Login</h3>
              <form onSubmit={handleSubmit(handleLogin) }>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
              <input onBlurCapture={() => {
          handleUserEmail(getValues("email"));
            }}
              type='email' {...register("email", {
                      required: "Email Address is required"
                    })}
                          className="input input-bordered w-full max-w-xs" />
                       {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
            <label className="label">
              <span  className="label-text">Password</span>
            </label>
                      <input type='password' {...register("password", {
                          required: "Password is required",
                          minLength:{value:6 ,message:'Password should be six characters or longer'},
                          pattern:{value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,message:'Password must have uppercase lowercase and number'}
                      })}
                          className="input input-bordered w-full max-w-xs" />
                      {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
                      <label className="label">
              <button onClick={handleForgetPassword} className="label-text">Forget Password?</button>
           
            </label>
          </div>
          <input className="btn btn-accent w-full"  value='Login' type="submit" />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
       </div>
        </form>
        
              <p className="my-2">New to Doctor Portal <Link to='/signup' className="text-secondary hover:underline">Create New Account</Link></p>
             
        <div className="divider">OR</div>
              <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
