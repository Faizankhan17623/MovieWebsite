import { combineReducers } from "redux";

import authReducer  from '../Slices/authSlice'
import cartReducer from '../Slices/CartSlice'
import profileReducer from '../Slices/ProfileSlice'
import addtofavouriteReducer from '../Slices/AddtoFavouritslistSlice'
import showReducer from '../Slices/ShowSlice'
import theatreReducer from '../Slices/TheatreSlice'


const rootReduers = combineReducers({
    auth:authReducer,
    cart:cartReducer,
    profile:profileReducer,
    addtofavourite:addtofavouriteReducer,
    show:showReducer,
    theatre:theatreReducer
})


export default rootReduers