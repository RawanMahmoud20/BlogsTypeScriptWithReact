import BlogImage from "../../../resourse/images/Blog Image.png";

let BlogItem: React.FC = () => {
  return (
    <article className="blog">
      <section>
        <article>
          <span className="blog-category">Development</span>
          <span className="blog-date">SEPTEMBER 28,2022</span>
            </article>
            <span className="blog-title">
              It's Time to Code, Improve Your Coding Skills And Get Jobs
            </span>
            <p className="blog-brief-description">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erea.
            </p>
          </section>
          <figure className="blog-image">
            <img src={BlogImage} alt="image-here" />
          </figure>
        </article> 
  );
}
export default BlogItem;