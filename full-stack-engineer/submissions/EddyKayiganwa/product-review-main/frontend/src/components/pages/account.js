import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

function Account() {
    const {
        user,
        loginUser
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const [act, setAct] = useState(true);
    const [requesting, setRequesting] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clearForm = () => {
        var c = document.getElementsByClassName('form');
        Array.from(c).forEach(e => e.reset());
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const loginHandler = async(event) => {
        setRequesting(true);
        event.preventDefault();
        
        const res = await loginUser(email, password);
        if (res) {
           navigate('/');
           toast.success("login successfully");
        }

        else {
            toast.error("Invalid email or password");
        }

        event.target.reset();
        setRequesting(false);
    };

    const signupHandler = async(event) => {
        setRequesting(true);
        event.preventDefault();
        const new_user = {name: username, email, password};

        try {
            const res = await fetch('/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_user),
            });

            if (res.status === 201) {
                setAct(false);
                toast.success("account created successfully");
            }
            else {
                const data = await res.json();
                toast.error(data.message);
            }
        }
        catch (error) {
            console.log("error: ", error);
        }
        
        event.target.reset();
        setRequesting(false);
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        };
    }, [user, navigate]);

    return (
        <div className={act ? "container right-panel-active" : "container"}>
            <div className="container__form container--signup">
                <form onSubmit={(event) => signupHandler(event)} className="form" id="form1">
                    <h2 className="form__title">Sign Up</h2>
                    <input onChange={(event) => setUsername(event.target.value)} required type="text" placeholder="Username" className="input" />
                    <input onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="Email" className="input" />
                    <input onChange={(event) => setPassword(event.target.value)} required type="password" placeholder="Password" className="input" autoComplete='false' />
                    {!requesting ? <button type='submit' className="btn">Sign Up</button> : <button style={{cursor: 'wait'}} type="button" className='btn'>Loading</button>}
                </form>
            </div>

            <div className="container__form container--signin">
                <form onSubmit={(event) => loginHandler(event)} className="form" id="form2">
                    <h2 className="form__title">Sign In</h2>
                    <input onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="Email" className="input" />
                    <input onChange={(event) => setPassword(event.target.value)} required type="password" placeholder="Password" className="input" autoComplete='false'/>
                    <Link to="#" className="link">Forgot your password?</Link>
                    {!requesting ? <button type='submit' className="btn">Sign In</button> : <button style={{cursor: 'wait'}} type="button" className='btn'>Loading</button>}
                </form>
            </div>

            <div className="container__overlay">
                <div className="overlay">
                    <div className="overlay__panel overlay--left">
                        {!requesting ? <button onClick={() => {setAct(false); clearForm()}} className="btn" id="signIn">Sign In</button> : <></>}
                    </div>
                    <div className="overlay__panel overlay--right">
                        {!requesting ? <button onClick={() => {setAct(true); clearForm()}} className="btn" id="signUp">Sign Up</button> : <></>}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Account;