import {makeAutoObservable} from 'mobx';

class UserStore {
    user: SklandUser | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public setUser(user?: SklandUser) {
        this.user = user;
    }
}

const userStore = new UserStore();
export default userStore;