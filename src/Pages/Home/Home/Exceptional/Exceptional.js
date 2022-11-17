import React from 'react';
import treatment from '../../../../assets/images/treatment.png'

const Exceptional = () => {
    return (
        <div className="flex justify-evenly gap-20 my-36 card lg:card-side align-middle  ">
            <figure className='w-1/2  rounded-none'>
                <img className='md:h-[500px] md:w-full' src={treatment} alt="Album" />
            </figure>
  <div className="card-body w-1/2 h-full my-auto">
    <h2 className="card-title text-5xl font-bold">Exceptional Dental <br />Care, on Your Terms</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
    <div className="card-actions justify-start">
      <button className="btn  bg-gradient-to-r from-secondary to-primary btn-primary text-white">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default Exceptional;