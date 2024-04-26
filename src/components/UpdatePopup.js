
import './UpdatePopup.css'
import { useEffect } from 'react';
import axios from 'axios';

import { useContext,useState } from 'react';
import EmployeeContext from '../MyContext/EmployeeContext';

const UpdatePopup = ({currentId,setIsEditClicked,func})=>{

    const {employeeData} = useContext(EmployeeContext)

    const [updater, setUpdater] = useState({
        leave_id:currentId,
        mgr_id:employeeData.mgr_id,
        emp_id:employeeData.emp_id,
        start_date: new Date().toISOString().slice(0,10),
        end_date:new Date().toISOString().slice(0,10),
        daysofleave:0,
        reason:""     
        
    });
    console.log(currentId)


    useEffect(()=>{
    
        axios.get("https://localhost:7265/api/Leaves/"+currentId)
        .then(res=>{
          const {leave_id,mgr_id,emp_id, start_date,end_date,daysofleave,reason } = res.data;
                  setUpdater({leave_id,mgr_id,emp_id, start_date:start_date.slice(0, 10),end_date:end_date.slice(0, 10),daysofleave,reason});
                 
      })
        .catch(err=>console.error(err));
  
  
      },[currentId])



    const handleUpdate = async (e) => {
        e.preventDefault();   
        try {
            console.log(updater); 
            const response = await fetch(`https://localhost:7265/api/Leaves/${updater.leave_id}`, {
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
            const fromDate = new Date(updater.start_date);
            const toDate = new Date(updater.end_date);
            const diffTime = Math.abs(toDate - fromDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
        alert("You have applied for an updated leave of " + diffDays + " days");
        func();
           
        } catch (error) {
            console.error('Error updating leave data:', error);
        }


        setIsEditClicked(false)

    };

    const handleStartDateChange = (e) => {
        setUpdater({ ...updater, start_date: e.target.value });
    };

    const handleEndDateChange = (e) => {
        setUpdater({ ...updater, end_date: e.target.value });
    };



    return(
        <div className='update-container'>
            <form onSubmit={handleUpdate}>
            <div>
    <label htmlFor="mgr_id">Manager Id:</label>
    <input type="text" name="mgr_id" value={updater.mgr_id}readOnly></input>
</div>
<div>
    <label htmlFor="emp_id">Employee Id:</label>
    <input type="emp_id" name="emp_id" value={updater.emp_id} readOnly ></input>
</div>
<div>
    <label htmlFor="reason">Reason:</label>
    <textarea name="reason" value={updater.reason} onChange={e => setUpdater({ ...updater, reason: e.target.value })}></textarea>
</div>
<div>
    <label htmlFor="start_date">From:</label>
    <input type="date" name="start_date" value={updater.start_date} onChange={handleStartDateChange}></input>
</div>
<div>
    <label htmlFor="end_date">To:</label>
    <input type="date" name="end_date" value={updater.end_date} onChange={handleEndDateChange}></input>
</div>

                <div>
                    <button >
                        Update
                    </button>
                    <button type='button' onClick={()=>setIsEditClicked(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePopup;