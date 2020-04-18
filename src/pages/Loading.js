import React, { Component } from 'react';
import { Skeleton, Row, Col } from 'antd';
class LoadingDashboard extends Component {
    render() {
        return (
            <div style={{ width: '100vw', height: '100vh', padding: 20 }}>
                <Row>
                    <Col span={4} style={{ paddingRight: 20 }}>
                        <Skeleton active avatar paragraph={false}></Skeleton>
                        <Skeleton active></Skeleton>
                    </Col>
                    <Col span={20}>
                        <Skeleton.Input active style={{ width: '100%', marginBottom: 20 }} large></Skeleton.Input>
                        <Skeleton active avatar paragraph={{ rows: 2 }}></Skeleton>
                        <Skeleton active avatar paragraph={{ rows: 5 }}></Skeleton>
                    </Col>
                </Row>
            </div>
        );
    }
}

class LoadingStore extends Component {
    render() {
        return (
            <div style={{ width: '100vw', height: '100vh', padding: 20 }}>
                <Row>
                    <Col span={24}>
                        <Skeleton.Input active style={{ width: '100%', marginBottom: 20 }} large></Skeleton.Input>
                    </Col>
                </Row>
                <Row>
                    <Col offset={6} span={12}>
                        <Skeleton.Button active style={{marginBottom: 20}}></Skeleton.Button>
                        <Skeleton active avatar paragraph={{ rows: 2 }}></Skeleton>
                        <Skeleton active avatar paragraph={{ rows: 5 }}></Skeleton>
                    </Col>
                </Row>
            </div>
        );
    }
}

export { LoadingDashboard, LoadingStore };