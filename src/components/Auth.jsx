import React, { useEffect } from "react"
import { getCookie } from "../misc/CookieManager";
import axios from "axios";
import { dataRequestErrorHandler } from "../misc/DataRequestHandler";

function checkAuth(setUserInfo) {
    axios.get(`${process.env.REACT_APP_BACKEND_HOST}/auth/check`, {
        headers: {
            Authorization: `Bearer ${getCookie('sid_app')}`
        }
    }).then(res => {
        setUserInfo(res.data.user);
    }).catch(err => {
        console.log(err)
        dataRequestErrorHandler(err);
    });
}

export default function AuthCheck({setUserInfo = () => {}}) {
    useEffect(() => {
        checkAuth(setUserInfo);
    },[]);

    return <React.Fragment></React.Fragment>

}