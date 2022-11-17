import React from 'react';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import appoinment from '../../../assets/images/appointment.png'


const ContactFomr = () => {
    return (
        <div className="hero min-h-screen  "
            style={{
            background:`url(${appoinment})`
        }}>
        <div className="hero-content w-full lg:w-6/12">
                <div className="card flex-shrink-0 w-full   ">
                    <p className='text-primary text-center font-bold text-xl'>Contact Us</p>
           <h3 className='text-4xl font-semibold text-center text-white'>Stay connected with us</h3>
                    <div className="card-body w-full">
              <div className="form-control">
               <input type="email" name='email' placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                
                <input  type="text" placeholder="Subject" className="input input-bordered my-4" />
               <textarea className='rounded-lg p-4' name="message" id="" cols="30" rows="5"  placeholder='Your message'></textarea>
              </div>
              <div className="form-control w-28 mx-auto mt-6">
               <PrimaryButton>Submit</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ContactFomr;