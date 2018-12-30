export class Category {
    private _name: string;
    id: number;

    constructor(obj) {
        this._name = obj.name;
        this.id = obj.id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
