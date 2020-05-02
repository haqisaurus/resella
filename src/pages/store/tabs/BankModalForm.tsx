import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Input, Select, Checkbox, notification, Spin } from 'antd'
import { FormInstance } from 'antd/lib/form';
import { getBankOptions, updateBank, createBank } from '../../../service/BankService';
import { IStore, IBank, IBankType } from '../../../typed/Entity';

interface IProps {
    modalShow: boolean;
    eventModal: () => void;
    currentStore?: IStore;
    data: IBank;
    form?: any;
}
interface IState {
    bankOptions: IBankType[];
    bankData: IBank;
    pageReady: boolean;
    isSubmitting: boolean;
}
class BankModalForm extends Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();
    state = {
        bankOptions: [],
        pageReady: false,
        isSubmitting: false,
        bankData: this.props.data,
    }

    async componentWillMount () {
        try {
            const bankOptions = await getBankOptions();
            this.setState({
                bankOptions: bankOptions.data,
                pageReady: true,
            });
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }
    _onSubmit = async (values: any) => {
        const data: IBank = {...this.state.bankData, ...values};
        console.log(data)
        this.setState({isSubmitting: true});
        let result = null;
        try {
            if (data.id) {
                result = await updateBank(data);
            } else {
                result = await createBank(data);
            }
            if (result.header.ok) {
                notification.success({
                    message: `Sukses!`,
                    description:'Data bank berhasil disubmit.',
                });
                this.props.eventModal();
            } else {
                    Modal.error({
                        title: 'Error!',
                        content: result.header.statusText,
                    });
            }
        } catch (error) {
            console.log(error); 
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
        this.setState({isSubmitting: false});

    }
    _onFailed = () => {

    }
    render () {
        console.log(this.state.bankData)
        return (
            <Modal
                title="Form Bank"
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
                        label="Jenis Bank"
                        name="type"
                        rules={[{ required: true, message: 'Masukan jenis bank!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Pilih jenis bank"
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.bankOptions.map((item: IBankType, index: number) => (<Select.Option key={`${index}`} value={item.value} > {item.value} </Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: 'Masukan kode bank!' }]}
                    >
                        <Input max={6} maxLength={6}/>
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
                    
                    <Form.Item>
                        <Button type="dashed" onClick={() => this.props.eventModal()} style={{marginRight: 15}}>
                            Batal
                        </Button>
                        <Button type="primary" htmlType="submit" loading={this.state.isSubmitting}>
                            Simpan
                        </Button>
                    </Form.Item>
                </Form> : <Spin tip="Loading..." style={{width: '100%'}}></Spin>}
            </Modal>
        )
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BankModalForm)

