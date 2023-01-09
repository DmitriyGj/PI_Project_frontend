import { useDispatch, useSelector } from 'react-redux';
import { setOpened } from '@store/sidebar/slice';
import { getOpened } from '@store/sidebar/selectors';
import { setEditedMeeting } from '@store/meetings/slice';


import { Button, Drawer } from 'antd';
// import { useState } from 'react';
// import { MenuUnfoldOutlined } from '@ant-design/icons';
import { SideBarProps } from './types';

const SideBar = ({ width, title= 'NoTitle', buttonText, content, ...rest }: SideBarProps): JSX.Element => {
    const dispatch = useDispatch();
    const opened = useSelector(getOpened);

    const showDrawer = () => {
        dispatch(setOpened(true));
    };

    const onClose = () => {
        dispatch(setEditedMeeting(null));
        dispatch(setOpened(false));
    };

    return (
        <div {...rest}>
            <Button type='primary' shape='round' onClick={showDrawer}>
                {buttonText}
            </Button>
            <Drawer width={width} title={title} placement='right' onClose={onClose} open={opened}>
                {content}
            </Drawer>
        </div>
    );
};

export default SideBar;
