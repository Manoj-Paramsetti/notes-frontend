import { useEffect, useState } from "react";
import LeftPane from "../components/leftpane";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../misc/CookieManager";
import AuthCheck from "../components/Auth";
import { dataRequestErrorHandler } from "../misc/DataRequestHandler";

export default function Bin(){
    const [data, setData] = useState([])
    const [user, setUser] = useState({});

    const session_token = getCookie("sid_app");

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/read/all-deleted`, {
            headers: {
                "Authorization": `Bearer ${session_token}`,
            }   
        }).then((res)=>{
            setData(res.data.data);
        }).catch((err)=>{
            dataRequestErrorHandler(err);
        });
    }, []);

    const navigate = useNavigate();

    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
    }

    function restore(id){
        axios.put(`${process.env.REACT_APP_BACKEND_HOST}/api/restore/note`,{
            "note_id": id
        }, {
            headers: {
                "Authorization": `Bearer ${session_token}`,
            }   
        }).then((res)=>{
            alert("Restored");
            window.location.reload();
            console.log(res.data.message);
        }).catch((err)=>{
            dataRequestErrorHandler(err);
        })
    }

    function userInfo(data) {
        setUser(data);
        console.log(data);
    }

    return (
        <div className="flex">
            <LeftPane bin={true}/>
            <AuthCheck setUserInfo={userInfo}/>
            <div className="p-10 w-full h-screen">
                <div className="flex gap-3 w-full justify-between">
                    <h1 className="font-[Helvetica] font-extrabold text-2xl text-[#333]">Bin</h1>
                </div>
                <hr className="my-2"/>
                <div className="my-8 h-full">
                {
                    data.map((val, index)=>{
                        var date = new Date(val.deletedAt);
                        return(
                            <div key={index}>
                                <div className="flex my-1 justify-between">
                                    <div className="w-64 flex-shrink-0 p-3">
                                        <p className="overflow-hidden text-ellipsis font-semibold">{val.title}</p>
                                        <p className="mx-auto my-auto text-xs text-slate-800 overflow-hidden text-ellipsis">Deleted At: {date.toLocaleDateString('en-IN', dateOptions)} - {date.toLocaleTimeString([], timeOptions)}</p>
                                    </div>
                                    <div className="flex flex-shrink-0 w-28 ">
                                        <button onClick={()=>{restore(val.note_id)}} className="flex gap-2 mx-auto my-auto hover:bg-[#222] p-2 rounded-lg hover:text-white border text-md text-slate-800 overflow-hidden text-ellipsis">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                            Restore
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    })
                }
                {
                    data.length === 0 ? <div className="flex flex-col h-full pb-20 text-center text-lg text-slate-500">
                        <div className="flex flex-col my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            No notes in bin
                        </div>
                        </div> : null
                }
                </div>
            </div>
        </div>
    );
}