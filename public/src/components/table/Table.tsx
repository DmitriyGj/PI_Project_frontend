import React, { useState } from 'react';
import { Table } from 'antd';
import Style from './table.module.scss';
import { TableProps } from './types';

const TableComponent = ({ columns, data }: TableProps) => {
    const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);
    const [ selectionType ] = useState<'checkbox' | 'radio'>('radio');

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        type: selectionType,
        hideSelectAll: true
    };

    return (
        <div>
            <Table className={Style.table} rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};

export default TableComponent;
