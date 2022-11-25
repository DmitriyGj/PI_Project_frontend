import React, { useState, useMemo, useCallback } from 'react';
import { ISelectUsersProps, ISelectUsersState } from '.';
import { Select } from 'antd';
import cn from 'classnames';
import { UserOutlined } from '@ant-design/icons';
import { DefaultOptionType } from 'antd/lib/select';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
const { Option } = Select;

export const SelectUsers =  ({ selectedValue: value, className, items, onSelect }: ISelectUsersProps): JSX.Element => {
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

    const filterHandler = (input: string, option: DefaultOptionType | undefined) => {
        const finder = (child: ReactJSXElement, findValue: string): boolean => child.props.children 
            ? Array.from(child.props.children).some((child: unknown) => (child as Element).textContent?.toLowerCase().includes(findValue.toLowerCase())) 
            : false;
        return option?.children ? Array.from(option.children).some((child: ReactJSXElement )=> finder(child, input))  : false;
    };

    return <Select className={cn('select-link', className)}
        allowClear showSearch showArrow={true}
        mode='multiple'
        optionFilterProp='label'  
        size='large'
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
