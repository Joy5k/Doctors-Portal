import React, { useContext } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const DisplayError = () => {
    const {logOut}=useContext(AuthContext)
    const error = useRouteError();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut()
          .then(() => { navigate('/login')})
          .catch(error=>console.log(error))
    }
    
// Below This function work properly as. But If You use below the if else function then You can't use see div data in the return funct

    // if (isRouteErrorResponse(error)) {
    //     if (error.status === 404) {
    //          <div className='text-6xl font-bold 
    //         text-center
    //         text-gray-300 items-center
    //          justify-center align-middle
    //         '
                
    //         >
    //             <h3>{error.status }</h3>
    //             <p>This page doesn't exist!</p>
    //         </div>;
    //     }
    
    //     if (error.status === 401) {
    //        <div className='text-6xl font-bold 
    //       text-center
    //       text-gray-300 items-center
    //        justify-center align-middle
    //       '
    //       ><p>You aren't authorized to see this</p>
    //       Please <button onClick={handleLogOut} to='/login'>Sign out</button > and sign Back In
    //       </div>;
    //     }
    
    //     if (error.status === 503) {
    //        <div>Looks like our API is down</div>;
    //     }
    //   }
    
      <div>Something went wrong</div>;
    
    return (
        <div className='font-bold text-gray-300 mt-44 text-center '>
            <h2 className='mb-4 text-5xl  '>Something went wrong</h2>
            <p className='text-gray-300 text-5xl  '>{error.statusText || error.message}</p>
            <p className='text-gray-300 text-5xl '>{error.status }</p>
           <p className='text-3xl my-8'> Please <button className='btn btn-accent' onClick={handleLogOut} to='/login'>Sign out</button > and sign Back In</p>
        </div>
    );
};

export default DisplayError;