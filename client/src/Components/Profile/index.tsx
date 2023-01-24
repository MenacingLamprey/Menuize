import { useEffect, useState } from 'react';
import { profile } from '../../apiServices/authApi';

const initialState = {
    username : '',
};

export const Profile =() => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const getProfile = async (accessToken :string) => {
            const userInfo = await profile(accessToken);
            if (userInfo) {
                const { username } = userInfo

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

        accessToken && getProfile(accessToken);
    },[]);

    

    return (<div>
       <h1> Welcome To Profile {state.username}</h1>
       
    </div>)
}