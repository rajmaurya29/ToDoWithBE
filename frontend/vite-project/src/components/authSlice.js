import { createSlice } from '@reduxjs/toolkit';

const initialState={
    value:false,
    toastShown:false,
}
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        authent: (state)=>{
            state.value=true
        },
        authenf:(state)=>{
            state.value=false
        },
        setToastShownt:(state)=>{
            state.toastShown=true;
        },
        setToastShownf:(state)=>{
            state.toastShown=false;
        }
    }
})
export const {authent,authenf,setToastShownt,setToastShownf}=authSlice.actions
export default authSlice.reducer