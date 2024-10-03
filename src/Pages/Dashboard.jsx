import React, {useState, useEffect}from 'react'
import axios from 'axios'
import Courier from '../Components/Courier';

const DashBoard = () => {
  const [courier, setCourier]= useState([]);
  const [isLoading,setIsLoading]= useState(false);
  const url="https://v2.dingdong.co.in/"
  //const url ="https://allapi-4fmi.onrender.com/";
  const getCourier=async()=>{
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}api/courier`);
      console.log(response.data);
      setCourier(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCourier();
  },[]);

  return (
    <div className="container mt-4">
    <div className="row">
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {courier.length > 0 ? (
            <>
              {courier.map((courier, index) => (
                <div key={index} className="col-md-6 col-lg-3 mb-4">
                  <Courier courier={courier} />
                </div>
              ))}
            </>
          ) : (
            <div className="col-12">There are no Couriers..</div>
          )}
        </>
      )}
    </div>
  </div>
  
  )
}

export default DashBoard