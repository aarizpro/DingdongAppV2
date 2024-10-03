import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Porfile = () => {
  const [agencyName,setAgencyName]= useState("");
  const [instanceId,setInstanceId]= useState("");
  const [accessToken,setAccessToken]= useState("");
  const [agencyEmail,setAgencyEmail]= useState("");
  const [agencyImgurl,setAgencyImgurl]= useState("");
  const [agencyID,setAgencyID]= useState("");
  const [isloading,setIsloading]= useState(false);
  const url="https://v2.dingdong.co.in/"
 //const url ="https://allapi-4fmi.onrender.com/";
 const saveCourier=async(e)=>{
    e.preventDefault();
    if(agencyName===""||instanceId===""||accessToken===""||agencyEmail===""||agencyImgurl===""){
      alert("Enter all Fields");
      return
    }
    try {
      setIsloading(true);
      const response = await axios.put(`${url}api/profile/${agencyID}`,{
        agencyName:agencyName,
        instanceId:instanceId,
        accessToken:accessToken,
        agencyEmail:agencyEmail,
        agencyImgurl:agencyImgurl
      });
      toast.success(`Updated Agency Details Successfully..`);
      setIsloading(false);
      
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsloading(false);
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/profile/66b5a00dc7ed276dc36b95b0`);
      setAgencyName(response.data.agencyName);
      setInstanceId(response.data.instanceId);
      setAccessToken(response.data.accessToken);
      setAgencyEmail(response.data.agencyEmail);
      setAgencyImgurl(response.data.agencyImgurl);
      setAgencyID(response.data._id);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
<div>
  <div className="max-w-lg bg-white shadow-lg mx-auto p-4 rounded mt-4">
    <div className="mb-4">
      <img src={agencyImgurl} className="img-fluid" alt="Agency Logo" />
    </div>
    <form onSubmit={saveCourier}>
      <div className="form-group">
        <label>Agency Name</label>
        <input
          type="text"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Instance ID</label>
        <input
          type="text"
          value={instanceId}
          onChange={(e) => setInstanceId(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Access Token</label>
        <input
          type="text"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Agency Email</label>
        <input
          type="text"
          value={agencyEmail}
          onChange={(e) => setAgencyEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Agency Image URL</label>
        <input
          type="text"
          value={agencyImgurl}
          onChange={(e) => setAgencyImgurl(e.target.value)}
          className="form-control"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block mt-4"
      >
        Update
      </button>
    </form>
  </div>
</div>

  )
}

export default Porfile