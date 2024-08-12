import { Alert, Button, Table } from "react-bootstrap"
import { store } from "../../globalData/store"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ReimInterface } from "../../interfaces/ReimInterface"
import axios from "axios"

export const PendingReim: React.FC<{reims: ReimInterface[]}> = ({reims}) => {
    
    useEffect(()=>{
        console.log(reims)
    })

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

    const validateInputs = async (): Promise<boolean> => {
          
        if (selectedReim.status === "approved" || selectedReim.status === "denied") {
            setErrorMessage("Can not change the reimbursement description since it is already " + selectedReim.status)
            setShowAlert(true)
            return false
        }
        

        return true
    };

    const [reimOptions, setReimOptions] = useState<boolean>(false)
    const [newDescription, setNewDecription] = useState<string>("")
    
    const selectReimData = (reim:ReimInterface) => {
        setSelectedReim(reim)
        setReimOptions(!reimOptions)

    }

    const updateDescription = async() => {
        if(newDescription){
            const response = await axios.patch("http://localhost:8080/reimbursement/" + selectedReim.reimbld, newDescription, {
                headers: {"Content-Type": "text/plain"}
            })
            .catch((error)=>{
                if(error.response && error.response.status === 400){
                    setErrorMessage(error.response.data)
                } else {
                    setErrorMessage("An unexpected error occurred")
                }
                setShowAlert(true);
            })
            setReimOptions(!reimOptions)
            console.log(response)
        }
        else{
            setErrorMessage("Please provide a description")
            setShowAlert(true)
        }
    }

    const cancelDescription = () => {
        console.log("Button was clicked!!!")
        setReimOptions(false)
    }

    
    return(
        <div className="container">
            <h3 className="mt-4 mb-4">{store.loggedInUser.firstname}'s Reimbursements:</h3>

            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {errorMessage}
                </Alert>
            )}

            {reimOptions?
                <div className="form-group mt-4">
                    <p className="m-3">{selectedReim.description}</p>
                    <input className="m-2 form-control" type="text" placeholder="new description" onChange={(input)=>{
                        setNewDecription(input.target.value)
                    }}/>
                    <Button  variant ="outline-success" className="m-2" onClick={updateDescription}>Submit</Button>
                    <Button  variant="outline-danger" className="m-2" onClick={cancelDescription}>Delete</Button>
                    
                </div>
                :
                <></>
                
            }
            
            <div className="navbar navbar-dark bg-dark">
                
                <a className="nav-item nav-link text-white ms-4" href="#">
                    See: 
                </a>
                <a className="nav-item nav-link text-white " href="#" onClick={() => navigate("/pendingReim")}>
                    Pending
                </a>
                <a className="nav-item nav-link text-white" href="#" onClick={() => navigate("/approvedReim")}>
                    Approved
                </a>
                <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/deniedReim")}>
                    Denied
                </a>
                <a className="nav-item nav-link text-white me-4" href="#" onClick={() => navigate("/reim")}>
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
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {reims.map((reim, index)=>(
                        <tr key ={reim.reimbld} onClick={()=>{selectReimData(reim)}}>
                            <td>{reim.reimbld}</td>
                            <td>{reim.amount}</td>
                            <td>{reim.description}</td>
                            <td>{reim.status}</td>
                            <td>
                                
                                <Button variant="info" className="m-2"> Update</Button>
                                    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    )

}