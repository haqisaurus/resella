import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, notification } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IResponse } from '../../typed/Common';
import { getCategory, deleteCategory, getDetailCategory } from '../../service/CategoryService';
import CategoryForm from './CategoryForm';
import { ICategory } from '../../typed/Entity';
interface IProps {
    setBreadcrum: (x: any) => void;
}
interface IState {
    categories: ICategory[];
    formOpen: boolean;
    columns: any[];
    data: ICategory;
    dataLoaded: boolean;
}
const newData = {
    id: 0,
    name: '',
    updated_at: new Date(),
    created_at: new Date(),
}
class CategoryList extends Component<IProps, IState> {
    state = {
        data: newData,
        categories: [],
        formOpen: false,
        dataLoaded: false,
        columns: [
            {
                title: 'Nama',
                dataIndex: 'name',
                key: 'name',
                width: 250,
            },
            {
                title: 'Aksi',
                key: 'address',
                width: 200,
                render: (text: string, record: ICategory) => (
                    <React.Fragment>
                        <Button size="small" type="dashed" onClick={() => this._editData(record)}>Edit</Button>&nbsp;
                        <Button size="small" type="link" onClick={() => this._delete(record)}>Hapus</Button>
                    </React.Fragment>
                ),
            },
        ]

    }
    async componentDidMount () {
        this.props.setBreadcrum([
            { link: 'app', label: 'Dashboard' },
            { link: 'app/product-category', label: 'Daftar Category' },
        ]);
        await this._getCategory();
    }
    _getCategory = async () => {
        this.setState({ dataLoaded: false });
        try {
            const request: IResponse = await getCategory();
            if (request.header.ok) {
                this.setState({
                    categories: request.data,
                    dataLoaded: true
                });
            } else {
                Modal.error({
                    title: 'Error!',
                    content: request.header.statusText,
                });
            }
        } catch (error) {
            console.log(error);
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }
    _createData = () => {
        this.setState({
            data: newData,
            formOpen: true,
        });
    }
    _editData = async (item: ICategory) => {
        try {
            const request = await getDetailCategory(item.id!);
            if (request.header.ok) {
                this.setState({
                    data: request.data,
                    formOpen: true
                });
            } else {
                Modal.error({
                    title: 'Error!',
                    content: request.header.statusText,
                });
            }
        } catch (error) {
            console.log(error);
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }
    _delete = (item: ICategory) => {
        Modal.confirm({
            title: 'Konfirmasi',
            icon: <ExclamationCircleOutlined />,
            content: 'Anda yakin ingin mengapus data semua produk yang berhubungan dengan category ini akan di jadikan kosong?',
            onOk: async () => {
                try {
                    const request: IResponse = await deleteCategory(item);
                    if (request.header.ok) {
                        notification.success({
                            message: `Notifikasi!`,
                            description: 'Data berhasil dihapus.',
                        });
                        this._getCategory();
                    } else {
                        Modal.error({
                            title: 'Error!',
                            content: request.header.statusText,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    Modal.error({
                        title: 'Error!',
                        content: error.message,
                    });
                }
            },
            onCancel () {
                console.log('Cancel');
            },
        })
    }
    _toggleForm = () => {
        this.setState({ formOpen: !this.state.formOpen });
        if (this.state.formOpen === false) {
            this._getCategory();
        }
    }
    render () {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this._createData} style={{ marginBottom: 20 }}>Tambah Category</Button>
                <Table loading={!this.state.dataLoaded} rowKey="id" columns={this.state.columns} dataSource={this.state.categories} />
                {this.state.formOpen && <CategoryForm visible={this.state.formOpen} data={this.state.data} closeForm={this._toggleForm}/>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch: any) => ({
    setBreadcrum: (payload: any) => dispatch({ type: 'SET_BREADCRUM', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)

