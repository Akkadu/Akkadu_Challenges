import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <main className="px-3">
            <h1>404</h1>
            <p className="lead" style={{margin: "40px auto"}}>OOPS! Page not found</p>
            <p className="lead">
                <Link to="/" style={{color: 'black'}} className="btn btn-lg btn-secondary fw-bold border-white bg-white">Back to Home</Link>
            </p>
        </main>
    )
}

export default Page404