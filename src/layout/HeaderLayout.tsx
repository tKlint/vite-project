import { NotificationOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import logo from '/asset/logo.png'
import './layout.less'

const HeaderLayout: React.FC<{}> = props => {
    return <div className='layout-header-wrap'>
        <div className='layout-header-logo'>
            <img className='layout-logo' src={logo} alt="logo" />
            <h1 className='layout-title'>小仓开大车</h1>
        </div>
        <div className='layout-header-user'>
            <Avatar shape="square" src={logo} />
            <span style={{ margin: '0px 5px' }}>管理员</span>
            <Badge count={12} size={'small'}>
                <NotificationOutlined style={{ fontSize: 16, color: '#ffff' }} />
            </Badge>
        </div>
    </div>
}
export default HeaderLayout;