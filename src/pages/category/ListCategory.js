import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Input, Row, Col } from 'antd';
import { getCategory } from './../../service/CategoryService'
export class ListCategory extends Component {
    state = {
        data: {},
        pagination: {
            pageSize: 0,
            current: 0,
            field: '',
            sort: 'DESC'
        },
        load: false
    }
    columns = [
        {
            title: 'Nama',
            dataIndex: 'first_name',
            sorter: (a, b) => a.first_name.length - b.first_name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Deskripsi',
            dataIndex: 'last_name',
        },
    ];

    componentDidMount() {
        this._getData()
    }

    _getData = () => {
        getCategory(this.state.pagination).then(e => {
            console.log(e.data)
            this.setState({ data: e.data })
        });
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={10}>
                        <Input.Search
                            style={{ marginBottom: 15 }}
                            placeholder="Cari nama, deskripsi"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table
                            rowSelection={{}}
                            columns={this.columns}
                            dataSource={this.state.data.data}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategory)
