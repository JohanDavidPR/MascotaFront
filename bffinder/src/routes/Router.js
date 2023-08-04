import React, { useEffect, useState } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../Data/Services/userService';

import { userData } from '../Data/Store/reducers/UserReducer';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

export default function Router() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.userState.user);
    const [isLoggedIn, setIsLoggeIn] = useState(!user);
    
    useEffect(() => {
      if (!user || !user.token) {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.token) {
          setIsLoggeIn(true);
          dispatch(userData(currentUser));
        } else {
          setIsLoggeIn(false);
        }
      }
    }, [dispatch, user]);

    return (
      <Routes>
        <Route path="/pet/*" element={<PrivateRouter isLoggedIn={isLoggedIn} />} />
        <Route path="/*" element={<PublicRouter isLoggedIn={isLoggedIn} />} />
      </Routes>
    );
}
