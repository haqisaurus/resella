import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Tag, Modal, notification } from 'antd'
import { IResponse } from '../../../typed/Common';
import { IResStore, IResBank } from '../../../typed/Response';
import BankModalForm from './BankModalForm';
import { getBank, deleteBank } from '../../../service/BankService';
import { ExclamationCircleOutlined } from '@ant-design/icons';
interface IProps {
    currentStore: IResStore;
}
interface IState {
    banks: IResBank[];
    formOpen: boolean;
    columns: any[];
    bankData: IResBank;
    dataLoaded: boolean;
}
const bankData = {
    id: 0,
    name: '',
    code: '',
    type: '',
    account_number: '',
    account_name: '',
    user_id: 0,
    store_id: 0,
    is_default: false,
    updated_at: new Date(),
    created_at: new Date(),
}
class BankList extends Component<IProps, IState> {
    state = {
        bankData: bankData,
        banks: [],
        formOpen: false,
        dataLoaded: false,
        columns: [
            {
                title: 'Nama Pemilik',
                dataIndex: 'name',
                key: 'name',
                width: 250,
                render: (text: string, record: IResBank) => (
                    <React.Fragment>
                        {text} {record.is_default && <Tag color='geekblue'>Default</Tag>}
                    </React.Fragment>
                )
            },
            {
                title: 'Nama Rekening',
                dataIndex: 'account_name',
                key: 'account_name'
            },
            {
                title: 'No Rekening',
                dataIndex: 'account_number',
                key: 'account_number'
            },
            {
                title: 'Bank',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: 'Aksi',
                key: 'address',
                width: 200,
                render: (text: string, record: IResBank) => (
                    <React.Fragment>
                        <Button size="small" type="dashed" onClick={() => this._editData(record)}>Edit</Button>&nbsp;
                        <Button size="small" type="danger" onClick={() => this._delete(record)}>Hapus</Button>
                    </React.Fragment>
                ),
            },
        ]

    }
    async componentDidMount () {
        await this._getbank();
    }
    _getbank = async () => {
        this.setState({ dataLoaded: false });
        try {
            const request: IResponse = await getBank();
            if (request.header.ok) {
                this.setState({
                    banks: request.data,
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
    _editData = (item: IResBank) => {
        this.setState({ bankData: item }, () => {
            this._toggleForm();
        });
    }
    _delete = (item: IResBank) => {
        Modal.confirm({
            title: 'Konfirmasi',
            icon: <ExclamationCircleOutlined />,
            content: 'Anda yakin ingin mengapus data?',
            onOk: async () => {
                try {
                    const request: IResponse = await deleteBank(item);
                    if (request.header.ok) {
                        notification.success({
                            message: `Notifikasi!`,
                            description: 'Data berhasil dihapus.',
                        });
                        this._getbank();
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
            this._getbank();
        }
    }
    render () {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this._toggleForm} style={{ marginBottom: 20 }}>Tambah Bank</Button>
                <Table loading={!this.state.dataLoaded} rowKey="id" columns={this.state.columns} dataSource={this.state.banks} />
                {this.state.formOpen && <BankModalForm data={this.state.bankData} modalShow={this.state.formOpen} eventModal={this._toggleForm} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(BankList)

