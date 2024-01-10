import axios from "axios"
import { dataRequestErrorHandler } from "../misc/DataRequestHandler";

export default function LoginPage() {


    function bitBucketRedirect(){
        axios.get(`/api/auth/bitbucket`).then((res)=>{
            window.location = res.data.uri;
        }).catch((err)=>{
            dataRequestErrorHandler(err);
        });
    }

    return (
        <div className="flex flex-col p-3 min-h-screen">
            <div className="w-44 font-bold text-xl flex gap-2 bg-black rounded-md p-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Notes
            </div>
            <div className="p-5 border mx-auto my-auto rounded-lg">
                    <p className="text-3xl font-extrabold">Sign In</p>
                    <p className="text-sm text-slate-500">to continue to Notes</p>
                    <hr className="mt-5"/>
                    <div className="flex w-80 flex-col gap-3 mt-5">
                        <button onClick={bitBucketRedirect} className="p-2 bg-black text-white rounded-lg">Sign In with BitBucket</button>
                    </div>
            </div>
        </div>
    )
}