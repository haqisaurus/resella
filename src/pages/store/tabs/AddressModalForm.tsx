import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Input, Select, Checkbox, Spin, notification } from 'antd'
import { getProvice, getCities, getSubdistrict } from '../../../service/DeliveryService';
import { IProvince, ISubdistrict, ICity } from '../../../typed/Common';
import { IResAddress, IResStore } from '../../../typed/Response';
import { FormInstance } from 'antd/lib/form';
import { IReqAddress } from '../../../typed/Request';
import { createAddress, updateAddress } from '../../../service/AddressService';

interface IProps {
    modalShow: boolean;
    eventModal: () => void;
    currentStore?: IResStore;
    data: IResAddress;
    form?: any;
}
interface IState {
    provinces: IProvince[];
    cities: ICity[];
    subdistricts: ISubdistrict[];
    addresses: IResAddress[];
    addressData: IResAddress;
    pageReady: boolean;
    isSubmitting: boolean;
}
class AddressModalForm extends Component<IProps, IState> {
    formRef = React.createRef<FormInstance>();
    state = {
        pageReady: false,
        isSubmitting: false,
        addresses: [],
        provinces: [],
        cities: [],
        subdistricts: [],
        addressData: this.props.data,
    }

    layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };
    async componentWillMount () {
        try {
            const provinces = await getProvice();
            const cities = await getCities(this.props.data.province_id);
            const subdistricts = await getSubdistrict(this.props.data.city_id);
            this.setState({
                provinces: provinces.data.rajaongkir.results,
                cities: cities.data.rajaongkir.results,
                subdistricts: subdistricts.data.rajaongkir.results,
                pageReady: true,
            });
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
    }
    _onSubmit = async (values: any) => {
        console.log(values, this.state.addressData)
        const data: IReqAddress = {...this.state.addressData, ...values};
        data.province = this.state.addressData.province;
        data.province_id = this.state.addressData.province_id;
        data.city = this.state.addressData.city;
        data.city_id = this.state.addressData.city_id;
        data.subdistrict = this.state.addressData.subdistrict;
        data.subdistrict_id = this.state.addressData.subdistrict_id;
        this.setState({isSubmitting: true});
        let result = null;
        try {
            if (data.id) {
                result = await updateAddress(data);
            } else {
                result = await createAddress(data);
            }
            if (result.header.ok) {
                notification.success({
                    message: `Sukses!`,
                    description:'Data alamat berhasil disubmit.',
                });
                this.props.eventModal();
            } else {
                    Modal.error({
                        title: 'Error!',
                        content: result.header.statusText,
                    });
            }
        } catch (error) {
            console.log(error); 
            Modal.error({
                title: 'Error!',
                content: error.message,
            });
        }
        this.setState({isSubmitting: false});

    }
    _onFailed = () => {

    }
    render () {
        console.log(this.state.addressData)
        return (
            <Modal
                title="Form Alamat"
                visible={this.props.modalShow}
                onCancel={() => this.props.eventModal()}
                footer={[]}
            >
                {this.state.pageReady ? <Form
                    {...this.layout}
                    name="basic"
                    initialValues={{
                        name: this.state.addressData.name,
                        address: this.state.addressData.address,
                        city: this.state.addressData.city_id,
                        subdistrict: this.state.addressData.subdistrict_id,
                        province: this.state.addressData.province_id,
                        postalcode: this.state.addressData.postalcode,
                    }}
                    onFinish={this._onSubmit}
                    onFinishFailed={this._onFailed}
                    ref={this.formRef} 
                >
                    <Form.Item
                        label="Nama"
                        name="name"
                        rules={[{ required: true, message: 'Masukan alamat toko!' }]}
                    >
                        <Input placeholder="Nama Alamat" />
                    </Form.Item>
                    <Form.Item
                        label="Alamat"
                        name="address"
                        rules={[{ required: true, message: 'Masukan alamat toko!' }]}
                    >
                        <Input.TextArea rows={5} placeholder="Jl sama dia tapi ketahuan mantan No. 2" />
                    </Form.Item>

                    <Form.Item
                        label="Propinsi"
                        name="province"
                        rules={[{ required: true, message: 'Masukan propinsi!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Pilih propinsi"
                            onChange={async (selectedId: number) => {
                                
                                this.formRef.current?.setFieldsValue({
                                    city: '',
                                    subdistrict: ''
                                });
                                const selectedObject: IProvince = this.state.provinces.find((item: IProvince) => item.province_id === selectedId) as unknown as IProvince;
                                const addressData = { ...this.state.addressData };
                                addressData.province = selectedObject.province;
                                addressData.province_id = selectedObject.province_id;
                                this.setState({ addressData });
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
                            disabled={this.state.addressData.province_id === 0}
                            showSearch
                            placeholder="Pilih Kota/kabupaten"
                            optionFilterProp="children"
                            onChange={async (selectedId: number) => {
                                const selectedObject: ICity = this.state.cities.find((item: ICity) => item.city_id === selectedId) as unknown as ICity;
                                const addressData = { ...this.state.addressData };
                                addressData.city = selectedObject.city_name;
                                addressData.city_id = selectedObject.city_id;
                                this.setState({ addressData });
                                this.formRef.current?.setFieldsValue({
                                    subdistrict: ''
                                });
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
                            disabled={this.state.addressData.city_id === 0}
                            showSearch
                            placeholder="Pilih Kecamatan"
                            optionFilterProp="children"
                            onChange={async (selectedId) => {
                                const selectedObject: ISubdistrict = this.state.subdistricts.find((item: ISubdistrict) => item.subdistrict_id === selectedId) as unknown as ISubdistrict;
                                const addressData = { ...this.state.addressData };
                                addressData.subdistrict = selectedObject.subdistrict_name;
                                addressData.subdistrict_id = selectedObject.subdistrict_id;
                                this.setState({ addressData });
                            }}

                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.subdistricts.map((item: ISubdistrict, index: number) => (<Select.Option key={`${index}`} value={item.subdistrict_id} > {item.subdistrict_name} </Select.Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Kode pos"
                        name="postalcode"
                    >
                        <Input max={5} maxLength={5} placeholder="contoh: 89098" />
                    </Form.Item>

                    <Form.Item
                        label=" "
                        name="is_default"
                        valuePropName="checked"
                    >
                        <Checkbox>Jadikan Alamat Utama</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="dashed" onClick={() => this.props.eventModal()} style={{marginRight: 15}}>
                            Batal
                        </Button>
                        <Button type="primary" htmlType="submit" loading={this.state.isSubmitting} disabled={this.state.isSubmitting}>
                            Simpan
                        </Button>
                    </Form.Item>
                </Form> : <Spin tip="Loading..." style={{width: '100%'}}></Spin>}
            </Modal>
        )
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AddressModalForm)

