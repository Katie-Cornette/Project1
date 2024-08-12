import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReimInterface } from "../../interfaces/ReimInterface"
import { store } from "../../globalData/store"
import { ApprovedReim } from "./ApprovedReim"
import "../../App.css"

export const ApprovedReimContainer: React.FC = () => {
    const [approvedreims, setApprovedReims] = useState<ReimInterface[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        getAllApprovedReims()
    })

    const getAllApprovedReims = async() => {
        const response = await axios.get("http://localhost:8080/reimbursement/approved/" + store.loggedInUser.userId)

        setApprovedReims(response.data)

        console.log(response.data)
    }

    return(
        <div className="container-fluid vh-100 vw-100 background">
            
            <div className="navbar navbar-dark bg-dark w-100">
                
                <a className="nav-item nav-link text-white ms-4 " href="#"  onClick={() => navigate("/")}>
                    Login
                </a>
                {store.loggedInUser.role==="manager" ? <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/users")}>
                    Users
                </a> : <></>}
                <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/addReim")}>
                    Add Reimbursement
                </a>
            
                {store.loggedInUser.role==="manager"? <a className="nav-item nav-link text-white " href="#" onClick={() => navigate("/reim")}>
                    See Reimbursements
                </a> : <></>}
                {store.loggedInUser.role==="manager"? 
                <a className="nav-item nav-link text-white" href="#" onClick={() => navigate("/allReim")}>
                    Users Reimbursements
                </a>
                :
                <></>
                }
                <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/profile")}>
                    Profile
                </a>
                    
            </div>
            <div className="container containerbackground">
                <ApprovedReim reims={approvedreims}></ApprovedReim>
            </div>
            
            
        </div>
    )
}