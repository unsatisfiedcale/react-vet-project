import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Sidebar.css";
import logo from "../../images/vetechlogin.png";
import { Link } from 'react-router-dom';


function Sidebar() {
  const [showArticles, setShowArticles] = useState(false);

  const toggleArticles = () => {
    setShowArticles(!showArticles);
  };


  return (
       
        <div className="col-auto col-md-4 col-lg-3 min-vh-100 d-flex flex-column justify-content-between">
          <div className="p-2">
            
                    <Link to="/admin">
              <img
                src={logo}
                alt="Logo"
                className="logo fs-7 ms-3 d-none d-sm-inline"
              />
            </Link>
            <ul className="nav nav-pills flex-column mt-4">
              
              <li className="nav-item py-3 py-sm-3">
                <Link to="/admin/homepage" className="nav-link text-black">
                  <i className="fs-7 fa fa-house"></i>
                  <span className="fs-7 ms-3 d-none d-sm-inline">Ana Sayfa</span>
                </Link>
              </li>
              <li
                className={`nav-item py-3 py-sm-3 ${
                  showArticles ? "active" : ""
                }`}
              >
                <a
                  href="#!"
                  className="nav-link text-black"
                  onClick={toggleArticles}
                >
                  <i className="fs-7 fa fa-table-list"></i>
                  <span className="fs-7 ms-3 d-none d-sm-inline">Müşteri / Hasta </span>
                  <i
                    className={`fs-7 fa ${
                      showArticles
                        ? "fa-chevron-down d-none d-sm-inline float-end"
                        : "fa-chevron-left d-none d-sm-inline float-end"
                    }`}
                  ></i>
                </a>
                {showArticles && (
                  <ul className="nav nav-pills flex-column ml-3 articles-list">
                    <li className="nav-item">
                    <Link to="/admin/customer" className="nav-link text-black">
                        <span className="fs-7 ms-3 d-none d-sm-inline">
                          Yeni Müşteri / Hasta Ekle
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/admin/customersearch" className="nav-link text-black">
                        <span className="fs-7 ms-3 d-none d-sm-inline">
                          Müşteri / Hasta Ara
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
               
              <li className="nav-item py-3 py-sm-3">
              <Link to="/admin/appointment" className="nav-link text-black">
                  <i className="fs-7 fa fa-table-list"></i>
                  <span className="fs-7 ms-3 d-none d-sm-inline">Randevu Sistemi</span>
                </Link>{" "}
              </li>
              <li className="nav-item py-3 py-sm-3">
              <Link to="/admin/warehouse" className="nav-link text-black">
                  <i className="fs-7 fa fa-table-list"></i>
                  <span className="fs-7 ms-3 d-none d-sm-inline">Depo Stok Sistemi</span>
                </Link>{" "}
              </li>
              <li className="nav-item py-3 py-sm-3 mask">
                <Link to="/admin/accomodation" className="nav-link text-black">
                  <i className="fs-7 fa fa-clipboard"></i>
                  <span className="fs-7 ms-3 d-none d-sm-inline">Konaklama</span>
                </Link>{" "}
              </li>
              
            </ul>
          </div>
        </div>
        
      
    
  );
}

export default Sidebar;
