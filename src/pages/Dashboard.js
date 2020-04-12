import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Avatar, Button, Popover, List, BackTop } from 'antd';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {
    AppstoreOutlined,
    NotificationOutlined,
    UserOutlined,
    DashboardOutlined,
    ArrowUpOutlined,
    TagsOutlined,
    ShoppingCartOutlined,
    UploadOutlined,
    UserSwitchOutlined,
    SettingOutlined,
    TeamOutlined,
    ControlOutlined,
    BarcodeOutlined,
} from '@ant-design/icons';
import Home from './home/Home';
import Product from './product/Product';
import ListCategory from './category/ListCategory'
import Error404 from './errors/Error404';
import { Link } from 'react-router-dom';


export class Dashboard extends Component {
    state = {
        collapsed: false,
        data: [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
        ]
    };

    _onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    _notificationList = () => {
        return (
            <List
                size="small"
                dataSource={this.state.data}
                renderItem={item => {
                    return (
                        <List.Item>

                            <List.Item.Meta
                                avatar={<Avatar><DashboardOutlined /></Avatar>}
                                title={item}
                                description="Ant Design"
                            />
                        </List.Item>
                    )
                }}
            />
        );
    }

    render() {
        return (
            <Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout.Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this._onCollapse}
                        className="sidebar"
                        width="250">
                        <div style={{ height: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', paddingLeft: 24 }}>
                            <Avatar style={{ verticalAlign: 'middle' }} size="large">
                                <UserOutlined />
                            </Avatar>
                            {!this.state.collapsed &&
                                <Button
                                    size="small"
                                    style={{ margin: '0 16px', verticalAlign: 'middle' }}
                                    type="link"
                                >
                                    haqisaurus
                            </Button>
                            }
                        </div>
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">
                                <Link to={`${this.props.match.path}/`}>

                                    <DashboardOutlined />
                                    <span>Dashboard</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`${this.props.match.path}/sales`}>
                                    <ShoppingCartOutlined />
                                    <span>Penjualan</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`${this.props.match.path}/restock`}>
                                    <UploadOutlined />
                                    <span>Restock</span>
                                </Link>
                            </Menu.Item>
                            <Menu.SubMenu
                                key="3"
                                title={<div>
                                    <AppstoreOutlined />
                                    <span>Master</span>
                                </div>}
                            >
                                <Menu.Item key="3-1">
                                    <Link to={`${this.props.match.path}/product`}>
                                        <BarcodeOutlined />
                                        <span>Produk</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3-2">
                                    <Link to={`${this.props.match.path}/product-category`}>
                                        <TagsOutlined />
                                        <span>Kategori</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3-3">
                                    <Link to={`${this.props.match.path}/product-supplier`}>
                                        <UserSwitchOutlined />
                                        <span>Supplier</span>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="4"
                                title={<div>
                                    <SettingOutlined />
                                    <span>Pengaturan</span>
                                </div>}
                            >
                                <Menu.Item key="4-1">
                                    <Link to={`${this.props.match.path}/preference`}>
                                        <ControlOutlined />
                                        <span>Aplikasi</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4-2">
                                    <Link to={`${this.props.match.path}/employee`}>
                                        <TeamOutlined />
                                        <span>Pegawai</span>
                                    </Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                        <div style={{ height: 90 }}></div>
                    </Layout.Sider>
                    <Layout className="site-layout" style={{ paddingLeft: this.state.collapsed ? 80 : 250 }}>
                        <Layout.Header className="dashHeader">
                            <Menu mode="horizontal" className="header-horizontal">
                                <Menu.Item key="1">
                                    <Popover placement="bottomRight" content={this._notificationList()} trigger="hover">
                                        <NotificationOutlined />
                                    </Popover>
                                </Menu.Item>
                                <Menu.SubMenu
                                    title={
                                        <UserOutlined />
                                    }
                                >
                                    <Menu.Item key="user:1">Profile</Menu.Item>
                                    <Menu.Item key="user:2">Logout</Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </Layout.Header>
                        <Layout.Content style={{ margin: '16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <Router>
                                <Switch>
                                    <Route exact path={`${this.props.match.path}/`} component={Home} />
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
