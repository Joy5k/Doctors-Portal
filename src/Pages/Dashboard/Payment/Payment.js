import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise,'this is PK');
const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, appointmentDate, slot } = booking;
   
    return (
        <div>
            <h2 className='text-3xl'>payment for {treatment }</h2>
            <p className='text-xl'>Please pay <strong>${price}</strong> for your appointment {appointmentDate} at {slot }</p>
            <div  className='w-96 my-12'>
            <Elements stripe={stripePromise}>
                    <CheckoutForm
                    booking={booking}
                    />
    </Elements>
       </div>
        </div>
    );
};

export default Payment;