import React from 'react';
import { Button, Table, message } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import { Redirect } from 'react-router-dom';
import { getData } from '../middleware/fetchMiddleware';

const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Telephone No',
        dataIndex: 'telephoneNo',
        key: 'telephoneNo',
    },
    {
        title: 'SSN',
        dataIndex: 'ssn',
        key: 'ssn',
    }
];


class ListComponent extends React.Component {

    state = {
        usersList: [],
        pageNo: 1,
        redirectToLoginPage: false,
        redirectToHomePage: false,
    };

    async componentDidMount() {
        try{
            const data = await getData(`/users?page=${this.state.pageNo}`);
            if (data.statusCode === 200) {
                this.setState({
                    usersList: data.users,
                });
            }
        } catch(err) {
            console.log(err);
            message.error('Something went wrong');
        }
        
    }

    handleLogout = () => {
        localStorage.removeItem('jwt');
        this.setState({
            redirectToLoginPage: true,
        });
    }


    render() {
        const { handleLogout } = this;
        const { usersList, redirectToLoginPage, redirectToHomePage } = this.state;
        if (redirectToHomePage) {
            return (
                <Redirect to='/' />
            )
        }

        if (redirectToLoginPage) {
            return (
                <Redirect to='/admin/login' />
            )
        }
        return (
            <div className='listing-page'>
                <Button type="primary" onClick={handleLogout} icon={<PoweroffOutlined />}>
                    Logout
                </Button>
                <Table dataSource={usersList} columns={columns} />
            </div>
        );
    };
};

export default ListComponent;