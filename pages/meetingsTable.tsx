import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import TableComponent from '@components/table/Table';
import type { ColumnsType } from 'antd/es/table';
import { DataType } from '@components/table/types';

const MeetingsTable: NextPage = () => {
    const columns: ColumnsType<DataType> = [
        { title: 'id', dataIndex: 'id' },
        { title: 'Название', dataIndex: 'name' },
        { title: 'Место проведения', dataIndex: 'place' },
        { title: 'Дата начала', dataIndex: 'startDate' },
        { title: 'Дата завершения', dataIndex: 'endDate' } ];

    const dataSlice =  [ 0, 1 ];
    const data: DataType[] = [];

    for (let i = 0; i < dataSlice.length; i++) {
        data.push({
            key: i,
            id: 1,
            name: 'Встреча',
            place: 'Место',
            startDate: '11.12.2022',
            endDate: '11.03.2023'
        });
    }
    return (
        <div style={{ justifyContent: 'center', width: '100%' }}>
            <TableComponent columns={columns} data={data} />
        </div>

    );
};

export default MeetingsTable;
