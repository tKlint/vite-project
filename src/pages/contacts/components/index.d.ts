type SearchInputStatus = '' | 'warning' | 'error' | undefined;

export interface SearchUserInfo {
    readonly uuid: string;
    account: string;
    avatarUrl: string;
    nickName: string;
}
