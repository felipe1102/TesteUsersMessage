import React, {useState, useEffect, useMemo} from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import Spinner from "../../../../Components/Spinner/Spinner";
import Table from "../../../../Components/Table";
import HeaderButtonPage from "../../../../Components/HeaderButtonPage";
import Filter from "../../../../Components/Filter";
import Select from "../../../../Components/Select";
import Input from "../../../../Components/Input";
import Message from "../../../../Components/Message";
import Pagination from "../../../../Components/Pagination";

import {IoMdSearch} from 'react-icons/io';

const UserList = props =>{

    const [page, setPage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('Todos');
    const [email, setEmail] = useState('');

    useEffect(() => {

        let params = {};
        name.length ? params['name'] = name : null;
        email.length ? params['email'] = email : null;
        type !== 'Todos' ? params['type'] = type : null;
        params['page'] = page;
        axios.get(`/api/v1/user`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }, params
        }).then(response => {
            setUsers(response.data.data.data);
            setItemsCountPerPage(response.data.data.per_page);
            setTotalItemsCount(response.data.data.total);
        }).finally(() => {
            setLoading(false);
        });

    }, [name, type, email]);

    const columns = useMemo(() => [
        {
            Header: 'Nome',
            accessor: 'name'
        },
        {
            Header: 'Tipo',
            accessor: 'type'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'A????o',
            Cell: (row) => (
                <>
                    <Link to={`/user/${row.row.original.id}`} >
                        <IoMdSearch  size={20} color="#2F4F4F" />
                    </Link>
                </>
            ),
        }

    ], []);

    if(loading) return (<Spinner />);

    return(
        <div>
            {
                props.userType != "admin" ? "" :
                    <HeaderButtonPage
                        to={'/user/create'}
                        type={'store'}
                        title={'Cadastrar usu??rio'}
                        h1={'Usu??rios'}
                    />
            }

            <Filter>
                <Select
                    label={'Tipo'}
                    value={type}
                    onChange={e => setType(e.target.value)}
                >
                    <option>Todos</option>
                    <option value={'admin'}>Admin</option>
                    <option value={'user'}>Usu??rio comum</option>

                </Select>
                <Input
                    label={'Nome'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <Input
                    label={'Email'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </Filter>
            {
                users.length ?  <Table columns={columns} data={users} /> :
                    <Message type={'error'}>Nenhum usu??rio encontrado</Message>
            }
            {
                (totalItemsCount > itemsCountPerPage) &&
                <Pagination
                    handlePageChange={e => setPage(e)}
                    activePage={page}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={5}
                />
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userType: state.auth.userType,
    }
};
export default withRouter(connect(mapStateToProps)(UserList));


