import { useEffect } from "react";
import LeftPane from "../components/leftpane.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Markdown from 'react-markdown';
import { fetchAllSharedData, increment, resetHomeState } from "../app/slices/fetchSharedNotesSlice";
import AuthCheck from "../components/Auth.jsx";

export default function SharedNotes(){
    
    const _data = useSelector((state) => state.fetchSharedData.data);
    const nextPage = useSelector((state) => state.fetchSharedData.nextpage);
    const offset = useSelector((state) => state.fetchSharedData.offset);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(resetHomeState());
    },[dispatch]);

    useEffect(
        ()=>{
            dispatch(fetchAllSharedData(offset));
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

    return (
        <div className="flex">
            <LeftPane shared={true}/>
            <AuthCheck/>
            <div className="p-10 w-full">
                <div className="flex w-full justify-between">
                    <h1 className="font-[Helvetica] font-extrabold text-2xl text-[#333]">Shared</h1>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block text-slate-500">
                                                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                                                </svg>
                                            </div>
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
                    {
                        _data.length === 0 ? <div className="flex flex-col h-full pb-20 text-center text-lg text-slate-500">
                        <div className="flex flex-col my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                            No notes shared with you
                        </div>
                        </div> : null
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