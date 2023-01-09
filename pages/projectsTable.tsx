import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import TableComponent from '@components/table/Table';
import type { ColumnsType } from 'antd/es/table';
import { DataType } from '@components/table/types';

const UsersTable: NextPage = () => {
    const columns: ColumnsType<DataType> = [
        { title: 'id', dataIndex: 'id' },
        { title: 'Название', dataIndex: 'name' },
        { title: 'Контрагент', dataIndex: 'counterparty' } ];

    const dataSlice = [ 0, 1 ];
    const data: DataType[] = [];

    for (let i = 0; i < dataSlice.length; i++) {
        data.push({
            key: i,
            id: 1,
            name: 'Встреча',
            counterparty: 'Контрагент',
        });
    }
    return (
        <div style={{ justifyContent: 'center', width: '100%' }}>
            <TableComponent columns={columns} data={data} />
        </div>

    );
};

export default UsersTable;
