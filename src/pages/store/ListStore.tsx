import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout, Row, Col, List, Avatar, Button, Skeleton, Menu, Card } from 'antd';
import { Link } from 'react-router-dom';
import { getMyStore } from '../../service/StoreService'
import { postLoginStore } from '../../service/LoginService'
interface IProps {
    setTokenStore: (payload: any) => void;
}
interface IState {
    listStore: any[];
}
export class ListStore extends Component<IProps, IState> {
    state = {
        listStore: []
    }

    async componentDidMount() {
        
        try {
            const res = await getMyStore();
            this.setState({listStore: res.data});
        } catch (error) {
            
        }
    }

    _loginStore = async (item: any) => {
        try {
            const res = await postLoginStore({storeId: item.id});
            console.log(res)
            this.props.setTokenStore({
                token: res.data.token,
                expiredAt: res.data.expiredAt
            });
            window.location.hash = '/app';
        } catch (error) {
            
        }
    }

    render() {
        return (
            <React.Fragment>
                <Layout>
                    <Layout.Header>
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item key="1">
                                <ArrowLeftOutlined />
                                <Link to="/">Kembali</Link>
                            </Menu.Item>
                        </Menu>
                    </Layout.Header>
                    <Layout.Content style={{ minHeight: 'calc(100vh - 64px)', padding: 25 }}>
                        <Row justify="center" align="middle" style={{ height: '100%' }}>
                            <Col>
                                <Button type="primary" href="#/new-store" style={{ marginBottom: '20px' }}>Buat Toko</Button>
                                <Card>
                                    <List
                                        className="demo-loadmore-list"
                                        loading={false}
                                        itemLayout="horizontal"
                                        dataSource={this.state.listStore}
                                        renderItem={(item: any) => (
                                            <List.Item
                                                actions={[<Button type="primary" onClick={() => this._loginStore(item)}>Masuk</Button>]}
                                            >
                                                <Skeleton avatar title={false} loading={false} active>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar src={item.logo} />
                                                        }
                                                        title={<div onClick={() => this._loginStore(item)}>{item.name}</div>}
                                                        description={item.desc}
                                                    />
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Layout.Content>
                </Layout>
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state: any) => ({
    token: state.account.token
})

const mapDispatchToProps = (dispatch: any) => ({
    setTokenStore: (payload: any) => dispatch({
        type: 'SET_TOKEN_STORE',
        payload,
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(ListStore)
