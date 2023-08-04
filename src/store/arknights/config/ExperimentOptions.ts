import {makeAutoObservable} from 'mobx';
import {readLocalStorage, writeLocalStorage} from '../../../util/storage';

class ExperimentOptions {
    private readonly _ApCorrectKey: string = 'Experiment.ApCorrect';

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
}

const experimentOptions = new ExperimentOptions();
export default experimentOptions;