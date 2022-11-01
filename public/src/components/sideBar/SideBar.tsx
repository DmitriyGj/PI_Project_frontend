import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { SideBarProps } from './types';

const SideBar = ({ width, ...rest }: SideBarProps): JSX.Element => {
    const [ open, setOpen ] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div {...rest}>
            <Button type='primary' shape='round' onClick={showDrawer}>
                <MenuUnfoldOutlined />
            </Button>
            <Drawer width={width} title='Basic Drawer' placement='left' onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
};

export default SideBar;
