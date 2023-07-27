import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { getUserDataFromFirebase } from "../Firebase.js";

function Medicalhistory() {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [userData, setUserData] = useState([]);
  const [pattientName, setPatientName] = useState([]);

  const handleMedicalHistoryInputChange = (event) => {
    setMedicalHistory(event.target.value);
  };

  const handleUserDataInputChange = (event) => {
    setUserData(event.target.value);
  };
  const handlePatientInputChange = (event) => {
    setPatientName(event.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserDataFromFirebase();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="form-group">
              <textarea
                autoComplete="off"
                className="form-control"
                maxLength={1000}
                numbersOnly
                placeholder="Hasta Tıbbi Geçmişini Yazınız"
                value={medicalHistory}
                onInput={handleMedicalHistoryInputChange}
                rows="1"
                type="text"
                style={{ resize: "vertical" }}
              ></textarea>
            </div>
            <select
              className="form-control form-control-sm" // Added 'form-control-sm' class for smaller size
              value={pattientName}
              onChange={handlePatientInputChange}
            >
              <option value="">Seçiniz</option>
              <option value="">Aşı Seçiniz</option>
              {userData.map((data) => (
                <option key={data.id} value={data.pattientName}>
                  {data.pattientName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medicalhistory;
