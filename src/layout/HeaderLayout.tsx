import {
    ExclamationCircleOutlined,
    LogoutOutlined,
    NotificationOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Button,
    Drawer,
    Dropdown,
    Menu,
    message,
    Modal,
    notification
} from 'antd';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import MessageList, { Message } from '../components/MessageList';
import { logout } from '../store/login';

import logo from '../../public/asset/logo.png';
import './layout.less';
import { socketEvent } from './BasicLayout';

const HeaderLayout: React.FC<Record<string, unknown>> = () => {
    const user = useAppSelector((state) => state.userReucer);
    const dispatch = useAppDispatch();
    const { nickName, avatarUrl } = user;
    const [draweVisible, setDraweVisible] = useState(false);
    const [messageList, setMessageList] = useState<Message[]>([]);

    enum DropDownMenuStatus {
        Menu_Logout = 'logout',
        Menu_Setting = 'setting'
    }

    useEffect(() => {
        socketEvent.subcribe((lastMessage: MessageEvent<any>) => {
            let messageData;
            if (typeof lastMessage === 'string') {
                // 自己发送的出去的消息
                messageData = JSON.parse(lastMessage);
                return;
            }
            messageData = JSON.parse(lastMessage.data);

            if (messageData.formUUID !== user.uuid) {
                // 收到别人发送的消息
                notification.info({
                    message: '您收到了一条消息',
                    description: messageData.data
                });
            }
        });
    }, []);

    const onDrawerOpen = () => {
        setDraweVisible(true);
    };
    const onDrawerClose = () => {
        setDraweVisible(false);
    };

    const handleLogout = () => {
        dispatch(logout({}));
    };
    const logoutConfirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '确认退出登陆?',
            okText: '确认',
            cancelText: '取消',
            onOk: handleLogout
        });
    };

    const onMeunClick = (key: DropDownMenuStatus) => {
        switch (key) {
            case DropDownMenuStatus.Menu_Logout:
                logoutConfirm();
                break;
            case DropDownMenuStatus.Menu_Setting:
                message.warn('努力开发中');
                break;
            default:
                break;
        }
    };

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <Button type="link" size="small">
                            退出登陆
                        </Button>
                    ),
                    key: DropDownMenuStatus.Menu_Logout,
                    icon: <LogoutOutlined />
                },
                {
                    label: (
                        <Button type="link" size="small">
                            设置
                        </Button>
                    ),
                    key: DropDownMenuStatus.Menu_Setting,
                    icon: <SettingOutlined />
                }
            ]}
            onClick={(e) => onMeunClick(e.key as DropDownMenuStatus)}
        />
    );

    return (
        <div className="layout-header-wrap">
            <div className="layout-header-logo">
                <img className="layout-logo" src={logo} alt="logo" />
                <h1 className="layout-title">小仓开大车</h1>
            </div>
            <div className="layout-header-user">
                <Dropdown overlay={menu}>
                    <div className="header-user-info">
                        <Avatar src={avatarUrl} />
                        <span className="header-user-nick">{nickName || 'usernick'}</span>
                    </div>
                </Dropdown>
                <Badge count={12} size="small">
                    <NotificationOutlined
                        onClick={onDrawerOpen}
                        style={{ fontSize: 16, color: '#ffff' }}
                    />
                </Badge>
                <Drawer
                    title="消息通知"
                    placement="right"
                    onClose={onDrawerClose}
                    visible={draweVisible}
                >
                    <MessageList messageList={messageList} />
                </Drawer>
            </div>
        </div>
    );
};
export default HeaderLayout;
