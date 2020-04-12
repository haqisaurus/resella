import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Button } from 'antd';
import AddModal from './AddModal'
import { Link } from 'react-router-dom';
export class Product extends Component {
    state = {
        addModalVisible: false,
    }
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <Link to={'/'}></Link>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Link>Invite</Link>
                    <Link>Delete</Link>
                </span>
            ),
        },
    ];

    data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    _toogleAddModal = () => {
        this.setState({
            addModalVisible: !this.state.addModalVisible
        })
    }
    render() {
        return (
            <React.Fragment>
                <Button type="primary" style={{ marginBottom: 15 }} onClick={() => this.setState({ addModalVisible: true })}>Tambah Produk</Button>
                <Table columns={this.columns} dataSource={this.data} />
                <AddModal visible={this.state.addModalVisible} closeModal={this._toogleAddModal} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
