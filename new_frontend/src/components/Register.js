import React, { useState } from 'react';
import './Register.css'; 

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

    const handleRegistration = async (e) => {
        e.preventDefault();
        
        const isValidPassword = validatePassword(password);
        if (!isValidPassword) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        const isValidEmail = validateEmail(newuser.emp_email);
        if (!isValidEmail) {
            alert("Invalid email format.");
            return;
        }

        const loginDetails = { emp_id: newuser.emp_id, emp_name: newuser.emp_name, password: password };
    
        try {
           
            const response = await fetch("https://localhost:7265/CheckUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newuser)
            });
            
            const userExists = await response.json();
    
            if (!userExists) {
                alert("Employee does not exist. Registration failed.");
                return;
            }
    
            const accountResponse = await fetch("https://localhost:7265/CheckAccount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newuser)
            });
    
            const accountExists = await accountResponse.json();
    
            if (accountExists) {
                alert("Employee already has an account. Registration failed.");
                return;
            }
    
            const loginResponse = await fetch("https://localhost:7265/api/LoginDetails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginDetails)
            });
    
            if (loginResponse.ok) {
                console.log("Login details posted successfully.");
                setRegister(false);
            } else {
                console.error("Failed to post login details.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    
    const validatePassword = (password) => {
        return password.length >= 8;
    };
    
 
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <form onSubmit={handleRegistration}>
                    <label className="register-label">Employee ID:</label>
                    <input type="text" className="register-input" name="emp_id" onChange={e => setNewUser({ ...newuser, emp_id: e.target.value })} />
                    <label>emp_name</label>
                    <input type="text" className="register-input"  name='emp_name' onChange={e=>setNewUser({...newuser,emp_name:e.target.value})}></input>
                    <label>emp_phone</label>
                    <input type="text" className="register-input"  name='emp_phone' onChange={e=>setNewUser({...newuser,emp_phone:e.target.value})}></input>
                    <label>mgr_id</label>
                    <input  type="text" className="register-input" name='mgr_id' onChange={e=>setNewUser({...newuser,mgr_id:e.target.value})}></input>
                    <label>mgr_name</label>
                    <input  type="text" className="register-input"  name='mgr_name' onChange={e=>setNewUser({...newuser,mgr_name:e.target.value})}></input>
                    <label>emp_email</label>
                    <input  type="email" className="register-input" name='emp_email' onChange={e=>setNewUser({...newuser,emp_email:e.target.value})}></input>
                    
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
