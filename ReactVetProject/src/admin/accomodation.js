import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/accomodation.css";
import Notification from"./components/notification"

import {
  getUserDataFromFirebase,
  saveUserRoomToFirebase,
  getRoomDataToFromFirebase,
  getAccomodationDataToFromFirebase,
  auth,
  saveAccommodationToFirebase,
} from "../Firebase.js";

function Accomodation() {
  const [userData, setUserData] = useState([]);
  const [accomodationData, setAccomodationData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  // Burda room oluşturmak için öncelikle usestate ile array olarak alıyoruz.
  const [room, setRoom] = useState('');
  const [roomData, setRoomData] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [accommodationNote, setAccommodationNote] = useState("");
  const [accomodationPatient, setAccomodationPatient] = useState('');
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserDataFromFirebase();
      if (data) {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRoomData = async () => {
      const data = await getRoomDataToFromFirebase();
      if (data) {
        setRoomData(data);
      }
    };

    fetchRoomData();
  }, []);

  useEffect(() => {
    const fetchAccomodationData = async () => {
      const data = await getAccomodationDataToFromFirebase();
      if (data) {
        setAccomodationData(data);
      }
    };

    fetchAccomodationData();
  }, []);

  const handleNewAccomodation = () => {
    setShowModal(true);
  };

  const handleNewRoom = () => {
    setShowRoomModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const closeRoomModal = () => {
    setShowRoomModal(false);
  };

  const handleRoomInputChange = (event) => {
    setRoom(event.target.value);
  };
  const handleCheckInChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleAccommodationNoteChange = (event) => {
    setAccommodationNote(event.target.value);
  };

  const handleAccomodationPatient = (event) => {
    setAccomodationPatient(event.target.value);
  };
  const handleDetails = (data) => {
    setSelectedData(data);
  };
  const closeDetails = () => {
    setSelectedData(null);
  };

  const handleSaveAccomodation = async (event) => {
    event.preventDefault();
  
    // Zorunlu alanları kontrol et
    if (!accomodationPatient || !room || !checkInDate || !checkOutDate) {
      console.log("Lütfen zorunlu alanları doldurun!");
      alert("Lütfen hasta adı, oda seçimi, giriş ve çıkış tarihlerini seçiniz!")
      return;
    }
  
    const accommodationData = {
      patientName: accomodationPatient,
      roomName: room,
      checkInDate,
      checkOutDate,
      accommodationNote,
    };
  
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      await saveAccommodationToFirebase(accommodationData, userId);
      setShowModal(false);
  
      // Yeni konaklama verisini ekleyerek mevcut veri listesini güncelle
      setAccomodationData((prevData) => [...prevData, accommodationData]);
    } else {
      console.log("Konaklama kaydedilemedi!");
    }
  };
  

  const handleSaveRoom = async (event) => {
    event.preventDefault(); // Oda bilgisini kaydetme işlemini burada yapabilirsiniz
    // Mevcut oturumdaki kullanıcının ID'sini alarak o kullanıcıya ait bir oda oluşturabilirsiniz
    const roomData = {
      roomName: room, // Oda adını roomName alanına ekleyin
    };
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      await saveUserRoomToFirebase(roomData, userId);
      setShowRoomModal(false);
    } else {
      console.log("Oda oluşturulamadı!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col-md-8 col-lg-9">
          
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  {selectedData && (
                    <div className="modal-overlay">
                      <div className="modal-container">
                        <div className="modal-header">
                          <button
                            className="modal-close "
                            onClick={closeDetails}
                            style={{ marginLeft: "auto" }} // Bu stil düzenlemesi "X" butonunu en sağa taşır

                          >
                            X
                          </button>
                        </div>

                        <div className="modal-content">
                          <p>
                            Konaklama Notları: {selectedData.accommodationNote}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="button-box d-flex justify-content-start">
                    <button
                      className="ten btn-lg"
                      onClick={handleNewAccomodation}
                    >
                      Yeni Konaklama Oluştur
                    </button>
                    <button className="eleven btn-lg" onClick={handleNewRoom}>
                      Yeni Oda Oluştur
                    </button>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th className="col-lg-1">Sıra</th>
                        <th>Hasta Adı</th>
                        <th>Oda Adı</th>
                        <th>Giriş Tarihi</th>
                        <th>Çıkış Tarihi</th>
                        <th className="col-lg-2">Konaklama Notları</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accomodationData.map((data, index) => (
                        <tr key={data.accomodationId} className="table-row">
                          <td>{index + 1}</td>
                          <td>{data.patientName}</td>
                          <td>{data.roomName}</td>
                          <td>{data.checkInDate}</td>
                          <td>{data.checkOutDate}</td>
                          <td>
                            <button
                              className="eight btn-lg"
                              onClick={() => handleDetails(data)}
                            >
                              Detaylar
                            </button>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-container"
            style={{ width: "800px", height: "570px" }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Konaklama Kaydet</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                <select
                  className="form-control"
                  onChange={handleAccomodationPatient}
                  value={accomodationPatient}
                >
                  <option value="" disabled selected>
                    Hasta adı seçiniz
                  </option>
                  {userData.map((data) => (
                    <option key={data.id}>{data.patientName}</option>
                  ))}
                </select>
                <select
                  className="form-control"
                  value={room}
                  onChange={handleRoomInputChange}
                >
                  <option value=""disabled selected>
                    Oda seçiniz
                  </option>
                  {roomData.map((data) => (
                    <option key={data.roomId}>{data.roomName}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Giriş Tarihi"
                  onChange={handleCheckInChange}
                  value={checkInDate}
                />
                <input
                  type="date"
                  className="form-control"
                  placeholder="Çıkış Tarihi"
                  onChange={handleCheckOutChange}
                  value={checkOutDate}
                />
                <textarea
                  className="form-control"
                  placeholder="Konaklama Notu"
                  rows="4"
                  cols="50"
                  value={accommodationNote}
                  onChange={handleAccommodationNoteChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="close-btn" onClick={closeModal}>
                Kapat
              </button>
              <button
                type="button"
                className="save-btn"
                onClick={handleSaveAccomodation}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {showRoomModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h5 className="modal-title">Oda Oluştur</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeRoomModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Oda Adı"
                  onInput={handleRoomInputChange}
                  value={room}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="close-btn"
                onClick={closeRoomModal}
              >
                Kapat
              </button>
              <button
                type="button"
                className="save-btn"
                onClick={handleSaveRoom}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accomodation;
