export default class Category {
  private _id: number;
  private _name: string;
  private _slug: string;

  constructor(id: number, name: string, slug: string) {
    this._id = id;
    this._name = name;
    this._slug = slug;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get slug() {
    return this._slug;
  }
}
