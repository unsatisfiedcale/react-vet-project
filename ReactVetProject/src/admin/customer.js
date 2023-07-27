import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/customer.css";
import Rdp from "./components/rdp";
import Notification from"./components/notification"
import {
  saveUserDataToFirebase,
  getVaccineDataToFromFirebase,
  auth,
  updateDataToFirebase, updateWarehouseDataToFirebase,
  firestore,
} from "../Firebase.js";
import { uid } from "uid";

function Customer() {
  useEffect(() => {
    const fetchVaccineData = async () => {
      const vaccineData = await getVaccineDataToFromFirebase();
      setVaccineData(vaccineData);
    };

    fetchVaccineData();
  }, []);

  // Customer Information
  const [vaccineData, setVaccineData] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerSurname, setCustomerSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondPhoneNumber, setSecondPhoneNumber] = useState("");
  const [tax, setTax] = useState("");
  const [identity, setIdentity] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");

  // Patient Information
  const [patientName, setPatientName] = useState("");
  const [color, setColor] = useState("");
  const [chipNumber, setChipNumber] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [specialCase, setSpecialCase] = useState("");

  // Customer Registration
  const handleNameInputChange = (event) => {
    setCustomerName(
      (event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ""))
    );
  };
  const handleSurnameInputChange = (event) => {
    setCustomerSurname(
      (event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ""))
    );
  };

  const handlePhoneInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    setPhoneNumber(value);
  };

  const handleSecondPhoneInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    setSecondPhoneNumber(value);
  };

  const handleTaxInputChange = (event) => {
    setTax(event.target.value);
  };

  const handleIdentityInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    setIdentity(value);
  };

  const handleCityInputChange = (event) => {
    setCity(
      (event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ""))
    );
  };

  const handleDistrictInputChange = (event) => {
    setDistrict(
      (event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ""))
    );
  };

  const handleNoteInputChange = (event) => {
    setNote(event.target.value);
  };

  const handleVaccineInputChange = (event) => {
    setSelectedVaccine(event.target.value);
  };

  const handleAddressInputChange = (event) => {
    setAddress(event.target.value);
  };

  // Patient Registration

  const handlePatientNameInputChange = (event) => {
    setPatientName(
      (event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ""))
    );
  };

  const handleColorInputChange = (event) => {
    setColor(
      (event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ""))
    );
  };

  const handleChipNumberInputChange = (event) => {
    setChipNumber(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSpecialCaseInputChange = (event) => {
    setSpecialCase(event.target.value);
  };

  // RDP den çağırıldı!
  const handleDateChange = (date) => {
    console.log(date);
  };

  const handleSaveButtonClick = async (event) => {
    event.preventDefault();

    if (customerName === "") {
      alert("Lütfen müşteri adı giriniz");
      return;
    }

    if (patientName === "") {
      alert("Lütfen hasta adı alanını giriniz!");
      return;
    }

    const userData = {
      customerName,
      selectedVaccine,
      customerSurname,
      phoneNumber,
      secondPhoneNumber,
      tax,
      identity,
      city,
      district,
      note,
      address,
      patientName,
      color,
      chipNumber,
      gender,
      type,
      specialCase,
      id: uid(),
    };

    // Kullanıcı oturum açmış olmalıdır, bu nedenle oturum açan kullanıcının bilgilerine erişmek için currentUser nesnesini kullanabiliriz
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      await saveUserDataToFirebase(userData, userId);

      const selectedVaccineData = vaccineData.find(
        (vaccine) => vaccine.vaccineName === selectedVaccine
      );
      console.log("selectedVaccineData:", selectedVaccineData);
      console.log("vaccineData:", vaccineData);
      if (selectedVaccineData) {
        await updateDataToFirebase(selectedVaccineData, userId, firestore); // Kullanıcının aşı sayısını aşı belgesinde güncelleme
        await updateWarehouseDataToFirebase(selectedVaccineData, userId, firestore); // Kullanıcının aşı sayısını güncelleme

        console.log(userData);
      } else {
        console.log("Seçilen aşı bulunamadı!");
      }
    } else {
      console.log("Kullanıcı oturum açmamış");
      // Kullanıcı oturum açmamışsa veya oturum açmış kullanıcı bilgisi alınamamışsa bir hata mesajı görüntüleyebilirsiniz
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header window-border">Customer Information</div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Hasta Sahibi Adı</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={50}
                      placeholder="Hasta Sahibi Adı Giriniz"
                      type="text"
                      uppercase
                      value={customerName}
                      onInput={handleNameInputChange}
                      required
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>Telefon Numarası</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={12}
                      numbersonly
                      placeholder="Telefon Numarası Giriniz"
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>Vergi Dairesi</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      numbersonly
                      placeholder="Vergi Dairesini Giriniz"
                      type="tel"
                      uppercase
                      value={tax}
                      onChange={handleTaxInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>İl</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={30}
                      numbersonly
                      placeholder="İl Bilgisi Giriniz"
                      type="text"
                      uppercase
                      value={city}
                      onInput={handleCityInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>Not</label>
                    <textarea
                      autocomplete="off"
                      className="form-control"
                      maxLength={300}
                      numbersonly
                      placeholder="Varsa Notunuzu Yazınız"
                      rows="1"
                      type="text"
                      value={note}
                      onInput={handleNoteInputChange}
                      uppercase
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Hasta Sahibi Soyadı</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={50}
                      placeholder="Hasta Sahibi Soyadı Giriniz"
                      type="text"
                      uppercase
                      value={customerSurname}
                      onInput={handleSurnameInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>2. Telefon Numarası</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={12}
                      numbersonly
                      placeholder="Varsa 2. Telefon Numarası Giriniz"
                      type="tel"
                      value={secondPhoneNumber}
                      onChange={handleSecondPhoneInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>Tc Kimlik Numarası</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      mask="00000000000"
                      maxLength={11}
                      numbersonly
                      placeholder="Tc Kimlik Numarası Giriniz"
                      type="tel"
                      uppercase
                      value={identity}
                      onInput={handleIdentityInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>İlçe</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={30}
                      numbersonly
                      placeholder="İlçe Bilgisi Giriniz"
                      type="text"
                      uppercase
                      value={district}
                      onInput={handleDistrictInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>Adres</label>
                    <textarea
                      autocomplete="off"
                      className="form-control"
                      maxLength={200}
                      numbersonly
                      placeholder="Adresi Giriniz"
                      rows="1"
                      type="text"
                      uppercase
                      value={address}
                      onInput={handleAddressInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header window-border">Hasta Bilgileri</div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Hasta Adı</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={50}
                      placeholder="Hasta Adı Giriniz"
                      type="text"
                      uppercase
                      value={patientName}
                      onInput={handlePatientNameInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>Çip Numarası</label>
                    <input
                      autocomplete="off"
                      className="form-control"
                      maxLength={15}
                      numbersonly
                      placeholder="Çip Numarası Giriniz"
                      type="tel"
                      value={chipNumber}
                      onInput={handleChipNumberInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <Rdp onDateChange={handleDateChange} />
                  </div>

                  <div className="form-group">
                    <label>Aşı Seçimi</label>
                    <select
                      className="form-control"
                      value={selectedVaccine}
                      onChange={handleVaccineInputChange}
                    >
                      <option value="">Aşı Seçiniz</option>
                      {vaccineData.map((vaccine) => (
                        <option key={vaccine.id} value={vaccine.vaccineName}>
                          {vaccine.vaccineName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Rengi</label>
                    <input
                      className="form-control"
                      placeholder="Rengini Giriniz"
                      type="text"
                      value={color}
                      onInput={handleColorInputChange}
                    ></input>
                  </div>

                  <div className="form-group">
                    <label>Cinsiyet</label>
                    <select
                      className="form-control"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="erkek">Erkek</option>
                      <option value="dişi">Dişi</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Tür</label>
                    <div className="select-wrapper">
                      <select
                        className="form-control"
                        placeholder="Tür Seçiniz"
                        value={type}
                        onChange={handleTypeChange}
                      >
                        <option value="8">Büyükbaş</option>
                        <option value="8">Küçükbaş</option>
                        <option value="7">Kanatlı</option>
                        <option value="4">Kedi</option>
                        <option value="5">Köpek</option>
                        <option value="7">Egzotik</option>
                        <option value="8">Tropikal</option>
                        <option value="6">Yabani</option>
                        <option value="5">Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Hastanın Özel Durumu</label>
                    <textarea
                      autocomplete="off"
                      className="form-control"
                      maxLength={500}
                      numbersonly
                      placeholder="Hastanın Özel Durumu Varsa Giriniz"
                      rows="1"
                      type="text"
                      uppercase
                      value={specialCase}
                      onInput={handleSpecialCaseInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="button-box d-flex justify-content-center">
                <button
                  className="seven btn-lg"
                  onClick={handleSaveButtonClick}
                >
                  Kaydet
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
