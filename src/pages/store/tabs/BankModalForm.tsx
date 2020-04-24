import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Input, Select, Checkbox } from 'antd'
import { IBankForm } from '../../../typed/Common';
import { IResStore } from '../../../typed/Response';
import { FormInstance } from 'antd/lib/form';

interface IProps {
    modalShow: boolean;
    eventModal: () => void;
    currentStore?: IResStore;
    data: IBankForm;
    form?: any;
}
interface IState {
    
    bankData: IBankForm;
    pageReady: boolean;
}
class BankModalForm extends Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();
    state = {
        pageReady: false,
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
        }
    }

    async componentWillMount () {
        try {
            this.setState({
                bankData: this.props.data,
                pageReady: true,
            });
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }
    _onSubmit = (values: any) => {
        console.log(values)
    }
    _onFailed = () => {

    }
    render () {
        console.log(this.state.bankData)
        return (
            <Modal
                title="Form Alamat"
                visible={this.props.modalShow}
                onCancel={() => this.props.eventModal()}
                footer={[]}
            >
                {this.state.pageReady ? <Form
                    name="basic"
                    initialValues={{
                        name: this.state.bankData.name,
                        code: this.state.bankData.code,
                        type: this.state.bankData.type,
                        account_number: this.state.bankData.account_number,
                        account_name: this.state.bankData.account_name,
                        user_id: this.state.bankData.user_id,
                        store_id: this.state.bankData.store_id,
                        is_default: this.state.bankData.is_default,
                    }}
                    onFinish={this._onSubmit}
                    onFinishFailed={this._onFailed}
                    style={{ marginTop: 30 }}
                    ref={this.formRef} 
                    layout="vertical"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Masukan nama akun!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: 'Masukan kode bank!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Nama Pemilik Rekening"
                        name="account_name"
                        rules={[{ required: true, message: 'Masukan nama pemilik rekening!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Nomor Rekening"
                        name="account_number"
                        rules={[{ required: true, message: 'Masukan nomor rekening!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="is_default"
                    >
                        <Checkbox>Jadikan utama</Checkbox>
                    </Form.Item>
                    <Form.Item
                        label="Propinsi"
                        name="province"
                        rules={[{ required: true, message: 'Masukan propinsi!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Pilih propinsi"
                            onChange={async () => {
                            }}

                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="dashed" onClick={() => this.props.eventModal()} style={{marginRight: 15}}>
                            Batal
                        </Button>
                        <Button type="primary" htmlType="submit" >
                            Simpan
                        </Button>
                    </Form.Item>
                </Form> : 'Loading...'}
            </Modal>
        )
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BankModalForm)

