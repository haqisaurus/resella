import React, { Component, RefObject } from 'react'
import { Table, Button, InputNumber } from 'antd';
import { IPrice } from '../../typed/Entity';
interface IProps {
    data: IPrice[];
    ref?: RefObject<any>
}
interface IStat {
    data: IPrice[];
}
export default class PriceTable extends Component<IProps, IStat> {
    state = {
        data: [],
    };

    columns = [
        {
            title: 'Jumlah',
            dataIndex: 'qty',
            key: 'qty',
            render: (text: string, record: IPrice, index: number) => {
                return (
                    <InputNumber disabled={index === 0} defaultValue={parseInt(text, 10)} />
                );
            }
        },
        {
            title: 'Harga',
            dataIndex: 'price',
            key: 'price',
            render: (text: string, record: IPrice, index: number) => {
                return (
                    <InputNumber
                        defaultValue={parseInt(text, 10)}
                        formatter={value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        parser={(value: any) => value.replace(/[^0-9]/g, '')}
                        onChange={(value: any) => {
                            console.log(value)
                            const data: IPrice[] = [...this.state.data];
                            data[index].price = parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
                            this.setState({data});
                        }}
                        style={{ width: '100%' }}
                    />
                );
            }
        }
    ];

    componentDidMount () {
        this.setState({ data: this.props.data });
    }

    _getPrice = (): IPrice[] => {
        return this.state.data;
    }

    _addPrice = (): void => {
        const data: IPrice[] = [...this.state.data];
        const length = this.state.data.length;
        const newPrice: IPrice = {
            qty: data?.[length - 1].qty + 1,
            price: 0,
        };
        data.push(newPrice);
        this.setState({ data });
    }

    render () {
        return (
            <React.Fragment>
                <Button type="primary" style={{ marginBottom: 10 }} onClick={this._addPrice}>Tambah Harga</Button>
                <Table
                    rowKey="qty"
                    size="small"
                    bordered
                    dataSource={this.state.data}
                    columns={this.columns}
                    style={{ maxWidth: 320 }}
                    pagination={false}
                    onChange={() => null}
                />
            </React.Fragment>
        )
    }
}
