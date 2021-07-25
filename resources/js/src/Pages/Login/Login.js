import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../Store/Actions";
import styles from './Login.module.css';
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import Button from "../../Components/Button";
import Spinner from "../../Components/Spinner/Spinner";
const Login = props =>{

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const handlerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            props.onAuth(user, password);
        } catch(e) {
            setError(true);
            setLoading(false);
        }
    }

    const setPasswordChange = e => {
        setError(false);
        setPassword(e.target.value);
    }

    const setUserChange = e => {
        setError(false);
        setUser(e.target.value);
    }

    return(
        <div className={styles.Login}>
            <form onSubmit={handlerSubmit}>
                <Input
                    placeholder={'Email'}
                    label={'Email'}
                    required
                    onChange={setUserChange}
                    value={user}
                    type={'text'}
                />
                <Input
                    placeholder={'Senha'}
                    label={'Senha'}
                    required
                    type={'password'}
                    value={password}
                    onChange={setPasswordChange}
                />
                {error ? <Message type={'error'}>Usuário ou senha incorretos</Message> : null}
                <Button>Entrar {loading ? <Spinner size={'small'} /> : null}</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (user, password) => dispatch(actions.auth(user, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
