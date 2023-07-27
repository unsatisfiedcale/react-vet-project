import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import vetlog from "../images/vetlog.png";
import vetechlogin from "../images/vetechlogin.png";
import { loginUser, getUserDataFromFirebase} from "../Firebase.js";
import swal from "sweetalert";
import userEvent from "@testing-library/user-event";

function Loginpage() {
  
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate kancasını kullanarak yönlendirme yapabiliriz
  const [userdata, setUserData] = useState("");

  const currentHour = new Date().getHours();

let message = "";

if (currentHour >= 6 && currentHour < 11) {
  message = "Vetech mutlu sabahlar diler, günaydın!";
} else if (currentHour >= 11 && currentHour < 17) {
  message = "Vetech iyi günler diler!";
} else if (currentHour >= 17 && currentHour < 22) {
  message = "Vetech iyi akşamlar diler!";
} else {
  message = "Vetech iyi geceler diler!";
}

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await loginUser(email, password);
      console.log("Giriş başarılı!");
  
      swal({
        title: "Giriş Başarılı",
        text: message,
        icon: "success",
        buttons: {
          confirm: "Tamam",
        },
        closeOnClickOutside: false,
      });
  
      // Giriş başarılı olduğunda admin sayfasına yönlendirme yap
      navigate("/admin");
    } catch (error) {
      console.error("Giriş yapma hatası:", error);
      swal({
        title: "Hata",
        text: "Giriş yapılamadı, lütfen doğru email ve şifre girin!",
        icon: "error",
        button: "Tamam",
      });
    }
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4">
              <h1 className="fw-bold mb-0"><img src={vetechlogin} alt="Logo" /></h1>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form onSubmit={handleSubmit} className="loginform1">
                <h3 className="fw-normal mb-3 pb-3">Giriş Formu</h3>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example10">
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    id="form2Example10"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={handleEmailChange}
                    
                    
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example11">
                    Şifre
                  </label>
                  <input
                    type="password"
                    id="form2Example11"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block"
                    type="submit"
                    
                    onSubmit={handleSubmit}
                  >
                    Giriş Yap
                  </button>
                </div>
                <p>
                  Hesabınız yok mu?{" "}
                  <Link to="/signin" className="link-info">
                    Kayıt Olun!
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

export default Loginpage;
