import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCrClient = ({show, handleClose}) => {
    //const url = "https://free.dingdong.co.in/";
    const url="https://v2.dingdong.co.in/"
    const [custName, setCustName] = useState('');
    const [custCode, setCustCode] = useState('');
    const [custMob, setCustMob] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custAddr, setCustAddr] = useState('');
    const [custPincode, setCustPincode] = useState('');
    const handleSave = async () => {
        try {
            const newTeacher = {
                crcustCode:custCode,
                crcustName:custName,
                crcustAddr:custAddr,
                crcustMob:custMob,
                crcustEmail:custEmail,
                crcustPincode:custPincode
            };

            await axios.post(`${url}api/crcust`, newTeacher);
            toast.success('Customer added successfully');
           
           
        } catch (error) {
           toast.error('Failed to add Customer');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Staff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group>
                        <Form.Label>Customer Code</Form.Label>
                        <Form.Control type="text" value={custCode}  onChange={(e) => setCustCode(e.target.value.toUpperCase())}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" value={custName}  onChange={(e) => setCustName(e.target.value.toUpperCase())}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Address</Form.Label>
                        <Form.Control type="text" value={custAddr} onChange={(e) => setCustAddr(e.target.value.toUpperCase())} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Mobile</Form.Label>
                        <Form.Control type="text" value={custMob} onChange={(e) => setCustMob(e.target.value.toUpperCase())} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Pincode"
                            value={custPincode}
                            onChange={(e) => setCustPincode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Customer Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            value={custEmail}
                            onChange={(e) => setCustEmail(e.target.value)}
                        />
                    </Form.Group>
                   
                   
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                   Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCrClient;
