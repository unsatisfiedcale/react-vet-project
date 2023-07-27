import React, { useState } from "react";
import "./styles/appointment.css";
import Sidebar from "./components/Sidebar";
import { auth, saveAppointmentDataToFirebase } from "../Firebase.js";
import Notification from"./components/notification"

function AppointmentForm() {
  const [name, setCustomerName] = useState("");
  const [email, setCustomerEmail] = useState("");
  const [phone, setCustomerPhone] = useState("");
  const [type, setCustomerType] = useState("");
  const [comment, setCustomerComment] = useState("");
  const [date, setCustomerDate] = useState("");
  const [time, setCustomerTime] = useState("");

  const handleNameInputChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setCustomerEmail(event.target.value);
  };

  const handlePhoneInputChange = (event) => {
    setCustomerPhone(event.target.value);
  };

  const handleTypeInputChange = (event) => {
    setCustomerType(event.target.value);
  };

  const handleCommentInputChange = (event) => {
    setCustomerComment(event.target.value);
  };

  const handleDateInputChange = (event) => {
    setCustomerDate(event.target.value);
  };

  const handleTimeInputChange = (event) => {
    setCustomerTime(event.target.value);
  };

  const handleSaveAppointment = async (event) => {
    event.preventDefault();

    if (!name || !phone || !time || !date) {
      console.log("Lütfen zorunlu alanları doldurun!");
      alert(
        "Lütfen hasta adı, oda seçimi, giriş ve çıkış tarihlerini seçiniz!"
      );
      return;
    }

    const appointmentData = {
      name,
      email,
      phone,
      type,
      comment,
      date,
      time,
    };

    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid; // Oturum açmış kullanıcının user id'sini alırız

      await saveAppointmentDataToFirebase(appointmentData, userId);
      console.log(appointmentData);
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
          <Notification />
          <div id="body_header">
            <h1>Randevu Kayıt Formu</h1>
            <p>Randevularınızı Kolaylaştırın!</p>
          </div>
          <form onSubmit={handleSaveAppointment} className="compact-form">
            <fieldset>
              <legend>
                <span className="number">1</span>Temel Ayrıntılar
              </legend>
              <label htmlFor="name">Ad:</label>
              <input
                autoComplete="off"
                className="form-control"
                maxLength={50}
                placeholder="Hasta Sahibi Adı Giriniz"
                type="text"
                value={name}
                onChange={handleNameInputChange}
                required
              />

              <label htmlFor="mail">Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Ex: vetech@gmail.com"
                required
                value={email}
                onChange={handleEmailInputChange}
              />

              <label htmlFor="tel">Telefon Numarası:</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Ülke kodunu dahil ediniz"
                required
                value={phone}
                onChange={handlePhoneInputChange}
              />
            </fieldset>

            <fieldset>
              <legend>
                <span className="number">2</span>Randevu Detayları
              </legend>
              <label htmlFor="appointment_for">Randevu Türü:</label>
              <select
                className="form-control"
                value={type}
                onChange={handleTypeInputChange}
                required
              >
                <option value="KontrolMuayeneRandevu">Kontrol ve Muayene Randevusu</option>
                <option value="AcilDurumRandevu">Acil Durum Randevusu</option>
                <option value="CerrahiRandevu">Cerrahi Randevusu</option>
                <option value="DisTemizligiRandevu">Diş Temizliği Randevusu</option>
                <option value="BeslenmeRandevu">Beslenme ve Diyet Randevusu</option>
                <option value="LaboratuvarRandevu">
                  Laboratuvar ve Görüntüleme Randevusu
                </option>
                <option value="ToplantiRandevu">Toplantı Randevusu</option>
                <option value="DigerRandevu">Diğer</option>
              </select>
              <label htmlFor="appointment_description">
                Randevu Açıklaması:
              </label>
              <textarea
                value={comment}
                onChange={handleCommentInputChange}
                className="form-control"
                placeholder="Randevunuza yönelik açıklamalarınızı girebilirsiniz"
              ></textarea>
              <label htmlFor="date">Tarih:</label>
              <input
                type="date"
                value={date}
                onChange={handleDateInputChange}
                required
              />
              <br />
              <label htmlFor="time">Saat:</label>
              <input
                type="time"
                value={time}
                onChange={handleTimeInputChange}
                required
              />
              <br />
              <label htmlFor="duration">Belirlenen Görüşme Süresi(Dakika)</label>
              <input type="radio" name="duration" value="30" /> 30
              <input type="radio" name="duration" value="60" /> 60
              <input type="radio" name="duration" value="90" /> 90
              <input type="radio" name="duration" value="more" /> Daha Fazla
            </fieldset>

            <button className="appointmentbutton" type="submit">
              Randevu Talebini Kaydet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
