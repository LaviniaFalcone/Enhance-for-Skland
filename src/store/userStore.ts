import {makeAutoObservable} from 'mobx';
import {SklandUser} from '../skland-api';

class UserStore {
    private _user?: SklandUser;

    get user(): SklandUser | undefined {
        return this._user;
    }

    set user(value: SklandUser | undefined) {
        this._user = value;
    }

    constructor() {
        makeAutoObservable(this);
    }
}

const userStore = new UserStore();
export default userStore;