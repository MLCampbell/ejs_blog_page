const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const truncate = require('truncate-html');

const homeStartingContent = "My name is Marcus Powdrell Campbell and by the time someone is able to read this, I'll be confident enough to call myself a developer. Despite coding for years, it's taken a huge amount of time to get to this stage. It's now time for a big push. There are 348 days in 2021 as of the time of writing, 18th January 2021. My commitment: In the next 348  days I'll be ready for my first developer role. I've never really been one for blogging or diary writing but tracking my progress each and every day of coding on my own blog page does seem like a good idea (emphasis on seem). So, time to code. I'm thinking ES6 and beyond, jQuery, React and Node should be my focus, in that order. HTML and CSS knowledge need some touching up but, mostly, it's all focus on everything JS. I reckon this should do it. JavaScript is good fun. I should probably get to grips with at least one database. I like the look of MongoDB. Perhaps stick with that? Writing this feels incredibly self-indulgent and I'm not really a fan. I suppose that explains my aversion to blogs and diaries. There's an irony buried in here somewhere.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  } else {
    return str.slice(0, num) + '...'
  }
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get('/', function (req, res) {
  res.render('home', { startingContent: homeStartingContent, posts: posts });

});

app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent });
});

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.post('/compose', function (req, res) {
  const body = req.body;
  const post = {
    title: body.postTitle,
    content: body.postContent
  }

  posts.push(post);


  res.redirect('/')

});


app.get('/posts/:topic', function (req, res) {
  posts.forEach(function (post) {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.topic)) {
      newPostTitle = (post.title);
      newPostContent = (post.content);
      res.render('post', { newPostTitle: newPostTitle, newPostContent, newPostContent })
    };
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});


