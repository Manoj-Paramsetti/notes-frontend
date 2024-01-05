import React, { useEffect } from "react"
import { getCookie } from "../misc/CookieManager";
import axios from "axios";

export default function AuthCheck({setUserInfo}) {
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/auth/check`, {
            headers: {
                Authorization: `Bearer ${getCookie('sid_app')}`
            }
        }).then(res => {
            setUserInfo(res.data.user);
        }).catch(err => {
            if (err.response.status === 401) {
                setUserInfo(null);
                window.location.href = '/login';
            } else {
                console.log(err);
                alert(err.response.data.error == undefined ? "Something Went Wrong" : err.response.data.error);
            }
        });
    },[]);

    return <React.Fragment></React.Fragment>

}