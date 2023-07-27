import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Rdp = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="form-group">
      <label>Doğum Tarihi</label>
      <div className="select-wrapper">

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="form-control"
        placeholderText="Tarih Seçiniz"
      />
    </div>
    </div>
  );
};

export default Rdp;
