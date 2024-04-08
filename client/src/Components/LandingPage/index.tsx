import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Login } from "../Login";
import { Register } from "../Register";

interface IProps {
  isAuthenticated : boolean;
  setIsAuthenticated : Function
}

export const LandingPage = ({isAuthenticated, setIsAuthenticated} : IProps) => {
	const navigate = useNavigate();

  return (<div>
		<h4>Menuize</h4>
		<Button onClick={()=>navigate('/guest')}>Continue As Guest</Button>
		<Login setIsAuthenticated={setIsAuthenticated}/>
		<Register setIsAuthenticated={setIsAuthenticated}/>
		<Typography variant="body2" color="text.secondary" align="center">
			{'© '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	</div>)
} 