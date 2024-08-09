import { useEffect } from "react"
import { ReimInterface } from "../../interfaces/ReimInterface"
import { store } from "../../globalData/store"
import { Button, Table } from "react-bootstrap"

export const Reim: React.FC<{reims: ReimInterface[]}> = ({reims}) => {
    //useEffect(()=>{
        //console.log(reims)
    //}, [])

    useEffect(() => {
        console.log('Reimbursements data:', reims);
        reims.forEach(reim => console.log('Reim ID:', reim.reimbld));
    }, [reims]);
    return(
        <div className="container">
            <h3>{store.loggedInUser.firstname}'s Reimbursements:</h3>
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
                        <tr key ={reim.reimbld}>
                            <td>{reim.reimbld}</td>
                            <td>{reim.amount}</td>
                            <td>{reim.description}</td>
                            <td>{reim.status}</td>
                            <td>
                                <Button variant="outline-success"> Approve</Button>
                                <Button variant="outline-danger">Deny</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    )

}
