import { useAuthStore } from "../store/auth";
import jwt_decode from 'jwt-decode';

import axios from './axios';
import Cookies from "js-cookie";

export const login = async (email, password) => {
    try{
        const {data, status} = await axios.post('user/token/', {
            email,
            password
        })
        if (status === 200){
            setAuthUser(data.access, data.refresh)
            //Alert- Sign in successfully
        }
        return {data, error: null}
    } catch (error){
        return{
            data: null,
            error: error.response?.data?.detail || "Something went wrong"
        }
    }

}

export const register = async (full_name, email, phone, password, password2) => {
    try{
        const {data} = await axios.post('user/register/', {
            full_name, 
            email, 
            phone, 
            password, 
            password2 
        })
        await login(email, password)
        //Alert- Signup successfully
        return {data, error: null}
    } catch (error) {
        const errorDetail = error.response?.data || {};
        let errorMessages = [];

        if (errorDetail.detail) {
            errorMessages.push(errorDetail.detail);
        }
        if (errorDetail.email) {
            errorMessages.push(`Email: ${errorDetail.email[0]}`);
        }
        if (errorDetail.password) {
            errorMessages.push(`Password: ${errorDetail.password[0]}`);
        }

        return {
            data: null,
            error: errorMessages.join("<br />") || "Something went wrong"
        };
    }
}

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    useAuthStore.getState().setUser(null);

    // Alert- Signout Successfully
}

export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")
    if (!accessToken || !refreshToken){
        return;
    }

    if (isAccessTokenExpired(accessToken)){
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    } else {
        setAuthUser(accessToken, refreshToken)
    }
    
}

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token, {
        expires: 1,
        secure: true,
    })
    Cookies.set('refresh_token', refresh_token, {
        expires: 7,
        secure: true,
    })

    const user = jwt_decode(access_token) ?? null
    if (user){
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)
}

export const getRefreshToken = async() => {
    const refresh_token = Cookies.get('refresh_token')
    const response = await axios.post('user/token/refresh/' /*remove slash at the front, because at axios.js, a slash at end is defined*/, {
        refresh: refresh_token
    })
    return response.data //hold the access and refresh data
}

export const isAccessTokenExpired = (accessToken) => {
    try{
        const decodedToken = jwt_decode(accessToken)
        return decodedToken.exp < Date.now() / 100
    }catch (error){
        console.log (error)
        return true
    }   
}
