import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns/esm';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import AppointmentOption from './AppointmentOption';
import BookingModal from './BookingModal/BookingModal';

const AvailableAppoinment = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null)
    const date=format(selectedDate,'PP')
    const { data:appointmentOptions=[],refetch,isLoading} = useQuery({
        queryKey: ['appointmentOptions',date],
        queryFn: () => fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
        .then(res=>res.json())
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section className='my-16'>
            <p className='text-secondary font-bold text-center'>Available Appointments on {format(selectedDate,"PP") }</p>
            <div className=' grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-6'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
         { treatment &&  <BookingModal
                treatment={treatment}
                selectedDate={selectedDate}
                setTreatment={setTreatment}
                refetch={refetch}
            ></BookingModal>}
        </section>
    );
};

export default AvailableAppoinment;