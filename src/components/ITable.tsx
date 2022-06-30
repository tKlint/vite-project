import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import './styles/iTable.less';

type FormType = 'input' | 'select' | 'caseder' | 'radio';

type Column<T> = ColumnsType<T>[0];

interface ValueEnum {
    [k: Key]: {
        text: React.ReactNode;
        disabled: boolean;
    };
}

type ITableColumnsType<T> = {
    search?: boolean;
    formType?: FormType;
    placeholder?: string;
    title?: React.ReactNode;
    valueEnum?: ValueEnum;
} & Column<T>;

interface ITableProps<T = unknown> {
    dataSource?: T[];
    colmuns?: Array<ITableColumnsType<T>>;
}

const ITable = <T extends object>(props: ITableProps<T>) => {
    const { colmuns } = props;
    const [searchList, setSearchList] = useState<ITableColumnsType<T>[]>([]);
    const createSearchItems = (item?: ITableColumnsType<T>) => {
        if (!item) return null;
        const { title, formType, placeholder, valueEnum = {} } = item;
        const defaultHolder = `请输入${title}`;
        const keys = Object.keys(valueEnum);
        switch (formType) {
            case 'input':
                return <Input placeholder={placeholder || defaultHolder} />;
            case 'select':
                if (keys.length === 0) {
                    return null;
                }
                return (
                    <Select placeholder={placeholder || defaultHolder}>
                        {keys.map((key) => (
                            <Select.Option key={key}>{valueEnum[key].text}</Select.Option>
                        ))}
                    </Select>
                );
            default:
                break;
        }
        return null;
    };
    const initProps = () => {
        // 搜索字段
        const formSerachItem = colmuns?.filter((item) => item.search);
        setSearchList(formSerachItem || []);
        // createSearchItems(formSerachItem)
    };
    useEffect(() => {
        initProps();
    }, [props]);
    return (
        <div className="compont-itable">
            <div className="itable-search-wrap">
                <Form<T> style={{ background: '#fff' }}>
                    <Row gutter={24}>
                        {searchList.map((item) => (
                            <Col span={8} key={item.key}>
                                <Form.Item label={item.title} name={item.key}>
                                    {createSearchItems(item)}
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button style={{ margin: '0 8px' }}>重置</Button>
                            <Button>
                                <UpOutlined /> 展开
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Table {...props} />
            </div>
        </div>
    );
};

export default ITable;

const { Option } = Select;

const AdvancedSearchForm = () => {
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();

    const getFields = () => {
        const count = expand ? 10 : 6;
        const children = [];

        for (let i = 0; i < count; i += 1) {
            children.push(
                <Col span={8} key={i}>
                    <Form.Item
                        name={`field-${i}`}
                        label={`Field ${i}`}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!'
                            }
                        ]}
                    >
                        {i % 3 !== 1 ? (
                            <Input placeholder="placeholder" />
                        ) : (
                            <Select defaultValue="2">
                                <Option value="1">1</Option>
                                <Option value="2">
                                    longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                                </Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>
            );
        }

        return children;
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row gutter={24}>{getFields()}</Row>
            <Row>
                <Col
                    span={24}
                    style={{
                        textAlign: 'right'
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{
                            margin: '0 8px'
                        }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        style={{
                            fontSize: 12
                        }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const App = () => (
    <div>
        <AdvancedSearchForm />
        <div className="search-result-list">Search Result List</div>
    </div>
);

export { App };
