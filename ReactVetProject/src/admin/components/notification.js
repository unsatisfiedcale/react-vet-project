import React, { useState, useEffect } from 'react';
import '../styles/notification.css';
import {
  getAppointmentDataFromFirebase,
} from "../../Firebase.js";
import { Link } from 'react-router-dom';



function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    checkAppointmentMatch();
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = () => {
    if (hasNewNotification) {
      setHasNewNotification(false);
    }
  };

  const checkAppointmentMatch = async () => {
    const appointments = await getAppointmentDataFromFirebase();
    if (!appointments) {
      console.log("Randevu bilgileri alınamadı.");
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let matchedAppointmentCount = 0;
    let isNewNotification = false;

    appointments.forEach((appointment) => {
      const { date, time } = appointment;
      const appointmentDate = new Date(date);
      const appointmentYear = appointmentDate.getFullYear();
      const appointmentMonth = appointmentDate.getMonth() + 1;
      const appointmentDay = appointmentDate.getDate();
      const appointmentHour = parseInt(time.split(":")[0]);
      const appointmentMinute = parseInt(time.split(":")[1]);

      if (
        currentYear === appointmentYear &&
        currentMonth === appointmentMonth &&
        currentDay === appointmentDay &&
        currentHour === appointmentHour &&
        currentMinute === appointmentMinute
      ) {
        matchedAppointmentCount++;
        isNewNotification = true;
      }
    });

    setAppointmentCount(matchedAppointmentCount);
    setHasNewNotification(isNewNotification);
  };

  return (
    <div className={`dropdown ${isOpen ? 'show' : ''}`}>
      <a
        className="me-3 dropdown-toggle hidden-arrow"
        href="#/"
        id="navbarDropdownMenuLink"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={handleMenuToggle}
      >
        <i className={`fas fa-bell  ${isOpen ? 'active' : ''}`} style={{ marginRight: '5px' }}></i>
        <span className="badge rounded-pill badge-notification bg-danger">{appointmentCount}</span>
      </a>
      <div className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownMenuLink" style={{ marginTop: '-10px' }}>
        <div className="dropdown-menu-inner">
          {hasNewNotification && (
            <Link to="/admin/homepage" className="dropdown-item"  onClick={handleNotificationClick}>
              Yaklaşan Randevunuz Bulunmaktadır!
            </Link>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Notification;
