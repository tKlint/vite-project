import ITable from '@/components/ITable';

const FriendsList: React.FC<Record<string, never>> = () => {
    enum Keys {
        Z = 'z',
        B = 'b'
    }

    return (
        <div>
            <ITable
                key="id"
                colmuns={[
                    {
                        title: '序号',
                        key: 'idx',
                        search: true,
                        formType: 'input'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        search: true,
                        formType: 'select',
                        valueEnum: {
                            [Keys.B]: {
                                text: '啊吧宝贝',
                                disabled: false
                            },
                            [Keys.Z]: {
                                text: '啊ZZZ',
                                disabled: false
                            }
                        }
                    }
                ]}
            />
        </div>
    );
};

export default FriendsList;
