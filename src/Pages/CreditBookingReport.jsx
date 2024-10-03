import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';

const CreditBookingReport = () => {
  const [data, setData] = useState([]);
  const [searchAwb, setSearchAwb] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [custName, setCustName] = useState("");
  const [custCode, setCustcode] = useState("");
  const [customers, setCustomers] = useState([]);
  //const url = "https://free.dingdong.co.in/";
  const url="https://v2.dingdong.co.in/"
  
  useEffect(() => {
    fetchCustomers();
    
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${url}api/crcust`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching courier names:', error);
    }
  };
const handleCust=(e)=>{
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCustName(selectedOption.value);
    setCustcode(selectedOption.getAttribute('data-custCode'));
    fetchData();
}
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/crbook/search?field[]=crcustCode&value[]=${custCode}&sortBy[]=createdAt&sortOrder[]=desc`);
      console.log(response.data); // Log data to check structure
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };
  const filterDataByDate = () => {
    const filteredData = data.filter(row => {
      const rowDate = new Date(row.createdAt);
      const start = fromDate ? new Date(fromDate) : new Date("1900-01-01");
      const end = toDate ? new Date(toDate) : new Date();
  
      // Set end date time to the end of the day to include entries on that date
      end.setHours(23, 59, 59, 999);
  
      return rowDate >= start && rowDate <= end;
    });
    setData(filteredData);
  };
  const filteredData = data.filter(row => 
    (searchAwb === "" || row.awbno.toLowerCase().includes(searchAwb.toLowerCase()))
  );

  console.log("Filtered Data:", filteredData); // Log filtered data

  const columns = [
    { name: 'Date', selector: row => row.createdAt, sortable: true, csvKey: 'createdAt' },
    { name: 'Sender Name', selector: row => row.crcustName, sortable: true, csvKey: 'crcustName' },
    { name: 'Receiver Name', selector: row => row.toName, sortable: true, csvKey: 'toName' },
    { name: 'Receiver Address', selector: row => row.toAddr, sortable: true, csvKey: 'toAddr' },
    { name: 'Receiver Mobile', selector: row => row.toMob, sortable: true, csvKey: 'toMob' },
    { name: 'Receiver Email', selector: row => row.toEmail, sortable: true, csvKey: 'toEmail' },
    { name: 'Receiver Pincode', selector: row => row.toPincode, sortable: true, csvKey: 'toPincode' },
    { name: 'Airway Bill', selector: row => row.awbno, sortable: true, csvKey: 'awbno' },
    { name: 'Weight', selector: row => row.weight, sortable: true, csvKey: 'weight' },
    { name: 'Quantity', selector: row => row.quantity, sortable: true, csvKey: 'quantity' },
    { name: 'Amount', selector: row => row.amount, sortable: true, csvKey: 'amount' },
    { name: 'Courier', selector: row => row.courier, sortable: true, csvKey: 'courier' },
    {
      name: 'Action',
      cell: row => (
        <div>
          <button
            onClick={() => deleteAirway(row._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const csvHeaders = columns
    .filter(col => col.csvKey) // Filter out columns that don't have a `csvKey`
    .map(col => ({ label: col.name, key: col.csvKey }));

  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/crbook/${id}`);
      toast.success('Deleted Successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete');
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div className="bg-white shadow-lg p-4 rounded-lg container">
      <h1 className="text-center font-weight-bold mb-3">
        Credit Booking Details
      </h1>
      <div className="d-flex justify-content-end mb-3">
        <CSVLink
          data={filteredData}
          headers={csvHeaders}
          filename={"CreditBooking.csv"}
          className="btn btn-primary"
        >
          Download CSV
        </CSVLink>
      </div>
      <div className="row g-3 mb-3">
      <div className="col-auto">
      <label className="form-label">Customer:</label>
        <select
        value={custName}
        onChange={handleCust}
        onClick={handleCust}
        class="form-control "
   >
       <option value='' disabled>Select Customer</option>
       {customers.map((name) => (
       <option key={name._id} value={name.crcustName} data-key={name._id} data-custCode={name.crcustCode} >
       {name.crcustName}
       </option>
        ))}
   </select>
   </div>
        <div className="col-auto">
          <label className="form-label">From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <label className="form-label">To Date:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-auto align-self-end">
          <button
            onClick={filterDataByDate}
            className="btn btn-primary"
          >
            Show Data
          </button>
        </div>
        <div className="col-auto align-self-end">
          <input
            type="text"
            placeholder="Search by Awb No"
            value={searchAwb}
            onChange={(e) => setSearchAwb(e.target.value)}
            className="form-control"
          />
        </div>
       
      </div>
      <div className="flex-grow-1">
        <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5]}
          responsive
          highlightOnHover
          striped
          customStyles={{
            headCells: {
              style: {
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
              },
            },
            cells: {
              style: {
                fontSize: '14px',
                textAlign: 'center',
              },
            },
            rows: {
              style: {
                minHeight: '56px',
              },
            },
          }}
        />
      </div>
    </div>
  </div>
  
  );
};

export default CreditBookingReport;
