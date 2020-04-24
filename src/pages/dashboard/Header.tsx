import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Popover, List, Avatar, } from 'antd';
import {
    NotificationOutlined,
    UserOutlined,
    DashboardOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
interface Iprops {
    logout: () => void;
    currentStore: any;
    parentProps: any;
};
interface IState {
    
};

class Header extends Component<Iprops, IState>  {
    state = {
        data: []
    }
    _logout = () => {
        this.props.logout();
        window.location.hash = '/';
    }
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
            <Layout.Header className="dashHeader">
                <Menu mode="horizontal" className="header-horizontal left-menu">
                    <Menu.Item key="hl-1">
                        <Link to={'/my-store'} className="link-white">
                            <ArrowLeftOutlined />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="hl-2">
                        {this.props.currentStore.name}
                    </Menu.Item>

                </Menu>
                <Menu mode="horizontal" className="header-horizontal right-menu">
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
                        <Menu.Item key="user:1"><Link to={'/app/profile'}>Profile</Link></Menu.Item>
                        <Menu.Item key="user:2" onClick={this._logout}>Logout</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Header>
        );
    }
}

const mapStateToProps = (state: any) => ({
    profile: state.account.profile,
    currentStore: state.store.currentStore
});

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    logout: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)