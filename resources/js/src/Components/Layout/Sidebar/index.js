import React from 'react';
import styles from './Sidebar.module.css';
import {NavLink, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {FaUsers} from 'react-icons/fa';
import {BiLogOutCircle}from 'react-icons/bi';
import * as actions from "../../../Store/Actions";


const Sidebar = props => {
    const logout = e => {
        e.preventDefault();
        props.logout(props.token);
    };
    return (
        <div className={styles.Sidebar}>
            <ul>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/user'}><FaUsers className={styles.Icon}/>Usuários</NavLink>
                </li>
                <li>
                    <button
                        onClick={logout}
                    ><BiLogOutCircle className={styles.Icon}/>Sair</button>
                </li>
            </ul>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        email: state.auth.email,
        loading: state.auth.loading,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        logout: (token) => dispatch(actions.logout(token))
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));

