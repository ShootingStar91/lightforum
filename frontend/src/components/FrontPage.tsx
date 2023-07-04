import { Link } from "react-router-dom"

export const FrontPage = () => {
    return (<div className="mt-16">
        <h1>Lightforum</h1>
        <p>This is a basic forum application with users, posts and forum categories.</p>
        <Link to='/forum'><div className='w-full text-center text-slate-600 mt-8'><h3 className='bg-sky-300'>Enter forum</h3></div></Link>
    </div>)
}
