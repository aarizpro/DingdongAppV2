import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Greeting = () => {
  const [instanceId, setInstanceID] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [file, setFile] = useState(null);
  const [cimgurl, setCimgurl] = useState("");
  const [customers, setCustomers] = useState([]); // State to store customer data

 
//  const url ="https://allapi-4fmi.onrender.com/";
//  const url1 = "https://awsupload.onrender.com/";

  const url = "http://localhost:5000/";
  const url1 = "http://localhost:5000/";

  useEffect(() => {
    fetchProfile();
    fetchCustomer(); // Fetch customers when component mounts
  }, []);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${url1}upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setCimgurl(response.data); // Ensure you are setting a valid string
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("File upload failed");
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${url}api/profile`);
      console.log(response.data);
      setInstanceID(response.data[0].instanceId);
      setAccessToken(response.data[0].accessToken);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('You will face Error in WhatsApp Message');
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`${url}api/customer`);
      setCustomers(response.data); // Store the customer data
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch customer data');
    }
  };

  const handleClick = async () => {
    if (!instanceId || !accessToken || !cimgurl) {
      toast.error("Missing required data to send greetings");
      return;
    }
  
    try {
      const sendMessages = customers.map(customer => {
        const mobNo = customer.custMob;
        return fetch(
          `https://bot.betablaster.in/api/send?number=91${mobNo}&type=media&media_url=${cimgurl}&instance_id=${instanceId}&access_token=${accessToken}`,
          { method: 'GET' }
        );
      });
  
      // Await all requests concurrently
      await Promise.all(sendMessages);
      //toast.success("Successfully sent greetings to all customers");
    } catch (error) {
     // console.error('Error sending greetings:', error);
      //toast.error("Failed to send greetings");
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-80">
  <div className="p-2" style={{ width: '320px' }}> {/* Adjusted width */}
    <div className="d-grid gap-3">
      <div>
        <label>Upload File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])} // Handle file selection
          className="form-control mt-2"
        />
        <button
          type="button"
          onClick={uploadFile}
          className="btn btn-primary w-100 mt-2"
        >
          Upload
        </button>
      </div>
      <div style={{ width: '300px', height: '250px' }}>
        <img src={cimgurl} className="w-100 h-100 object-fit-cover" alt="Waiting" />
      </div>
      <button
        className="btn btn-success w-100 mt-3"
        onClick={handleClick}
      >
        Send Greetings
      </button>
    </div>
  </div>
</div>

  );
};

export default Greeting;
