import type { ColumnsType } from 'antd/es/table';

export interface DataType {
  key: React.Key
  id: number

  firstName?: string
  lastName?: string
  patronymic?: string
  login?: string
  email?: string

  place?: string
  startDate?: string
  endDate?: string

  name?: string
  counterparty?: string
}

export type TableProps = {
  columns: ColumnsType<DataType>
  // data: ???
}
