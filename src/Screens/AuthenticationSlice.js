import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoggedIn: false,
    token: "",
    userData: {},
    error: "",
};

export const authSlice = createSlice ({
    name: "a",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            state.isLoggedIn = true;
        },
        token: (state, action) =>{
            state.token = action.payload;
        },
        loginError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const loginUser = (data) => (dispatch) => {
    axios({
        method: "POST",
        url: "https://mashami.cyclic.app/api/auth/login",
        data: data,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            accept: "application/json",},
    })
    .then((res) => {
        console.log(res);
        dispatch(token(res.data.token));
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginError(err.response.data.message));
      });
};



export const { login, token, loginError } = authSlice.actions;
export default authSlice.reducer;