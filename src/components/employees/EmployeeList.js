import { useEffect, useState} from "react"
import { Employee } from "./Employee"
import "./Employees.css"



// passing props 
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    // observe when iinitial state is done 
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )



    return <article className="employees">
        {
            // for every employee (.map)
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
        }
    </article>
}