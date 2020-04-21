import React, { Component } from 'react'
import { Result, Button } from 'antd';
export default class Error404 extends Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button href="/app" type="primary">Back Home</Button>}
            />
        )
    }
}
