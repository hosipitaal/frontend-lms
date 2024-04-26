import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeContext from "./MyContext/EmployeeContext";
import './ApplyLeave.css'

function ApplyLeave() {
    const location = useLocation();
    const data = location.state && location.state.data;
    const { employeeData } = useContext(EmployeeContext);

    let [reason, setReason] = useState('');
    let [start_date, setEmpFrom] = useState(new Date().toISOString().split('T')[0]);
    let [end_date, setEmpTo] = useState(new Date().toISOString().split('T')[0]);
    let [leaveApplied, setLeaveApplied] = useState(false);
    let emp_id = data.emp_id;
    let mgr_id = data.mgr_id;
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        // if (!reason) {
        //     alert("Please provide a reason for leave.");
        //     return;
        // }

       
        const today = new Date().toISOString().split('T')[0];
        if (start_date < today || end_date < today) {
            alert("Start and end dates cannot be before today's date.");
            return;
        }

       
        if (start_date > end_date) {
            alert("End date cannot be before start date.");
            return;
        }

        const vals = { mgr_id, emp_id, start_date, end_date, reason };

        fetch("https://localhost:7265/api/Leaves", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vals)
        }).then(() => {
            setLeaveApplied(true); 
            console.log("Leave request successful");
        }).catch((e) => {
            console.log(e);
        })

    }

    if (employeeData) {
        return (
            <div>
                <Navbar></Navbar>

                <div>
                    <h1>Apply Leave</h1>
                    <form onSubmit={handleSubmit}>

                        <label>Employee Id:</label><input type="text" value={employeeData.emp_id} readOnly></input>
                        <label>Name:</label><input type="text" value={data.emp_name} readOnly></input>
                        <br />
                        <label>Email:</label><input type="text" value={data.emp_email} readOnly></input>
                        <label>Phone Number:</label><input type="text" value={data.emp_phone} readOnly></input>
                        <br />
                        <label>Manager Name:</label><input type="text" value={data.mgr_name} readOnly></input>
                        <div>
                            <label>Reason for Leave</label>
                            <textarea value={reason} onChange={(e) => (setReason(e.target.value))} />
                        </div>

                        <div>
                            <label>From</label>
                            <input type='date' value={start_date} onChange={(e) => (setEmpFrom(e.target.value))} />
                        </div>

                        <div>
                            <label>To</label>
                            <input type='date' value={end_date} onChange={(e) => (setEmpTo(e.target.value))} />
                        </div>

                        <button type='submit'>Submit</button>
                        {leaveApplied && <p style={{ color: "green" }}>Leave request successful</p>}
                    </form>

                </div>
            </div>
        );
    }

    else {
        return (
            <h1>Logged Out...</h1>
        )
    }
}
export default ApplyLeave;
