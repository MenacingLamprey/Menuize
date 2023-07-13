import { useNavigate } from 'react-router-dom';

import './styles.css'
import { useQuery } from 'react-query';
import { fetchProfile } from '../../Queries/fetchProfile';

export const Profile = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken") || "";
    if (!accessToken) {
        throw new Error("no access token found");
    }
    
      const results = useQuery(["user", accessToken], fetchProfile);
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
    const drinks = user.drinks.map(drink => drink)
    const ingredients = user.ingredients.map(ingredient => ingredient)
    localStorage.setItem('drinks', JSON.stringify(drinks))
    localStorage.setItem('ingredients', JSON.stringify(ingredients));

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