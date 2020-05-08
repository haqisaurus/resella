import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, notification } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IResponse } from '../../typed/Common';
import { getSupplier, deleteSupplier, getDetailSupplier } from '../../service/SupplierService';
import SupplierForm from './SupplierForm';
import { ISupplier } from '../../typed/Entity';
interface IProps {
    setBreadcrum: (x: any) => void;
}
interface IState {
    suppliers: ISupplier[];
    formOpen: boolean;
    columns: any[];
    data: ISupplier;
    dataLoaded: boolean;
}
const newData = {
    id: 0,
    name: '',
    phone: '',
    desc: '',
    updated_at: new Date(),
    created_at: new Date(),
}
class SupplierList extends Component<IProps, IState> {
    state = {
        data: newData,
        suppliers: [],
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
                title: 'No Handphone',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: 'Aksi',
                key: 'address',
                width: 200,
                render: (text: string, record: ISupplier) => (
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
            { link: 'app/product-supplier', label: 'Daftar Supplier' },
        ]);
        await this._getSupplier();
    }
    _getSupplier = async () => {
        this.setState({ dataLoaded: false });
        try {
            const request: IResponse = await getSupplier();
            if (request.header.ok) {
                this.setState({
                    suppliers: request.data,
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
    _editData = async (item: ISupplier) => {
        try {
            const request = await getDetailSupplier(item.id!);
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
    _delete = (item: ISupplier) => {
        Modal.confirm({
            title: 'Konfirmasi',
            icon: <ExclamationCircleOutlined />,
            content: 'Anda yakin ingin mengapus data semua produk yang berhubungan dengan supplier ini akan di jadikan kosong?',
            onOk: async () => {
                try {
                    const request: IResponse = await deleteSupplier(item);
                    if (request.header.ok) {
                        notification.success({
                            message: `Notifikasi!`,
                            description: 'Data berhasil dihapus.',
                        });
                        this._getSupplier();
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
            this._getSupplier();
        }
    }
    render () {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this._createData} style={{ marginBottom: 20 }}>Tambah Supplier</Button>
                <Table loading={!this.state.dataLoaded} rowKey="id" columns={this.state.columns} dataSource={this.state.suppliers} />
                {this.state.formOpen && <SupplierForm visible={this.state.formOpen} data={this.state.data} closeForm={this._toggleForm}/>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch: any) => ({
    setBreadcrum: (payload: any) => dispatch({ type: 'SET_BREADCRUM', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(SupplierList)

