import express from "express";
import bodyParser from "body-parser";

let app = express();
let port = 3001;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

let blogPosts = [
    { id :1, title: "My First Blog Post", date: "2024-08-07", content: "This is the content of my first blog post.", author: "Ismail" },
    { id :2, title: "My First Blog Post", date: "2024-08-07", content: "This is the content of my first blog post.", author: "Ismail" },
    { id :3, title: "My First Blog Post", date: "2024-08-07", content: "This is the content of my first blog post.", author: "Ismail" }
];

app.get("/", (req, res)=>{
      res.render("index", {posts : blogPosts});
});

app.get('/blog/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    // Find the blog post by ID
    const blog = blogPosts.find(blog => blog.id === blogId);
  
    if (blog) {
      res.render('blog', { blg: blog });
    } else {
      res.status(404).send('Blog post not found');
    }
  });

app.get("/new", (req, res)=>{
      res.render("new");
});

app.post("/delete/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    // Assuming you have a method to remove the blog from the array or database
    blogPosts = blogPosts.filter(blog => blog.id !== blogId);
    res.redirect("/"); // Redirect after deletion
});


app.post("/new", (req, res)=>{
    const {title , content, author} = req.body;
    const newBlog = {
       id : blogPosts.length > 0 ? blogPosts[blogPosts.length - 1].id + 1 : 1,
       title : title,
       date : new Date().toISOString().split('T')[0],
       content : content,
       author : author 
    };
    blogPosts.unshift(newBlog);
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`your server is running at port ${port}`);
});

  