import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { AppBar } from "../components/AppBar"


export const Dashboard = () => {
    return <div>
        <AppBar />
        <div className="m-8">
            <Balance  />
            <Users />
        </div>
    </div>
}