import { useDispatch } from 'react-redux';
import Style from './projectForm.module.scss';
import { setOpened } from '@store/sidebar/slice';

import { Button, Input, Space } from 'antd/lib';

const ProjectForm=()=>{

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setOpened(false));
    };

    return (
        <>
            <div className={Style.main}>
                <h3>Название</h3>
                <Input placeholder="Введите название"/>

                <h3>Контрагент</h3>
                <Input placeholder="Введите контрагента" />

                <Space className={Style.item} align="center">
                    <Button onClick={onClose}>Сбросить</Button>
                    <Button onClick={onClose} type="primary">Добавить</Button>
                </Space>
            </div>
        </>
    );
};

export default ProjectForm;
