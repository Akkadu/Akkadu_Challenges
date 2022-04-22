import { Route, useNavigate } from "react-router-dom";


export function PrivateRoute({ component: Component, ...rest }) {
    const navigate = useNavigate();
    const isAuth = false;
    <Route {...rest} render={(props) => (
        isAuth === true
            ? <Component {...props} />
            : navigate('/login', { replace: true })
    )} />
}