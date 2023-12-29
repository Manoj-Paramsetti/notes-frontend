import { useEffect, useState } from "react";
import LeftPane from "../components/leftpane";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Bin(){
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/read/all-deleted`).then((res)=>{
            setData(res.data.data);
        }).catch((err)=>{
            console.log(err.response)
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
        axios.put(`${process.env.REACT_APP_BACKEND_HOST}/restore/note`,{
            "note_id": id
        }).then((res)=>{
            alert("Restored");
            console.log(res.data.message);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="flex">
            <LeftPane bin={true}/>
            <div className="p-10 w-full h-screen">
                <div className="flex gap-3 w-full justify-between">
                    <h1 className="font-[Helvetica] font-extrabold text-2xl text-[#333]">Bin</h1>
                </div>
                <hr className="my-2"/>
                <div className="my-8">
                {
                    data.map((val, index)=>{
                        var date = new Date(val.deletedAt);
                        return(
                            <div>
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
                </div>
            </div>
        </div>
    );
}