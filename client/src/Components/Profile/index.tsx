import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { profile } from '../../apiServices/authApi';
import { UserContext } from '../../Contexts/UserContext';

import './styles.css'

const initialState = {
    username : '',
};

export const Profile = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const [_, setCurrentUser] = useContext(UserContext);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        accessToken && getProfile(accessToken);
    },[]);

    const getProfile = async (accessToken :string) => {
        const userInfo = await profile(accessToken);
        if (userInfo) {
            const { username } = await userInfo.json()
            setCurrentUser({username})
            localStorage.setItem("username", username)
            setState((prevState) => {
            return {
                ...prevState,
                username,
            };
            })
        } else {
            console.log('No user info found');
        }
    }    

    return (<div id ={"profile-container"}>
       <h1> Welcome {state.username}</h1>
        <button id ={"ingredient-button"} className={"profile-button"} 
            onClick={ e => navigate("/ingredients")}>Ingredient Page</button>
        <button id ={"drink-button"} className={"profile-button"} 
            onClick={ e => navigate("/drinks")}>Drink Page</button>
    </div>)
}