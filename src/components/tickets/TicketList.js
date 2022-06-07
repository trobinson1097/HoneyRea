import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    // get honey user object out of local storage 
    //creat a string then convert to json using parse 
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    

    useEffect(
        () => {
            const searchedTickets = tickets.filter (ticket => { 
                return ticket.description.toLowerCase().includes(searchTermState.toLowerCase())
            })
        setFiltered(searchedTickets)
        },
        [ searchTermState ]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )


    useEffect(
        () => {
            //console.log("Initial state of tickets", tickets) // View the initial state of tickets
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
                // for employee
            }
            else {                                      // condition 
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
                // for customers
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
        [openOnly]
    )

return <>
    {
        honeyUserObject.staff
            ? <>
                <button onClick={() => { setEmergency(true) }} className="button">Emergency Tickets</button>
                <button onClick={() => { setEmergency(false) }} className="button">All Tickets</button>
            </>
            : <>
                <button onClick={() => navigate("/ticket/create")} className="button">Create Ticket</button>
                <button onClick={() => updateOpenOnly(true)}className="button">Open Ticket</button>
                <button onClick={() => updateOpenOnly(false)}className="button">All my Tickets</button>
            </>
    }

    <h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => {
                    return <section className="ticket">
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "YEE" : "no"}</footer>
                    </section>
                }
            )
        }
    </article>
</>
}
