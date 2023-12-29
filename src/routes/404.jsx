import {Link} from 'react-router-dom';

export default function Page404() {
    return (
        <div className="text-center p-10">
            <h1 className="text-2xl">Page not Found</h1>
            <p className="text-md p-2">
                Please visit the <span className='text-blue-700 underline'><Link to={"/"}>Home</Link></span> to get back you in the line.
            </p>
        </div>
    );
}