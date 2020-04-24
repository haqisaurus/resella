import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd'
import { IBankForm } from '../../../typed/Common';
import { IResAddress, IResStore, IResBank } from '../../../typed/Response';
import BankModalForm from './BankModalForm';
interface IProps {
    currentStore: IResStore
}
interface IState {
    banks: IResBank[];
    formOpen: boolean;
    columns: any[];
    bankData: IBankForm;
}
class BankList extends Component<IProps, IState> {
    state = {
        bankData: {
            new: true,
            name: '',
            code: '',
            type: '',
            account_number: '',
            account_name: '',
            user_id: -1,
            store_id: -1,
            is_default: false,
            updated_at: Date(),
            created_at: Date(),
        },
        banks: [],
        formOpen: false,
        columns: [
            {
                title: 'Nama Pemilik',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Bank',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Aksi',
                key: 'address',
                render: (text: string, record: IResBank) => (
                    <React.Fragment>
                        <Button size="small" type="link" onClick={() => this._editData(record)}>Edit</Button>
                        <Button size="small" type="danger">Hapus</Button>
                    </React.Fragment>
                ),
            },
        ]

    }
    async componentDidMount () {
        const banks = this.props.currentStore.banks as unknown as IResBank[];
        this.setState({ banks })
    }
    _editData = (item: IResBank) => {
        const bank: IBankForm = {
            new: false,
            name: item.name,
            code: item.code,
            type: item.type,
            account_number: item.account_number,
            account_name: item.account_name,
            user_id: item.user_id,
            store_id: item.store_id,
            is_default: item.is_default,
        };
        
        this.setState({bankData: bank}, () => {
            this._toggleForm();
        });
    }
    _toggleForm = () => {
        this.setState({ formOpen: !this.state.formOpen })
    }
    render () {
        return (
            <React.Fragment>
                <Button type="primary" onClick={this._toggleForm} style={{ marginBottom: 20 }}>Tambah Bank</Button>
                <Table rowKey="id" columns={this.state.columns} dataSource={this.state.banks} />
                {this.state.formOpen && <BankModalForm data={this.state.bankData} modalShow={this.state.formOpen} eventModal={this._toggleForm} />}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentStore: state.store.currentStore
})

const mapDispatchToProps = (dispatch: any) => ({
    setTokenStore: (payload: any) => dispatch({
        type: 'SET_TOKEN_STORE',
        payload,
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(BankList)

