declare interface SklandResponseBody<T> {
    code: number;
    data: T;
    message: string;
}

declare interface SklandUser {
    user: {
        avatar: string
        id: string
        nickname: string
    };
}

declare interface SklandBinding {
    appCode: string;
    appName: string;
    bindingList: SklandBindRole[];
    defaultUid: string;
}

declare interface SklandBindRole {
    uid: string;
    isOfficial: boolean;
    isDefault: boolean;
    channelMasterId: number;
    channelName: string;
    nickName: string;
    isDelete: boolean;
}
