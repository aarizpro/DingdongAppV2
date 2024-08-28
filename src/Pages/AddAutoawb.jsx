import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const AddAutoawb = () => {
  const [airwayBill, setAirwayBill] = useState("");
  const [courierName, setCourierName] = useState("");
  const [courierNames, setCourierNames] = useState([]);
  const [awbStatus, setAwbStatus] = useState("Pending");
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null); // State to hold selected file
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const url = "http://3.111.150.119/";
  //const url ="https://allapi-4fmi.onrender.com/";
   useEffect(() => {
    fetchData();
    fetchCourierNames();
  }, []);

  const fetchCourierNames = async () => {
    try {
      const response = await axios.get(`${url}api/courier`);
      setCourierNames(response.data);
    } catch (error) {
      console.error('Error fetching courier names:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/autoawb`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const handleAwb = (e) => {
    setAirwayBill(e.target.value);
  };

  const uploadCSV = () => {
    if (!file) {
      toast.error("Please choose a CSV file");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const csvData = results.data;
        try {
          await axios.post(`${url}api/autoawb/upload`, csvData); // Endpoint to handle CSV data
          toast.success("File uploaded successfully");
          fetchData(); // Refresh the DataTable after upload
        } catch (error) {
          toast.error("Error uploading CSV data");
          console.error(error);
        }
      }
    });
  };
  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/autoawb/${id}`); // Assuming DELETE request works like this
      toast.success("Record deleted successfully");
      fetchData(); // Refresh data after deletion
    } catch (error) {
      toast.error("Error deleting record");
      console.error(error);
    }
  };
  const editAirway = (row) => {
    setIsEditing(true); // Enable editing mode
    setEditingId(row._id); // Store the ID of the item being edited
    setAirwayBill(row.airwayBill); // Populate the form with the selected record
    setCourierName(row.courierName);
    setAwbStatus(row.awbStatus);
  };  
  const saveRecord = async () => {
    const record = {
      airwayBill,
      courierName,
      awbStatus,
    };
  
    // Check for duplicates in the frontend data array
    const duplicate = data.some((item) => item.airwayBill === airwayBill);
    if (duplicate) {
      toast.error("Duplicate Airway Bill detected");
      return;
    }
  
    try {
      if (isEditing) {
        // If editing mode, update the record
        await axios.put(`${url}api/autoawb/${editingId}`, record); // Assuming PUT endpoint
        toast.success("Record updated successfully");
      } else {
        // If not editing, save a new record
        await axios.post(`${url}api/autoawb/save`, record);
        toast.success("Record saved successfully");
      }
  
      fetchData(); // Refresh DataTable
      // Clear form fields after saving
      setAirwayBill("");
      
      setAwbStatus("Pending");
      setIsEditing(false); // Exit editing mode
      setEditingId(null); // Clear editing ID
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Airway Bill already exists");
      } else {
        toast.error("Error saving record");
      }
      console.error(error);
    }
  };
  

  const columns = [
    {
      name: 'Airway Bill',
      selector: row => row.airwayBill,
    },
    {
      name: 'Courier Name',
      selector: row => row.courierName,
    },
    {
      name: 'Status',
      selector: row => row.awbStatus,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="d-flex justify-content-between p-2">
            <div className='p-2'> 
          <button
            onClick={() => editAirway(row)}
            className='btn btn-success'
          >
             <i class="bi bi-pencil-square"></i> 
          </button>
          </div>

<div className='p-2'> 
          <button
            onClick={() => deleteAirway(row._id)}
            className='btn btn-danger'
          >
           <i class="bi bi-trash"></i> 
          </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="d-flex">
    {/* Left Side - Form */}
    <div className="w-50 max-w-lg bg-white shadow-lg p-4 rounded mt-2">
      <h2 className="font-weight-bold text-center mb-4">
        {isEditing ? 'Edit Auto Booking Airway Bill' : 'Add Auto Booking Airway Bill'}
      </h2>
      <form>
        <div className="form-group">
          <label>Courier Name</label>
          <select
            value={courierName}
            onChange={(e) => setCourierName(e.target.value)}
            className="form-control"
          >
            <option value='' disabled>Select Courier Name</option>
            {courierNames.map((name) => (
              <option key={name._id} value={name.courierName}>
                {name.courierName}
              </option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label>Status</label>
          <input
            type="text"
            value={awbStatus}
            onChange={(e) => setAwbStatus(e.target.value)}
            placeholder="Enter Status"
            className="form-control"
          />
        </div>
  
        <div className="form-group">
          <label>Airway Bill Number</label>
          <input
            type="text"
            value={airwayBill}
            onChange={handleAwb}
            placeholder="Enter Airway Bill Number"
            className="form-control"
          />
        </div>
  
        <div className="d-flex justify-content-between p-2">
          <button
            type="button"
            onClick={saveRecord}
            className="btn btn-success w-100 mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={uploadCSV}
            className="btn btn-primary w-100 ml-2"
          >
            Upload CSV
          </button>
        </div>
  
        <div className="form-group mt-3">
          <label>Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          />
        </div>
      </form>
    </div>
  
    {/* Right Side - Table */}
    <div className="w-50 pt-4 pl-4">
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        fixedHeader
        pagination
      />
    </div>
  </div>
  
  );
};

export default AddAutoawb;
