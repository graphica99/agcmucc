const Post = require("../../model/church/Post");
const format = require("date-format");
const PostCategory = require("../../model/admin/Post");
const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");
// var counter = 0;
exports.userDashBoardIndex = (req, res) => {
  if (req.session.user) {
    res.render("userDashboard/index", { user: req.session.user });
  } else {
    res.redirect("/");
  }
};

exports.search = (req, res) => {
  Post.search(req.body.searchData)
    .then((posts) => {
      res.json(posts);
    })
    .catch(() => {
      res.json([]);
    });
  // console.log(req.body.searchData)
};
exports.loadComments = (req, res) => {
  let post = new Post();
  post
    .viewComment(req.params.postId, 0)
    .then((result) => {
      res.redirect("/blog-details/" + req.params.postId);
    })
    .catch((err) => {
      console.log(err);
    });
  //  res.json('results from axios link' + req.params.postId)
};

exports.addComment = (req, res) => {
  let post = new Post();
  post
    .addComment(req.body.data, req.params.postId)
    .then((resolve) => {
      res.json(resolve.ops[0]);
    })
    .catch((err) => {
      console.log(err);
      req.flash("error", err);
      res.redirect("/blog-details/" + `${req.params.postId}`);
    });
};

exports.viewAddPost = (req, res) => {
  Post.viewAllCat()
    .then((cat) => {
      res.render("userDashboard/viewAddPost", { cat: cat });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllPost = (req, res) => {
  let post = new Post();
  post
    .viewPost(req.session.user.id)
    .then((post) => {
      // console.log(post)
      res.render("userDashboard/viewAllPost", { post: post.results });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewEditPost = (req, res) => {
  let post = new Post();
  post
    .viewPostById(req.params.id)
    .then((post) => {
      Post.viewAllCat()
        .then((cat) => {
          res.render("userDashboard/viewEditPost", { post: post, cat: cat });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editPost = (req, res) => {
  let post = new Post(req.body, req.files);
  post
    .editPost(req.params.id)
    .then((response) => {
      req.flash("success", "Post Updated Successfully");
      res.redirect("/viewAllPost");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addPost = (req, res) => {
  let post = new Post(req.body, req.files);
  post
    .addPost()
    .then((data) => {
      req.flash(
        "success",
        "Post Added Successfully,  Your post will be approved 24 hours time"
      );
      res.redirect("/viewAddPost");
    })
    .catch((err) => {
      console.log(err);
    });
  //   console.log("....adding post");
};

exports.deletePost = (req, res) => {
  let post = new Post();
  post
    .deletePost(req.params.id)
    .then((response) => {
      req.flash("info", "Post deleted Successfully");
      res.redirect("/viewAllPost");
    })
    .catch((err) => {
      console(err);
    });
};

exports.viewAllPostFrontEnd = (req, res) => {
  let post = new Post();
  console.log(req.params.id);
  // console.log(views)
  post
    .viewPost()
    .then((post) => {
      Post.popularPost()
        .then((popularPost) => {
          Post.viewAllCat()
            .then((allCat) => {
              post
                .getViews(req.params.id)
                .then((views) => {
                  post.viewComment(req.params.id).then((comments) => {
                    res.render("church/blog", {
                      views: views,
                      comments: comments.viewComment,
                      commentsCount: comments.viewCommentCount,
                      popularPost: popularPost,
                      allCat: allCat,
                      timeAgo: timeAgo,
                    });
                  });
                })
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e))
            .catch((err) => {
              console.log(err);
            });
          //  console.log(popularPost)
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.userPost = (req, res) => {
  let post = new Post();
  console.log(req.params.id);
  // console.log(views)
  post
    .viewUserPost(req.params.id)
    .then((post) => {
      Post.popularPost()
        .then((popularPost) => {
          Post.viewAllCat()
            .then((allCat) => {
              res.render("church/userPost", {
                post: post,
                popularPost: popularPost,
                allCat: allCat,
                timeAgo: timeAgo,
              });
            })

            .catch((err) => {
              console.log(err);
            });
          //  console.log(popularPost)
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewSinglePost = (req, res) => {
  let post = new Post();
  // Post.nextPrevPost('prev',req.params.id);
  post
    .viewPostSingle(req.params.id)
    .then((singlePost) => {
      post
        .getViews(req.params.id)
        .then((views) => {
          Post.popularPost()
            .then((popularPost) => {
              Post.viewAllCat()
                .then((allCat) => {
                  post
                    .viewComment(req.params.id)
                    .then((comments) => {
                      // console.log(singlePost)
                      // console.log(JSON.stringify(comments.viewComment))
                      res.render("church/blog-details", {
                        singlePost: singlePost.results,
                        userPost: singlePost.userPost,
                        views: views,
                        popularPost: popularPost,
                        allCat: allCat,
                        comments: comments.viewComment,
                        commentsCount: comments.viewCommentCount,
                        format: format,
                        timeAgo: timeAgo,
                      });
                      // console.log(comments)
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

//!!PAGINATION FOR VIEW CATEGORY
exports.viewBlogByCategory = (req, res) => {
  let post = new Post();
  let postCategory = new PostCategory();
  // post.viewPost().then((post) => {
  post
    .viewPostCat(req.params.cat)
    .then((post) => {
      Post.popularPost()
        .then((popularPost) => {
          Post.viewAllCat()
            .then((allCat) => {
              Post.paginationCate(req.params.cat, req.params.pageNum)
                .then((pagination) => {
                  // console.log(pagination.posts)
                  if (post.length) {
                    res.render("church/viewBlogByCategory", {
                      post: post,
                      popularPost: popularPost,
                      allCat: allCat,
                      pagination: pagination,
                      timeAgo: timeAgo,
                    });
                  } else {
                    res.render("church/noPost", {
                      popularPost: popularPost,
                      allCat: allCat,
                      format: format,
                      timeAgo: timeAgo,
                    });
                  }
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
          //  console.log(popularPost)
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// views: views,
exports.pagination = function (req, res) {
  let post = new Post();
  post
    .viewPost()
    .then((post) => {
      Post.popularPost()
        .then((popularPost) => {
          Post.viewAllCat()
            .then((allCat) => {
              Post.pagination(req.params.pageNum)
                .then((pagination) => {
                  res.render("church/blog", {
                    post: post,
                    popularPost: popularPost,
                    allCat: allCat,
                    timeAgo: timeAgo,
                    pagination: pagination,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
