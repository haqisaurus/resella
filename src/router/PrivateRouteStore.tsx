import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyTokenStore } from '../service/LoginService';
import { getCurrentStore } from '../service/StoreService';  
import { Route, Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { myProfile } from '../service/AccountService';
import { LoadingDashboard } from '../pages/Loading';
interface IProps {
    token?: string;
    tokenStore?: string;
    expiredAt?: number;
    component: any;
    path: string;
    setProfile: (payload: any) => void | undefined;
    setCurrentStore: (payload: any) => void | undefined;
};
interface IState {
    authenticated: boolean;
    loaded: boolean;
};
class PrivateRouteStore extends Component<IProps, IState> {
    state = {
        authenticated: false,
        loaded: false
    }
    async componentDidMount() {
       
        const result = await verifyTokenStore();
        const profile = await myProfile();
        const currentStore = await getCurrentStore();
        if (result.header.ok && result.data.valid && profile.header.ok && currentStore.header.ok) {
            this.setState({ authenticated: true });
            this.props.setProfile(profile.data);
            this.props.setCurrentStore(currentStore.data);
        }

        this.setState({ loaded: true });
    }
    render() {
        const { component: Component, ...rest } = this.props;
        if (this.state.loaded === false) return <LoadingDashboard />;
        return (
            <Route
                {...rest}
                render={props => (
                    this.props.tokenStore && this.props.expiredAt && dayjs().valueOf() < this.props.expiredAt && this.state.authenticated ?
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
    tokenStore: state.account.tokenStore,
    expiredAt: state.account.expiredAt
});

const mapDispatchToProps = (dispatch: any) => ({
    setProfile: (payload: any) => dispatch({ type: 'SET_PROFILE', payload }),
    setCurrentStore: (payload: any) => dispatch({type: 'SET_STORE', payload})
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivateRouteStore);