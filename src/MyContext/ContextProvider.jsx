import React, { useState } from "react";
import EmployeeContext from "./EmployeeContext";

export const ContextProvider = ({ children }) => {
    const [employeeData, setEmployeeData] = useState(null);
    return (
        <EmployeeContext.Provider value={{ employeeData, setEmployeeData }}>
            {children}
        </EmployeeContext.Provider>
    );
};

