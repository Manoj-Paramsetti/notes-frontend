import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../misc/CookieManager";

export default function LeftPane({home=false, shared=false, bin=false}) {
    const [email, setEmail] = useState("");
    const [display_picture, setDisplayPicture] = useState("");
    
    const navigate  = useNavigate();
    
    useEffect(()=>{
        setEmail(localStorage.getItem("email"));
        setDisplayPicture(localStorage.getItem("display_picture"));
    }, []);

    function signOutUser(){
        deleteCookie("sid_app");
        deleteCookie("OAuth_Type");
        deleteCookie("bb_refresh_token");
        deleteCookie("sid_expires_in");
        deleteCookie("bb_access_token");
        localStorage.clear();
        navigate("/login");
    }

    return(
        <div className="sticky top-0 flex flex-col w-[250px] h-screen p-4 bg-[#FFF] border-[#AAA1] border-r-2 justify-between">
            <div className="font-['Helvetica'] flex flex-col gap-2">
                <div className="font-bold w-full text-xl flex gap-2 bg-black rounded-md p-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Notes
                </div>
                <div className="flex gap-2 w-full p-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full">
                    {
                        display_picture ? <img className="w-5 border rounded-full border-white-500" src={display_picture}></img>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    }
                    <p className="overflow-hidden text-ellipsis my-auto text-sm" title="manoj.paramsetti@gmail.com">{email}</p>
                </div>

            </div>
            <div className="overflow-auto mt-10 mb-24 gap-3 flex flex-col">
                <button onClick={()=>{navigate("/")}} className={home ? "flex gap-2 bg-[#333] rounded-lg text-white p-2" : "flex gap-2 p-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p className="overflow-hidden text-ellipsis">Home</p>
                </button>
                <button onClick={()=>{navigate("/shared")}} className={shared ? "flex gap-2 bg-[#333] rounded-lg text-white p-2" : "flex gap-2 p-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <p className="overflow-hidden text-ellipsis">Shared</p>
                </button>
                <button onClick={()=>{navigate("/bin")}} className={bin ? "flex gap-2 bg-[#333] rounded-lg text-white p-2" : "flex gap-2 p-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <p className="overflow-hidden text-ellipsis">Bin</p>
                </button>
            </div>
            <button onClick={signOutUser} className="px-4 py-2 flex gap-2 bg-red-100 hover:bg-red-500 rounded-full text-red-600 hover:text-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
                Sign Out
            </button>
        </div>
    );
}