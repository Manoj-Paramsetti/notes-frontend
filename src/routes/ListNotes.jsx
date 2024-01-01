import { useEffect, useState } from "react";
import LeftPane from "../components/leftpane";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData, increment, resetHomeState } from "../app/slices/fetchNotesSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Markdown from 'react-markdown'

export default function ListNotes(){
    
    const _data = useSelector((state) => state.fetchData.data);
    const nextPage = useSelector((state) => state.fetchData.nextpage);
    const offset = useSelector((state) => state.fetchData.offset);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(resetHomeState());
    },[]);

    useEffect(
        ()=>{
            dispatch(fetchAllData(offset));
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
    }

    function newNote(){
        const user_res = window.prompt("Name of your new note?");
        if(user_res!==""){
            axios.post(`${process.env.REACT_APP_BACKEND_HOST}/create/note`,{
                "title": user_res
            }).then((res)=>{
                navigate(`/note/${res.data.note_id}`);
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    return (
        <div className="flex">
            <LeftPane home={true}/>
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
                                        <p className="h-40 border-t p-3 bg-[#F8F8F8] text-slate-500 text-sm overflow-clip text-balance break-words hyphens-auto">
                                            <Markdown>
                                            {val.note_content}
                                            </Markdown>
                                        </p>
                                        <div className="border-t p-3">
                                            <p className="overflow-hidden text-ellipsis font-semibold whitespace-nowrap">{val.title}</p>
                                            <p className="text-xs text-slate-400">Last Modified: {updatedDate.toLocaleDateString('en-IN', dateOptions)} - {updatedDate.toLocaleTimeString([], timeOptions)}</p>
                                        </div>
                                        <div className="border-t px-3 py-1 bg-[#444]">
                                            <p className="text-xs text-slate-300">{createdDate.toLocaleDateString('en-IN', dateOptions)} - {createdDate.toLocaleTimeString([], timeOptions)}</p>
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