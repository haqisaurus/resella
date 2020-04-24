import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Avatar, Button } from 'antd';
import {
    AppstoreOutlined,
    UserOutlined,
    DashboardOutlined,
    TagsOutlined,
    ShoppingCartOutlined,
    UploadOutlined,
    UserSwitchOutlined,
    SettingOutlined,
    TeamOutlined,
    ControlOutlined,
    BarcodeOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
interface Iprops {
    parentProps: any;
    collapsed: boolean;
    eventCollapse: (x: boolean) => void;
    profile: any;
};
interface IState {
    
};
class SideBar extends Component<Iprops, IState>  {

    render() {
        return (
            <Layout.Sider
                key="sidebar"
                collapsible
                collapsed={this.props.collapsed}
                onCollapse={this.props.eventCollapse}
                className="sidebar"
                width="250">
                <div style={{ height: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', paddingLeft: 24 }}>
                    {this.props.profile.photo ?
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <Avatar src= { this.props.profile.photo } alt="photo profile"  style={{ verticalAlign: 'middle' }} size={50}>
                            <UserOutlined />
                        </Avatar>:
                        <Avatar style={{ verticalAlign: 'middle' }} size={50}>
                    <UserOutlined />
                </Avatar>
                    }
                    {!this.props.collapsed &&
                    <Button
                        size="small"
                        style={{ margin: '0 16px', verticalAlign: 'middle' }}
                        type="link"
                    >
                        {this.props.profile.name}
                    </Button>
                }
                </div>
            <Menu key="side-menu" theme="dark" mode="inline">
                <Menu.Item key="1">
                    <Link to={`${this.props.parentProps.path}/`}>
                        <DashboardOutlined />
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={`${this.props.parentProps.path}/sales`}>
                        <ShoppingCartOutlined />
                        <span>Penjualan</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={`${this.props.parentProps.path}/restock`}>
                        <UploadOutlined />
                        <span>Restock</span>
                    </Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="4"
                    title={<div>
                        <AppstoreOutlined />
                        <span>Master</span>
                    </div>}
                >
                    <Menu.Item key="4-1">
                        <Link to={`${this.props.parentProps.path}/product`}>
                            <BarcodeOutlined />
                            <span>Produk</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4-2">
                        <Link to={`${this.props.parentProps.path}/product-category`}>
                            <TagsOutlined />
                            <span>Kategori</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4-3">
                        <Link to={`${this.props.parentProps.path}/product-supplier`}>
                            <UserSwitchOutlined />
                            <span>Supplier</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="5"
                    title={<div>
                        <SettingOutlined />
                        <span>Pengaturan</span>
                    </div>}
                >
                    <Menu.Item key="5-1">
                        <Link to={`${this.props.parentProps.path}/preference`}>
                            <ControlOutlined />
                            <span>Aplikasi</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5-2">
                        <Link to={`${this.props.parentProps.path}/employee`}>
                            <TeamOutlined />
                            <span>Pegawai</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5-3">
                        <Link to={`/app/update-store`}>
                            <ShopOutlined />
                            <span>Toko</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
            <div style={{ height: 90 }}></div>
            </Layout.Sider >
        );
    }
}

const mapStateToProps = (state: any) => ({
    profile: state.account.profile,
});

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    logout: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)