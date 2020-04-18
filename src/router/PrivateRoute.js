import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyToken } from '../service/LoginService';
import { Route, Redirect } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { LoadingStore } from './../pages/Loading'
class PrivateRoute extends Component {
    state = {
        authenticated: false,
        loaded: false
    }
    async componentDidMount() {
        window.token = this.props.token;
        const result = await verifyToken();
        if (result.header.ok && result.data.valid) {
            this.setState({ authenticated: true })
        }
        this.setState({ loaded: true });
    }
    render() {
        const { component: Component, ...rest } = this.props;
        console.log(this.state)
        if (this.state.loaded === false) return <LoadingStore />;
        return (
            <Route
                {...rest}
                render={props => (
                    this.props.token && dayjs().valueOf() < this.props.expiredAt && this.state.authenticated ?
                        <Component {...props} /> :
                        <Redirect to={{ pathname: '/' }} />
                )
                }
            />
        );
    }
}
const mapStateToProps = state => ({
    token: state.account.token,
    expiredAt: state.account.expiredAt
});

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivateRoute);