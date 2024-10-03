import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import AddCrClient from '../Components/AddCrClient';
import EditCrClient from '../Components/EditCrClient';
const CreditClient = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [custName, setCustName] = useState("");
  const [custAddr, setCustAddr] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custMob, setCustMob] = useState("");
  const [custCode, setCustCode] = useState("");
  const [custPincode, setCustPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const url="https://v2.dingdong.co.in/"
 // const url = "https://free.dingdong.co.in/";
 //const url ="https://allapi-4fmi.onrender.com/";
  
  useEffect(() => {
    fetchData();
  }, []);
  const handleAdd = () => {
    setShowModal1(true);
};
const handleClose = () => {
  setShowModal1(false);
  setShowModal(false);
  setSelectedClients(null);
 };
 const handleEdit = (clients) => {
  setSelectedClients(clients);
  setShowModal(true);
};
  const fetchMobno = async () => {
    try {
      const response = await axios.get(`${url}api/crcust/search?field=crcustMob&value=${custMob}`);
      if (response.data.length > 0) {
        // If the mobile number exists in the database, disable the button
        setIsButtonVisible(false);
        toast.error('Customer detail already added');
      } else {
        // If the mobile number does not exist, enable the button
        setIsButtonVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (custMob.length === 10) {
      fetchMobno();
    } else {
      // Reset button visibility if the mobile number is not fully entered
      setIsButtonVisible(false);
    }
  }, [custMob]);

  const handleCustMob = (e) => {
    setCustMob(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/crcust`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const filteredData = data.filter(row => 
    row.crcustName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
        name: 'Code',
        selector: row => row.crcustCode,
      },
    {
      name: 'Name',
      selector: row => row.crcustName,
    },
    {
      name: 'Address',
      selector: row => row.crcustAddr,
    },
    {
      name: 'Pincode',
      selector: row => row.crcustPincode,
    },
    {
      name: 'Email',
      selector: row => row.crcustEmail,
    },
    {
      name: 'Mobile No',
      selector: row => row.crcustMob,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="d-flex justify-content-between p-2">
            <div className='p-2'> 
          <button
            onClick={() => editAirway(row)}
            class="btn btn-success"
          >
           <i class="bi bi-pencil-square"></i> 
          </button>
          </div>

          <div className='p-2'> 
          <button
            onClick={() => deleteAirway(row._id)}
            class="btn btn-danger"
          >
          <i class="bi bi-trash"></i> 
          </button>
          </div>
        </div>
      ),
    },
  ];

  const saveOrUpdateAirway = async (e) => {
    e.preventDefault();
    if (custName === "" || custAddr === "" || custEmail === "" || custMob === "" || custPincode === "") {
      alert("Enter all Fields");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing) {
        await axios.put(`${url}api/crcust/${editingId}`, {
            crcustCode:custCode,
            crcustName:custName,
            crcustAddr:custAddr,
            crcustEmail:custEmail,
            crcustMob:custMob,
            crcustPincode:custPincode
        });
        toast.success(`Updated ${custName} Successfully`);
      } else {
        await axios.post(`${url}api/crcust`, {
          crcustCode:custCode,
          crcustName:custName,
          crcustAddr:custAddr,
          crcustEmail:custEmail,
          crcustMob:custMob,
          crcustPincode:custPincode
        });
        toast.success(`Saved ${custName} Successfully`);
      }

      setCustName("");
      setCustAddr("");
      setCustEmail("");
      setCustMob("");
      setCustPincode("");
      setCustCode("");
      setIsLoading(false);
      setIsEditing(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const editAirway = (row) => {
    // setCustName(row.custName);
    // setCustAddr(row.custAddr);
    // setCustEmail(row.custEmail);
    // setCustMob(row.custMob);
    // setCustPincode(row.custPincode);
    // setIsEditing(true);
    // setEditingId(row._id);
    handleEdit(row);
  };

  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/crcust/${id}`);
      toast.success('Deleted Successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete');
      console.log(error);
    }
  };

  return (
    <div className='flex'>
      <div className='w-1/2 max-w-lg bg-white shadow-lg p-7 rounded mt-2'>
        <h2 className='font-semibold  mb-2 block text-center'>
          {isEditing ? "Edit Customer Details" : "Add Customer Details"}
        </h2>
        
      </div>

      <div className='w-1/1 pt-4 pl-4 rounded flex flex-col'>
      <div className="d-flex justify-content-between mb-2 p-2">
        <div className='p-2'>
        <input 
          type="text" 
          placeholder="Search by Customer Name" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        </div>
        <div className='p-2'>
        <button type="button" class="btn btn-success" onClick={handleAdd}><i class="bi bi-person-plus-fill"></i></button>
        </div>
        </div>
        <div className="flex-grow">
          <DataTable
            columns={columns}
            data={filteredData}
            selectableRows
            fixedHeader
            pagination
          />
        </div>
      </div>
      {selectedClients && (
                <EditCrClient
                    show={showModal}
                    handleClose={handleClose}
                    clients={selectedClients}
                    
                />
            )}
      <AddCrClient
                show={showModal1}
                handleClose={handleClose}
       />
    </div>
  );
}

export default CreditClient;
