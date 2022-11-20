import { data } from "autoprefixer";
import { format } from "date-fns";
import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../context/AuthProvider";

const BookingModal = ({ treatment,setTreatment, selectedDate,refetch }) => {
  const { name,slots,price } = treatment;
  const date = format(selectedDate, "PP");

  const  {user}=useContext(AuthContext)
    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            email,
            petain: name,
            treatment: treatment.name,
            phone,
          slot,
            price
      }
      fetch('http://localhost:5000/bookings', {
        method:'POST',
        headers: {
          'content-type':'application/json'
        },
        body:JSON.stringify(booking)
      })
      
      .then(res => res.json())
        .then(data => {
          console.log(data)
           if(data.acknowledged){
      setTreatment(null)
      toast.success('Booking confirmed');
      refetch()
          }
           else {
             toast.error(`${data.message}`)
          }
        })
     
    }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-10">
            <input
              type="text"
              disabled
              value={date}
              className="input w-full   input-bordered"
            />
            <select name="slot" className="select select-bordered w-full ">
             
                          {
                              slots.map((slot, i) => <option
                              key={i}
                                  value={slot}>
                                {slot}
                                          </option>)
                          }
            </select>
                      <input
                          name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              className="input w-full input-bordered "
            />
                      <input
                          name="email"
              type="text"
              defaultValue={user?.email}
              disabled
              className="input w-full input-bordered "
            />
                      <input
                          name="phone"
              type="text"
              placeholder="phone"
              className="input w-full input-bordered "
            />
            <br />
            <input className="btn btn-accent" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
