import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { getAppointmentDataFromFirebase } from '../Firebase.js';
import './styles/home.css';
import Notification from './components/notification.js'; 

function Homepage() {
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const data = await getAppointmentDataFromFirebase();
        setAppointmentData(data);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    };

    fetchAppointmentData();
  }, []);

  useEffect(() => {
    const checkAppointmentTime = () => {
      const currentDate = new Date();

      setAppointmentData((prevData) => {
        return prevData.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const appointmentTime = new Date(appointment.date + 'T' + appointment.time);

          if (appointmentTime > currentDate) {
            return true;
          } else {
            // Perform any necessary cleanup or trigger an action
            // when an appointment is reached or expired.
            // For example, you can call a function to delete the appointment from the database.
            // deleteAppointmentFromFirebase(appointment.id);
            return false;
          }
        });
      });
    };

    const interval = setInterval(checkAppointmentTime, 1000 * 60); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        {appointmentData.map((data, index) => (
          <div className="appointment-box" key={index}>
            <br></br>
            <h3>Yaklaşan Randevu</h3>
            <br></br>
            <p>Tarih: {data.date}</p>
            <p>Saat: {data.time}</p>
            <p>Ad: {data.name}</p>
            <p>Telefon: {data.phone}</p>
            <p>Randevu Türü: {data.type}</p>
          </div>
        ))}
        <Notification />
      </div>
    </div>
  );
}

export default Homepage;
