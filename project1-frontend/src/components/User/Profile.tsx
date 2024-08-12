import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const Profile: React.FC = () => {

    const navigate = useNavigate()
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 background">
            <div className="container border border bg-light text-center w-50 p-4">
            <Form>
                    <Form.Group className="mb-3 w-50 mx-auto">
                        <Form.Label className="fs-5">First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={store.loggedInUser.firstname} 
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 w-50 mx-auto">
                        <Form.Label className="fs-5"> Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={store.loggedInUser.lastname} 
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 w-50 mx-auto">
                        <Form.Label className="fs-5">Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={store.loggedInUser.username} 
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-4 w-50 mx-auto">
                        <Form.Label className="fs-5">Role</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={store.loggedInUser.role} 
                            readOnly
                        />
                    </Form.Group>
                </Form>
            
            {store.loggedInUser.role === "manager" ?
                <Button variant="outline-info" className="m-4" onClick={() => navigate("/users")}>Back</Button>:
                <Button variant="outline-info" className="m-4" onClick={() => navigate("/reim")}>Back</Button>

            
            }
            </div>
          

            
        </div>
    )
}