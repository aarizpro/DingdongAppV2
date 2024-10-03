import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className=" text-white vh-100" style={{ width: '200px', position: 'fixed', top: 0, left: 0,backgroundColor:'#5B5AB3' }}>
      <div className="d-flex flex-column align-items-start p-3">
        <a href="/" className="text-white text-decoration-none mb-3">
          <img
            src="https://media.tenor.com/ONEFPGOqnJ8AAAAi/durstexpress-ding-dong.gif"
            width="180"
            height="50"
            className="d-inline-block align-top"
            alt=""
          />
        </a>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={'/profile'} className="nav-link text-white custom-link" ><i class="bi bi-award-fill"></i> Profile</Link>
          </li>
          <li>
            <Link to={'/dashboard'} className="nav-link text-white custom-link" ><i class="bi bi-building-fill-check"></i> Booking</Link>
          </li>
          
          <li>
            <Link to={'/addcourier'} className="nav-link text-white custom-link" ><i class="bi bi-bus-front-fill"></i>  Add Courier</Link>
          </li>
          <li>
           
            <Link to={'/addcustomer'} className="nav-link text-white custom-link" ><i class="bi bi-fire"></i>  Customers</Link>
          </li>
          <li>
            
            <Link to={'/autoawb'} className="nav-link text-white custom-link" ><i class="bi bi-boombox-fill"></i>   Auto Awb</Link>
          </li>
          <li>
            
            <Link to={'/bookrep'} className="nav-link text-white custom-link" ><i class="bi bi-binoculars-fill"></i>  Booking Report</Link>
          </li>
          <li>
            <Link to={'/reprint'} className="nav-link text-white custom-link" ><i class="bi bi-briefcase-fill"></i>  Reprint</Link>
          </li>
          <li>
            <Link to={'/greeting'} className="nav-link text-white custom-link" ><i class="bi bi-camera-reels-fill"></i>  Greetings</Link>
          </li>
          <li>
            <Link to={'/crcust'} className="nav-link text-white custom-link" ><i class="bi bi-person-bounding-box"></i> Credit Client</Link>
          </li>
          <li>
            <Link to={'/crbook'} className="nav-link text-white custom-link" ><i class="bi bi-amd"></i> CR Book Report</Link>
          </li>
          <li>
            <Link to={'/crreprint'} className="nav-link text-white custom-link" ><i class="bi bi-alarm-fill"></i> Credit Awb </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
