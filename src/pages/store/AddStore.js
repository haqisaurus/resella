import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Row, Col, Form, Button, Checkbox, Input, Upload, message, Select } from 'antd'
import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export class AddStore extends Component {
    state = {
        imageUrl: '',
        loading: false,
    }
    layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 5, span: 16 },
    };
    countryOptions = [
        { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
        { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
        { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
        { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
        { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
        { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
        { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
        { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
        { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
        { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
        { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
        { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
        { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
        { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
        { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
        { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
        { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
        { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
        { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
        { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
        { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
        { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
    ]
    _onSubmit = () => {

    }
    _onFailed = () => {

    }
    _beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    _dropdownChange = () => {

    }
    _dropdownFocus = () => {

    }
    _dropdownBlur = () => {

    }
    _dropdownSearch = () => {

    }
    uploadButton = (
        <div>
            {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    plainOptions = ['JNE', 'TIKI', 'JNT', 'POS'];
    render() {
        return (
            <React.Fragment>
                <Layout.Header>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">
                            <ArrowLeftOutlined />
                            <Link to="/my-store">Kembali</Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout.Content>
                    <Row align="middle" justify="center">
                        <Col span={16}>
                            <Form
                                {...this.layout}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this._onSubmit}
                                onFinishFailed={this._onFailed}
                                style={{ marginTop: 30 }}
                            >
                                <Form.Item {...{ wrapperCol: { offset: 10, span: 5 } }}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={this._beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : this.uploadButton}
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    label="Nama Toko"
                                    name="name"
                                    rules={[{ required: true, message: 'Masukan nama toko!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Deskripsi"
                                    name="desc"
                                    rules={[{ required: true, message: 'Masukan deskripsi toko!' }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>

                                <Form.Item
                                    label="No telphone"
                                    name="phone"
                                    rules={[{ required: true, message: 'Masukan nomer telphone!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Alamat"
                                    name="addresss"
                                    rules={[{ required: true, message: 'Masukan alamat toko!' }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>

                                <Form.Item
                                    label="Propinsi"
                                    name="city"
                                    rules={[{ required: true, message: 'Masukan propinsi!' }]}
                                >
                                    <Select
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih propinsi"
                                        optionFilterProp="children"
                                        onChange={this._dropdownChange}
                                        onFocus={this._dropdownFocus}
                                        onBlur={this._dropdownBlur}
                                        onSearch={this._dropdownSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Select.Option value="jack">Jack</Select.Option>
                                        <Select.Option value="lucy">Lucy</Select.Option>
                                        <Select.Option value="tom">Tom</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Kota/Kabupaten"
                                    name="city"
                                    rules={[{ required: true, message: 'Masukan Kota/Kabupaten!' }]}
                                >
                                    <Select
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih Kota/kabupaten"
                                        optionFilterProp="children"
                                        onChange={this._dropdownChange}
                                        onFocus={this._dropdownFocus}
                                        onBlur={this._dropdownBlur}
                                        onSearch={this._dropdownSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Select.Option value="jack">Jack</Select.Option>
                                        <Select.Option value="lucy">Lucy</Select.Option>
                                        <Select.Option value="tom">Tom</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Kecamatan"
                                    name="subdistrict"
                                    rules={[{ required: true, message: 'Masukan Kecamatan!' }]}
                                >
                                    <Select
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih Kecamatan"
                                        optionFilterProp="children"
                                        onChange={this._dropdownChange}
                                        onFocus={this._dropdownFocus}
                                        onBlur={this._dropdownBlur}
                                        onSearch={this._dropdownSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Select.Option value="jack">Jack</Select.Option>
                                        <Select.Option value="lucy">Lucy</Select.Option>
                                        <Select.Option value="tom">Tom</Select.Option>
                                    </Select>
                                </Form.Item>


                                <Form.Item {...this.tailLayout} name="shipping" valuePropName="checked">
                                    <Checkbox>Aktifkan Pengiriman</Checkbox>
                                </Form.Item>

                                <Form.Item label="pilihan pengiriman">

                                    <Checkbox.Group style={{ width: '100%' }}>
                                        <Row>
                                            <Col span={5}>
                                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                                    JNE
                                                </Checkbox>
                                            </Col>
                                            <Col span={5}>
                                                <Checkbox value="B" style={{ lineHeight: '32px' }}>
                                                    TIKI
                                                </Checkbox>
                                            </Col>
                                            <Col span={5}>
                                                <Checkbox value="C" style={{ lineHeight: '32px' }}>
                                                    JNT
                                                </Checkbox>
                                            </Col>
                                            <Col span={5}>
                                                <Checkbox value="D" style={{ lineHeight: '32px' }}>
                                                    POS
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>

                                <Form.Item {...this.tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddStore)
