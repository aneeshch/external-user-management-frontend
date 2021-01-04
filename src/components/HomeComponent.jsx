import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


const HomeComponent = () => (
    <div className='home-page'>
        <p><Button type="primary" size='large'><Link to="/admin/login">Admin</Link></Button></p>
        <p><Button type="primary" size='large'><Link to="/user/register">External Users</Link></Button></p>
    </div>
);

export default HomeComponent;