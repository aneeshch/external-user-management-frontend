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


class RegisterComponent extends React.Component {

    state = {
        redirectToHomePage: false,
    };

    formRef = React.createRef();

    onFinish = async (values) => {
        try {
            let data = await postData('/user', values);

            if (data.statusCode === 201) {
                message.success(data.message);
                this.setState({
                    redirectToHomePage: true
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
        const { redirectToHomePage } = this.state;
        if (redirectToHomePage) {
            return (
                <Redirect to='/' />
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
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your First Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Last Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="SSN"
                        name="ssn"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your SSN!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Telephone Number"
                        name="telephoneNo"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Telephone Number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    };
};

export default RegisterComponent;