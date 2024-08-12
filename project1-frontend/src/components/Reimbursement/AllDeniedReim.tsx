import { useEffect, useState } from "react"
import { ReimInterface } from "../../interfaces/ReimInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { store } from "../../globalData/store"
import { Button, Table } from "react-bootstrap"

export const AllDeniedReim: React.FC<{reims: ReimInterface[]}> = ({reims}) => {
    useEffect(()=>{
        console.log(reims)
    })

    const navigate = useNavigate()

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

    
    return(
        <div className="container">
            <h3 className="mt-4 mb-4"> All Denied User Reimbursements:</h3>

            
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
                           
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    )
}