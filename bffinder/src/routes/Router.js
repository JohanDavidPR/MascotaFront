import React, { useEffect, useState } from 'react'
import {
    Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../Data/Services/userService';
import { userData } from '../Data/Store/reducers/UserReducer';
// import store from '../Data/Store/Store';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

export default function Router() {

    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {

        let user = useSelector((store) => store.useState.user)
        //console.log(user);
        if (user && user.token) {
            setIsValid(true)
        } else {
            user = getCurrentUser();
            //console.log(user);
            if (user && user.token) {
                setIsValid(true)
                dispatch(userData(user));
            }
            else {
                setIsValid(false)
            }
        }
        console.log(isValid);

    }, [isValid])

    return <>
        <PublicRouter isValid={isValid} />
        {
            isValid ? <PrivateRouter /> : <Navigate to="/login" />
        }
    </>
}
