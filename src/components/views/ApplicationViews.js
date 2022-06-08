import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {

        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser)
    

        if (honeyUserObject.staff){
            // return emplyeeViews
            return <EmployeeViews />
        }
        else{
            // return customerView 
            return <CustomerViews />
        }




}

