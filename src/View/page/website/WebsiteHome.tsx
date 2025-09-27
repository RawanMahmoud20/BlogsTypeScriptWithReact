import BlogItem from "../../component/website/BlogItem";

let WebsiteHome:React.FC = () => {
  return (
    <div className="WebSite-content-wrapper">
      <section className="content">
        <span>Most Recent</span>
       <BlogItem />
       <BlogItem />
       <BlogItem />
        <section className="join-us">
          <span>JOIN US</span>
          <span>We Post New Blogs Everyday, Join Us</span>
          <section>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <button type="submit">Join Us</button>
          </section>
        </section>
      </section>
    </div>
  );
};
export default WebsiteHome;
