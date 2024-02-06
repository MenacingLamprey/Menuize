import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../../Queries/fetchProfile';

import './styles.css'

export const Profile = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken") || "";
    if (!accessToken) {
      throw new Error("no access token found");
    }
    
    const results = useQuery({queryKey :["user", accessToken], queryFn : fetchProfile});
    if (results.isLoading) {
      return (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      );
    }
    const user = results?.data
    if (!user) {
      throw new Error("user not found");
    }
    
  return (<div id ={"profile-container"}>
    <h1> Welcome {user.username}</h1>
    <button id ={"ingredient-button"} className={"profile-button"} 
      onClick={ e => navigate("/ingredients")}>Ingredient Page</button>
    <button id ={"drink-button"} className={"profile-button"} 
      onClick={ e => navigate("/drinks")}>Drink Page
    </button>
    <button id ={"drink-button"} className={"profile-button"} 
      onClick={ e => navigate("/menus")}>Menu Page
    </button>
  </div>)
}