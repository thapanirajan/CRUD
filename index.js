// const express = require("express");
// const app = express();
// const port = 3000;
// const path = require("path");

// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));

// let posts = [
//   {
//     username: "Apnacollege",
//     content: "I love coding",
//   },
//   {
//     username: "sharadhaKhapra",
//     content: "hard work is important to achieve success",
//   },
//   {
//     username: "username1",
//     content: "I got selected for my 1st intership",
//   },
// ];

// app.get("/posts", (req, res) => {
//   res.render("index.ejs", { posts });
// });
// app.listen(port, () => {
//   console.log(`Listening to port ${port}`);
// });

const { render } = require("ejs");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

let posts = [
  {
    id: uuidv4(),
    username: "Nirajan",
    content: "I do fullstack",
  },
  {
    id: uuidv4(),
    username: "Nirjal",
    content: "I edit videos",
  },
  {
    id: uuidv4(),
    username: "Ranjan",
    content: "I master in python",
  },
];
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// resource = posts ( we are doing curd operations in posts )
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//creating new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// post new post
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// show in details
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (!post) {
    console.log(`post with id ${id} not found`);
    return res.status(404).send("post not found");
  } else {
    res.render("show.ejs", { po: post });
  }
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  posts.content = newContent;
  res.redirect("/posts");
});

// edit the post content
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id != p.id);
  res.redirect("/posts");
});
//listening to port
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
