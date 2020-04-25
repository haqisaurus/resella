import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb, Button, BackTop } from 'antd';
import { Route, HashRouter as Router, Switch, RouteComponentProps } from 'react-router-dom';
import {
    HomeFilled
} from '@ant-design/icons';
import {
    ArrowUpOutlined,
} from '@ant-design/icons';
import Home from '../home/Home';
// import Product from '../product/Product';
// import ListCategory from '../category/ListCategory'
import Error404 from '../errors/Error404';
import UpdateStore from '../store/UpdateStore';
import UpdateProfile from '../profile/UpdateProfile';
import SideBar from './SideBar';
import Header from './Header';
interface Iprops {
    setScrumbread: (x: any) => void;
    breadcrumbs: any[]
};
interface IState {
    sideBarCollapsed: boolean;
};
export class Dashboard extends Component<Iprops & RouteComponentProps, IState>  {
    state = {
        sideBarCollapsed: false,
    };

    _onCollapse = (collapsed: boolean) => {
        this.setState({ sideBarCollapsed: collapsed });
    };

    render () {
        return (
            <Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <SideBar parentProps={this.props} collapsed={this.state.sideBarCollapsed} eventCollapse={this._onCollapse} />
                    <Layout className="site-layout" style={{ paddingLeft: this.state.sideBarCollapsed ? 80 : 250 }}>
                        <Header parentProps={this.props} />
                        <Layout.Content style={{ margin: '16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                {this.props.breadcrumbs.map((item: any, index: number) => (<Breadcrumb.Item key={'bc' + index} href={'#/'+item.link}>{index === 0 && <HomeFilled />} {item.label}</Breadcrumb.Item>))}
                            </Breadcrumb>
                            <Router>
                                <Switch>
                                    <Route exact path={`/app`} component={Home} />
                                    <Route exact path={'/app/update-store'} component={UpdateStore} />
                                    <Route exact path={`/app/profile`} component={UpdateProfile} />
                                    {/* 
                                    <Route exact path={`${this.props.match.path}/product`} component={Product} />
                                    <Route exact path={`${this.props.match.path}/product-category`} component={ListCategory} /> */}

                                    <Route exact path={`${this.props.location.pathname}/*`} component={Error404} />
                                </Switch>
                            </Router>
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }}>Resella ©2020 Created by Love</Layout.Footer>
                    </Layout>
                </Layout>
                <BackTop>
                    <Button type="primary" shape="circle" icon={<ArrowUpOutlined />} size={"large"} />
                </BackTop>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({
    profile: state.account.profile,
    breadcrumbs: state.system.breadcrumbs
});

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
