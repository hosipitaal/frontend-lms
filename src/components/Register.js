// Register.js

import React, { useState } from 'react';
import './Registration.css'; // Import the CSS file

function Register({ setRegister }) {
    const [newuser, setNewUser] = useState({
        emp_id: 0,
        emp_name: "",
        emp_phone: "",
        mgr_id: 0,
        mgr_name: "",
        emp_email: "",
        reason: ""
    });

    const [password, setPassword] = useState("");

    const loginDetails = { emp_id, emp_name, password };

    const handleRegistration = async (e) => {
        e.preventDefault();
        fetch("https://localhost:7265/api/Employees", { // Don't forget to change ut to the right api url dumbooo
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newuser)
        }).then(() => {
            console.log("User created, now inserting login details...");
            fetch("", { // Here too
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginDetails)
            }).then(() => {
                console.log("Login details posted successfully.");
                setRegister(false);
            })
        })
    }

    return (
        <div className="register-container">
            <div className="register-form">
                <form onSubmit={handleRegistration}>
                    <label className="register-label">Employee ID:</label>
                    <input type="text" className="register-input" name="emp_id" onChange={e => setNewUser({ ...newuser, emp_id: e.target.value })} />
                    <label>emp_name</label>
                    <input type="text" className="register-input"  name='emp_name' onChange={e=>setnewuser({...newuser,emp_name:e.target.value})}></input>
                    <label>emp_phone</label>
                    <input type="text" className="register-input"  name='emp_phone' onChange={e=>setnewuser({...newuser,emp_phone:e.target.value})}></input>
                    <label>mgr_id</label>
                    <input  type="text" className="register-input" name='mgr_id' onChange={e=>setnewuser({...newuser,mgr_id:e.target.value})}></input>
                    <label>mgr_name</label>
                    <input  type="text" className="register-input"  name='mgr_name' onChange={e=>setnewuser({...newuser,mgr_name:e.target.value})}></input>
                    <label>emp_email</label>
                    <input  type="email" className="register-input" name='emp_email' onChange={e=>setnewuser({...newuser,emp_email:e.target.value})}></input>
                    
                    <label className="register-label">Password:</label>
                    <input type="password" className="register-input" name="password" onChange={e => setPassword(e.target.value)} />

                    <button className="register-button" type="submit">Register</button>
                </form>
                <button className="register-button" onClick={() => setRegister(false)}>Back</button>
            </div>
        </div>
    );
}

export default Register;
