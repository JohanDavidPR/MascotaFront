import React, { useEffect, useState } from 'react'
import {
    Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../Data/Services/userService';

import { userData } from '../Data/Store/reducers/UserReducer';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

export default function Router() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.userState.user);
    const [isValid, setIsValid] = useState(!!user);
    
    useEffect(() => {
      if (!user || !user.token) {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.token) {
          setIsValid(true);
          dispatch(userData(currentUser));
        } else {
          setIsValid(false);
        }
      }
    }, [dispatch, user]);

    return <>
        <PublicRouter isValid={isValid} />
        {
            isValid ? <PrivateRouter /> : <Navigate to="/login" />
        }
    </>
}
