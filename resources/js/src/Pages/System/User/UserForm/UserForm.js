import React, {useState, useEffect} from "react";
import {useHistory, useParams, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Spinner from "../../../../Components/Spinner/Spinner";
import HeaderButtonPage from "../../../../Components/HeaderButtonPage";
import Select from "../../../../Components/Select";
import Input from "../../../../Components/Input";
import Message from "../../../../Components/Message";
import Button from "../../../../Components/Button";
import Box from "../../../../Components/Box";
import SweetAlerts from "../../../../Components/SweetAlert";

const UserForm = props =>{
    const {id} = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        "name": "",
        "email": "",
        "password": "",
        "type": "admin"
    });
    const [sweetShow, setSweetShow] = useState(false);
    const [sweetType, setSweetType] = useState('success');
    const [sweetText, setSweetText] = useState('');
    const [sweetTitle, setSweetTitle] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        if(id){
            axios.get(`/api/v1/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            }).then(response => {
                //console.log(response.data.data);
                const user = response.data.data
                setUser(
                    {
                        "name": user.name,
                        "email": user.email,
                        "type": user.type
                    }
                );
            }).finally(() => {
                setLoading(false);
            });
        }else{
            setLoading(false);
        }

    }, [id]);

    const onClose = e => {
        setSweetShow(false);
        if (success) {
            history.goBack();
        }
    }

    const insertUser = () =>{
        axios.post(`/api/v1/user`, user,{
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then(() => {
            setSweetType('success');
            setSweetText('Usuário cadastrado com sucesso');
            setSweetTitle('Sucesso');
            setSuccess(true);
            setSweetShow(true);
        }).catch(err => {
            setSweetType('error');
            setSweetText(err.response.data.error);
            setSweetTitle('Erro');
            setSuccess(false);
            setSweetShow(true);
        })
    }

    const editUser = () =>{
        axios.put(`/api/v1/user/${id}`, user,{
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then(response => {
            setSweetType('success');
            setSweetText('Usuário atualizado com sucesso');
            setSweetTitle('Sucesso');
            setSuccess(true);
        }).catch(err => {
            setSweetType('error');
            setSweetText(err.response.data.error);
            setSweetTitle('Erro');
            setSuccess(false);
        }).finally(() => {
            setSweetShow(true);
            setLoading(false);
        });
    }

    const handlerSubmit = e => {
        e.preventDefault();
        //cadastra o usuário
        if(!id){
            insertUser();
        }else{
            //edita um usuário
            editUser();
        }
    }

    const inactivateUser = e =>{
        e.preventDefault();

        axios.delete(`/api/v1/user/${id}`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then(() => {
            setSweetType('success');
            setSweetText('Usuário inativado com sucesso');
            setSweetTitle('Sucesso');
            setSuccess(true);
            setSweetShow(true);
        }).catch(err => {
            setSweetType('error');
            setSweetText(err.response.data.error);
            setSweetTitle('Erro');
            setSuccess(false);
            setSweetShow(true);
        })
    }

    if(loading) return (<Spinner  />);

    return(
        <div>
            <HeaderButtonPage
                type={'back'}
                h2={id ? 'Editar usuário': 'Cadastro de usuário'}
            />

            <form onSubmit={handlerSubmit}>
                <Box size={'medium'}>
                    <Select
                        value={user.type}
                        label={'Tipo'}
                        name={'type'}
                        onChange={e => setUser({...user, [e.target.name]: e.target.value})}
                    >
                        <option value={'admin'}>
                            Admin
                        </option>

                        <option value={'user'}>
                            Usuário comum
                        </option>
                    </Select>

                    <Input
                        name={'name'}
                        value={user.name}
                        label={'Nome'}
                        onChange={e => setUser({...user, [e.target.name]: e.target.value})}
                        required
                    />
                    <Input
                        name={'email'}
                        value={user.email}
                        label={'Email'}
                        type={'email'}
                        onChange={e => setUser({...user, [e.target.name]: e.target.value})}
                        required
                    />
                    {
                        !id ? <Input
                        name={'password'}
                        value={user.password}
                        label={'Senha'}
                        type={'password'}
                        onChange={e => setUser({...user, [e.target.name]: e.target.value})}
                        required
                        /> : ""
                    }
                    {
                        props.userType == "admin" ?
                            <Button>{id ? "Editar" : "Cadastrar"}</Button>
                            : ""
                    }
                    {
                        props.userType == "admin" ?
                        <Button type={'button'} style={'danger'} onClick={e => inactivateUser(e)}>Inativar usuário</Button>
                        : ""
                    }

                </Box>
            </form>
            <SweetAlerts
                onConfirm={onClose}
                title={sweetTitle}
                type={sweetType}
                btnConfirmStyle={'success'}
                text={sweetText}
                show={sweetShow}
                confirmBtnText={'Ok'}
                closeOnClickOutside={false}
            />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userType: state.auth.userType,
    }
};
export default withRouter(connect(mapStateToProps)(UserForm));
