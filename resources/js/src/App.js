import React, {Suspense, useEffect} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { authCheckState } from "./Store/Actions";
import Spinner from "./Components/Spinner/Spinner";

const Login = React.lazy(()=>import("./Pages/Login/Login"));
const System = React.lazy(()=>import("./Pages/System"));

const App = props => {

    const { onTryAutoSignup } = props;
    let route = null;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);
    if(props.isAuthenticated){
        route = <System {...props}/>
    } else {
        route = <Login/>;
    }

    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                <Route  path='/' render={() => route}/>
            </Switch>
        </Suspense>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userType: state.auth.userType,
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

