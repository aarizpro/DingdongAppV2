import React, {  useState, useEffect,useRef } from 'react';
import Barcode from 'react-barcode';
import { toast } from 'react-toastify';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import courierImg1 from'../assets/rkaylogo.png';
import amazon from '../assets/amazon.jpeg';
import aramex from '../assets/aramex.png';
import bluedart from '../assets/bluedart.png';
import delhivery from '../assets/delhivery.png';
import dhl from '../assets/dhl.png';
import dtdc from '../assets/dtdc.png';
import ecom from '../assets/ecom.jpeg';
import ekart from '../assets/ekart.jpeg';
import fedex from '../assets/fedex.jpeg';
import franch from '../assets/franch.png';
import movin from '../assets/movin.jpeg';
import professional from '../assets/professional.png';
import stcourier from '../assets/ST Courier.jpg';
import trackon from '../assets/trackon.png';
import xpressbees from '../assets/xpressbees.jpeg';

const AwbReprint = () => {
  const printRef = useRef();
  
 // const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [awbNo, setAwbNo] = useState('');
  const [awbNo1, setAwbNo1] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [fromPincode, setFromPincode] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromAddr, setFromAddr] = useState('');
  const [toAddr, setToAddr] = useState('');
  const [toPincode, setToPincode] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [shipmentType, setShipmentType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [amount, setAmount] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [courierName,setCourierName]=useState('');
  const [couSite, setCouSite] = useState('');
  const messageTxt = 'Thank you.. Further Tracking Details Please visit ' +couSite;
  const [bookings, setBookings] = useState([]);
  
  
  const url = "http://3.111.150.119/";
  //const url ="https://allapi-4fmi.onrender.com/";
  const fetchCurrentDateBookings = async () => {
    try {
      const response = await axios.get(`${url}api/booking?sortBy[]=createdAt&sortOrder[]=desc`);
      const allBookings = response.data;
      setBookings(allBookings);
    } catch (error) {
      console.error('Failed to fetch current date bookings:', error);
    }

  };

  const fetchData=()=>{
    if(courierName==="Amazon"){
      setImgurl(amazon);
      setCouSite("www.track.amazon.in");
    }else if(courierName==="Aramex"){
      setImgurl(aramex);
      setCouSite("www.aramex.com");
    }else if(courierName==="Bluedart"){
      setImgurl(bluedart);
      setCouSite("www.bluedart.com");
    }else if(courierName==="Delhivery"){
      setImgurl(delhivery);
      setCouSite("www.delhivery.com");
    }else if(courierName==="DHL"){
      setImgurl(dhl);
      setCouSite("www.dhl.com");
    }else if(courierName==="DTDC Courier"){
      setImgurl(dtdc);
      setCouSite("www.dtdc.in");
    }else if(courierName==="Ecom"){
      setImgurl(ecom);
      setCouSite("www.ecomexpress.com");
    }else if(courierName==="Ekart"){
      setImgurl(ekart);
      setCouSite("www.ekart.in");
    }else if(courierName==="Fedex"){
      setImgurl(fedex);
      setCouSite("www.fedex.com");
    }else if(courierName==="Franch"){
      setImgurl(franch);
      setCouSite("www.franchexpress.com");
    }else if(courierName==="Movin"){
      setImgurl(movin);
      setCouSite("www.movin.in");
    }else if(courierName==="The Professional Courier"){
      setImgurl(professional);
      setCouSite("www.tpcindia.com");
    }else if(courierName==="ST Courier"){
      setImgurl(stcourier);
      setCouSite("www.stcourier.com");
    }else if(courierName==="Trackon"){
      setImgurl(trackon);
      setCouSite("www.trackon.com");
    }else if(courierName==="XpressBees"){
      setImgurl(xpressbees);
      setCouSite("www.xpressbees.com");
    }else{
      setImgurl(courierImg1);
    }

  }

  // Fetch agency data on component mount


   
   const downloadImage = async() => {
    if (printRef.current) {
      try {
        // Capture the HTML element as a canvas
        const canvas = await html2canvas(printRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('AirwayBill.pdf');

        toast.success('Downloaded');
      } catch (error) {
        console.error('Failed to generate PDF:', error);
        toast.error('Failed to download the PDF');
      }
    }
    
  }
  
  const downloadImage1 = async() => {
    if (printRef.current) {
      try {
        // Capture the HTML element as a canvas
        const canvas = await html2canvas(printRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const segmentHeight = pageHeight / 3;
        for (let i = 0; i < 3; i++) {
          const position = i * segmentHeight;
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, segmentHeight);
        }
      
      pdf.save('AirwayBill.pdf');

        toast.success('Downloaded');
      } catch (error) {
        console.error('Failed to generate PDF:', error);
        toast.error('Failed to download the PDF');
      }
    }
    
  }
  
  const handleAwb = (e) => {
    setAwbNo(e.target.value);
   
  };
 


  const fetchAwb = async () => {
    
    try {
      const response = await axios.get(`${url}api/booking/search?field[]=airwayBill&value[]=${awbNo}`);
      if (response.data.length > 0) {
        setAwbNo(response.data[0].airwayBill);
        setCourierName(response.data[0].courierName);
        setSenderMobile(response.data[0].fromMob);
        setSenderName(response.data[0].fromName);
        setFromAddr(response.data[0].fromAddr);
        setFromPincode(response.data[0].fromPincode);
        setFromEmail(response.data[0].fromEmail);
        setAwbNo1(response.data[0].airwayBill);
        setReceiverMobile(response.data[0].toMob);
        setReceiverName(response.data[0].toName);
        setToAddr(response.data[0].toAddr);
        setToPincode(response.data[0].toPincode);
        setToEmail(response.data[0].toEmail);
        
        setWeight(response.data[0].weight);
        setQuantity(response.data[0].quantity);
        setShipmentType(response.data[0].shipType);
        setAmount(response.data[0].amount);

        toast.success('AWB Found');
      } else {
        setAwbNo('');
        setCourierName('');
        setSenderMobile('');
        setSenderName('');
        setFromAddr('');
        setFromPincode('');
        setFromEmail('');
        setAwbNo1('');
        setReceiverMobile('');
        setReceiverName('');
        setToAddr('');
        setToPincode('');
        setToEmail('');
        
        setWeight('');
        setQuantity('');
        setShipmentType('');
        setAmount('');

        toast.error('No Airway Bill Found Book the Shipment');
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  useEffect(() => {
    fetchCurrentDateBookings();
  }, []); 
  useEffect(() => {
   
    if (courierName) {
    
      fetchData();
    }
  }, [courierName]);

const showAwb=async()=>{
 
 await fetchAwb();
 
 // fetchData();
}
 
  return (
    <div className="container p-3">
    {/* First Row */}
    <div className="row mb-3">
      <div className="col-md-3">
        <label className="form-label">AWB No:</label>
      </div>
      <div className="col-md-5">
        <input
          type="text"
          value={awbNo}
          onChange={handleAwb}
          className="form-control"
        />
      </div>
      <div className="col-md-4 d-flex justify-content-start align-items-end">
        <button
          onClick={showAwb}
          className="btn btn-primary"
        >
          Search AWB
        </button>
      </div>
    </div>
  
    <div className="my-3">
      <div ref={printRef} className="border border-dark p-3 bg-white">
        <div className="row mb-2 border border-dark">
          <div className="col-md-4 text-center">
            <img src={courierImg1} alt="Agency Logo" className="img-fluid" />
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Barcode value={awbNo1} format="CODE128" width={2} height={50} />
          </div>
          <div className="col-md-4 text-center">
            <img src={imgurl} alt="Courier Logo" className="img-fluid" />
          </div>
        </div>
  
        <div className="row mb-2 text-lg font-weight-bold border border-dark p-2">
          <div className="col">Date: {new Date().toLocaleDateString()}</div>
        </div>
  
        <div className="row mb-4 border border-dark p-2">
          <div className="col-md-6">
            <strong>From:</strong><br />
            {senderName}<br />
            {fromAddr}<br />
            {fromPincode}<br />
            {senderMobile}<br />
            {fromEmail}
          </div>
          <div className="col-md-6 border border-dark p-2">
            <strong>To:</strong><br />
            {receiverName}<br />
            {toAddr}<br />
            {toPincode}<br />
            {receiverMobile}<br />
            {toEmail}
          </div>
        </div>
  
        <div className="row mb-4 text-lg font-weight-bold border border-dark p-2">
          <div className="col-md-3">Shipment Type: {shipmentType}</div>
          <div className="col-md-3">Weight: {weight}</div>
          <div className="col-md-3">Quantity: {quantity}</div>
          <div className="col-md-3">Amount: {amount}</div>
        </div>
  
        <div className="text-center text-lg font-weight-bold">
          {messageTxt}
        </div>
      </div>
  
      <div className="mt-4">
        <button
          onClick={downloadImage}
          className="btn btn-primary mr-3"
        >
          Download
        </button>
        <button
          onClick={downloadImage1}
          className="btn btn-primary"
        >
          3 Copies
        </button>
      </div>
    </div>
  
    <div className="my-3">
      <h2 className="h4 font-weight-bold mb-4">Today's Bookings</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Airway Bill</th>
            <th>From Mobile</th>
            <th>From Name</th>
            <th>To Mobile</th>
            <th>To Name</th>
            <th>Courier Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.createdAt}</td>
              <td>{booking.airwayBill}</td>
              <td>{booking.fromMob}</td>
              <td>{booking.fromName}</td>
              <td>{booking.toMob}</td>
              <td>{booking.toName}</td>
              <td>{booking.courierName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
    
    
  );
};

export default AwbReprint;
