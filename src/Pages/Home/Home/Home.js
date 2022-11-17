import React from 'react';
import ContactFomr from '../ContactForm/ContactFomr';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppoinment from '../MakeAppoinment/MakeAppoinment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';
import Banner from './Banner/Banner';
import Exceptional from './Exceptional/Exceptional';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <Exceptional></Exceptional>
            <MakeAppoinment></MakeAppoinment>
            <Testimonial></Testimonial>
            <ContactFomr></ContactFomr>
        </div>
    );
};

export default Home;   