import { UserInterface } from "./UserInterface";

export interface ReimInterface {
    reimbld?: number, 
    amount: number, 
    description: string, 
    status: string,
    user: UserInterface
}