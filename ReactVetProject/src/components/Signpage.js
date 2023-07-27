import React, {useState} from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Sign.css";
import vetlog from "../images/vetlog.png";
import vetechlogin from "../images/vetechlogin.png";
import { registerUser } from '../Firebase.js';
import userEvent from "@testing-library/user-event";



function Signpage() {
  


  const [phoneNumber, setphoneNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isletmeismi, setIsletmeIsmi] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handlePhoneInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    if(value.length > 11) {
      value = value.slice(0,11);
    }
    setphoneNumber(value);
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ''));
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ''));
  };

  const handleIsletmeIsmiChange = (event) => {
    setIsletmeIsmi(event.target.value = event.target.value.replace(/[^a-zA-Z]/g, ''));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
      const user = {
        ad: name,
        soyad: surname,
        isletmeIsmi: isletmeismi,
        email: email,
        password: password,
        phoneNumber: phoneNumber
      };
  
      await registerUser(user);
      console.log(user);
      localStorage.setItem("email", email);

  }

  

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4">
              <h1 className="h1 fw-bold mb-0"><img src={vetechlogin} alt="logo"/> </h1>
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              
              
              <form onSubmit={handleSubmit} className="signform1">
                <h3 className="fw-normal mb-3 pb-3">Kayıt Formu</h3>

                
                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form2Example18">
                    Ad
                  </label>
                  <input
                    type="ad"
                    id="form2Example18"
                    className="form-control form-control-m"
                    onInput={handleNameChange} 
                  />
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form1Example29">
                  
                    Soyad
                  </label>

                  <input
                    type="soyad"
                    id="form2Example29"
                    className="form-control form-control-m"
                    onInput={handleSurnameChange} 

                  />
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form2Example30">
                    İşletme İsmi
                  </label>

                  <input
                    type="isletmeismi"
                    id="form2Example30"
                    className="form-control form-control-m"
                    onInput = {handleIsletmeIsmiChange}
                  />
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form2Example31">
                    Cep Telefonu
                  </label>

                  <input
                    type="telefon"
                    id="form2Example31"
                    className="form-control form-control-m"
                    value={phoneNumber}
            onChange={handlePhoneInputChange}
                  />
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form2Example32">
                    E-posta Adresiniz
                  </label>

                  <input
                    type="email"
                    id="form2Example32"
                    className="form-control form-control-m"
                    onInput = {handleEmailChange}
                  />
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form2Example33">
                    Şifre
                  </label>

                  <input
                    type="password"
                    id="form2Example33"
                    className="form-control form-control-m"
                    onInput = {handlePasswordChange}
                  />
                </div>

                <div className="pt-1 mb-1">
                  <button
                    className="btn btn-info btn-m btn-block"
                    type="submit"
                  >
                    Kayıt Ol
                  </button>
                </div>

               
                <p>
                  Hesabınız var mı?{" "}
                  <Link to="/login" className="link-info">
                    Giriş Yapın!
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img src={vetlog} className="w-100 vh-100" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signpage;
