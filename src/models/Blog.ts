class Blog {
  public id: number;
  public title: string;
  public publisherName: string;
  public categoryId: number;
  public image: string;
  public description: string;

  constructor(
    id: number,
    title: string,
    publisherName: string,
    categoryId: number,
    image: string,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.publisherName = publisherName;
    this.categoryId = categoryId;
    this.image = image;
    this.description = description;
  }

  get _id() {
    return this.id;
  }
  get _title() {
    return this.title;
  }
  get _publisherName() {
    return this.publisherName;
  }
  get _description() {
    return this.description;
  }
  get _image() {
    return this.image;
  }
  get _categoryId() {
    return this.categoryId;
  }
}

export default Blog;
