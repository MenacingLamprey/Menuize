import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { profile } from '../../apiServices/authApi';
import { UserContext } from '../../Contexts/UserContext';


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

    return (<div>
       <h1> Welcome To Profile {state.username}</h1>
        <button onClick={ e => navigate("/ingredients")}>Ingredient Page</button>
        <button onClick={ e => navigate("/drinks")}>Drink Page</button>
    </div>)
}