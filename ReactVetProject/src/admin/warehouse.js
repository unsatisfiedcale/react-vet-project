import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Notification from"./components/notification"
import "./styles/warehouse.css";
import {
  saveVaccineToFirebase,
  getVaccineDataToFromFirebase, 
  saveWarehouseToFirebase,
  getWarehouseDataToFromFirebase,
  saveWarehouseCreateToFirebase,
  getWarehouseCreateDataToFromFirebase,
  auth,
} from "../Firebase";
function Warehouse() {
  const [wareHouseData, setWareHouseData] = useState([]);
  const [warehouseCreate, setWarehouseCreate] = useState("");
  const [warehouseCreateData, setWarehouseCreateData] = useState("");
  const [vaccineData, setVaccineData] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineNumber, setVaccineNumber] = useState(""); 
  const [checkInDate, setCheckInDate] = useState("");
  const [prescription, setPrescription] = useState("");
  const [showWarehouseCreateModal, setShowWarehouseCreateModal] = useState(false);
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [showModal, setShowModal] = useState(false); // Warehouse modal'ı olarak seçtim!
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchVaccineData = async () => {
      const data = await getVaccineDataToFromFirebase();
      if (data) {
        setVaccineData(data);
      }
    };
  
    fetchVaccineData();
  }, []);
  
  


  useEffect(() => {
    const fetchWarehouseData = async () => {
      const data = await getWarehouseDataToFromFirebase();
      if (data) {
        setWareHouseData(data);
      }
    };
    fetchWarehouseData();
  }, []);

  useEffect(() => {
    const fetchWarehouseCreate = async () => {
      const data = await getWarehouseCreateDataToFromFirebase();
      if (data) {
        setWarehouseCreateData(data);
      }
    };

    fetchWarehouseCreate();
  }, []);
  
  const closeModal = () => {
    setShowModal(false);
  };
  const closeVaccineModal = () => {
    setShowVaccineModal(false);
  };
  const closeWarehouseCreateModal = () => {
    setShowWarehouseCreateModal(false);
  };
  const handleNewWarehouse = () => {
    setShowModal(true);
  };

  const handleNewWarehouseCreateName = () => {
    setShowWarehouseCreateModal(true);
  }

  const handleNewVaccine = () => {
    setShowVaccineModal(true);
  };
  const handleDetails = (data) => {
    setSelectedData(data);
  };
  const closeDetails = () => {
    setSelectedData(null);
  };
  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.value);
  };
  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };
  const handleWarehouseNameChange = (event) => {
    setWarehouseCreate(event.target.value);
  }
  const handleVaccineInputChange = (event) => {
    const selectedVaccineName = event.target.value;
    setVaccineName(selectedVaccineName);
  
    // Aşı adına göre aşı numarasını bul ve setVaccineNumber ile güncelle
    const selectedVaccine = vaccineData.find((vaccine) => vaccine.vaccineName === selectedVaccineName);
    if (selectedVaccine) {
      setVaccineNumber(selectedVaccine.vaccineNumber);
    } else {
      setVaccineNumber("");
    }
  };
  
  const handleVaccineNumberInputChange = (event) => {
    const inputValue = event.target.value;
    if(inputValue) {
        setVaccineNumber(inputValue);
    }
  };

  

  const handleSaveVaccine = async (event) => {
    event.preventDefault();
  
    if (!vaccineName || !vaccineNumber) {
      console.log("Lütfen zorunlu alanları doldurun!");
      
      return;
    }
  
    const vaccineData = {
      vaccineName,
      vaccineNumber,
    };
    
  
    
  
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      await saveVaccineToFirebase(vaccineData, userId);
      setShowVaccineModal(false);
    } else {
      console.log("Aşı oluşturulamadı!");
    }
  };
  

  const handleSaveWarehouse = async (event) => {
    event.preventDefault();
  
    if (!vaccineName || !checkInDate) {
      console.log("Lütfen zorunlu alanları doldurun!");
      alert("Lütfen aşı adı ve ürün kaydı için giriş tarihini seçiniz!");
      return;
    }
  
    const wareHouseData = {
      vaccineName,
      vaccineNumber,
      checkInDate,
      prescription,
      warehouseCreate,
    };
  
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      await saveWarehouseToFirebase(wareHouseData, userId);
      setShowModal(false);
  
      // Yeni depo verisini ekleyerek mevcut veri listesini güncelledik!
      setWareHouseData((prevData) => [...prevData, wareHouseData]);
  
      // Ürün sayısını güncellemek için veritabanından tüm aşı verilerini tekrar çekiyoruz
      const updatedVaccineData = await getVaccineDataToFromFirebase();
      if (updatedVaccineData) {
        setVaccineData(updatedVaccineData);
      } else {
        setVaccineData([]);
      }
    } else {
      console.log("Depo kaydedilemedi!");
    }
  };

  const handleSaveWarehouseCreate = async (event) => {
    event.preventDefault();
    const warehouseCreateData = {
      warehouseCreate, // Depo adı oluşturduk.
    };
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      await saveWarehouseCreateToFirebase(warehouseCreateData, userId);
      setShowWarehouseCreateModal(false);
    } else {
      console.log("Depo oluşturulamadı!");
    }
  };

  return (
    <div className="container-fluid">
        
      <div className="row flex-nowrap">
        <Sidebar />
        
        <div className="col-md-8 col-lg-9">
        <Notification />
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
                          style={{ marginLeft: "auto" }} // Bu stil düzenlemesi ile x butonunu en sağa taşıdım!

                        >
                          X
                        </button>
                      </div>

                      <div className="modal-content">
                        <p>
                          Reçete Bilgileri: {selectedData.prescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                  <div className="button-box d-flex justify-content-start">
                    <button className="twelwe btn-lg" onClick={handleNewWarehouse}  >Depo-Aşı/Ürün Entegrasyonu
</button>
                    <button className="thirteen btn-lg" onClick={handleNewVaccine} >Aşı/Ürün Oluştur
</button>
                    <button className="fourteen btn-lg" onClick={handleNewWarehouseCreateName} >Depo Oluştur
</button>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th className="col-lg-1">Sıra</th>
                        <th>Depo Adı</th>
                        <th>Aşı / Ürün </th>
                        <th>Aşı Sayısı</th>
                        <th>Kayıt Tarihi</th>
                        <th className="col-lg-2">Reçete Bilgileri
</th>
                      </tr>
                    </thead>
                    <tbody>
                    {wareHouseData.map((data, index) => (
  <tr key={data.wareHouseId} className="table-row">
    <td>{index + 1}</td>
    <td>{data.warehouseCreate}</td>
    <td>{data.vaccineName}</td>
    <td>{data.vaccineNumber}</td>
    <td>{data.checkInDate}</td>
    <td>
      <button className="eight btn-lg" onClick={() => handleDetails(data)}>
        Detaylar
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
      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-container"
            style={{ width: "800px", height: "570px" }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Depo Kaydı</h5>
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
                  value={warehouseCreate}
                  onChange={handleWarehouseNameChange}
                >
                  <option value="" disabled selected>
                    Depo seçiniz
                  </option>
                  {warehouseCreateData.map((data) => (
                    <option key={data.wareHouseId}>{data.warehouseCreate}</option>
                  ))}
                </select>
                <select
                  className="form-control"
                  value={vaccineName} 
                  onChange={handleVaccineInputChange}
                >
                  <option value="" disabled selected>
                    Aşı/Ürün Seçiniz
                  </option>
                  {vaccineData.map((data) => (
                    <option key={data.vaccineId}>{data.vaccineName} </option>
                    
                  ))}
                </select>
                
                <input
                  type="date"
                  className="form-control"
                  placeholder="Giriş Tarihi"
                  onChange={handleCheckInDateChange}
                  value={checkInDate}
                />
                <textarea
                  className="form-control"
                  placeholder="Reçete bilgisi"
                  rows="4"
                  cols="50"
                  value={prescription}
                  onChange={handlePrescriptionChange}
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
                onClick={handleSaveWarehouse}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {showVaccineModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h5 className="modal-title">Aşı Oluştur</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeVaccineModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Aşı / Ürün Adı"
                  onInput={handleVaccineInputChange}
                  value={vaccineName}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Aşı / Ürün Sayısı"
                  onInput={handleVaccineNumberInputChange}
                  value={vaccineNumber}
                  
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="close-btn"
                onClick={closeVaccineModal}
              >
                Kapat
              </button>
              <button
                type="button"
                className="save-btn"
                onClick={handleSaveVaccine}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
      {showWarehouseCreateModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h5 className="modal-title">Depo Oluştur</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeWarehouseCreateModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Depo Adı"
                  onInput={handleWarehouseNameChange}
                  value={warehouseCreate}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="close-btn"
                onClick={closeWarehouseCreateModal}
              >
                Kapat
              </button>
              <button
                type="button"
                className="save-btn"
                onClick={handleSaveWarehouseCreate}
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

export default Warehouse;
