import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout, Row, Col, List, Avatar, Button, Skeleton, Menu, Card } from 'antd';
import { Link } from 'react-router-dom';

export class ListStore extends Component {
    state = {
        list: [
            {
                logo: "https://4.bp.blogspot.com/-9xQ3IsOCrjs/V2JvW5gYKlI/AAAAAAAAHEQ/3DZqjRgcunEMKgZsivQoO8xYp0wYGU2EgCK4B/s1600/prin2B4.png",
                "gender": "female",
                "name": {
                    "title": "Miss",
                    "first": "Pascale",
                    "last": "Wolff"
                },
                "email": "pascale.wolff@example.com",
                "nat": "DE"
            },
            {
                logo: "https://4.bp.blogspot.com/-9xQ3IsOCrjs/V2JvW5gYKlI/AAAAAAAAHEQ/3DZqjRgcunEMKgZsivQoO8xYp0wYGU2EgCK4B/s1600/prin2B4.png",
                "gender": "male",
                "name": {
                    "title": "Mr",
                    "first": "Anthony",
                    "last": "Park"
                },
                "email": "anthony.park@example.com",
                "nat": "CA"
            },
            {
                logo: "https://4.bp.blogspot.com/-9xQ3IsOCrjs/V2JvW5gYKlI/AAAAAAAAHEQ/3DZqjRgcunEMKgZsivQoO8xYp0wYGU2EgCK4B/s1600/prin2B4.png",
                "gender": "male",
                "name": {
                    "title": "Mr",
                    "first": "Silas",
                    "last": "Madsen"
                },
                "email": "silas.madsen@example.com",
                "nat": "DK"
            },
            {
                logo: "https://4.bp.blogspot.com/-9xQ3IsOCrjs/V2JvW5gYKlI/AAAAAAAAHEQ/3DZqjRgcunEMKgZsivQoO8xYp0wYGU2EgCK4B/s1600/prin2B4.png",
                "gender": "female",
                "name": {
                    "title": "Mrs",
                    "first": "درسا",
                    "last": "موسوی"
                },
                "email": "drs.mwswy@example.com",
                "nat": "IR"
            }
        ]
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
                    <Layout.Content style={{ height: 'calc(100vh - 64px)' }}>
                        <Row>
                            <Col>
                            </Col>
                        </Row>
                        <Row justify="center" align="middle" style={{ height: '100%' }}>
                            <Col>
                                <Button type="primary" href="/new-store" style={{ marginBottom: '20px' }}>Buat Toko</Button>
                                <Card>

                                    <List
                                        className="demo-loadmore-list"
                                        loading={false}
                                        itemLayout="horizontal"
                                        dataSource={this.state.list}
                                        renderItem={item => (
                                            <List.Item
                                                actions={[<Link to={'/'} ><Button type="primary">Masuk</Button></Link>]}
                                            >
                                                <Skeleton avatar title={false} loading={false} active>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar src={item.logo} />
                                                        }
                                                        title={<a href="https://ant.design">{item.email}</a>}
                                                        description="login 6 minutes ago"
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ListStore)
