import { useEffect, useState } from "react"
import { ReimInterface } from "../../interfaces/ReimInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { store } from "../../globalData/store"
import { AllReim } from "./AllReim"
import "../../App.css"

export const AllReimContainer: React.FC = () => {
    const [allreims, setAllReims] = useState<ReimInterface[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        getAllReims()
    })

    const getAllReims = async() => {
        const response = await axios.get("http://localhost:8080/reimbursement", {withCredentials:true})

        setAllReims(response.data)

        console.log(response.data)
    }

    return(
        <div className="container-fluid vh-100 vw-100 background ">
            
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
                    <AllReim reims={allreims}></AllReim>
                </div>
            
           
        </div>
    )
}