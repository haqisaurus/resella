import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Upload, Modal, Form, Input, InputNumber, Button, Row, Col, AutoComplete, Checkbox, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { appConfig } from '../../configs/configs';
import TableVarian from './TableVarian';
import PriceTable from './PriceTable';
import { IProduct, ICategory } from '../../typed/Entity';
import { FormInstance } from 'antd/lib/form';
import { getCategory } from '../../service/CategoryService';
import { IResponse, IProductForm } from '../../typed/Common';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

function getBase64 (file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
interface IProps {
    visible: boolean;
    closeModal: () => void;
    formData?: IProductForm;
    resultModal: (x: IProduct) => void;
}
interface IState {
    previewVisible: boolean;
    previewImage: string;
    fileList: any;
    formData?: IProductForm;
    categories: ICategory[];
    autoGenCode: boolean;
}
export class AddModal extends Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();
    gPrice = React.createRef<any>();
    gResPrice = React.createRef<any>();

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        formData: this.props.formData,
        categories: [],
        autoGenCode: this.props.formData?.auto_gen_code || true
    };

    async componentDidMount () {
        try {
            const request: IResponse = await getCategory();
            if (request.header.ok) {
                this.setState({
                    categories: request.data,
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

    _handleCancel = () => this.setState({ previewVisible: false });

    _handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    _handleChange = (e: any) => {
        this.setState({ fileList: e.fileList });
    };

    uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    _handleOk = () => {
        console.log(this.gPrice.current._getPrice())
    }
    _onSubmit = () => {

    }
    _onChangeRadio = () => {

    }

    render () {
        return (
            <React.Fragment>
                <Modal
                    title="Tambah Produk"
                    visible={this.props.visible}
                    onOk={this._handleOk}
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
                    <Form
                        {...layout}
                        ref={this.formRef}
                        name="product"
                        onFinish={this._onSubmit}
                        initialValues={{
                            ...this.state.formData,
                            selected_category: this.state.formData?.category_id ? this.state.categories.find((item: ICategory) => item.id === this.state.formData?.category_id) : '',
                            g_price: this.state.formData?.global_prices?.[0]?.price || 0,
                            g_reseller_price: this.state.formData?.global_reseller_prices?.[0]?.price || 0
                        }}
                    >
                        <Form.Item name="name" label="Nama Produk" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="desc" label="Deskripsi" rules={[{ required: true }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Kategori" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
                            <Form.Item name="selected_category" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <AutoComplete
                                    dropdownClassName="certain-category-search-dropdown"
                                    dropdownMatchSelectWidth={500}
                                    style={{ width: '100%' }}
                                    onChange={(value: string) => {
                                        const cat: any = this.state.categories.find((item: ICategory) => item?.id?.toString() === value);
                                        this.formRef.current?.setFieldsValue({ category_id: cat.id });
                                        this.formRef.current?.setFieldsValue({ selected_category: cat.name });
                                    }}
                                >
                                    {this.state.categories.map((item: ICategory) => (<AutoComplete.Option key={item.id} value={item.id!}>{item.name}</AutoComplete.Option>))}
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button type="dashed">
                                    Buat baru
                                </Button>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="SKU" >
                            <Form.Item name="sku" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <Input disabled={this.state.autoGenCode} />
                            </Form.Item>
                            <Form.Item name="auto_gen_code" style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Checkbox
                                    checked={this.state.autoGenCode}
                                    onChange={(e: any) => {
                                        this.formRef.current?.setFieldsValue({ auto_gen_code: e.target.checked });
                                        this.setState({ autoGenCode: e.target.checked });
                                    }}
                                >Buat Otomatis</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item name="buy_price" label="Harga Beli Utama">
                            <InputNumber
                                defaultValue={this.state.formData?.buy_price}
                                formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={(value: any) => value.replace(/[^0-9]/g, '')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item label="Harga Jual Utama">
                            {/* <Form.Item name="g_price" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <InputNumber
                                    defaultValue={this.state.formData?.global_prices?.[0]?.price || 0}
                                    formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={(value: any) => value.replace(/[^0-9]/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button>Buat Aturan Harga</Button>
                            </Form.Item> */}
                            <PriceTable ref={this.gPrice} data={this.state.formData?.global_prices!} />
                        </Form.Item>
                        <Form.Item label="Harga Reseller Utama" rules={[{ required: true }]}>
                            {/* <Form.Item name="g_reseller_price" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}>
                                <InputNumber
                                    defaultValue={this.state.formData?.global_reseller_prices?.[0]?.price || 0}
                                    formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                    parser={(value: any) => value.replace(/[^0-9]/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: 15, marginBottom: 0 }}>
                                <Button>Buat Aturan Harga</Button>
                            </Form.Item> */}
                            <PriceTable key="re" ref={this.gResPrice} data={this.state.formData?.global_reseller_prices!} />
                        </Form.Item>
                        <Form.Item label="Varian" {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
                            <TableVarian />
                        </Form.Item>
                        <Form.Item name="is_secondhand" label="Kondisi" rules={[{ required: true }]}>
                            <Radio.Group onChange={this._onChangeRadio}>
                                <Radio value={false}>Baru</Radio>
                                <Radio value={true}>Bekas</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="min_order" label="Min pemesanan" rules={[{ required: true }]}>
                            <InputNumber
                                defaultValue={this.state.formData?.min_order}
                                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={(value: any) => parseInt(value.replace(/[^0-9]/g, ''))}
                                style={{ width: 100 }}
                            /> pcs
                        </Form.Item>
                        <Form.Item name="weight" label="Berat" rules={[{ required: true }]}>
                            <InputNumber
                                defaultValue={this.state.formData?.weight}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={(value: any) => parseInt(value.replace(/[^0-9]/g, ''))}
                                style={{ width: 100 }}
                            /> gram
                        </Form.Item>
                        <Form.Item name="is_preorder" label="Preorder" rules={[{ required: true }]}>
                            <Radio.Group onChange={this._onChangeRadio}>
                                <Radio value={true}>Ya</Radio>
                                <Radio value={false}>Tidak</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                    {this.state.previewVisible && <Modal visible={this.state.previewVisible} footer={null} onCancel={this._handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>}
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
