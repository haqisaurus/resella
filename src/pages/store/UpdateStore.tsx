import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Tabs, Row, Col } from 'antd'
import StoreForm from './tabs/StoreForm';
import AddressList from './tabs/AddressList';
import BankList from './tabs/BankList';
import ShippingForm from './tabs/ShippingForm';
import { ShopFilled, IdcardFilled, GiftFilled, EuroCircleFilled } from '@ant-design/icons';
interface IProps {
    location: any;
    setBreadcrum: (x: any) => void;
}
interface IState {
    imageUrl: string;
    loading: boolean;
}
class UpdateStore extends Component<IProps, IState> {
    state = {
        imageUrl: '',
        loading: false,
    }

    _getUrlParameter = (name: string) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    _changeTab = (activeKey: string) => {
        console.log(activeKey)
        switch (activeKey) {

            case 'address':
                this.props.setBreadcrum([
                    { link: 'app', label: 'Dashboard' },
                    { link: 'app/update-store', label: 'Pengaturan Toko' },
                    { link: 'app/update-store?tab=address', label: 'Alamat' },
                ]);
                break;
            case 'bank':
                this.props.setBreadcrum([
                    { link: 'app', label: 'Dashboard' },
                    { link: 'app/update-store', label: 'Pengaturan Toko' },
                    { link: 'app/update-store?tab=bank', label: 'Bank' },
                ]);
                break;
            case 'shipping':
                this.props.setBreadcrum([
                    { link: 'app', label: 'Dashboard' },
                    { link: 'app/update-store', label: 'Pengaturan Toko' },
                    { link: 'app/update-store?tab=shipping', label: 'Pengiriman' },
                ]);
                break;
            default:
                this.props.setBreadcrum([
                    { link: 'app', label: 'Dashboard' },
                    { link: 'app/update-store', label: 'Pengaturan Toko' },
                    { link: 'app/update-store?tab=info', label: 'Informasi Toko' },
                ]);
                break;
        }
    }

    render () {
        console.log(this.props.location)
        return (
            <React.Fragment>
                <Layout.Content>
                    <Row align="middle" justify="start">
                        <Col span={24}>
                            <Tabs defaultActiveKey={this._getUrlParameter('tab') || 'info'} tabPosition="top" onChange={this._changeTab}>
                                <Tabs.TabPane tab={
                                    <React.Fragment>
                                        <ShopFilled />
                                        Info Toko
                                    </React.Fragment>
                                }
                                    key="info">
                                    <StoreForm />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab={
                                    <React.Fragment>
                                        <IdcardFilled />
                                        Alamat
                                    </React.Fragment>
                                }
                                    key="address">
                                    <AddressList />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab={
                                    <React.Fragment>
                                        <EuroCircleFilled />
                                        Bank
                                    </React.Fragment>
                                }
                                    key="bank">
                                    <BankList />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab={
                                    <React.Fragment>
                                        <GiftFilled />
                                    Shipping
                                    </React.Fragment>
                                }
                                    key="shipping">
                                    <ShippingForm />
                                </Tabs.TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    setBreadcrum: (payload: any) => dispatch({ type: 'SET_BREADCRUM', payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStore)
