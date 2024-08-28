import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCourier = () => {
  const [cname, setCname] = useState("");
  const [csite, setCsite] = useState("");
  const [cimgurl, setCimgurl] = useState("");
  const [cdesc, setCdesc] = useState("");
  const [file, setFile] = useState(null); // Add state for file
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:5000/";
  const url1 = "http://localhost:5000/";
 //const url ="https://allapi-4fmi.onrender.com/";
 const saveCourier = async (e) => {
    e.preventDefault();
    if (cname === "" || csite === "" || cimgurl === "" || cdesc === "") {
      alert("Enter all Fields");
      return;
    }
    try {
      setIsloading(true);
      const response = await axios.post(`${url}api/courier`, {
        courierName: cname,
        courierSite: csite,
        courierImg: cimgurl,
        courierDesc: cdesc
      });
      toast.success(`Saved ${cname} Successfully..`);
      setIsloading(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsloading(false);
    }
  };

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
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setCimgurl(response.data); // Ensure you are setting a valid string
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("File upload failed");
      console.log(error);
    }
  };

  return (
    <div>
  <div className="card mx-auto mt-4 p-4 shadow-lg" style={{ maxWidth: '40rem' }}>
    <h2 className="text-center font-weight-bold mb-3">Create New Courier</h2>
    <form onSubmit={saveCourier}>
      <div className="mb-3">
        <label>Courier Name</label>
        <input
          type="text"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
          placeholder="Enter Courier Name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Courier Web Address</label>
        <input
          type="text"
          value={csite}
          onChange={(e) => setCsite(e.target.value)}
          placeholder="Enter Courier Website"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Upload File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
        />
        <button
          type="button"
          onClick={uploadFile}
          className="btn btn-primary w-100 mt-2"
        >
          Upload
        </button>
      </div>
      <div className="mb-3">
        <label>Courier Image URL</label>
        <input
          type="text"
          value={cimgurl}
          onChange={(e) => setCimgurl(e.target.value)}
          placeholder="Enter Courier Image URL"
          readOnly
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Courier Description</label>
        <input
          type="text"
          value={cdesc}
          onChange={(e) => setCdesc(e.target.value)}
          placeholder="Enter Courier Description"
          className="form-control"
        />
      </div>
      <div>
        {!isloading && (
          <button className="btn btn-success w-100 mt-3">
            Save
          </button>
        )}
      </div>
    </form>
  </div>
</div>

  );
};

export default AddCourier;
