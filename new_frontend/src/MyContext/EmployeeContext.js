import { createContext } from "react";


const EmployeeContext = createContext({
    employeeData:null,
    setEmployeeData:()=>null
});

export default EmployeeContext;