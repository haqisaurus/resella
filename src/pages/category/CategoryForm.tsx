import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, notification, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form';
import { updateCategory, createCategory } from '../../service/CategoryService';
import { ICategory } from '../../typed/Entity';
interface IProps {
    data: ICategory;
    visible: boolean;
    closeForm: () => void;
}
interface IState {
    data: ICategory
}
class CategoryForm extends Component<IProps, IState> {
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
                result = await updateCategory(payload);
            } else {
                result = await createCategory(payload);
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
                    }}
                    onFinish={this._onSubmit}
                    onFinishFailed={this._onFailed}
                    ref={this.formRef}
                >
                    <Form.Item label="Nama" name="name">
                        <Input />
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)

