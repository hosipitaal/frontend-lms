import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import EmployeeContext from "./MyContext/EmployeeContext";
import "./Login.css"; 
import Register from "./components/Register";

function Login() {
  const [emp_name, setEmpName] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false); 
  const [register, setRegister]=useState(false);
  const history = useHistory();
  const { setEmployeeData } = useContext(EmployeeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    let vals = { emp_name, password };

    try {
      const response = await fetch("https://localhost:7265/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vals)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert("logged in successfully");
      console.log(data);
      setEmployeeData(data)
      history.push({
        pathname: "/ApplyLeave",
        state: { data: data }
      });

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoginFailed(true); 
    }
  }

  const handleClosePopup = () => {
    setLoginFailed(false); 
  }
  

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input type="text" value={emp_name} placeholder="Employee name" name="emp_name" onChange={e => setEmpName(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="password" value={password} placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="button-container">
            <button>Login</button>
          </div>
        </form>
        <br/>
        <button className="Register" onClick={()=>setRegister(true)}>Register</button>
        {register&&
          <Register setRegister={setRegister}></Register>
        }
      </div>
      {loginFailed && (
        <div className="popup">
          <div className="popup-content">
            <button className="close" onClick={handleClosePopup}>&times;</button>
            <p>Invalid login credentials. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login;