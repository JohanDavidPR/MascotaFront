import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
    name: 'userState',
    initialState: {
        user: {},
    },
    reducers: {
        userData: (state, action) => {
            console.log("Data --> ", action.payload);
            state.user = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { userData } = UserReducer.actions

export default UserReducer.reducer

// const initialState = {
//     user: {}
// };

// const UserReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'USER_DATA':
//             return {
//                 ...state,
//                 user: action.payload
//             };
//         default:
//             return state;
//     }
// };

// export default UserReducer;