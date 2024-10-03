import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from "./Pages/Welcome";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Greeting from "./Pages/Greeting";
import AddCourier from "./Pages/AddCourier";
import AddCustomer from "./Pages/AddCustomer";
import BookingReport from "./Pages/BookingReport";
import AwbReprint from "./Pages/AwbReprint";
import AddAutoawb from "./Pages/AddAutoawb";
import Porfile from "./Pages/Porfile";
import DashBoard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import AutoBooking from "./Pages/AutoBooking";
import CreditClient from "./Pages/CreditClient";
import CreditBookingReport from "./Pages/CreditBookingReport";
import AwbCRReprint from "./Pages/AwbCRReprint";

function App() {
  const user = localStorage.getItem("token");
  return (
	<div>    
       <Sidebar />
      <div style={{ marginLeft: '200px' }}> {/* Ensure content area takes remaining width */}
        <Navbar />
        <div className="container-fluid py-3">
    <Routes>
		
			{user ? (
				<>
					<Route path="/" exact element={<Profile />} />
					<Route path="/welcome" exact element={<Profile />} />
					<Route path="/booking" exact element={<Booking />} />
					<Route path="/greeting" exact element={<Greeting />} />
					<Route path="/addcourier" exact element={<AddCourier />} />
					<Route path="/addcustomer" exact element={<AddCustomer />} />
					<Route path="/bookrep" exact element={<BookingReport />} />
					<Route path="/reprint" exact element={<AwbReprint />} />
					<Route path="/autoawb" exact element={<AddAutoawb />} />
					<Route path="/profile" exact element={<Porfile />} />
					<Route path="/dashboard" exact element={<DashBoard />} />
					<Route path="/booking" exact element={<Booking />} />
					<Route path="/autobook" exact element={<AutoBooking />} />
					<Route path="/crcust" exact element={<CreditClient />} />
					<Route path="/crbook" exact element={<CreditBookingReport />} />
					<Route path="/crreprint" exact element={<AwbCRReprint />} />
				</>
			) : (
				<>
					<Route path="/signup" exact element={<Signup />} />
					<Route path="/login" exact element={<Login />} />
					<Route path="/" element={<Navigate replace to="/login" />} />
					<Route path="/dashboard" element={<Navigate replace to="/login" />} />
					<Route path="/welcome" element={<Navigate replace to="/login" />} />
					<Route path="/booking" element={<Navigate replace to="/login" />} />
					<Route path="/greeting" element={<Navigate replace to="/login" />} />
					<Route path="/addcourier" element={<Navigate replace to="/login" />} />
					<Route path="/addcustomer" element={<Navigate replace to="/login" />} />
					<Route path="/bookrep" element={<Navigate replace to="/login" />} />
					<Route path="/reprint" element={<Navigate replace to="/login" />} />
					<Route path="/autoawb" element={<Navigate replace to="/login" />} />
					<Route path="/profile" element={<Navigate replace to="/login" />} />
					<Route path="/dashboard" element={<Navigate replace to="/login" />} />
					<Route path="/booking" element={<Navigate replace to="/login" />} />
					<Route path="/autobook" element={<Navigate replace to="/login" />} />
					<Route path="/crcust" element={<Navigate replace to="/login" />} />
					<Route path="/crbook" element={<Navigate replace to="/login" />} />
					<Route path="/crreprint" element={<Navigate replace to="/login" />} />
				</>
			)}
		</Routes>
		</div>
		</div>
		<ToastContainer/>
		</div>
  )
}

export default App
