import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, notification, Modal, Tag } from 'antd'
import AddressModalForm from './AddressModalForm';
import { getAddress, deleteAddress } from '../../../service/AddressService';
import { IResponse } from '../../../typed/Common';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IStore, IAddress } from '../../../typed/Entity';
interface IProps {
    currentStore: IStore;
}
interface IState {
    addresses: IAddress[];
    formOpen: boolean;
    columns: any[];
    addressData: IAddress;
    dataLoaded: boolean;
}
const newData: IAddress = {
    address: '',
    city: '',
    city_id: 0,
    created_at: new Date(),
    id: 0,
    is_default: false,
    latitude: '',
    longitude: '',
    name: '',
    postalcode: 0,
    province: '',
    province_id: 0,
    store_id: 0,
    subdistrict: '',
    subdistrict_id: 0,
    updated_at: new Date(),
    user_id: 0,
}
class StoreList extends Component<IProps, IState> {
    state = {
        addressData: newData,
        addresses: [],
        formOpen: false,
        dataLoaded: false,
        columns: [
            {
                title: 'Nama',
                dataIndex: 'name',
                key: 'name',
                width: 250,
                render: (text: string, record: IAddress) => (
                    <React.Fragment>
                        {text} {record.is_default && <Tag color='geekblue'>Default</Tag>}
                    </React.Fragment>
                )
            },
            {
                title: 'Alamat',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Aksi',
                key: 'address',
                width: 200,
                render: (text: string, record: IAddress) => (
                    <React.Fragment>
                        <Button size="small" type="dashed" onClick={() => this._editData(record)}>Edit</Button>&nbsp;
                        <Button size="small" type="link" onClick={() => this._delete(record)}>Hapus</Button>
                    </React.Fragment>
                ),
            },
        ]

    }
    async componentDidMount () {
        await this._getAddress();
    }

    _getAddress = async () => {
        this.setState({ dataLoaded: false });
        try {
            const request: IResponse = await getAddress();
            if (request.header.ok) {
                this.setState({
                    addresses: request.data,
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
    _editData = (item: IAddress) => {
        const address: IAddress = item;
        this.setState({ addressData: address }, () => {
            this._toggleForm();
        });
    }
    _delete = (item: IAddress) => {
        Modal.confirm({
            title: 'Konfirmasi',
            icon: <ExclamationCircleOutlined />,
            content: 'Anda yakin ingin mengapus data?',
            onOk: async () => {
                try {
                    const request: IResponse = await deleteAddress(item);
                    if (request.header.ok) {
                        notification.success({
                            message: `Notifikasi!`,
                            description: 'Data berhasil dihapus.',
                        });
                        this._getAddress();
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
        this.setState({ formOpen: !this.state.formOpen }, () => {
            if (this.state.formOpen === false) {
                this._getAddress();
            }
        });
    }
    render () {
        return (
            <React.Fragment>
                <Button type="primary" onClick={() => this._editData(newData)} style={{ marginBottom: 20 }}>Tambah Alamat</Button>
                <Table loading={this.state.dataLoaded === false} rowKey="id" columns={this.state.columns} dataSource={this.state.addresses} />
                {this.state.formOpen && <AddressModalForm data={this.state.addressData} modalShow={this.state.formOpen} eventModal={this._toggleForm} />}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentStore: state.store.currentStore
})

const mapDispatchToProps = (dispatch: any) => ({
    setTokenStore: (payload: any) => dispatch({ type: 'SET_TOKEN_STORE', payload, }),
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreList)

