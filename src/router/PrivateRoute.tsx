import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyToken } from '../service/LoginService';
import { Route, Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { LoadingStore } from '../pages/Loading'
interface IProps {
    token?: string;
    tokenStore?: string;
    expiredAt?: number;
    component: any;
    path: string;
};
interface IState {
    authenticated: boolean;
    loaded: boolean;
};
class PrivateRoute extends Component<IProps, IState> {
    state = {
        authenticated: false,
        loaded: false
    }
    async componentDidMount() {
        const result = await verifyToken();
        if (result.header.ok && result.data.valid) {
            this.setState({ authenticated: true })
        }
        this.setState({ loaded: true });
    }
    render() {
        const { component: Component, ...rest } = this.props;
        if (this.state.loaded === false) return <LoadingStore />;
        return (
            <Route
                {...rest}
                render={props => (
                    this.props.token && this.props.expiredAt && dayjs().valueOf() < this.props.expiredAt && this.state.authenticated ?
                        <Component {...rest} /> :
                        <Redirect to={{ pathname: '/' }} />
                )
                }
            />
        );
    }
}
const mapStateToProps = (state: any) => ({
    token: state.account.token,
    expiredAt: state.account.expiredAt
});

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivateRoute);