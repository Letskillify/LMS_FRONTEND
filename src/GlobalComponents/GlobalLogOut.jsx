import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIslogin } from '../Redux/Slices/MainSlice';

const GlobalLogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const HandleLogOut = () => {
        dispatch(setIslogin(false));
        navigate('/')
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        HandleLogOut
    )
}

export default GlobalLogOut
