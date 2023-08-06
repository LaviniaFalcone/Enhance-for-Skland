import {makeAutoObservable} from 'mobx';
import {readLocalStorage, writeLocalStorage} from '../../../util/storage';

class ExperimentOptions {
    private readonly _key = 'Experiment';
    private readonly _ApCorrectKey = `${this._key}.ApCorrect`;
    private readonly _DroneCorrectKey = `${this._key}.DroneCorrect`;

    constructor() {
        makeAutoObservable(this);
    }

    private _ApCorrect: boolean = readLocalStorage<boolean>(this._ApCorrectKey) || true;

    get ApCorrect(): boolean {
        return this._ApCorrect;
    }

    set ApCorrect(value: boolean) {
        writeLocalStorage(this._ApCorrectKey, value);
        this._ApCorrect = value;
    }

    private _DroneCorrect: boolean = readLocalStorage<boolean>(this._DroneCorrectKey) || false;

    get DroneCorrect(): boolean {
        return this._DroneCorrect;
    }

    set DroneCorrect(value: boolean) {
        writeLocalStorage(this._DroneCorrectKey, value);
        this._DroneCorrect = value;
    }
}

const experimentOptions = new ExperimentOptions();
export default experimentOptions;