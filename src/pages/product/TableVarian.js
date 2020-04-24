import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Modal, Input, Form, InputNumber } from 'antd';
import PriceModal from './PriceModal'
export class TableVarian extends Component {
    state = {
        modalVarianShow: true,
        modalPriceShow: true
    };

    columns = [
        {
            title: 'Nama',
            dataIndex: 'name',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: 'Stok',
            dataIndex: 'stock',
        },
        {
            title: 'Ukuran',
            dataIndex: 'size',
        },
        {
            title: 'Warna',
            dataIndex: 'color',
        },
        {
            title: 'Harga Beli',
            dataIndex: 'buyPrice',
        },
        {
            title: 'Harga Jual',
            dataIndex: 'sellPrice',
        },
        {
            title: 'Harga Reseller',
            dataIndex: 'resellerPrice',
        },

    ];

    _modalForm = () => {
        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVarianShow}
                    title="Tambah Varian"
                    onOk={() => { }}
                    onCancel={() => this.setState({ modalVarianShow: false })}
                >
                    <Form {...{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }} name="form-varian" onFinish={() => { }}>
                        <Form.Item name={['name']} label="Nama Varian" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="SKU">
                            <Form.Item name={['sku']} rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button type="dashed">
                                    Buat baru
                                    </Button>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item name={['stock']} label="Stok" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['stock']} label="Ukuran" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['stock']} label="Warna" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['commonBuyPrice']} label="Harga Beli">
                            <InputNumber
                                defaultValue={0}
                                formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={value => value.replace(/[^0-9]/g, '')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item label="Harga Jual">
                            <Form.Item name={['commonBuyPrice']} rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <InputNumber
                                    defaultValue={0}
                                    formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={value => value.replace(/[^0-9]/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button type="dashed">Buat Aturan Harga</Button>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item name={['commonPrice']} label="Harga Reseller" rules={[{ required: true }]}>
                            <Form.Item name={['commonBuyPrice']} rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <InputNumber
                                    defaultValue={0}
                                    formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={value => value.replace(/[^0-9]/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button type="dashed">Buat Aturan Harga</Button>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>
                <PriceModal isVisible={this.state.modalPriceShow} closeModal={() => this.setState({ modalPriceShow: false })} />
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>

                {this._modalForm()}
                <Button type="primary" style={{ marginBottom: 10 }} onClick={() => this.setState({ modalVarianShow: true })}>Tambah Varian</Button>
                <Table
                    bordered
                    dataSource={this.data}
                    columns={this.columns}
                    rowClassName="editable-row"
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TableVarian)
