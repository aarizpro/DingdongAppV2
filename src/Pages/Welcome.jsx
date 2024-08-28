import React, {  useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Welcome = () => {
    const [mobNo,setMobno]= useState("");
    const [instanceId,setInstanceID]= useState("");
    const [accessToken,setAccessToken]= useState("");
    const [message,setMessage]= useState("Welcome to Dingdong Courier We are Happy to Serve you...");
    const url = "http://3.111.150.119/";
   //const url ="https://allapi-4fmi.onrender.com/";
  
    useEffect(() => {
        fetchProfile();
      }, []);
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
      const handleClick = async () => {
        try {
          const media_url='https://dingdongcourier.s3.ap-south-1.amazonaws.com/welcome.jpg';
          const response = await fetch(`https://bot.betablaster.in/api/send?number=91${mobNo}&type=media&message=${message}&media_url=${media_url}&instance_id=${instanceId}&access_token=${accessToken}`, {
            method: 'GET',
          });
          console.log(response.data);
          setMobno('');
         // toast.success("Successfully Welcomed the Client")
        } catch (error) {
         // toast.error('Error sending message:', error);
         setMobno('');
        }
      };
    
    return(

    
        <div className="d-flex justify-content-center align-items-center vh-80">
        <div className="p-2" style={{ width: '320px' }}> {/* Adjusted width */}
          <div className="d-grid gap-2">
            <input
              type="text"
              value={mobNo}
              onChange={(e) => setMobno(e.target.value)}
              className="form-control"
              placeholder="Enter Mobile Number"
            />
            <textarea
              id="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control mt-2"
              rows="4"
            />
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handleClick}
            >
              Welcome
            </button>
          </div>
        </div>
      </div>
      
  
);};

export default Welcome