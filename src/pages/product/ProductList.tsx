import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal } from 'antd';
import AddModal from './AddModal'
import { IProduct, IVarian } from '../../typed/Entity';
import { IResponse, IProductForm } from '../../typed/Common';
import { getProducts } from '../../service/ProductService';
const CurrencyFormat: any = require('react-currency-format');
interface IProps {
    setBreadcrum: (x: any) => void;
}
interface IState {
    addModalVisible: boolean;
    data: IProduct[],
    dataLoaded: boolean;
    pagination: any;
    rowSelection: any[]
    formData: IProduct;
}
class ProductList extends Component<IProps, IState> {
    state = {
        addModalVisible: true,
        formData: newData,
        data: [],
        rowSelection: [],
        dataLoaded: false,
        pagination: {
            defaultCurrent: 1,
            current: 1,
            pageSize: 10,
            total: 0,
        }

    };

    columns = [
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Stok',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Beli',
            dataIndex: 'buy_price',
            key: 'buy_price',
            render: (text: string) => {
                return (
                    <CurrencyFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value: any) => <div>{value}</div>} />)
            }
        },
        {
            title: 'Jual',
            dataIndex: 'price',
            key: 'price',
            render: (text: string) => {
                return (
                    <CurrencyFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value: any) => <div>{value}</div>} />)
            }
        },
        {
            title: 'Reseller',
            dataIndex: 'reseller',
            key: 'reseller',
            render: (text: string) => {
                return (
                    <CurrencyFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={(value: any) => <div>{value}</div>} />)
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <span>
                    <Button type="dashed" size="small">Edit</Button>&nbsp;
                    <Button type="link" size="small">Delete</Button>
                </span>
            ),
        },
    ];

    componentDidMount () {
        this.props.setBreadcrum([
            { link: 'app', label: 'Dashboard' },
            { link: 'app/product', label: 'Daftar Produk' },
        ]);
        this._getProduct();
    }

    _flatten = (json: IProduct[]) => {
        const flatten: any[] = [];
        json.forEach((product: IProduct) => {
            const row: any = {
                key: product.varians![0].id,
                sku: product.sku,
                status: product.status,
                name: `${product.name} - ${product.varians![0].name} (${product.varians![0].color}, ${product.varians![0].size})`,
                stock: product.varians![0].stock,
                price: product.varians![0].prices![0].price || product.global_prices![0].price || 0,
                reseller: product.varians![0].reseller_prices![0].price || product.global_reseller_prices![0].price || 0,
                buy_price: product.buy_price,
                children: product.varians!.length > 1 ? [] : null
            };

            product.varians!.forEach((varian: IVarian, index: number) => {
                if (index !== 0) {
                    const child = {
                        key: product.varians![index].id,
                        sku: product.sku,
                        status: product.status,
                        name: `${product.name} - ${product.varians![index].name} (${product.varians![index].color}, ${product.varians![index].size})`,
                        stock: product.varians![index].stock,
                        price: product.varians![index].reseller_prices![0].price || product.global_reseller_prices![0].price || 0,
                        reseller: product.varians![index].reseller_prices![0].price || product.global_reseller_prices![0].price || 0,
                        buy_price: product.buy_price,
                    };
                    row.children.push(child);
                }
            });
            flatten.push(row);
        });
        return flatten;
    }

    _getProduct = async () => {
        this.setState({ dataLoaded: false });
        try {
            const request: IResponse = await getProducts(this.state.pagination);
            if (request.header.ok) {
                const pagination = { ...this.state.pagination };
                pagination.defaultCurrent = request.data.page;
                pagination.pageSize = request.data.pageSize;
                pagination.total = request.data.total;
                this.setState({
                    data: this._flatten(request.data.data),
                    pagination,
                    dataLoaded: true
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

    _toogleAddModal = () => {
        this.setState({
            addModalVisible: !this.state.addModalVisible
        })
    }

    _resultModal = (result: any) => {
        this.setState({formData: result});
    }

    render () {
        return (
            <React.Fragment>
                <Button type="primary" style={{ marginBottom: 15 }} onClick={() => this.setState({ addModalVisible: true })}>Tambah Produk</Button>
                <Table
                    pagination={this.state.pagination}
                    loading={!this.state.dataLoaded}
                    columns={this.columns}
                    dataSource={this.state.data}
                    onChange={(e) => {
                        const pagination = { ...this.state.pagination };
                        pagination.current = e.current!;
                        this.setState({ pagination }, () => {
                            this._getProduct();
                        });
                    }}

                    rowSelection={{
                        onChange: (selectedKeys: any) => {
                            this.setState({ rowSelection: selectedKeys })
                        }
                    }}
                    size="small" />
                {this.state.addModalVisible && 
                    <AddModal 
                        formData={this.state.formData} 
                        visible={this.state.addModalVisible} 
                        closeModal={this._toogleAddModal} 
                        resultModal={this._resultModal}
                        />}
            </React.Fragment>
        )
    }
}

const newData: IProductForm = {
    id: 0,
    name: '',
    sku: '',
    desc: '',
    is_secondhand: false,
    is_preorder: false,
    min_order: 4,
    status: '',
    buy_price: 0,
    rate: 0,
    weight: 20,
    store_id: 0,
    supplier_id: 0,
    category_id: 0,
    auto_gen_code: true,
    global_prices: [
        {
            qty: 1,
            price: 0
        }
    ],
    global_reseller_prices: [
        {
            qty: 1,
            price: 20
        }
    ],
    varians: [
        {
            id: 0,
            name: '',
            color: '',
            size: '',
            stock: 23,
            prices: [
                {
                    qty: 1,
                    price: 0
                }
            ],
            reseller_prices: [],
            images: []
        },
    ]

}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch: (x: any) => void) => ({
    setBreadcrum: (payload: any) => dispatch({ type: 'SET_BREADCRUM', payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
