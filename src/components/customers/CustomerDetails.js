import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () =>  {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})
    

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers/${customerId}?_expand=user&_embed=customerTickets`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data
                updateCustomer(singleCustomer)
            })
        },
        [customerId]
    )
    return <section className="customer">
    <header className="customer_header">{customer?.user?.fullName}</header>
    <div>Email: {customer?.user?.email}</div>
    </section>
}