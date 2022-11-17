import React from 'react';

const AppointmentOption = ({appointmentOption,setTreatment}) => {
    const {name,slots}=appointmentOption
    return (
        <div className="card bg-base-100 shadow-xl text-center">
        <div className="card-body text-center ">
                <h2 className="text-2xl font-bold text-center text-secondary ">{name }</h2> 
                <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p>{slots.length } {slots.length>1 ? 'spaces':'space' } available</p>
                <div className="card-actions justify-center">
                    
                    <label htmlFor="booking-modal" className="btn bg-gradient-to-r from-secondary to-primary btn-primary text-white"
                        disabled={slots.length===0}
                    onClick={()=>setTreatment(appointmentOption)}
                    >Book Appointment</label>

          </div>
        </div>
      </div>
    );
};

export default AppointmentOption;