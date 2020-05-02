import React, { Component } from 'react'
import { Form, Modal, InputNumber, Button } from 'antd'
import { connect } from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
interface IProps {
    isVisible: boolean;
    closeModal: () => void;
}
interface IState {

}
export class PriceModal extends Component<IProps, IState> {

    render() {
        return (
            <React.Fragment>
                <Modal
                    visible={this.props.isVisible}
                    title="Tambah Varian"
                    onOk={() => { }}
                    onCancel={() => this.props.closeModal()}
                >
                    <Form name="price-modal-form" onFinish={() => { }}>
                        <Form.List name="form-list">
                            {(fields, { add, remove }) => {
                                console.log(fields)
                                return (
                                    <React.Fragment>
                                        {
                                            fields.map((field: any, index: number) => (
                                                <Form.Item style={{ margin: 0 }}>
                                                    <Form.Item
                                                        name={[field.name, 'jumlah']}
                                                        style={{ display: 'inline-block', width: '50%', paddingRight: 10, margin: 0 }}
                                                        rules={[{
                                                            required: true,
                                                        }, (object: any) => ({
                                                            validator(rule, value) {
                                                                console.log(object.getFieldValue(), object.getFieldValue('harga' + field.name))
                                                                if (field.key === 0 || !value || object.getFieldValue(field.name + 'harga') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                    return Promise.reject('Jumlah tidak valid (harus lebih besar dari sebelumnya)');
                                                            },
                                                        })]}>
                                                        <InputNumber placeholder="Jumlah" style={{ width: '100%' }} />
                                                    </Form.Item>
                                                    
                                                    <Form.Item
                                                        name={[field.name, 'harga']}
                                                        style={{ display: 'inline-block', width: '50%' }}
                                                        rules={[
                                                            { 
                                                                required: true, 
                                                            }, (object) => ({
                                                                validator(rule, value) {
                                                                    if (field.key === 0 || !value || object.getFieldValue(field.name + 'harga') === value) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject('Harga tidak valid (harus lebih besar dari sebelumnya)');
                                                                },
                                                            })]}
                                                    >
                                                        <InputNumber
                                                            placeholder="Harga"
                                                            // defaultValue={0}
                                                            // formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                                            // parser={value => value.replace(/[^0-9]/g, '')}
                                                            style={{ width: index === 0 ? '100%' : 'calc(100% - 37px)', display: 'inline-block' }}
                                                        />
                                                    </Form.Item>
                                                    {index !== 0 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            style={{ margin: '8px', right: 0, position: 'absolute'}}
                                                            onClick={() => {
                                                                remove(field.name);
                                                            }}
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))
                                        }
                                        {/* add button  */}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                }}
                                                style={{ width: '60%' }}
                                            >
                                                <PlusOutlined /> Add field
                                        </Button>
                                        </Form.Item>
                                    </React.Fragment>
                                );
                            }}
                        </Form.List>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PriceModal)
