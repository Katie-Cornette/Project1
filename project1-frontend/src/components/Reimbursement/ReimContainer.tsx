import { useEffect, useState } from "react"
import { ReimInterface } from "../../interfaces/ReimInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { store } from "../../globalData/store"
import { Button } from "react-bootstrap"
import { Reim } from "./Reim"

export const ReimContainer: React.FC = () => {

    const [reims, setReims] = useState<ReimInterface[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        getAllReims()
    })

    const getAllReims = async() => {
        const response = await axios.get("http://localhost:8080/reimbursement/" + store.loggedInUser.userId)

        setReims(response.data)

        console.log(response.data)
    }

    return(
        <div className="container">
            
            <div className="navbar navbar-dark bg-dark">
                <button className="nav" onClick={()=>navigate("/")}>Back to Login</button>
                <button className="nav" onClick={()=>navigate("/addReim")}>Add new Reimbursement</button>
                <button>Profile</button>
                {store.loggedInUser.role === "manager" ? <button onClick={()=>navigate("/users")}>Users</button> : <></>}
            </div>

            <Reim reims={reims}></Reim>
        </div>
    )
}