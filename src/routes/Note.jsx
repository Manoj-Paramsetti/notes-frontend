import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import LeftPane from '../components/leftpane';
import axios from 'axios';

export default function Note(){
    const { id } = useParams();  
    const [data, setData]  = useState({});
    const [title, setTitle]  = useState("");
    const [content, setContent]  = useState("");

    useEffect(()=>{
        if(isNaN(+id)) {
            window.location = '/404';
            return
        }
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/read/id/${id}`)
        .then((res)=>{
            setData(res.data);
            setTitle(res.data.title);
            setContent(res.data.note_content);
        }).catch((err)=>{
            if(err.response.status===404) {
                window.location = '/404';
            }
            console.log(err.response);
        });
    },[id]);

    function deleteNote() {
        const user_res = window.confirm("Do you want to really delete this file?");
        if(user_res) {
            axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/delete/${id}`).then((res)=>{
                console.log(res);
                window.location = '/';
            }).catch((err)=>{
                console.log(err.response);
            })
        }
    }

    function saveAll(){
        axios.put(`${process.env.REACT_APP_BACKEND_HOST}/update/note`, {
            "note_id": id,
            "note_title": title,
            "note_content": content
        }).then(()=>{
            alert("Saved!");
            var new_data = data
            new_data["title"] = title
            new_data["note_content"] = content
            setData(new_data)
        }).catch((err)=>{
            alert("Something went wrongs");
            console.error(err.response);
        })
    }
    
    function saveTitle() {
        axios.patch(`${process.env.REACT_APP_BACKEND_HOST}/update/title`, {
            "note_id": id,
            "note_title": title,
        }).then(()=>{
            alert("Saved!");
            var new_data = data
            new_data["title"] = title
            setData(new_data)
        }).catch((err)=>{
            alert("Something went wrongs");
            console.error(err.response);
        });
    }

    function saveContent() {
        axios.patch(`${process.env.REACT_APP_BACKEND_HOST}/update/content`, {
            "note_id": id,
            "note_content": content,
        }).then(()=>{
            alert("Saved!");
            var new_data = data
            new_data["note_content"] = content
            setData(new_data)
        }).catch((err)=>{
            alert("Something went wrongs");
            console.error(err.response);
        });
    }

    function saveHandler(){
        if(title !== data.title && content !== data.note_content) {
            saveAll()
        } else if (title !== data.title) {
            saveTitle()
        } else if (content !== data.note_content) {
            saveContent()
        } else {
            alert("Nothing to save");
        }
    }

    return (
        <div className="flex">
            <LeftPane/>
            <div className="p-10 w-full h-screen">
                <div className="flex gap-3 w-full justify-between">
                    <input 
                        className="w-full font-[Helvetica] hover:outline-none focus:outline-none font-extrabold text-2xl text-[#333]" 
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}
                        defaultValue={data.title}></input>
                    <button onClick={saveHandler} className="w-[100px] flex gap-2 bg-black p-2 rounded-lg text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        Save
                    </button>
                    <button 
                        onClick={deleteNote} 
                        className="flex hover:bg-[#EEE] gap-2 p-2 text-red-600 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <hr className="my-2"/>
                <div className='h-full'>
                    <textarea 
                        className='w-full h-full focus:outline-none' 
                        onChange={(e)=>{
                            setContent(e.target.value);
                        }}
                        defaultValue={data.note_content}>
                        
                    </textarea>
                </div>
            </div>
        </div>
    );
}