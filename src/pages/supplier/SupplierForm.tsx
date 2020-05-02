import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, notification, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form';
import { updateSupplier, createSupplier } from '../../service/SupplierService';
import { ISupplier } from '../../typed/Entity';
interface IProps {
    data: ISupplier;
    visible: boolean;
    closeForm: () => void;
}
interface IState {
    data: ISupplier
}
class SupplierForm extends Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();
    state = {
        data: this.props.data
    }
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
    };
    tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

    _onSubmit = async (values: any) => {
        try {
            let result = null;
            const payload = { ...this.state.data, ...values };
            if (this.state.data.id) {
                result = await updateSupplier(payload);
            } else {
                result = await createSupplier(payload);
            }
            if (!result.header.ok) {
                Modal.error({
                    title: 'Error!',
                    content: result.header.statusText,
                });
                return;
            }
            notification.success({
                message: `Notifikasi!`,
                description: 'Data sukses disimpan.',
            });
            this.props.closeForm();
        } catch (error) {
            console.log(error);
        }
    }

    _onFailed = () => {

    }
    render () {
        return (
            <Modal
                visible={this.props.visible}
            >
                <Form
                    {...this.layout}
                    name="basic"
                    initialValues={{
                        name: this.state.data.name,
                        phone: this.state.data.phone,
                        desc: this.state.data.desc
                    }}
                    onFinish={this._onSubmit}
                    onFinishFailed={this._onFailed}
                    ref={this.formRef}
                >
                    <Form.Item label="Nama" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Kontak" name="phone">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Deskripsi" name="desc">
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <Form.Item {...this.tailLayout}>
                        <Button type="primary" htmlType="submit" >
                            Simpan
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierForm)

