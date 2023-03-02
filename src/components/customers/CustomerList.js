import { useEffect, useState} from "react"
import { Customer } from "./Customer"
import "./Employees.css"



// passing props 
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    // observe when initial state is done 
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },
        []
    )



    return <article className="Customers">
        {
            // for every employee (.map)
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName} 
                email={customer.email} />)
        }
    </article>
}