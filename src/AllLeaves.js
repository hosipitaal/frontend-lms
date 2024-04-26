import React, { useContext ,useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import EmployeeContext from "./MyContext/EmployeeContext";
import Navbar from "./components/Navbar";
import { Link } from 'react-router-dom';
import UpdatePopup from "./components/UpdatePopup";
import "./AllLeaves.css"; 

function AllLeaves(){
    const location = useLocation();
    const data = location.state && location.state.data;
    const [isEditCLicked,setIsEditClicked] = useState(false);
    
    const {employeeData} = useContext(EmployeeContext);
    const [userleaves, setUserLeaves] = useState([]);
    const [currentId,setCurrentId] = useState(0);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        fetchData();
    },[employeeData]);

    const fetchData = async () => {
        try {
          const response = await fetch(`https://localhost:7265/api/Leaves/getleavedetails/${employeeData.emp_id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setUserLeaves(data);
          console.log(data);
        } catch (error) {
          console.error(error.message);
        }
    };

    const handleEdit = (leave_id)=>{
        setCurrentId(leave_id);
        setIsEditClicked(true);
    };

    const handleDelete = (leave_id) => {
        const delReq = new XMLHttpRequest();
        delReq.open("DELETE", `https://localhost:7265/api/Leaves/${leave_id}`);
        delReq.onreadystatechange = function() {
          if (delReq.readyState === XMLHttpRequest.DONE) {
            if (delReq.status === 204) {
              console.log("User deleted successfully");          
              setUserLeaves(userleaves.filter(leave => leave.leave_id !== leave_id));
              fetchData();
            } else {
              console.error("Failed to delete user");
            }
          }
        };
        delReq.send();
    };

    const filter = userleaves.filter(leave => leave.reason.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div>
            <Navbar />
            {isEditCLicked && <UpdatePopup currentId={currentId} setIsEditClicked={setIsEditClicked} func ={fetchData} />}

            <div id="search_bar">
                <input type="text" onChange={e => setSearchText(e.target.value)} placeholder="Search" />
            </div>

            <div className='container'>
                <table id="leaves">
                    <thead>
                        <tr>
                            <th>Manager Id</th>
                            <th>Reason</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Days</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.map(leave => (
                            <tr key={leave.leave_id}>
                                <td>{leave.mgr_id}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.start_date.slice(0,10)}</td>
                                <td>{leave.end_date.slice(0,10)}</td>
                                <td>{leave.daysofleave}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(leave.leave_id)}>Delete</button>
                                    <button className="edit-btn" onClick={() => handleEdit(leave.leave_id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllLeaves;
