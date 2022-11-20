import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise,'this is PK');
const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { treatment, price, appointmentDate, slot } = booking;
    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
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