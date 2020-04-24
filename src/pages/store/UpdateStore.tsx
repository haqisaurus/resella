import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Tabs, Row, Col } from 'antd'
import StoreForm from './tabs/StoreForm';
import AddressList from './tabs/AddressList';
import BankList from './tabs/BankList';
import ShippingForm from './tabs/ShippingForm';
interface IProps {
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

    render() {
        return (
            <React.Fragment>
                <Layout.Content>
                    <Row align="middle" justify="start">
                        <Col span={24}>
                        <Tabs defaultActiveKey="set-3" tabPosition="top">
                            <Tabs.TabPane tab="Info Toko" key="set-1">
                                <StoreForm/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Alamat" key="set-2">
                                <AddressList/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Bank" key="set-3">
                                <BankList/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Pengiriman" key="set-4">
                                <ShippingForm/>
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
    currentStore: state.store.currentStore
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStore)
