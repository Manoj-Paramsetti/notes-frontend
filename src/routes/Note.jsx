import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import LeftPane from '../components/leftpane';
import axios from 'axios';
import Markdown from 'react-markdown';
import { getCookie } from '../misc/CookieManager';
import AuthCheck from '../components/Auth';
export default function Note(){
    const { id } = useParams();  
    const [data, setData]  = useState({});
    const [title, setTitle]  = useState("");
    const [content, setContent]  = useState("");
    const [showModal, setShowModal]  = useState(false);
    const [user, setUser] = useState({});
    const [codeToggler, setCodeToggler] = useState(false);

    const session_token = getCookie("sid_app");

    useEffect(()=>{
        if(isNaN(+id)) {
            window.location = '/404';
            return
        }
        
        if (session_token === "" || session_token === undefined) {
            window.location = '/login';
            return
        }

        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/read/id/${id}`,{
            headers: {
                "Authorization": `Bearer ${session_token}`,
            }
        })
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
            axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${session_token}`
                }
            }).then((res)=>{
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
        }, {
            headers: {
                'Authorization': `Bearer ${session_token}`
            }
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
        }, {
            headers: {
                'Authorization': `Bearer ${session_token}`
            }
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
        }, {
            headers: {
                'Authorization': `Bearer ${session_token}`
            }
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
    
    function openShareModal(){
        setShowModal(true);
    }

    function userInfo(data) {
        setUser(data);
        console.log(data);
    }
    
    return (
        <div className="flex">
            { showModal && <ShareModal close={()=>{setShowModal(false)}} owner={data.owner} current_user={data.current_user} />}
            <LeftPane/>
            <AuthCheck setUserInfo={userInfo}/>
            <div className="p-10 w-full h-screen">
                <div className="flex gap-3 w-full justify-between">
                    <input 
                        className="w-full font-[Helvetica] hover:outline-none focus:outline-none font-extrabold text-4xl text-[#333]" 
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}
                        defaultValue={data.title}></input>
                    
                    <button onClick={openShareModal} className="w-[110px] flex gap-2 bg-[#ffeadd] px-4 py-2 rounded-full text-red-700 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 my-auto flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                            Share
                    </button>
                    <button 
                        onClick={()=>{setCodeToggler(!codeToggler)}} 
                        className="flex hover:bg-[#EEE] gap-2 p-2 rounded-full">
                        {
                            codeToggler ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                            </svg>
                        }

                    </button>
                    <button onClick={saveHandler} className="w-[100px] flex gap-2 bg-black p-2 rounded-lg text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        Save
                    </button>
                    {
                        user.user_id === data.owner && <button 
                            onClick={deleteNote} 
                            className="flex hover:bg-[#FEE] gap-2 p-2 text-red-600 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    }
                </div>
                <hr className="my-6"/>
                <div className='flex h-full gap-2'>
                    
                    {
                        codeToggler ? <textarea 
                            className='w-full h-full focus:outline-none' 
                            onChange={(e)=>{
                                setContent(e.target.value);
                            }}
                            defaultValue={content}>
                        </textarea>: <div className='no-more-tailwind'>
                            <Markdown
                                components={{
                                    code: ({node, ...props}) => {
                                        return <pre className='bg-black text-white p-2 rounded-md'>{props.children}</pre>
                                    },
                                }}
                            >
                                {content}
                            </Markdown>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}


function ShareModal({close, owner, current_user}){
    const { id } = useParams();  
    const [data, setData]  = useState([]);

    const session_token = getCookie("sid_app");
    useEffect(
        ()=>{
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/read/acl/${id}`,{
                headers: {
                    'Authorization': `Bearer ${session_token}`
                }
            }).then((res)=>{
                console.log(res.data.data);
                setData(res.data.data);
            }
            ).catch((err)=>{
                console.log(err.response);
            })

        },[]    
    );
    function shareFile(e){
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/create/acl`, {
            "note_id": id,
            "email": e.target[0].value,
            "access_type": e.target[1].value
        }, {
            headers: {
                'Authorization': `Bearer ${session_token}`
            }
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err.response);
        })
    }

    return <div onClick={(e)=>{
        if(e.target.id === "overlay"){
            close();
        }
    }} id="overlay" className='fixed flex top-0 bg-[#0007] w-screen h-screen z-10'>
        <div className='bg-white h-min my-auto mx-auto p-4'>
            <div className='flex gap-10 justify-between'>
                Add Collaborator
                <button onClick={close} className='text-black-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18m12 0L6 6" />
                    </svg>
                </button>
            </div>
            <hr className='my-5 border-[#F2F2F2]'/>
            <div className='w-80 border rounded-lg my-2'>
                {
                    data?.map((item)=>{
                        return <div className='flex gap-2 p-2 border-b'>
                            {
                                item.users[0].display_picture ? <img className='w-8 h-8 rounded-full' src={item.users[0].display_picture} alt={item.name}/>
                                : <div className='w-8 h-8 text-xs rounded-full bg-black text-white flex justify-center items-center'>
                                    <p className='my-auto'>
                                        {item.users[0].name[0]}{item.users[0].name.split(' ')[1][0] || ""}
                                    </p>
                                </div>
                            }
                            
                            <div className='flex flex-col'>
                                <span className='text-sm'>{item.users[0].name}</span>
                                <span className='text-xs'>{item.users[0].email}</span>
                            </div>
                            <div className='flex-grow'>

                            </div>
                            <div className='my-auto text-xs text-slate-400'>
                                {

                                    (item.access_type === 'O') && "Owner"
                                }
                                {   
                                    
                                    (item.access_type !== 'O' && owner == current_user) && <select onChange={()=>{}} className='text-xs text-slate-400 outline-none active:outline-none hover:outline-none'>
                                        <option value={'W'}>Edit</option>
                                        <option value={'R'}>Read</option>
                                        <option value={'D'}>Remove</option>
                                    </select>
                                }
                                {
                                    (item.access_type !== 'O' && owner !== current_user) && <span className='text-xs text-slate-400'>{
                                        (item.access_type === 'W') && "Edit"
                                    }
                                    {
                                        (item.access_type === 'R') && "Read"
                                    }
                                    </span>
                                }
                            </div>
                    </div>
                    })
                }
            </div>
            {
                (owner == current_user) && <form onSubmit={shareFile} className='flex flex-col my-2'>
                <div className="flex border px-2">
                    <input type='email' required className="w-full p-2 my-1 outline-none active:outline-none hover:outline-none" placeholder='email'/>
                    <select required className='w-24 p-2 my-1 text-sm text-slate-700 outline-none active:outline-none hover:outline-none'>
                        <option value={'W'}>Edit</option>
                        <option value={'R'}>Read</option>
                    </select>

                </div>
                <button className='w-full p-2 my-1 border text-white bg-black'>
                    Share
                </button>
            </form>
            }
        </div>

    </div>
}
