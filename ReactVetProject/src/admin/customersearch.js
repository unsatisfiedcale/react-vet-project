import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Notification from"./components/notification"
import {
  getUserDataFromFirebase,
  deleteUserDataFromFirebase,
} from "../Firebase.js";
import "./styles/customersearch.css";
import swal from "sweetalert";

function Customersearch() {
  const [userData, setUserData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserDataFromFirebase();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const handleDelete = async (idd, index) => {
    try {
      const confirmResult = await swal({
        title: 'Silme İşlemi Onayı',
        text: 'Veriyi silmek istediğinize emin misiniz?',
        icon: 'warning',
        buttons: {
          cancel: 'Hayır',
          confirm: 'Evet',
        },
        closeOnClickOutside: false,
      });
  
      if (confirmResult) {
        await deleteUserDataFromFirebase(idd);
  
        setUserData((prevData) => {
          const updatedData = [...prevData];
          updatedData.splice(index, 1);
          return updatedData;
        });
  
        console.log('Veri başarıyla silindi!');
        swal({
          title: 'Başarılı',
          text: 'Veri başarıyla silindi!',
          icon: 'success',
          button: 'Tamam',
        });
      } else {
        console.log('Silme işlemi iptal edildi.');
      }
    } catch (error) {
      console.error('Veri silme hatası:', error);
  
      swal({
        title: 'Hata',
        text: 'Veri silme hatası!',
        icon: 'error',
        button: 'Tamam',
      });
    }
  };
  
  
  const handleDetails = (data) => {
    setSelectedData(data);
  };

  const closeDetails = () => {
    setSelectedData(null);
  };

  return (
    <div className="customersearch">
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                        
                      <div className="card-body">
                        <div className="row">
                          
                          <div className="col-lg-6">
                            <div className="form-group">
                              {selectedData && (
                                <div className="modal-overlay">
                                  <div className="modal-container">
                                    <div className="modal-header">
                                      <button
                                        className="modal-close"
                                        onClick={closeDetails}
                                      >
                                        X
                                      </button>
                                    </div>

                                    <div className="modal-content">
                                      <p>
                                        Müşteri Adı: {selectedData.customerName}
                                      </p>
                                      <p>
                                        Müşteri Soyadı:{" "}
                                        {selectedData.customerSurname}
                                      </p>
                                      <p>
                                        Telefon Numarası:{" "}
                                        {selectedData.phoneNumber}
                                      </p>
                                      <p>Vergi Dairesi: {selectedData.tax}</p>
                                      <p>
                                        Kimlik Numarası: {selectedData.identity}
                                      </p>
                                      <p>İl: {selectedData.city}</p>
                                      <p>İlçe: {selectedData.district} </p>
                                      <p>Not: {selectedData.note}</p>
                                      <p>Adres: {selectedData.address}</p>
                                      <p>
                                        Hasta Adı : {selectedData.patientName}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th className="col-lg-1">Sıra</th>
                        <th>Müşteri Adı</th>
                        <th>Müşteri Soyadı</th>
                        <th>Hasta Adı</th>
                        <th>Telefon Numarası</th>
                        <th className="col-lg-2">İşlem Detayları</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((data, index) => (
                        <tr key={index} className="table-row">
                          <td>{index + 1}</td>
                          <td>{data.customerName}</td>
                          <td>{data.customerSurname}</td>
                          <td>{data.patientName}</td>
                          <td>{data.phoneNumber}</td>
                          
                          <td>
                            <button
                              className="nine btn-lg"
                              onClick={() => handleDelete(data.id, index)}
                            >
                              Sil
                            </button>{" "}
                            <button
                              className="eight btn-lg"
                              onClick={() => handleDetails(data)}
                            >
                              Detay
                            </button>
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
    </div>
    </div>
  );
}

export default Customersearch;