import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputNumber, Form, Button, Input, Modal, notification } from 'antd'
import { IResStore } from '../../../typed/Response';
import { updateStore } from '../../../service/StoreService';
interface IProps { 
    currentStore: IResStore;
    setCurrentStore: (x: any) => void;
}
interface IState {
    
}
class StoreForm extends Component<IProps, IState> {
    state = {
        
    }
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
    };
    tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };
    _onSubmit = async (values: any) => {
        values.id = this.props.currentStore.id;
        try {
            const result = await updateStore(values);
            if (!result.header.ok) {
                Modal.error({
                    title: 'Error!',
                    content: result.header.statusText,
                });
                return;
            }
            this.props.setCurrentStore(result);
            notification.success({
                message: `Notifikasi!`,
                description:'Toko sukses diupdate.',
            });
        } catch (error) {
            console.log(error);
        }
    }
    _onFailed = () => {

    }
    render () {
        console.log(this.props.currentStore)
        return (
            <Form
                {...this.layout}
                name="basic"
                initialValues={{ 
                    name: this.props.currentStore.name, 
                    desc: this.props.currentStore.desc,
                    phone: this.props.currentStore.phone,

                }}
                onFinish={this._onSubmit}
                onFinishFailed={this._onFailed}
                style={{ marginTop: 30 }}
            >
                <Form.Item
                    label="Nama Toko"
                    name="name"
                    rules={[{ required: true, message: 'Masukan nama toko!' }]}
                >
                    <Input placeholder="contoh: Toko Gelas"/>
                </Form.Item>
                <Form.Item
                    label="Deskripsi"
                    name="desc"
                    rules={[{ required: true, message: 'Masukan deskripsi toko!' }]}
                >
                    <Input.TextArea placeholder="contoh: Menjual berbagai macam Gelas"/>
                </Form.Item>

                <Form.Item
                    label="No Hape"
                    name="phone"
                    rules={[{ required: true, message: 'Masukan nomer Handphone!' }]}
                >
                    <Input maxLength={15} max={15} placeholder="contoh: 08786536635"/>
                </Form.Item>

                <Form.Item {...this.tailLayout}>
                    <Button type="primary" htmlType="submit" >
                        Simpan
                    </Button>
                </Form.Item>
            </Form>

        )
    }
}

const mapStateToProps = (state: any) => ({
    currentStore: state.store.currentStore
});

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    setCurrentStore: (payload: any) => dispatch({type: 'SET_STORE', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreForm)

