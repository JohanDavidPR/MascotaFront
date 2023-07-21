// store.js
import {
    combineReducers
} from 'redux';
import {
    configureStore
} from '@reduxjs/toolkit';
import UserReducer from './reducers/UserReducer';

// Combina los reducers si tienes varios
// const rootReducer = combineReducers({
//     UserReducer
// });

// Crea el store con los reducers combinados
const store = configureStore({
    reducer: {
        userState: UserReducer
    },
});

export default store;