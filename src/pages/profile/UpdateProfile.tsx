import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Modal, Avatar, notification, Layout, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { updateProfile } from '../../service/AccountService';
import { IUser } from '../../typed/Response';
interface IProps {
    profile: IUser;
    setBreadcrum: (x: any) => void;
}
interface IState {
    imageUrl: string;
    loading: boolean;
}
class UpdateProfile extends Component<IProps, IState> {
    state = {
        imageUrl: '',
        loading: false,
    }
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
    };
    tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    componentDidMount() {
        this.props.setBreadcrum([
            { link: 'app', label: 'Dashboard' },
            { link: 'app/profile', label: 'Edit Profil' },
        ]);
    }

    _onSubmit = async (values: any) => {
        try {
            this.setState({loading: true});
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
                description: 'Profil sukses diupdate.',
            });
            this.setState({loading: false});
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }

    render () {
        return (
            <Layout.Content>
                <Row align="middle" justify="start">
                    <Col span={24}>
                        <Form
                            {...this.layout}
                            name="basic"
                            initialValues={this.props.profile}
                            onFinish={this._onSubmit}
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
                                <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Layout.Content>
        );
    }
}

const mapStateToProps = (state: any) => ({
    profile: state.account.profile,
})

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    setProfile: (payload: any) => dispatch({ type: 'SET_PROFILE', payload }),
    setBreadcrum: (payload: any) => dispatch({ type: 'SET_BREADCRUM', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
