import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Button } from 'antd';
import AddModal from './AddModal'
import { Link } from 'react-router-dom';
import { IProduct } from '../../typed/Entity';
interface IProps { 
    setBreadcrum: (x: any) => void;
}
interface IState {
    addModalVisible: boolean;
    data: IProduct[]
}
class ProductList extends Component<IProps, IState> {
    state = {
        addModalVisible: false,
        data: [],
    }
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Link to={'/'}></Link>,
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
            render: (tags: any) => (
                <span>
                    {tags.map((tag: any) => {
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
            render: (text: string, record: IProduct) => (
                <span>
                    <Button>Invite</Button>
                    <Button>Delete</Button>
                </span>
            ),
        },
    ];


    componentDidMount() {
        this.props.setBreadcrum([
            { link: 'app', label: 'Dashboard' },
            { link: 'app/product', label: 'Daftar Produk' },
        ]);
    }
    _toogleAddModal = () => {
        this.setState({
            addModalVisible: !this.state.addModalVisible
        })
    }
    render() {
        return (
            <React.Fragment>
                <Button type="primary" style={{ marginBottom: 15 }} onClick={() => this.setState({ addModalVisible: true })}>Tambah Produk</Button>
                <Table columns={this.columns} dataSource={this.state.data} />
                <AddModal visible={this.state.addModalVisible} closeModal={this._toogleAddModal} />
            </React.Fragment>
        )
    }
}

const newData = {

}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    setBreadcrum: (payload: any) => dispatch({ type: 'SET_BREADCRUM', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
