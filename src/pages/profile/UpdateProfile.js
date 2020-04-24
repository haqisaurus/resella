import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Button, Input, Modal, Avatar, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { updateProfile } from './../../service/AccountService';
class UpdateProfile extends Component {
    state = {
        imageUrl: '',
        loading: false,
        formHelper: {

        }
    }
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
    };
    tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    _onSubmit = async (values) => {
        try {
            const newProfile = { ...this.props.profile, ...values };
            const result = await updateProfile(newProfile);
            if (result.header.ok === false) {
                Modal.error({
                    title: 'Error!',
                    content: result.data.message,
                });
            }
            notification.success({
                message: `Notifikasi!`,
                description:'Profil sukses diupdate.',
            });
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <Layout.Content>
                    <Row align="middle" justify="left">
                        <Col span={24}>
                            <Form
                                {...this.layout}
                                name="basic"
                                initialValues={this.props.profile}
                                onFinish={this._onSubmit}
                                onFinishFailed={this._onFailed}
                                style={{ marginTop: 30 }}
                            >
                                <Form.Item {...{ wrapperCol: { offset: 4, span: 5 } }}>
                                    {this.props.profile.photo ?
                                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                        <img src={this.props.profile.photo} alt="photo profile" style={{ width: 100 }} /> :
                                        <Avatar style={{ verticalAlign: 'middle' }} size={100}>
                                            <UserOutlined />
                                        </Avatar>
                                    }
                                </Form.Item>
                                <Form.Item
                                    label="Nama"
                                    name="name"
                                    rules={[{ required: true, message: 'Masukan nama!' }]}
                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Masukan email!' }]}
                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item
                                    label="No Handphone"
                                    name="phone"
                                    rules={[{ required: true, message: 'Masukan nomer Handphone!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item {...this.tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.account.profile,
})

const mapDispatchToProps = dispatch => ({
    setProfile: payload => dispatch({ type: 'SET_PROFILE', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
