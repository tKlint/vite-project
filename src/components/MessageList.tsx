import { Avatar, Badge, List } from 'antd';

export interface Message {
    avatarUrl: string;
    messageCount: number;
    nickName: string;
    lastMessage: string;
    uuid: number;
}

interface IProps {
    messageList: Message[];
}

const MessageList: React.FC<IProps> = (props) => {
    const { messageList } = props;
    return (
        <div>
            <List
                dataSource={messageList}
                renderItem={(item) => (
                    <List.Item key={item.uuid}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatarUrl} />}
                            title={item.nickName}
                            description={item.lastMessage}
                        />
                        <Badge count={item.messageCount} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MessageList;
