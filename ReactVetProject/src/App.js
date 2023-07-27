import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Maincontainer from './components/Maincontainer';
import Loginpage from './components/Loginpage';
import Signpage from './components/Signpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminpage from './admin/homepage';
import Customer from "./admin/customer";
import CustomerSearch from './admin/customersearch';
import Appointment from './admin/appointment';
import Accomodation from './admin/accomodation';
import Warehouse from './admin/warehouse';
import Homepage from './admin/homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signin" element={<Signpage />} />
          <Route path="/" element={<>
            <Navbar />
            <Maincontainer />
          </>} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/admin/customer" element={<Customer />} />
          <Route path="/admin/customersearch" element={<CustomerSearch />} />
          <Route path="/admin/appointment" element={<Appointment />} />
          <Route path="/admin/accomodation" element={<Accomodation />} />
          <Route path="/admin/warehouse" element={<Warehouse />} />
          <Route path ="/admin/homepage" element={<Homepage />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
