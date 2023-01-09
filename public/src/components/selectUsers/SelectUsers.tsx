import React, { useState, useMemo, useCallback, ReactNode } from 'react';
import { ISelectUsersProps, ISelectUsersState } from '.';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DefaultOptionType } from 'antd/lib/select';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
const { Option } = Select;

export const SelectUsers =  ({ selectedValue: value, className, items, style, onSelect }: ISelectUsersProps): JSX.Element => {
    const [ { selectedValue }, setState ] = useState<ISelectUsersState>({  selectedValue: value ?? [] });

    const selectValue = useCallback(
        (value?: string []) => {
            onSelect && onSelect(value ?? []);
            setState({ selectedValue: value });
        },
        [ items, selectedValue, onSelect ],
    );

    const clearSelected = useCallback(
        () => selectValue([]),
        [],
    );

    const filterHandler = (input: string, option: DefaultOptionType | undefined): boolean => {
        const children = option?.children as unknown as ReactJSXElement;
        const childrenOfChildren = children.props.children as ReactNode [];
        const contains = childrenOfChildren.some(node => node?.toString().includes(input));
        return contains;
    };

    return <Select className={className}
        style={style}
        allowClear showSearch showArrow={true}
        mode='multiple'
        dropdownMatchSelectWidth={true}
        optionFilterProp='label'  
        size='middle'
        value={selectedValue}
        filterOption={filterHandler}
        onChange={selectValue}  
        onClear={clearSelected}>
        
        {items?.map((item) => {
            const value = item.id;
            const children = <div>
                <UserOutlined />
                {item.name} ({item.email}) 
            </div>;
            return <Option key={value} value={value} label={item.name}>{children}</Option>;
        })}
    </Select>; 
};
