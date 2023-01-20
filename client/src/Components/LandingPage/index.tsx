import { useEffect, useState} from "react"
import { Login } from "../Login";
import { Register } from "../Register";

interface IProps {
    isAuthenticated : boolean;
    setIsAuthenticated : Function
}

export const LandingPage = ({isAuthenticated, setIsAuthenticated} : IProps) => {

    return (<div>
        <h4>Menuize</h4>
        <Login setIsAuthenticated={setIsAuthenticated}/>
        <Register setIsAuthenticated={setIsAuthenticated}/>
    </div>)
} 