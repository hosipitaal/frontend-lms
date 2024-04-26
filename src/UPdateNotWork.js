import React from "react";
import axios from 'axios';
import { useState,useEffect ,useContext} from "react";
import { useNavigate, useParams } from "react-router";
import { ContextProvider } from "./MyContext/ContextProvider";
import EmployeeContext from "./MyContext/EmployeeContext";



function Updation(){
    const {leave_id} = useParams();
    const {employeeData} = useContext(EmployeeContext)
    
    const [updater, setUpdater] = useState({
        leave_id:leave_id,
        mgr_id:employeeData.mgr_id,
        emp_id:employeeData.emp_id,
        start_date: new Date().toISOString().slice(0,10),
        end_date:new Date().toISOString().slice(0,10),
        daysofleave:0,
        reason:""     
        
    });
    useEffect(()=>{
    
      axios.get("https://localhost:7265/api/Leaves/"+leave_id)
      .then(res=>{
        const {leave_id,mgr_id,emp_id, start_date,end_date,daysofleave,reason } = res.data;
                setUpdater({leave_id,mgr_id,emp_id, start_date:start_date.slice(0, 10),end_date:end_date.slice(0, 10),daysofleave,reason});
               
    })
      .catch(err=>console.error(err));


    },[leave_id])

    const navigate = useNavigate();

    
    
    const handleUpdate = async (e) => {
        e.preventDefault();   
        try {
            console.log(updater); 
            const response = await fetch(`https://localhost:7265/api/Leaves/${leave_id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updater)
            });
            if (!response.ok) {
                const responseBody = await response.text();
                console.error('Failed to update leave data. Response:', responseBody);
                throw new Error('Failed to update leave data');
            }
            const fromDate = new Date(updater.from);
        const toDate = new Date(updater.to);
        const diffTime = Math.abs(toDate - fromDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
        alert("You have applied for an updated leave of " + diffDays + " days");
            navigate('/AllLeaves');
        } catch (error) {
            console.error('Error updating leave data:', error);
        }
    };
    


    return (
        <div>
            <div>
                <form onSubmit={handleUpdate}>
                <div>
    <label htmlFor="name">Manager Id:</label>
    <input type="text" name="name" value={updater.mgr_id}readOnly></input>
</div>
<div>
    <label htmlFor="email">Employee Id:</label>
    <input type="email" name="email" value={updater.emp_id} readOnly ></input>
</div>
{/* <div>
    <label htmlFor="managerName">Manager's Name:</label>
    <input type="text" name="managerName" value={updater.managerName} onChange={e => setUpdater({ ...updater, managerName: e.target.value })}></input>
</div>
<div>
    <label htmlFor="managerEmail">Manager's Email:</label>
    <input type="email" name="managerEmail" value={updater.managerEmail} onChange={e => setUpdater({ ...updater, managerEmail: e.target.value })}></input>
</div> */}
<div>
    <label htmlFor="reason">Reason:</label>
    <textarea name="reason" value={updater.reason} onChange={e => setUpdater({ ...updater, reason: e.target.value })}></textarea>
</div>
<div>
    <label htmlFor="start_date">From:</label>
    <input type="date" name="start_date" value={updater.start_date} onChange={e => setUpdater({ ...updater, from: e.target.value })}></input>
</div>
<div>
    <label htmlFor="end_date">To:</label>
    <input type="date" name="end_date" value={updater.end_date} onChange={e => setUpdater({ ...updater, to: e.target.value })}></input>
</div>


                    <br/>
                    <button >Update</button>
                </form>
            </div>
        </div>
    )
}

export default Updation;