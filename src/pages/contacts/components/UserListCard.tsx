import ISyncSearch from '@/components/ISyncSearch';
import useInput from '@/hooks/useInput';
import { socketEvent } from '@/layout/BasicLayout';
import API from '@/service/api';
import { ResponseType } from '@/service/request';
import { MailOutlined, MessageOutlined, UserAddOutlined } from '@ant-design/icons';
import { message, Empty, Card, Avatar, Input, Divider, Button } from 'antd';
import { useState } from 'react';
import { SearchUserInfo } from '.';

const { Meta } = Card;

const UserListCard: React.FC<Record<string, never>> = () => {
    const [userList, setUserList] = useState<SearchUserInfo[]>([]);

    const onSearch = (keyword: string) => {
        return API['/USER/SEARCH_USER_GET']({ keyword });
    };
    const [inputRef, getInpValue] = useInput();

    const coverImg =
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

    const requestContact = async (user: SearchUserInfo) => {
        await API['/USER/SEND_CONTACT_REQUEST']({
            targetUUID: user.uuid,
            verifyMessage: getInpValue()
        });
        message.success('请求已发送');
    };
    const cardList = () => {
        return userList.map((user) => (
            <div className="mt-5" key={user.uuid}>
                <Card
                    style={{ width: 500, margin: 'auto' }}
                    cover={<img src={coverImg} alt={user.nickName} />}
                    actions={[
                        <MessageOutlined key="message" />,
                        <MailOutlined key="mail" />,
                        <UserAddOutlined key="add" onClick={() => requestContact(user)} />
                    ]}
                >
                    <Meta
                        avatar={<Avatar src={user.avatarUrl} />}
                        title={user.nickName}
                        description={user.account}
                    />
                    <Divider />
                    <Input ref={inputRef} placeholder="请输入验证消息" />
                </Card>
            </div>
        ));
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <ISyncSearch<ResponseType<SearchUserInfo[]>>
                    size="large"
                    clicktriggle={onSearch}
                    placeholder="input search text"
                    style={{ width: 500 }}
                    vaildRule={(value) => value !== ''}
                    callback={{
                        err: () => message.error('搜素内容不可为空'),
                        ok: (res) => setUserList(res.data)
                    }}
                />
            </div>
            <div>{userList.length > 0 ? cardList() : <Empty />}</div>
            <Button
                onClick={() => {
                    socketEvent.emit(
                        JSON.stringify({
                            data: getInpValue(),
                            to: userList[0].uuid,
                            type: 'text'
                        })
                    );
                }}
            >
                send message
            </Button>
        </div>
    );
};
export default UserListCard;
