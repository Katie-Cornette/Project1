import { useEffect, useState } from "react"
import { ReimInterface } from "../../interfaces/ReimInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { store } from "../../globalData/store"
import { Alert, Button, Table } from "react-bootstrap"
import { UserInterface } from "../../interfaces/UserInterface"

export const AllReim: React.FC<{reims: ReimInterface[]}> = ({reims}) => {
    useEffect(()=>{
        console.log(reims)
    } )

    const navigate = useNavigate()
    const[errorMessage, setErrorMessage] = useState('')
    const[showAlert, setShowAlert] = useState(false)

    const [selectedReim, setSelectedReim] = useState<ReimInterface>({
        reimbld:0,
        amount:0,
        description:"",
        status:"",
        user:  {
            userId: 0,
            firstName: "",
            lastName: "",
            username: "",
            role: ""
        }
    })

    const approveReim  = async(reim: ReimInterface) => {
        console.log("button approved was clicked")
        console.log("reim id: " + reim.reimbld)
        const response = await axios.patch("http://localhost:8080/reimbursement/pending/" + reim.reimbld, "approved", {
            headers: {"Content-Type" : "text/plain", withCredentials:true}
        })
        
    }
    const deniedReim  = async(reim: ReimInterface) => {
        console.log("button denied was clicked")
        console.log("reim id: " + reim.reimbld)
        const response = await axios.patch("http://localhost:8080/reimbursement/pending/" + reim.reimbld, "denied", {
            headers: {"Content-Type" : "text/plain", withCredentials:true}
        })
        
    }

    
    return(
        <div className="container ">
            <h3 className="mt-4 mb-4">Users Reimbursements:</h3>

            
            <div className="navbar navbar-dark bg-dark">
                
                <a className="nav-item nav-link text-white ms-4" href="#">
                    See: 
                </a>
                <a className="nav-item nav-link text-white " href="#" onClick={() => navigate("/allPending")}>
                    Pending
                </a>
                <a className="nav-item nav-link text-white" href="#" onClick={() => navigate("/allApproved")}>
                    Approved
                </a>
                <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/allDenied")}>
                    Denied
                </a>
                <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/allReim")}>
                    All
                </a>
            </div>

            
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>User First name</th>
                        <th>User Last name</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {reims.map((reim, index)=>(
                        <tr key ={reim.reimbld}>
                            <td>{reim.reimbld}</td>
                            <td>{reim.amount}</td>
                            <td>{reim.description}</td>
                            <td>{reim.status}</td>
                            <td>{reim.user.firstName}</td>
                            <td>{reim.user.lastName}</td>
                            <td>
                                {reim.status === "pending" ?(
                                    <div>
                                        <Button variant="success m-2" className="me-4" onClick={()=>{approveReim(reim)}}> Approve</Button>
                                        <Button variant="danger me-2" onClick={()=>{deniedReim(reim)}}>Deny</Button>
                                    </div>) 
                                : <></>
                                }   
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    )
}