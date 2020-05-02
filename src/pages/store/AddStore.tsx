import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Row, Col, Form, Button, Checkbox, Input, Upload, message, Select, Modal, InputNumber } from 'antd'
import { ArrowLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { appConfig } from '../../configs/configs';
import { getProvice, getCities, getSubdistrict, getDeliveryServices } from '../../service/DeliveryService';
import { postNewStore } from '../../service/StoreService';
import { FormInstance } from 'antd/lib/form';
import { ICity, IProvince, ISubdistrict, ICreateStoreFormHelper, IResponse } from '../../typed/Common';
import { IDelivery } from '../../typed/Entity';
interface IProps {
    removeTokenStore: () => void;
};
interface IState {
    loading: boolean;
    provinces: IProvince[],
    cities: ICity[],
    subdistricts: ISubdistrict[],
    deliveryServices: IDelivery[],
    formHelper: ICreateStoreFormHelper;
    deliverySupport: boolean;
};
export class AddStore extends Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();

    state = {
        loading: false,
        deliverySupport: false,
        provinces: [],
        cities: [],
        subdistricts: [],
        deliveryServices: [],
        formHelper: {
            logo: '',
            province: {
                province: '',
                province_id: 0,
            },
            city: {
                city_name: '',
                city_id: 0,
            },
            subdistrict: {
                subdistrict_name: '',
                subdistrict_id: 0
            }

        }
    }
    layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 5, span: 16 },
    };

    async componentDidMount () {
        try {
            this.props.removeTokenStore();
            const deliveryServices = await getDeliveryServices()
            const provinces = await getProvice();
            console.log(deliveryServices)
            this.setState({
                provinces: provinces.data.rajaongkir.results,
                deliveryServices: deliveryServices.data
            });
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }

    _onSubmit = async (values: any) => {
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
            const res: IResponse = await postNewStore(newStore);
            if (res.header.status !== 200) {
                Modal.error({
                    title: 'Error!',
                    content: res.header.statusText,
                });
            }
            window.location.hash = '/my-store'
        } catch (error) {
            console.log(error)
        }
    }
    _onFailed = () => {

    }
    _beforeUpload = (file: File) => {
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
 
    uploadButton = (
        <div>
            {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text" > Upload </div>
        </div>
    );

    render () {
        return (
            <React.Fragment>
                <Layout.Header>
                    <Menu theme="dark" mode="horizontal" >
                        <Menu.Item key="1" >
                            <ArrowLeftOutlined />
                            < Link to="/my-store" > Kembali </Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Header>
                < Layout.Content >
                    <Row align="middle" justify="center" >
                        <Col span={16}>
                            <Form
                                {...this.layout}
                                name="basic"
                                initialValues={{ 
                                    name: '',
                                    desc: '',
                                    phone: '',
                                    address: '',
                                    province: '',
                                    city: '',
                                    subdistrict: '',
                                    deliverySupport: false,
                                    deliveries: []
                                }}
                                onFinish={this._onSubmit}
                                onFinishFailed={this._onFailed}
                                style={{ marginTop: 30 }}
                                ref={this.formRef}
                            >
                                <Form.Item {...{ wrapperCol: { offset: 10, span: 5 } }} >
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
                                    <InputNumber maxLength={15} max={15} />
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
                                        onChange={async (selectedId: number) => {
                                            const selectedObject: IProvince = this.state.provinces.find((item: IProvince) => item.province_id === selectedId) as unknown as IProvince;
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
                                        filterOption={(input: string, option: any) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.provinces.map((item: IProvince, index: number) => (<Select.Option key={`${index}`} value={item.province_id} > {item.province} </Select.Option>))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Kota/Kabupaten"
                                    name="city"
                                    rules={[{ required: true, message: 'Masukan Kota/Kabupaten!' }]}
                                >
                                    <Select
                                        disabled={this.state.formHelper.province.province === ''}
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih Kota/kabupaten"
                                        optionFilterProp="children"
                                        onChange={async (selectedId: number) => {
                                            const selectedObject: ICity = this.state.cities.find((item: ICity) => item.city_id === selectedId) as unknown as ICity;
                                            const formHelper = { ...this.state.formHelper };
                                            formHelper.city = selectedObject;
                                            this.setState({ formHelper });
                                            try {
                                                const subdistricts = await getSubdistrict(selectedId);
                                                console.log(subdistricts)
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
                                        filterOption={(input: string, option: any) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.cities.map((item: ICity, index: number) => (<Select.Option key={`${index}`} value={item.city_id} > {item.city_name} </Select.Option>))}

                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Kecamatan"
                                    name="subdistrict"
                                    rules={[{ required: true, message: 'Masukan Kecamatan!' }]}
                                >
                                    <Select
                                        disabled={this.state.formHelper.city.city_name === ''}
                                        showSearch
                                        style={{ minWidth: 400 }}
                                        placeholder="Pilih Kecamatan"
                                        optionFilterProp="children"
                                        onChange={async (selectedId) => {
                                            const selectedObject: ISubdistrict = this.state.subdistricts.find((item: ISubdistrict) => item.subdistrict_id === selectedId) as unknown as ISubdistrict;
                                            const formHelper = { ...this.state.formHelper };
                                            formHelper.subdistrict = selectedObject;
                                            this.setState({ formHelper });
                                        }}
                                        filterOption={(input: string, option: any) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.subdistricts.map((item: ISubdistrict, index: number) => (<Select.Option key={`${index}`} value={item.subdistrict_id} > {item.subdistrict_name} </Select.Option>))}
                                    </Select>
                                </Form.Item>


                                <Form.Item {...this.tailLayout} name="deliverySupport" valuePropName="checked">
                                    <Checkbox onChange={(e: any) => {
                                        this.formRef.current?.setFieldsValue({deliverySupport: e.target.checked})
                                        this.setState({deliverySupport: e.target.checked});
                                    }}>Aktifkan Pengiriman </Checkbox>
                                </Form.Item>

                                <Form.Item name="deliveries" label="pilihan pengiriman" >

                                    <Checkbox.Group style={{ width: '100%' }}>
                                        <Row>
                                            {this.state.deliveryServices.map((item: IDelivery, key: number) => (
                                                <Col span={8} key={`check-${key}`}>
                                                    <Checkbox disabled={this.state.deliverySupport === false} value={item.id} style={{ lineHeight: '32px' }}>
                                                        {item.service}
                                                    </Checkbox>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>

                                <Form.Item {...this.tailLayout}>
                                    <Button type="primary" htmlType="submit" >
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

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    removeTokenStore: () => dispatch({type: 'REMOVE_TOKEN_STORE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStore)
