import React, { useCallback, useState, useEffect,useRef } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
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

const AutoBooking = () => {
  const location = useLocation();
  const printRef = useRef();
  const { courierImg, courierName, courierSite } = location.state || {}; // Destructure the received state
  const messageTxt = 'Thank you.. Further Tracking Details Please visit ' + courierSite;
  const cDate1 = new Date();
  const fDate1 = `${cDate1.getDate()}/${cDate1.getMonth() + 1}/${cDate1.getFullYear()}`;
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [awbNo, setAwbNo] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [fromPincode, setFromPincode] = useState('600001');
  const [fromEmail, setFromEmail] = useState('rkayentp@gmail.com');
  const [fromAddr, setFromAddr] = useState('');
  const [toAddr, setToAddr] = useState('');
  const [toPincode, setToPincode] = useState('600001');
  const [toEmail, setToEmail] = useState('rkayentp@gmail.com');
  const [shipmentType, setShipmentType] = useState('DOX');
  const [quantity, setQuantity] = useState('1');
  const [weight, setWeight] = useState('0.100');
  const [amount, setAmount] = useState('0.00');
  const [imgurl, setImgurl] = useState('');
  const [mediaurl, setMediaurl] = useState('');
  const [instanceID, setInstanceID] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [dataFound, setDataFound] = useState(false);
  const senderNameRef = useRef(null);
  const senderAddrRef = useRef(null);
  const senderPinRef = useRef(null);
  const senderEmailRef = useRef(null);
  const recvMobRef = useRef(null);
  const recvNameRef = useRef(null);
  const recvAddrRef = useRef(null);
  const recvPinRef = useRef(null);
  const recvEmailRef = useRef(null);
  const sType = useRef(null);
  const sWeight = useRef(null);
  const sQty = useRef(null);
  const sAwb = useRef(null);
  const sAmount = useRef(null);
  //const url = "http://localhost:5000/";
  const url = "http://localhost:5000/";
 //const url ="https://allapi-4fmi.onrender.com/";
 const navigate =useNavigate();
  // Function to fetch data for sender's address
  const handleKeyPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderNameRef.current.focus();
    }
  };
  const handleSNamePress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderAddrRef.current.focus();
    }
  };
  const handleSAddrPress = (e) => {
    if (( e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderPinRef.current.focus();
    }
  };
  const handleSPinPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      senderEmailRef.current.focus();
    }
  };
  const handleSEmailPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvMobRef.current.focus();
    }
  };
  const handleRMobPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvNameRef.current.focus();
    }
  };
  const handleRNamePress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvAddrRef.current.focus();
    }
  };
  const handleRAddrPress = (e) => {
    if (( e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvPinRef.current.focus();
    }
  };
  const handleRPinPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      recvEmailRef.current.focus();
    }
  };
  const handleREmailPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sType.current.focus();
    }
  };
  const handlesTypePress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sWeight.current.focus();
    }
  };
  const handlesWeightPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sQty.current.focus();
    }
  };
  const handlesQtyPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sAmount.current.focus();
    }
  };
  const handlesAmountPress = (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') ) {
      e.preventDefault(); // Prevent default Tab behavior
      sAwb.current.focus();
    }
  };
  const fetchMobno = async () => {
    try {
      const response = await axios.get(`${url}api/customer/search?field[]=custMob&value[]=${senderMobile}`);
      setFromAddr(response.data[0].custAddr); // Ensure default value if response data is empty
      setSenderName(response.data[0].custName);
      setFromPincode(response.data[0].custPincode);
      setFromEmail(response.data[0].custEmail);
      setDataFound(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFromAddr(''); // Ensure default value if response data is empty
      setSenderName('');
      setFromPincode('600001');
      setFromEmail('xyz@gmail.com');
      setDataFound(false);
    }
  };
  const fetchRMobno = async () => {
    try {
      const response = await axios.get(`${url}api/customer/search?field[]=custMob&value[]=${receiverMobile}`);
      setToAddr(response.data[0].custAddr); // Ensure default value if response data is empty
      setReceiverName(response.data[0].custName);
      setToPincode(response.data[0].custPincode);
      setToEmail(response.data[0].custEmail);
      setDataFound(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setToAddr(''); // Ensure default value if response data is empty
      setReceiverName('');
      setToPincode('600001');
      setToEmail('xyz@gmail.com');

      setDataFound(false);
    }
  };

  // Use useEffect to trigger fetchMobno when input length is 10
  useEffect(() => {
    if (senderMobile.length === 10) {
      fetchMobno();
    }
  }, [senderMobile]);
  useEffect(() => {
    if (receiverMobile.length === 10) {
      fetchRMobno();
    }
  }, [receiverMobile]);
  const fetchData=()=>{
    if(courierName==="Amazon"){
      setImgurl(amazon);
    }else if(courierName==="Aramex"){
      setImgurl(aramex);
    }else if(courierName==="Bluedart"){
      setImgurl(bluedart);
    }else if(courierName==="Delhivery"){
      setImgurl(delhivery);
    }else if(courierName==="DHL"){
      setImgurl(dhl);
    }else if(courierName==="DTDC Courier"){
      setImgurl(dtdc);
    }else if(courierName==="Ecom"){
      setImgurl(ecom);
    }else if(courierName==="Ekart"){
      setImgurl(ekart);
    }else if(courierName==="Fedex"){
      setImgurl(fedex);
    }else if(courierName==="Franch"){
      setImgurl(franch);
    }else if(courierName==="Movin"){
      setImgurl(movin);
    }else if(courierName==="The Professional Courier"){
      setImgurl(professional);
    }else if(courierName==="ST Courier"){
      setImgurl(stcourier);
    }else if(courierName==="Trackon"){
      setImgurl(trackon);
    }else if(courierName==="XpressBees"){
      setImgurl(xpressbees);
    }else{
      setImgurl(courierImg1);
    }

  }

  // Fetch agency data on component mount
  useEffect(() => {
    fetchData();
    fetchAwb();
    fetchProfile();
  }, []);

  const handleSenderMobileChange = (e) => {
    setSenderMobile(e.target.value);
  };
  const handleReceiverMobileChange = (e) => {
    setReceiverMobile(e.target.value);
  };
  const saveCustomer=async()=>{
   try {
    const response = await axios.post(`${url}api/customer`,{
        custName:senderName,
        custMob:senderMobile,
        custEmail:fromEmail,
        custAddr:fromAddr,
        custPincode:fromPincode
      });
      toast.success(`Saved ${senderName} Successfully..`);
   } catch (error) {
    toast.error(error.message);
   }
  }
  const saveCustomer1=async()=>{
    try {
     const response = await axios.post(`${url}api/customer`,{
         custName:receiverName,
         custMob:receiverMobile,
         custEmail:toEmail,
         custAddr:toAddr,
         custPincode:toPincode
       });
       toast.success(`Saved ${receiverName} Successfully..`);
    } catch (error) {
     toast.error(error.message);
    }
   }
   const autoAwbSave= async()=>{
    try {
      await axios.put(`${url}api/autoawb/update?field[]=awbStatus&value[]=Pending&field[]=airwayBill&value[]=${awbNo}&updateField=awbStatus&updateValue=Booked`)
    } catch (error) {
      console.log(error);
    }
   }
   const saveBooking=async()=>{
    const dummyEmail1 = fromEmail === "" ? "--@--" : fromEmail;
    const dummyEmail2 = toEmail === "" ? "--@--" : toEmail;
    generateImage();
    await new Promise(resolve => setTimeout(resolve, 5000));
    handleClick();
    handleClick1();
    try {
     const response = await axios.post(`${url}api/booking`,{
         toName:receiverName,
         toMob:receiverMobile,
         toEmail:dummyEmail2,
         toAddr:toAddr,
         toPincode:toPincode,
         fromName:senderName,
         fromMob:senderMobile,
         fromEmail:dummyEmail1,
         fromAddr:fromAddr,
         fromPincode:fromPincode,
         airwayBill:awbNo,
         weight:weight,
         quantity:quantity,
         shipType:shipmentType,
         amount:amount,
         courierName:courierName
       });
       autoAwbSave();
      
       downloadImage();
       toast.success(`Shipment Booked ${awbNo} Successfully..`);
       navigate('/');
      //  setReceiverMobile('');
      //  setSenderName('');
      //  setReceiverName('');
      //  setSenderMobile('');
      //  setFromAddr('');
      //  setToAddr('');
      //  setFromPincode('600001');
      //  setFromEmail('xyz@mail.com');
      //  setToPincode('600001');
      //  setToEmail('xyz@mail.com');
      //  setShipmentType('DOX');
      //  setWeight('0.100');
      //  setQuantity('1');
      //  setAmount('0.00');
    } catch (error) {
     toast.error(error.message);
    }
   }
   const downloadImage = async() => {
    if (printRef.current) {
      try {
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
   const fetchProfile = async () => {
    try {
      const response = await axios.get(`${url}api/profile`);
      setInstanceID(response.data[0].instanceId);
      setAccessToken(response.data[0].accessToken);
      } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('You will face Error in WhatsApp Message');
    }
  };
  const handleClick = async () => {
    try {
      const cDate = new Date();
      const media_url='https://dingdongcourier.s3.ap-south-1.amazonaws.com/AirwayBill.png';
      const fDate = `${cDate.getDate()}/${cDate.getMonth() + 1}/${cDate.getFullYear()}`;
      const messageText = "Thank You for using Dingdong Courier. %0A Sender: "+senderName+"%0A Your Awb No: "+awbNo+"%0A Send Via:" + courierSite+ " %0A Dated: "+fDate+" %0A To: "+receiverName+"%0A Have a Nice Day...."; 
      const response = await fetch(`https://bot.betablaster.in/api/send?number=91${senderMobile}&type=media&message=${messageText}&media_url=${media_url}&instance_id=${instanceID}&access_token=${accessToken}`, {
        method: 'GET',
      });
      console.log(response.data);
      
    } catch (error) {
      console.error('Error sending message:', error);
     
    }
  };
  const handleClick1 = async () => {
    try {
      const cDate = new Date();
      const media_url='https://dingdongcourier.s3.ap-south-1.amazonaws.com/AirwayBill.png';
      const fDate = `${cDate.getDate()}/${cDate.getMonth() + 1}/${cDate.getFullYear()}`;
      const messageText = "Thank You for using Dingdong Courier. %0A Sender: "+senderName+"%0A Your Awb No: "+awbNo+"%0A Send Via:" + courierSite+ " %0A Dated: "+fDate+" %0A To: "+receiverName+"%0A Have a Nice Day...."; 
      const response = await fetch(`https://bot.betablaster.in/api/send?number=91${receiverMobile}&type=media&message=${messageText}&media_url=${media_url}&instance_id=${instanceID}&access_token=${accessToken}`, {
        method: 'GET',
      });
      console.log(response.data);
      
    } catch (error) {
      console.error('Error sending message:', error);
     
    }
  };

   const generateImage = async() => {
    const url1 = "http://localhost:5000/";
    //const url1="https://awsupload.onrender.com/";
    if (printRef.current) {
      try {
        // Step 1: Generate the image using html2canvas
        const canvas = await html2canvas(printRef.current);
        
        // Step 2: Convert the canvas to a Blob object
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  
        // Step 3: Create a FormData object and append the Blob
        const formData = new FormData();
        formData.append("file", blob, "AirwayBill.png");
  
        // Step 4: Upload the file using axios.post
        const response = await axios.post(`${url1}upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // Step 5: Process the response (assuming the response contains the file URL)
        console.log(response.data);
        setMediaurl(response.data);
        toast.success("Image generated and file uploaded successfully");
        
      } catch (error) {
        toast.error("Failed to generate image or upload file");
        console.error(error);
      }
    }
   
    
  }
  const handleAwb = (e) => {
    setAwbNo(e.target.value);
  };
  const fetchAwb = async () => {
    try {
      const response = await axios.get(`${url}api/autoawb/search?field[]=awbStatus&value[]=Pending&field[]=courierName&value[]=${courierName}`);
      if (response.data.length > 0) {
        setAwbNo(response.data[0].airwayBill);
        setIsButtonVisible(true);
        
      } else {
        setIsButtonVisible(false);
        toast.error('No Airway Bill Found Add the Awb Numbers');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAwb1 = async () => {
    try {
      const response = await axios.get(`${url}api/booking/search?field[]=airwayBill&value[]=${awbNo}`);
      if (response.data.length > 0) {
        
        setIsButtonVisible(false);
        toast.error('AWB Already Booked. Enter New Awb');
      } else {
        setIsButtonVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (awbNo) { // Only fetch if awbNo has a value
      fetchAwb1();
    }
  
  }, [awbNo]);

 
  return (
<div className="container py-2">
  {/* Top Row */}
  <div className="row">
    <div className="col-md-4">
      <img src={courierImg1} alt="Courier" className="img-fluid" />
    </div>
    <div className="col-md-4 d-flex justify-content-center align-items-center">
      <Barcode value={awbNo || date} format="CODE128" width={2} height={50} />
    </div>
    <div className="col-md-4">
      <img src={courierImg} alt="Courier" className="img-fluid" />
    </div>
  </div>

  {/* First Row */}
  <div className="row mt-3">
    <div className="col-md-2">
      <label className="form-label">Date:</label>
    </div>
    <div className="col-md-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="form-control"
      />
    </div>
    <div className="col-md-2">
      <label className="form-label">AWB No:</label>
    </div>
    <div className="col-md-4">
      <input
        type="text"
        value={awbNo}
        onChange={handleAwb}
        className="form-control"
        ref={sAwb}
      />
    </div>
  </div>

  {/* Second Row */}
  <div className="row mt-3">
    <div className="col-md-2">
      <label className="form-label">Sender Mobile No:</label>
    </div>
    <div className="col-md-4 d-flex">
      <input
        type="text"
        value={senderMobile}
        onChange={handleSenderMobileChange}
        className="form-control"
        maxLength={10}
        onKeyDown={handleKeyPress}
      />
      {dataFound ? (
        <button className="btn btn-secondary ms-2" disabled>
          +
        </button>
      ) : (
        <button className="btn btn-primary ms-2" onClick={saveCustomer}>
          +
        </button>
      )}
    </div>
    <div className="col-md-2">
      <label className="form-label">Receiver Mobile No:</label>
    </div>
    <div className="col-md-4 d-flex">
      <input
        type="text"
        value={receiverMobile}
        onChange={handleReceiverMobileChange}
        className="form-control"
        maxLength={10}
        ref={recvMobRef}
        onKeyDown={handleRMobPress}
      />
      {dataFound ? (
        <button className="btn btn-secondary ms-2" disabled>
          +
        </button>
      ) : (
        <button className="btn btn-primary ms-2" onClick={saveCustomer1}>
          +
        </button>
      )}
    </div>
  </div>

  {/* Third Row */}
  <div className="row mb-2">
      <div className="col-md-2">
        <label className="form-label">Sender Name:</label>
      </div>
      <div className="col-md-4">
        <input
          type="text"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="form-control"
          ref={senderNameRef}
          onKeyDown={handleSNamePress}
        />
      </div>
      <div className="col-md-2">
        <label className="form-label">Receiver Name:</label>
      </div>
      <div className="col-md-4">
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          className="form-control"
          ref={recvNameRef}
          onKeyDown={handleRNamePress}
        />
      </div>
    </div>
  
    {/* Fourth Row */}
    <div className="row mb-2">
      <div className="col-md-6">
        <textarea
          value={fromAddr}
          onChange={(e) => setFromAddr(e.target.value)}
          className="form-control"
          rows="2"
          ref={senderAddrRef}
          onKeyDown={handleSAddrPress}
        />
      </div>
      <div className="col-md-6">
        <textarea
          value={toAddr}
          onChange={(e) => setToAddr(e.target.value)}
          className="form-control"
          rows="2"
          ref={recvAddrRef}
          onKeyDown={handleRAddrPress}
        />
      </div>
    </div>
  
    {/* Fifth Row */}
    <div className="row mb-2">
      <div className="col-md-2">
        <label className="form-label">From Pincode:</label>
      </div>
      <div className="col-md-4">
        <input
          type="text"
          value={fromPincode}
          onChange={(e) => setFromPincode(e.target.value)}
          className="form-control"
          ref={senderPinRef}
          onKeyDown={handleSPinPress}
        />
      </div>
      <div className="col-md-2">
        <label className="form-label">To Pincode:</label>
      </div>
      <div className="col-md-4">
        <input
          type="text"
          value={toPincode}
          onChange={(e) => setToPincode(e.target.value)}
          className="form-control"
          ref={recvPinRef}
          onKeyDown={handleRPinPress}
        />
      </div>
    </div>
  
    {/* Sixth Row */}
    <div className="row mb-2">
      <div className="col-md-2">
        <label className="form-label">From Email:</label>
      </div>
      <div className="col-md-4">
        <input
          type="email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          className="form-control"
          ref={senderEmailRef}
          onKeyDown={handleSEmailPress}
        />
      </div>
      <div className="col-md-2">
        <label className="form-label">To Email:</label>
      </div>
      <div className="col-md-4">
        <input
          type="email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          className="form-control"
          ref={recvEmailRef}
          onKeyDown={handleREmailPress}
        />
      </div>
    </div>
  
    {/* Seventh Row */}
    <div className="row mb-2">
      <div className="col-md-2">
        <label className="form-label">Shipment Type:</label>
      </div>
      <div className="col-md-4">
        <input
          type="text"
          value={shipmentType}
          onChange={(e) => setShipmentType(e.target.value)}
          className="form-control"
          ref={sType}
          onKeyDown={handlesTypePress}
        />
      </div>
      <div className="col-md-2">
        <label className="form-label">Quantity:</label>
      </div>
      <div className="col-md-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control"
          ref={sQty}
          onKeyDown={handlesQtyPress}
        />
      </div>
    </div>
  
    {/* Eighth Row */}
    <div className="row mb-2">
      <div className="col-md-2">
        <label className="form-label">Weight:</label>
      </div>
      <div className="col-md-4">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="form-control"
          ref={sWeight}
          onKeyDown={handlesWeightPress}
        />
      </div>
      <div className="col-md-2">
        <label className="form-label">Amount:</label>
      </div>
      <div className="col-md-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
          ref={sAmount}
          onKeyDown={handlesAmountPress}
        />
      </div>
    </div>
  {/* Seventh Row */}
  <div className="row mt-3">
    <div className="col-md-6">
      <input
        type="text"
        value={messageTxt}
        readOnly
        className="form-control text-center"
      />
    </div>
    {isButtonVisible && (
      <div className="col-md-6">
        <button className="btn btn-primary w-100" onClick={saveBooking}>
          Book
        </button>
      </div>
    )}
  </div>

  {/* Print Section */}
  <div className="p-4">
  <div ref={printRef} className="border border-dark p-4 rounded bg-white">
    <div className="border border-dark row align-items-center mb-2">
      <div className="col-4">
        <img src={courierImg1} alt="Agency Logo" className="img-fluid" />
      </div>
      <div className="col-4 text-center">
        <div className="border border-dark d-flex justify-content-center align-items-center">
          <Barcode value={awbNo} format="CODE128" width={2} height={50} />
        </div>
      </div>
      <div className="col-4">
        <img src={imgurl} alt="Courier Logo" className="img-fluid" />
      </div>
    </div>

    <div className="row mb-2 text-lg fw-semibold">
      <div className="col">Date: {fDate1}</div>
    </div>

    <div className="row mb-2 text-sm">
      <div className="col-6 border border-dark">
        <div>
          From, <br />
          {senderName}
          <br />
          {fromAddr}
          <br />
          {fromPincode}
          <br />
          {senderMobile}
          <br />
          {fromEmail}
        </div>
      </div>

      <div className="col-6 border border-dark fw-bold fs-2 mb-2">
        <div>
          To, <br />
          {receiverName}
          <br />
          {toAddr}
          <br />
          {toPincode}
          <br />
          {receiverMobile}
          <br />
          {toEmail}
        </div>
      </div>
    </div>

    <div className="row mb-2 text-lg fw-semibold">
      <div className="col-3 border border-dark">Shipment Type: {shipmentType}</div>
      <div className="col-3 border border-dark">Weight: {weight}</div>
      <div className="col-3 border border-dark">Quantity: {quantity}</div>
      <div className="col-3 border border-dark">Amount: {amount}</div>
    </div>

    <div className="border border-dark mb-2 text-lg fw-semibold text-center">
      <div>{messageTxt}</div>
    </div>
  </div>
</div>
    </div>



    
    
  );
};

export default AutoBooking;
