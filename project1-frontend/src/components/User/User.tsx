import { useEffect, useState } from "react"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import { Button, Table } from "react-bootstrap"

export const User: React.FC<{users: UserInterface[]}> = ({users}) => {
    useEffect(()=>{
        console.log(users)

    })
    const[errorMessage, setErrorMessage] = useState('')
    const[showAlert, setShowAlert] = useState(false)



    const [reimOptions, setReimOptions] = useState<boolean>(false)
    const [newDescription, setNewDecription] = useState<string>("")
    


    const [selectedUser, setSelectedUser] = useState<UserInterface>({
        userId:0,
        firstName:"",
        lastName: "",
        username:"default_user",
        role:""
    })
    
    const [userOptions, setUserOptions] = useState<boolean>(false)
    const[newRole, setNewRole] = useState<string>("")

    const selectUserData = (user:UserInterface) => {
        setSelectedUser(user)
        console.log(selectedUser.userId)
        setUserOptions(!userOptions)

    }

    const deleteUser = async(user: UserInterface) => {
        const response = await axios.delete("http://localhost:8080/users/" + user.userId, {withCredentials:true})
    }

    const updateUserRole = async() => {
        console.log(newRole)
        if(newRole){
            const response = await axios.patch("http://localhost:8080/users/" + selectedUser.userId, newRole, {
                headers: {"Content-Type" : "text/plain", withCredentials:true}
            })
            console.log(response)
        }
    }
    const cancelRole = () => {
        console.log("Button was clicked!!!")
        setUserOptions(false)
    }




    return(
        <div className="container containerbackground">
            <h3 className="m-5">Welcome Admin! All Users: </h3>
        
            {userOptions?
                <div className="form-group w-25 mx-auto ">
                    <p className="m-3">{selectedUser.role}</p>
                    <input className="m-2 form-control" type="text" placeholder="role" onChange={(input)=>{
                        setNewRole(input.target.value)
                    }}/>
                    <Button variant = "outline-success" className="m-2" onClick={updateUserRole}>Submit</Button>
                    <Button variant = "outline-danger" className="m-2" onClick={cancelRole}>Delete</Button>
                </div>
                :
                <></>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key ={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="danger" className="m-2" onClick={()=>{deleteUser(user)}}>Fire User</Button>
                                <Button variant="info" className="m-2" onClick={()=>{selectUserData(user)}}> Update User</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}