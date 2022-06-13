import { NotificationOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import logo from '/asset/logo.png'
import './layout.less'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { fetchUser } from '../store/user';

const HeaderLayout: React.FC<{}> = props => {
    const user = useAppSelector(state => state.userReucer);
    const dispatch = useAppDispatch();
    
    const { nickName, avatarUrl } = user;
    console.log(user, 'user')

    useEffect(() => {
        dispatch(fetchUser());
    }, [])
    

    return <div className='layout-header-wrap'>
        <div className='layout-header-logo'>
            <img className='layout-logo' src={logo} alt="logo" />
            <h1 className='layout-title'>小仓开大车</h1>
        </div>
        <div className='layout-header-user'>
            <Avatar shape="square" src={avatarUrl} />
            <span style={{ margin: '0px 5px' }}>{nickName}</span>
            <Badge count={12} size={'small'}>
                <NotificationOutlined style={{ fontSize: 16, color: '#ffff' }} />
            </Badge>
        </div>
    </div>
}
export default HeaderLayout;