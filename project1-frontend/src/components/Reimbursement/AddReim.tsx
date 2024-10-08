import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import axios from "axios"
import { Alert, AlertLink, Button } from "react-bootstrap"

export const AddReim: React.FC = () => {

    const[errorMessage , setErrorMessage] = useState('')
    const[showAlert, setShowAlert] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const[reim, setReim] = useState({
        amount:0,
        description:"",
        status: "pending",
        userId: store.loggedInUser.userId
    })

    const navigate = useNavigate()

    const validateInputs = async (): Promise<boolean> => {
        if(reim.amount < 0 || !reim.amount){
            setErrorMessage("Amount must be positive")
            setShowAlert(true)
            return false
        }
        if(!reim.description){
            setErrorMessage("Please provide a description of Reimbursement")
            setShowAlert(true)
            return false
        }
        return true
    }

    const storeValues =(input:any) => {

        if(input.target.name ==="amount"){
            setReim((reim)=>({...reim, amount:input.target.value}))
        }else{
            setReim((reim)=>({...reim,description:input.target.value}))
        }
    }


    const add = async () => {
        const response = await axios.post("http://localhost:8080/reimbursement", reim)
        .then((response)=>{
            console.log(response.data)
            setSuccessMessage("Reimbursement Created Successfully")
            setShowSuccessAlert(true)
            
        })
        .catch((error)=>{
            if(error.response && error.response.status ===400){
                setErrorMessage(error.response.data)
            }else{
                setErrorMessage("An unexpected Error Occurred")
            }
            setShowAlert(true);
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background">
            <div className="container border border bg-light text-center w-50 p-4">
                <h3 className="mt-5">Add a new reimbursement</h3>
                <p className="mt-3">Please provide an amount and description for the reimbursement.</p>
                {showAlert && <div className="alert alert-danger">{errorMessage}</div>}
                {showSuccessAlert && <div className="alert alert-success">{successMessage}</div>}
                <div className="form-group mt-4 w-25 mx-auto">
                    <input type="number" className="form-control" placeholder="amount" name="amount" onChange={storeValues}/>
                </div>
                <div className="form-group mt-4 w-75 mx-auto">
                    <textarea name="description" className="form-control" placeholder="description" onChange={storeValues}></textarea>
                </div>
                <Button variant="outline-info" className="m-4" onClick={add}>Add</Button>
                <Button variant="outline-info" className="m-4" onClick={() => navigate("/reim")}>Reimbursements</Button>

                
            </div>
        </div>
    )

}