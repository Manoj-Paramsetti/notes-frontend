import { Link } from 'react-router-dom';

export default function Page403() {
    return (
        <div className="text-center p-10">
            <h1 className="text-2xl">Forbidden</h1>
            <p className="text-md p-2">
                Oh! Oh! You're not allowed to do this action. Go&nbsp;
                <span onClick={()=>{
                    window.history.back();
                }} className='text-blue-700 underline'>back</span> to get back you in the line or try to&nbsp;
                <span className='text-blue-700 underline'><Link to={"/"}>Login</Link></span>
                &nbsp;with other account.
            </p>
        </div>
    );
}