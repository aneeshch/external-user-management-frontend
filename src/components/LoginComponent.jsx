import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import { postData } from '../middleware/fetchMiddleware';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};


class LoginComponent extends React.Component {

    state = {
        redirectToListingPage: false,
    };

    formRef = React.createRef();

    onFinish = async (values) => {
        try {
            let data = await postData('/admin/login', values)

            if (data.statusCode === 200) {
                localStorage.setItem('jwt', data.jwt);
                message.success(data.message);
                this.setState({
                    redirectToListingPage: true
                });
            } else {
                message.error(data.message);
            }

        } catch (err) {
            console.log(err);
            message.error('Something went wrong');
        }
    };

    render() {
        const { onFinish } = this;
        const { redirectToListingPage } = this.state;
        if (redirectToListingPage) {
            return (
                <Redirect to='/admin/users/list' />
            )
        }
        return (
            <div className='login-form' >
                <Form
                    {...layout}
                    ref={this.formRef}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
};

export default LoginComponent;