import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [users]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7104/api/Employees");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = (id) => {
    const delReq = new XMLHttpRequest();
    delReq.open("DELETE", `https://localhost:7104/api/Employees/${id}`);
    delReq.onreadystatechange = function() {
      if (delReq.readyState === XMLHttpRequest.DONE) {
        if (delReq.status === 200) {
          console.log("User deleted successfully");
          
          setUsers(users.filter(user => user.id !== id));
        } else {
          
          console.error("Failed to delete user");
        }
      }
    };
    delReq.send();
  };
  

  return (
    <div className="App">
      
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Manager Name</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.managerName}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
