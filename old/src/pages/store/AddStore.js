import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Row, Col, Form, Button, Checkbox, Input, Upload, message, Select, Modal, InputNumber } from 'antd'
import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { appConfig } from '../../configs/configs';
import { getProvice, getCities, getSubdistrict } from './../../service/DeliveryService';
import { postNewStore } from './../../service/StoreService';
export class AddStore extends Component {
    state = {
        loading: false,
        provinces: [],
        cities: [],
        subdistricts: [],
        formHelper: {
            logo: '',
            province: '',
            city: '',
            subdistrict: '',
        }
    }
    layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 5, span: 16 },
    };

    async componentDidMount() {
        try {
            const provinces = await getProvice();
            console.log(provinces)
            this.setState({
                provinces: provinces.data.rajaongkir.results
            });
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }

    _onSubmit = async (values) => {
        console.log(values)
        const newStore = {
            name: values.name,
            desc: values.desc,
            phone: values.phone,
            logo: values.logo,
            deliverySupport: values.deliverySupport ? true : false,
            addresses: [{
                name: 'alamat utama',
                address: values.address,
                province: this.state.formHelper.province.province,
                province_id: this.state.formHelper.province.province_id,
                city: this.state.formHelper.city.city_name,
                city_id: this.state.formHelper.city.city_id,
                subdistrict: this.state.formHelper.subdistrict.subdistrict_name,
                subdistrict_id: this.state.formHelper.subdistrict.subdistrict_id,
                postalcode: null,
                longitude: null,
                latitude: null
            }],
            banks: [{
                name: values,
                code: values,
                type: values,
                account_number: values,
                account_name: values
            }],
            deliveries: values.deliveries
        };
        console.log(newStore)
        try {
            const res = await postNewStore(newStore);
            if (res.res.status !== 200) {
                Modal.error({
                    title: 'Error!',
                    content: res.res.statusText,
                });
            }
            window.location.hash = '/my-store'
        } catch (error) {
            console.log(error)
        }
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
                                        name="image"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action={appConfig.imageBBUrl + '?key=' + appConfig.imageBBKey}
                                        beforeUpload={this._beforeUpload}
                                        onChange={({ file }) => {
                                            if (file.status === 'done') {
                                                const formHelper = { ...this.state.formHelper };
                                                formHelper.logo = file.response.data.url;
                                                this.setState({ formHelper })
                                            }
                                        }}
                                    >
                                        {this.state.formHelper.logo ? <img src={this.state.formHelper.logo} alt="avatar" style={{ width: '100%' }} /> : this.uploadButton}
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
                                    <InputNumber maxLength={15} max={15}/>
                                </Form.Item>

                                <Form.Item
                                    label="Alamat"
                                    name="address"
                                    rules={[{ required: true, message: 'Masukan alamat toko!' }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>

                                <Form.Item
                                    label="Propinsi"
                                    name="province"
                                    rules={[{ required: true, message: 'Masukan propinsi!' }]}
                                >
                                    <Select
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih propinsi"
                                        optionFilterProp="children"
                                        onChange={async (selectedId) => {
                                            const selectedObject = this.state.provinces.find(item => item.province_id === selectedId);
                                            const formHelper = { ...this.state.formHelper };
                                            formHelper.province = selectedObject;
                                            this.setState({ formHelper });
                                            try {
                                                const cities = await getCities(selectedId);
                                                this.setState({
                                                    cities: cities.data.rajaongkir.results
                                                });
                                            } catch (error) {
                                                Modal.error({
                                                    title: 'Error!',
                                                    content: error.message,
                                                });
                                            }
                                        }}
                                        onFocus={this._dropdownFocus}
                                        onBlur={this._dropdownBlur}
                                        onSearch={this._dropdownSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.provinces.map((item, index) => (<Select.Option key={`${index}`} value={item.province_id}>{item.province}</Select.Option>))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Kota/Kabupaten"
                                    name="city"
                                    rules={[{ required: true, message: 'Masukan Kota/Kabupaten!' }]}
                                >
                                    <Select
                                        disabled={this.state.formHelper.province === ''}
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih Kota/kabupaten"
                                        optionFilterProp="children"
                                        onChange={async (selectedId) => {
                                            const selectedObject = this.state.cities.find(item => item.city_id === selectedId);
                                            const formHelper = { ...this.state.formHelper };
                                            formHelper.city = selectedObject;
                                            this.setState({ formHelper });
                                            try {
                                                const subdistricts = await getSubdistrict(selectedId);
                                                this.setState({
                                                    subdistricts: subdistricts.data.rajaongkir.results
                                                });
                                            } catch (error) {
                                                Modal.error({
                                                    title: 'Error!',
                                                    content: error.message,
                                                });
                                            }
                                        }}
                                        onFocus={this._dropdownFocus}
                                        onBlur={this._dropdownBlur}
                                        onSearch={this._dropdownSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.cities.map((item, index) => (<Select.Option key={`${index}`} value={item.city_id}>{item.city_name}</Select.Option>))}

                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Kecamatan"
                                    name="subdistrict"
                                    rules={[{ required: true, message: 'Masukan Kecamatan!' }]}
                                >
                                    <Select
                                        disabled={this.state.formHelper.city === ''}
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih Kecamatan"
                                        optionFilterProp="children"
                                        onChange={async (selectedId) => {
                                            const selectedObject = this.state.subdistricts.find(item => item.subdistrict_id === selectedId);
                                            const formHelper = { ...this.state.formHelper };
                                            formHelper.subdistrict = selectedObject;
                                            this.setState({ formHelper });
                                        }}
                                        onFocus={this._dropdownFocus}
                                        onBlur={this._dropdownBlur}
                                        onSearch={this._dropdownSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.subdistricts.map((item, index) => (<Select.Option key={`${index}`} value={item.subdistrict_id}>{item.subdistrict_name}</Select.Option>))}
                                    </Select>
                                </Form.Item>


                                <Form.Item {...this.tailLayout} name="deliverySupport" valuePropName="checked">
                                    <Checkbox>Aktifkan Pengiriman</Checkbox>
                                </Form.Item>

                                <Form.Item name="deliveries" label="pilihan pengiriman">

                                    <Checkbox.Group style={{ width: '100%' }}>
                                        <Row>
                                            <Col span={5}>
                                                <Checkbox value="JNE" style={{ lineHeight: '32px' }}>
                                                    JNE
                                                </Checkbox>
                                            </Col>
                                            <Col span={5}>
                                                <Checkbox value="TIKI" style={{ lineHeight: '32px' }}>
                                                    TIKI
                                                </Checkbox>
                                            </Col>
                                            <Col span={5}>
                                                <Checkbox value="J&T" style={{ lineHeight: '32px' }}>
                                                    JNT
                                                </Checkbox>
                                            </Col>
                                            <Col span={5}>
                                                <Checkbox value="POS" style={{ lineHeight: '32px' }}>
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
