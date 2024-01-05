import axios from "axios";
import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../misc/CookieManager";
import { useDispatch } from "react-redux";
import { pushData } from "../app/slices/userSlice";

export default function Authorize() {
    const [currentStage, setCurrentStage] = useState(0);
    const totalStage = 2;

    async function getSessionToken(){
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/auth/bitbucket/session`, {
                headers: {
                    "Authorization": `Bearer ${getCookie("bb_access_token")}`,
                }    
            })
            setCookie("sid_app", res.data.token);
            setCookie("sid_expires_in", res.data.expires_in);
            const user = res.data.user;
            // dispatch(pushData(user));

            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('user_id', res.data.user.user_id);
            localStorage.setItem('display_picture', res.data.user.display_picture);
            
            
            setCurrentStage(2);
            window.location = "/";
        }
        catch (err) {
            console.log(err);
        };
    }
    
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/auth/bitbucket/callback`,{
            code: new URLSearchParams(window.location.search).get("code")
        }).then((res)=>{
            setCookie("bb_access_token", res.data.access_token);
            setCookie("OAuth_Type", "bitbucket");
            setCookie("bb_refresh_token", res.data.refresh_token);
            setCurrentStage(currentStage+1);
            getSessionToken();
        }).catch((err)=>{
            console.log(err);
        });    
    },[]);

    return (
        <div className="flex h-screen">
            <div className="mx-auto my-auto">
                <div className="w-44 font-bold text-xl flex gap-2 mx-auto bg-black rounded-md p-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    Notes
                </div>
                <div className="flex gap-2 mt-3">
                    <span className="loader my-auto"></span> 
                    <p className="my-auto">
                        We are processing your request. Please wait...
                    </p>
                </div>
                <p className="my-auto text-center">
                    {currentStage}/{totalStage} Completed
                </p>
            </div>
        </div>
    )
}