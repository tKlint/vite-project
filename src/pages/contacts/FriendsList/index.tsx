// import ITable from '@/components/ITable';

import API from '@/service/api';
import { UserAddOutlined } from '@ant-design/icons';
import { DrawerForm, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useEffect } from 'react';

import SearchInputStatus from '../components/UserListCard';

const FriendsList: React.FC<Record<string, never>> = () => {
    const columns: ProColumns<FriendsListFieldType>[] = [
        {
            title: '备注名',
            dataIndex: 'remarkName'
        },
        {
            title: '昵称',
            dataIndex: 'nickName'
        },
        {
            title: '账号',
            dataIndex: 'account'
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        }
    ];

    const fetechContactsList = () => {
        API['/CONTACT/FETECH_CONTACT_LIST_GET']({
            current: 1,
            pageSize: 20
        });
    };

    useEffect(() => {
        fetechContactsList();
    }, []);
    const drawerTrigger = (
        <DrawerForm
            title="添加联系人"
            trigger={
                <Button icon={<UserAddOutlined />} type="primary">
                    添加联系人
                </Button>
            }
        >
            <SearchInputStatus />
        </DrawerForm>
    );
    return (
        <div>
            <ProTable columns={columns} toolBarRender={() => [drawerTrigger]} />
        </div>
    );
};

export default FriendsList;
