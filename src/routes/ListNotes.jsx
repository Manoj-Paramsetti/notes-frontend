import { useEffect, useState } from "react";
import LeftPane from "../components/leftpane";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData, increment, resetHomeState } from "../app/slices/fetchNotesSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Markdown from 'react-markdown'
import { getCookie } from "../misc/CookieManager";
import AuthCheck from "../components/Auth";

export default function ListNotes(){
    
    const _data = useSelector((state) => state.fetchData.data);
    const nextPage = useSelector((state) => state.fetchData.nextpage);
    const offset = useSelector((state) => state.fetchData.offset);
    const [user, setUser] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        // dispatch(resetHomeState());
    },[]);

    useEffect(
        ()=>{
            dispatch(fetchAllData(offset));
            console.log(_data);
        }
    ,[dispatch, offset]);

    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };;;;;

    function newNote(){
        const user_res = window.prompt("Name of your new note?");
        if(user_res!==""){
            axios.post(`${process.env.REACT_APP_BACKEND_HOST}/create/note`,{
                "title": user_res
            }, {
                headers: {
                    "Authorization": `Bearer ${getCookie("sid_app")}`,
                }   
            }).then((res)=>{
                navigate(`/note/${res.data.note_id}`);
            }).catch((err)=>{
                if(err.response.status===401){
                    alert("Session Expired");
                    window.location = "/login";
                }
            });
        }
    }

    function userInfo(data) {
        setUser(data);
        console.log(data);
    }

    return (
        <div className="flex">
            <LeftPane home={true}/>
            <AuthCheck setUserInfo={userInfo}/>
            <div className="p-10 w-full">
                <div className="flex w-full justify-between">
                    <h1 className="font-[Helvetica] font-extrabold text-2xl text-[#333]">All Notes</h1>
                    <button onClick={newNote} className="flex gap-2 bg-black p-2 rounded-lg text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        New Note
                    </button>
                </div>
                <hr className="my-2"/>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-8 my-8">
                    {
                        _data.map(
                            (val, index)=> {
                                var createdDate = new Date(val.createdAt);
                                var updatedDate = new Date(val.updatedAt);
                                return(
                                    <div key={index} onClick={()=>{
                                        navigate(`/note/${val.note_id}`)
                                    }} className="border rounded-lg overflow-hidden shadow-md">
                                        <div className="h-40 border-t p-3 bg-[#F8F8F8] text-slate-500 text-sm overflow-clip text-balance break-words hyphens-auto">
                                            <Markdown>
                                            {val.note_content}
                                            </Markdown>
                                        </div>
                                        <div className="border-t p-3">
                                            <div className="flex justify-between">
                                                <p className="overflow-hidden text-ellipsis font-semibold whitespace-nowrap">
                                                    {val.title}
                                                </p>
                                                <div className="flex gap-1">
                                                    {
                                                        val.user_id == user.user_id && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 inline-block text-slate-500">
                                                            <path fill-rule="evenodd" d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z" clip-rule="evenodd" />
                                                        </svg>                                                                                                                           
                                                    }
                                                    {    
                                                        (val.acls.length > 1 || val.user_id != user?.user_id) && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block text-slate-500">
                                                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                                                        </svg>
                                                    }
                                                </div>
                                            </div>
                                            <p className="text-xs hover:block text-slate-400">Last Modified: {updatedDate.toLocaleDateString('en-IN', dateOptions)} - {updatedDate.toLocaleTimeString([], timeOptions)}</p>
                                        </div>
                                        <div className="flex gap-1 border-t px-3 py-1 bg-[#333] text-slate-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <p className="text-xs my-auto text-left">{createdDate.toLocaleDateString('en-IN', dateOptions)} - {createdDate.toLocaleTimeString([], timeOptions)}</p>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div className="w-full text-center my-10">
                    {
                        nextPage && <button onClick={()=>{
                            dispatch(increment());
                        }} className="mx-auto px-4 py-2 flex gap-2 bg-[#333] text-white rounded-full">
                            Load More
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                            </svg>
                        </button>   
                    }
                </div>
            </div>
        </div>
    );
}