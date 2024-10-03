import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
const Courier = ({courier }) => {
  const url="https://v2.dingdong.co.in/"
  //const url ="https://allapi-4fmi.onrender.com/";
  const courierDelete=async()=>{
    try {
      const response = await axios.delete(`${url}api/courier/${courier._id}`);
    toast.success(`Successfully ${courier.courierName} Deleted..`);
      window.location.reload();
    } catch (error) {
      toast.error(error);
    }
    
  }
  return (
    <div className="">
  <div className="card bg-white rounded shadow-sm overflow-hidden px-3 pt-2 pb-2">
    <div className="w-100 h-auto">
      <img
        src={courier.courierImg}
        className="img-fluid"
        alt="Courier Logo"
      />
    </div>
    <div className="px-4 pt-2 pb-2">
      <div className="text-muted small">{courier.courierSite}</div>
      <div className="mt-2 d-flex gap-2">
        <Link
          to="/booking"
          state={{
            courierImg: courier.courierImg,
            courierName: courier.courierName,
            courierSite: courier.courierSite,
          }}
          className="btn btn-dark w-100 text-center shadow-sm text-sm font-weight-bold"
        >
          Booking
        </Link>
      </div>
      <div className="mt-2 d-flex gap-2">
        <Link
          to={`/autobook`}
          state={{
            courierImg: courier.courierImg,
            courierName: courier.courierName,
            courierSite: courier.courierSite,
          }}
          className="btn btn-danger w-100 text-center shadow-sm text-sm font-weight-bold"
        >
          Auto Book
        </Link>
      </div>
      <div className="px-1 py-4">
       <button className="hover-pointer" type="button" class="btn btn-danger" onClick={courierDelete}>
       <i class="bi bi-archive-fill" ></i>
       </button> 
       
      </div>
    </div>
  </div>
</div>

  )
}

export default Courier