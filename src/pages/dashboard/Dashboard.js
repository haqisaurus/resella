import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb, Button, BackTop } from 'antd';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import {
    ArrowUpOutlined,
} from '@ant-design/icons';
import Home from '../home/Home';
import Product from '../product/Product';
import ListCategory from '../category/ListCategory'
import Error404 from '../errors/Error404';
import UpdateStore from '../store/UpdateStore';
import UpdateProfile from '../profile/UpdateProfile';
import SideBar from './SideBar';
import Header from './Header';

export class Dashboard extends Component {
    state = {
        sideBarCollapsed: false,
    };

    _onCollapse = collapsed => {
        this.setState({ sideBarCollapsed: collapsed });
    };

    render() {
        return (
            <Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <SideBar parentProps={this.props} collapsed={this.state.sideBarCollapsed} eventCollapse={this._onCollapse}/>
                    <Layout className="site-layout" style={{ paddingLeft: this.state.sideBarCollapsed ? 80 : 250 }}>
                        <Header parentProps={this.props}/>
                        <Layout.Content style={{ margin: '16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <Router>
                                <Switch>
                                    <Route exact path={`${this.props.match.path}/`} component={Home} />
                                    <Route exact path={`/app/update-store`} component={UpdateStore} />
                                    <Route exact path={`/app/profile`} component={UpdateProfile} />
                                    <Route exact path={`${this.props.match.path}/product`} component={Product} />
                                    <Route exact path={`${this.props.match.path}/product-category`} component={ListCategory} />
                                    {/* <PrivateRouteStore path="/dashboard" component={Dashboard} />
                                        <PrivateRoute path="/my-store" component={ListStore} />
                                        <PrivateRoute path="/new-store" component={AddStore} />
                                    */}
                                    <Route exact path={`${this.props.match.path}/*`} component={Error404} />
                                </Switch>
                            </Router>
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }}>Resella ©2020 Created by Love</Layout.Footer>
                    </Layout>
                </Layout>
                <BackTop>
                    <Button type="primary" shape="circle" icon={<ArrowUpOutlined />} size={64} />
                </BackTop>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.account.profile,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
