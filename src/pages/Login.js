import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Divider, Card } from 'antd';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { appConfig } from './../configs/configs';
import logo from './../assets/images/logo.png';
export class Login extends Component {
    _facebookLogin = (res) => {
        console.log(res)
    }
    _googleLogin = (res) => {
        console.log(res)
    }

    _errorLogin = (err) => {

    }

    _submit = () => {

    }
    render() {
        return (
            <Fragment>
                <Layout>
                    <Layout.Content>
                        <Row align="middle" justify="center" style={{ height: '100vh' }}>
                            <Col>
                                <Card style={{ width: 300, textAlign: 'center' }}>
                                    <img src={logo} style={{width: 90}} alt="Logo Resella"/>
                                    <h3>Silahkan Login Menggunakan</h3>
                                    <br/>
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
