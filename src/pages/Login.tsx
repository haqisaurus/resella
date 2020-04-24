import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Divider, Card, Modal } from 'antd';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { appConfig } from '../configs/configs';
import logo from './../assets/images/logo.png';
import { postLogin } from '../service/LoginService';
interface Iprops {
    setToken: (x: any) => void;
};
interface IState {
    
};
export class Login extends Component<Iprops, IState> {

    _facebookLogin = (res: any) => {
        const payload = {
            email: res.email,
            name: res.name,
            userId: res.id,
            authenticator: 'facebook',
            token: res.accessToken,
            refresh: res.signedRequest,
            expiredAt: res.data_access_expiration_time,
            photo: res.picture.data.url
        }
        this._submit(payload);
    }
    _googleLogin = (res: any) => {
        const payload = {
            email: res.profileObj.email,
            name: res.profileObj.name,
            userId: res.googleId,
            authenticator: 'google',
            token: res.tokenId,
            refresh: res.tokenObj.login_hint,
            expiredAt: res.tokenObj.expires_at,
            photo: res.profileObj.imageUrl
        }
        this._submit(payload);
    }

    _errorLogin = (err: any) => {
        Modal.error({
            title: 'Error Login',
            content: err.message,
        });
    }

    _submit = async (payload: any) => {
        try {
            const res = await postLogin(payload);
            this.props.setToken({
                token: res.data.token,
                expiredAt: res.data.expiredAt
            });
            window.location.hash = '/my-store';
        } catch (error) {
            console.log(error); 
            Modal.error({
                title: 'Error Login',
                content: error.message,
            });
        }
    }
    render() {
        return (
            <Fragment>
                <Layout>
                    <Layout.Content>
                        <Row align="middle" justify="center" style={{ height: '100vh' }}>
                            <Col>
                                <Card style={{ width: 300, textAlign: 'center' }}>
                                    <img src={logo} style={{ width: 90 }} alt="Logo Resella" />
                                    <h3>Silahkan Login Menggunakan</h3>
                                    <br />
                                    <FacebookLogin
                                        appId={appConfig.facebookClientId}
                                        fields="name,email,picture"
                                        callback={this._facebookLogin} />
                                    <Divider />
                                    <span>Atau</span>
                                    <Divider />
                                    <GoogleLogin
                                        clientId={appConfig.googleClientId}
                                        onSuccess={this._googleLogin}
                                        onFailure={this._errorLogin}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Layout.Content>
                </Layout>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = (dispatch: any) => ({
    setToken: (payload: any) => dispatch({
        type: 'SET_TOKEN',
        payload,
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
