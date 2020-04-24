import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Upload, Modal, Form, Input, InputNumber, Button, Row, Col, AutoComplete, Checkbox, Radio, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { appConfig } from '../../configs/configs';
import TableVarian from './TableVarian';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export class AddModal extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    _handleCancel = () => this.setState({ previewVisible: false });

    _handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    _handleChange = ({ fileList }) => this.setState({ fileList });

    uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    options = [
        { value: 'Burns Bay Road' },
        { value: 'Downing Street' },
        { value: 'Wall Street' },
    ];

    render() {
        return (
            <React.Fragment>
                <Modal
                    title="Tambah Produk"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={() => this.props.closeModal()}
                    width='95vw'
                    style={{ marginTop: -60 }}
                >
                    <Row>
                        <Col offset={4}>
                            <Upload
                                action={appConfig.imageBBUrl + '?key=' + appConfig.imageBBKey}
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onPreview={this._handlePreview}
                                onChange={this._handleChange}
                                name="image"
                            >
                                {this.state.fileList.length >= 8 ? null : this.uploadButton}
                            </Upload>
                        </Col>
                    </Row>
                    <Form {...layout} name="nest-messages" onFinish={this._onSubmit}>
                        <Form.Item name={['user', 'name']} label="Nama Produk" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'name']} label="Deskripsi" rules={[{ required: true }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Kategori" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
                            <Form.Item name={['category']} rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <AutoComplete
                                    dropdownClassName="certain-category-search-dropdown"
                                    dropdownMatchSelectWidth={500}
                                    style={{ width: '100%' }}
                                    options={this.options}
                                    filterOption={(inputValue, option) => {
                                        console.log(inputValue, option)
                                        return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    }
                                >
                                    <Input.Search placeholder="Cari kategori" />
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button type="dashed">
                                    Buat baru
                                </Button>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="SKU" >
                            <Form.Item name={['user', 'name']} rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Checkbox>Buat Otomatis</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item name={['commonBuyPrice']} label="Harga Beli Utama">
                            <InputNumber
                                defaultValue={0}
                                formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={value => value.replace(/[^0-9]/g, '')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item label="Harga Jual Utama">
                            <Form.Item name={['commonBuyPrice']} rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <InputNumber
                                    defaultValue={0}
                                    formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={value => value.replace(/[^0-9]/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button>Buat Aturan Harga</Button>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item name={['commonPrice']} label="Harga Reseller Utama" rules={[{ required: true }]}>
                            <Form.Item name={['commonBuyPrice']} rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <InputNumber
                                    defaultValue={0}
                                    formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={value => value.replace(/[^0-9]/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button>Buat Aturan Harga</Button>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Varian" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
                            <TableVarian />
                        </Form.Item>
                        <Form.Item name={['isNew']} label="Kondisi" rules={[{ required: true }]}>
                            <Radio.Group onChange={this.onChange} value={this.state.value}>
                                <Radio value={1}>Baru</Radio>
                                <Radio value={2}>Bekas</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name={['user', 'name']} label="Min pemesanan" rules={[{ required: true }]}>
                            <InputNumber
                                defaultValue={0}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={value => parseInt(value.replace(/[^0-9]/g, ''))}
                                style={{ width: 100 }}
                            /> pcs
                        </Form.Item>
                        <Form.Item name={['user', 'name']} label="Berat" rules={[{ required: true }]}>
                            <InputNumber
                                defaultValue={0}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={value => parseInt(value.replace(/[^0-9]/g, ''))}
                                style={{ width: 100 }}
                            /> gram
                        </Form.Item>
                        <Form.Item name={['isPreorder']} label="Preorder" rules={[{ required: true }]}>
                            <Switch defaultChecked onChange={() => { }} />
                        </Form.Item>

                    </Form>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this._handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
