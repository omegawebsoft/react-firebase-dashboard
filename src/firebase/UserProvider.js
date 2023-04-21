import React, {useEffect, useState,useContext} from 'react';
import firebase from 'firebase/app';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [session, setSession] = useState({user: null, loading: true});

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setSession({loading: false, user})
        })

        //call function before the component is removed from the UI to avoid any memmory leaks
        return () => unsubscribe();
    }, []); //second empty array argument means run effect and clean up only once

    //render the children once is done loading
    return (
        <UserContext.Provider value = {session}>          
            {!session.loading && props.children }
        </UserContext.Provider>
    )
}

export const useSession = () => {
    const session = useContext(UserContext);
    return session;
}