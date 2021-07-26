import React, {lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

const User = () => {
    const UserList = lazy(() => import('./UserList/UserList'));
    const UserForm = lazy(() => import('./UserForm/UserForm'));
    return (
        <div>
            <Switch>
                <Route path={'/user/create'} render={() => <UserForm/>} />
                <Route path={'/user/:id'} render={() => <UserForm/>} />
                <Route path={'/user'} render={() => <UserList/>} />
                <Redirect to={'/user'} render={() => <UserList />}/>
            </Switch>
        </div>
    );
};

export default User;
