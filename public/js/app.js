const app = {
  routes: {
    /* VIEWS */
    home: "http://forus.com/",
    catPosts: "/Posts/category",
    /* CONTROLLERS */
    deleteUser: "/User/deleteUser",
    getPosts: "/Posts/getPosts",

    getPostComments: "/Comments/getComments",

    addPosts: "/Posts/createPosts",
    sharePost: "/Posts/sharePost",
    addComment: "/Comments/createComment",

    getCategories: "/Categories/getCategories",
    getHashtags: "/Categories/getHashtags",
    getPostsByCategory: "/Posts/getPostsByCategory",
  },

  user: {
    sv: false,
    id: "",
    username: "",
    role: "",
    pic: "",
  },

  pp: $("#posts"),
  ss: $("#shareId"),
  cc: $("#commentsId"),
  ca: $("#categories-form"),
  ha: $("#hashtags"),
  usp: [],

  allPosts: function () {
    let html = ` <div class=" relative top-32 w-full mx-auto">
    <svg class="w-52 h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path class="fill-gray-400 dark:fill-gray-500" d="M192 104.8c0-9.2-5.8-17.3-13.2-22.8C167.2 73.3 160 61.3 160 48c0-26.5 28.7-48 64-48s64 21.5 64 48c0 13.3-7.2 25.3-18.8 34c-7.4 5.5-13.2 13.6-13.2 22.8c0 12.8 10.4 23.2 23.2 23.2H336c26.5 0 48 21.5 48 48v56.8c0 12.8 10.4 23.2 23.2 23.2c9.2 0 17.3-5.8 22.8-13.2c8.7-11.6 20.7-18.8 34-18.8c26.5 0 48 28.7 48 64s-21.5 64-48 64c-13.3 0-25.3-7.2-34-18.8c-5.5-7.4-13.6-13.2-22.8-13.2c-12.8 0-23.2 10.4-23.2 23.2V464c0 26.5-21.5 48-48 48H279.2c-12.8 0-23.2-10.4-23.2-23.2c0-9.2 5.8-17.3 13.2-22.8c11.6-8.7 18.8-20.7 18.8-34c0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34c7.4 5.5 13.2 13.6 13.2 22.8c0 12.8-10.4 23.2-23.2 23.2H48c-26.5 0-48-21.5-48-48V343.2C0 330.4 10.4 320 23.2 320c9.2 0 17.3 5.8 22.8 13.2C54.7 344.8 66.7 352 80 352c26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8C40.5 250.2 32.4 256 23.2 256C10.4 256 0 245.6 0 232.8V176c0-26.5 21.5-48 48-48H168.8c12.8 0 23.2-10.4 23.2-23.2z" />
    </svg>
    <h1 class="text-4xl font-bold text-gray-400 dark:text-gray-500 text-center w-6/12 mx-auto mt-5">
        No content to display
    </h1>
</div>`;
    this.pp.html("");
    fetch(this.routes.getPosts)
      .then((res) => res.json())
      .then((posts) => {
        usp = posts;
        html = "";
        for (let post of posts) {
          html += this.postsHtmlBuilder(post);
        }
        this.pp.html(html);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  },

  postComments: function (postId) {
    const post = $.grep(usp, function (e) {
      return e.id === postId;
    })[0];
    this.cc.html("");

    let postHtml = `
    <div id="capa" class="fixed inset-0 bg-gray-500 bg-opacity-30 dark:bg-opacity-40 transition-opacity"></div>
    <section id="modal" class="bg-gray-100 dark:bg-slate-700 rounded-xl w-7/12 mx-auto h-screen flex flex-col fixed">
      <div class="flex justify-between fixed w-7/12 z-50 bg-gray-100 dark:bg-slate-700 shadow-lg pb-4">
        <h1 class="text-black flex text-2xl font-bold mt-5 ml-5 dark:text-white">FOR <span class="text-blue-500 ml-2">US</span></h1>
        <p class="font-bold text-xl mt-5 dark:text-white">${post.username}'s Post</p>
        <div id="close" class="close-modal text-gray-400 w-8 h-8 transition-all cursor-pointer mt-5 mr-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path class="fill-current" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
        </div>
      </div>
    <hr class="w-full mt-5">
    <div id="card-scrollbar" class="overflow-y-auto z-40 h-auto relative mt-6">
        <div class="bg-gray-100 dark:bg-slate-700 w-10/12 rounded-xl flex flex-col relative mt-5 h-fit self-start opacity-100 mx-auto">
            <div id="capa" class="bg-gray-500 opacity-30 w-full h-full absolute hidden rounded-xl transition ease-in z-50"></div>
            <div id="custom-modal" class="absolute w-full h-full flex flex-col justify-center items-center opacity-100 transition ease-in"></div>
            <div class="flex mt-5 ml-5">
                <img class="w-12 h-11 bg-blue-500 rounded-full top-8 left-8" src="http://forus.com/resources/assets/img/profile/${post.profilePic}" alt="">
                <div class="flex flex-col ml-5">
                    <h2 class="text-xl text-gray-400 font-semibold">${post.username}</h2>
                </div>
                <div class="absolute right-5 top-0">
                    <span id="menu-card" class="text-5xl text-gray-400 cursor-pointer select-none">...</span>
                </div>
            </div>
            <p class="text-gray-400 w-10/12 mx-auto text-xl mt-8">${post.text}</p>
            <img class="w-10/12 mx-auto rounded-xl mt-7" src="http://forus.com/resources/assets/img/post/${post.img}" alt="">
            <div class="flex gap-4 w-10/12 mx-auto mt-5">
                <a class="text-white font-bold bg-gray-400 rounded-full px-4 py-1 text-center" href="">#${post.category}</a>
            </div>
        </div>
        <hr class="w-full mt-5 border dark:border-slate-600">
        `;
    let commentsHtml = ` 
            <div class=" relative top-32">
              <h1 class="text-4xl font-bold text-gray-400 dark:text-gray-500 text-center w-6/12 mx-auto mt-5">
                  No Comments yet
                  <small>Be the first to comment</small>
              </h1>
            </div>
        `;
    let footerHtml = `
            </div>
            <hr class="w-full mt-5">
            <section class="fixed bottom-0 bg-gray-100 dark:bg-slate-700 w-7/12 shadow-inner z-50">
            <form class="" id="commentPost-form" method="POST" autocomplete="off" enctype="multipart/form-data">
              <div class="w-11/12 mx-auto flex mt-5 mb-5">
                <img class="w-12 h-11 bg-blue-500 rounded-full top-8 left-8" src="http://forus.com/resources/assets/img/profile/${app.user.pic}" alt="">
                  <div class="bg-gray-200 ml-5 rounded-xl shadow-lg w-10/12">
                      <textarea name="content" id="cmtcontent" class="relative rounded-lg text-lg text-gray-400 bg-gray-200 dark:bg-slate-600 w-full resize-none outline-none font-medium pl-5" rows="" maxlength="380" placeholder="Comment as ${app.user.username}"></textarea>
                  </div>
                  <button type="submit" onclick="comment.comment(${postId})" id="commentbtn" class="text-gray-400 w-10 h-10 transition-all cursor-pointer ml-5 mt-1" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path class="fill-current" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3.3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                      </svg>
                  </button>
                </form>
              </div>
            </section>
          </section>
        `;

    fetch(this.routes.getPostComments + "/" + postId)
      .then((res) => res.json())
      .then((comments) => {
        if (comments.length > 0) {
          commentsHtml = "";
          for (let cmts of comments) {
            commentsHtml += `
                    <div class="w-10/12 mx-auto mb-24">
                        <div class="flex gap-5 mt-10">
                          <img class="w-12 h-10 bg-blue-500 rounded-full top-8 left-8" src="http://forus.com/resources/assets/img/profile/${cmts.profilePic}" alt="">
                          <div class="rounded-xl bg-gray-200 dark:bg-slate-600 shadow-lg">
                              <div class="ml-5 mr-5 mt-1 mb-2">
                                  <p class="text-gray-400 font-bold">${cmts.username}</p>
                                  <span class="text-gray-400">${cmts.content}</span>
                              </div>
                          </div>
                        </div>
                        <div class="flex w-10/12 mx-auto mt-3 gap-5 relative">
                            <div id="comment-button" class="text-gray-400 w-6 h-6 mt-1 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" class="">
                                    <path class="fill-current" d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" />
                                </svg>
                            </div>
                            <div class="text-gray-400 w-7 h-7 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path class="fill-current" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                      `;
          }
        }
      })
      .finally(() => {
        this.cc.html(postHtml + commentsHtml + footerHtml);
        this.cc.on("click", function (e) {
          e.stopPropagation();
        });

        $(function () {
          $("body").removeClass("overflow-auto").addClass("overflow-hidden");
        });

        const modal = $("#modal");
        const capa = $("#capa");
        const close = $("#close");

        if (modal.length && capa.length && close.length) {
          close.on("click", () => {
            modal.addClass("hidden");
            capa.toggleClass("hidden");
            $("body").removeClass("overflow-hidden").addClass("overflow-auto");
          });
        }
        $(function () {
          $("#cmtcontent").on("input change", function () {
            const content = $("#cmtcontent").val().trim();

            if (content !== "") {
              $("#commentbtn").prop("disabled", false);
            } else {
              $("#commentbtn").prop("disabled", true);
            }
          });

          $("#cmtcontent").trigger("input");
        });
      });
  },

  sharePost: function (postId) {
    const post = $.grep(usp, function (e) {
      return e.id === postId;
    })[0];
    let html = `
          <div id="capa2" class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity "></div>
          <section class="bg-gray-100 rounded-3xl w-5/12 mx-auto h-auto flex flex-col relative ">
              <section id="modal2" class="bg-gray-100 dark:bg-slate-700 rounded-3xl w-5/12 mx-auto mt-12 -mb-24 flex flex-col fixed" style="height: 84%;">
                  <div class="flex justify-between fixed w-5/12 z-50 bg-gray-100 dark:bg-slate-700 pb-4 overflow-y-auto rounded-3xl">
                      <h1 class="text-black flex text-2xl font-bold mt-5 ml-5 dark:text-white">FOR <span class="text-blue-500 ml-2">US</span></h1>
                      <p class="font-bold text-xl mt-5 text-center dark:text-white">Share Post</p>
                      <div class="close-modal text-gray-400 w-8 h-8 transition-all cursor-pointer mt-5 mr-5">
                          <svg xmlns="http://www.w3.org/2000/svg" class="inline" viewBox="0 0 512 512">
                              <path class="fill-current" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                          </svg>
                      </div>
                  </div>
                  <hr class="w-full mt-20 border dark:border-slate-600">
                  <div id="card-scrollbar" class="overflow-y-auto z-40 relative h-auto">
                      <div class="bg-gray-100 dark:bg-slate-700 w-11/12 rounded-3xl flex flex-col relative  h-fit self-start opacity-100 mx-auto">
                          <!-- TOP CARD CONTENT -->
                          <div class="flex mt-5 w-full">
                              <img class="w-12 h-11 bg-blue-500 rounded-full top-8 left-8" src="http://forus.com/resources/assets/img/profile/${
                                app.user.pic
                              }" alt="">
                              <div class="flex flex-col ml-5 w-full">
                                  <div class="flex items-center w-full">
                                      <h2 class="text-xl text-gray-400 font-semibold">${
                                        app.user.username
                                      }</h2>
                                      <svg class="w-5 h-5 ml-3" viewBox="0 0 17.00 17.00" version="1.1" class="svg inline mr-10 h-10 mt-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#292da8" stroke="#292da8" stroke-width="0.00017">
                                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                          <g id="SVGRepo_iconCarrier">
                                              <path d="M8.516 0c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.814-8.5-8.5-8.5zM1.041 9h2.937c0.044 1.024 0.211 2.031 0.513 3h-2.603c-0.481-0.906-0.776-1.923-0.847-3zM3.978 8h-2.937c0.071-1.077 0.366-2.094 0.847-3h2.6c-0.301 0.969-0.467 1.976-0.51 3zM5.547 5h5.896c0.33 0.965 0.522 1.972 0.569 3h-7.034c0.046-1.028 0.239-2.035 0.569-3zM4.978 9h7.035c-0.049 1.028-0.241 2.035-0.572 3h-5.891c-0.331-0.965-0.524-1.972-0.572-3zM13.013 9h2.978c-0.071 1.077-0.366 2.094-0.847 3h-2.644c0.302-0.969 0.469-1.976 0.513-3zM13.013 8c-0.043-1.024-0.209-2.031-0.51-3h2.641c0.48 0.906 0.775 1.923 0.847 3h-2.978zM14.502 4h-2.354c-0.392-0.955-0.916-1.858-1.55-2.7 1.578 0.457 2.938 1.42 3.904 2.7zM9.074 1.028c0.824 0.897 1.484 1.9 1.972 2.972h-5.102c0.487-1.071 1.146-2.073 1.97-2.97 0.199-0.015 0.398-0.030 0.602-0.030 0.188 0 0.373 0.015 0.558 0.028zM6.383 1.313c-0.629 0.838-1.151 1.737-1.54 2.687h-2.314c0.955-1.267 2.297-2.224 3.854-2.687zM2.529 13h2.317c0.391 0.951 0.915 1.851 1.547 2.689-1.561-0.461-2.907-1.419-3.864-2.689zM7.926 15.97c-0.826-0.897-1.488-1.899-1.978-2.97h5.094c-0.49 1.072-1.152 2.075-1.979 2.972-0.181 0.013-0.363 0.028-0.547 0.028-0.2 0-0.395-0.015-0.59-0.030zM10.587 15.703c0.636-0.842 1.164-1.747 1.557-2.703h2.358c-0.968 1.283-2.332 2.247-3.915 2.703z" fill="#4846af"></path>
                                          </g>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                          <form class="" id="sharePost-form" method="POST" autocomplete="off" enctype="multipart/form-data">

                              <textarea class="relative rounded-lg text-lg text-gray-400 bg-gray-100 dark:bg-slate-700 w-full resize-none outline-none font-medium mt-5 ml-5" rows="" maxlength="380" placeholder="Comment as ${
                                app.user.username
                              }" name="text" id="text"></textarea>
                              <hr class="w-full mt-5 border dark:border-slate-600">
                              <div class="flex mt-5  w-full">
                                  <img class="w-12 h-11 bg-blue-500 rounded-full top-8 left-8" src="http://forus.com/resources/assets/img/profile/${
                                    post.profilePic
                                  }" alt="">
                                  <div class="flex flex-col ml-5 w-full">
                                      <div class="flex items-center w-full">
                                          <h2 class="text-xl text-gray-400 font-semibold">${
                                            post.username
                                          }</h2>
                                      </div>

                                      <p class="text-gray-400">${formatTimeSincePost(
                                        post.created_at
                                      )}</p>
                                  </div>
                              </div>
                              <p class="text-gray-400 w-12/12 mx-auto text-xl mt-8">${
                                post.text
                              }</p>
                              <img class="w-12/12 mx-auto rounded-xl mt-7" src="http://forus.com/resources/assets/img/post/${
                                post.img
                              }" alt="">
                              <div class="flex gap-4 w-12/12 mx-auto mt-5">
                                  <a class="text-white font-bold bg-gray-400 rounded-full px-4 py-1 text-center">#${
                                    post.category
                                  }</a>
                                  <input type="hidden" name="category" value="${
                                    post.category
                                  }"></input>
                              </div>
                              <hr class="w-full mt-10 mb-5">
                              <button type="submit" onclick="post.sharePost(${
                                post.id
                              })" id="sharebtn" class="btn bg-sky-500 rounded-xl p-3 text-white w-11/12 mx-auto ml-5">Share</button>
                              </form>
                      </div>
                  </div>
              </section>
          </section>
          `;

    this.ss.html(html);

    this.ss.on("click", function (e) {
      e.stopPropagation();
    });

    $(function () {
      $("body").removeClass("overflow-auto").addClass("overflow-hidden");
    });

    const modal2 = $("#modal2");
    const capa2 = $("#capa2");
    const close = $(".close-modal");

    close.on("click", () => {
      modal2.addClass("hidden");
      capa2.toggleClass("hidden");
      $("body").removeClass("overflow-hidden").addClass("overflow-auto");
    });
  },

  categories: function () {
    let html = "";
    this.ca.html("");
    fetch(this.routes.getCategories)
      .then((res) => res.json())
      .then((categories) => {
        html = "";
        for (let category of categories) {
          html += `
          <li class="w-10 h-10">
            <button type="submit" name="category" value="${category.name}">
              <img class="rounded-lg" src="http://forus.com/resources/assets/img/categories/${category.gif}" alt="" class="w-full">
            </button>
            <span class="desplegableText hidden relative left-14 bottom-8 text-gray-400 text-nowrap">${category.name}</span>
          </li>
`;
        }
        this.ca.html(html);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  },

  catPosts: function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get("category");

    let html = ` 
    <div class=" relative top-32 w-full mx-auto ">
      <svg class="w-52 h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path class="fill-gray-400 dark:fill-gray-500" d="M192 104.8c0-9.2-5.8-17.3-13.2-22.8C167.2 73.3 160 61.3 160 48c0-26.5 28.7-48 64-48s64 21.5 64 48c0 13.3-7.2 25.3-18.8 34c-7.4 5.5-13.2 13.6-13.2 22.8c0 12.8 10.4 23.2 23.2 23.2H336c26.5 0 48 21.5 48 48v56.8c0 12.8 10.4 23.2 23.2 23.2c9.2 0 17.3-5.8 22.8-13.2c8.7-11.6 20.7-18.8 34-18.8c26.5 0 48 28.7 48 64s-21.5 64-48 64c-13.3 0-25.3-7.2-34-18.8c-5.5-7.4-13.6-13.2-22.8-13.2c-12.8 0-23.2 10.4-23.2 23.2V464c0 26.5-21.5 48-48 48H279.2c-12.8 0-23.2-10.4-23.2-23.2c0-9.2 5.8-17.3 13.2-22.8c11.6-8.7 18.8-20.7 18.8-34c0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34c7.4 5.5 13.2 13.6 13.2 22.8c0 12.8-10.4 23.2-23.2 23.2H48c-26.5 0-48-21.5-48-48V343.2C0 330.4 10.4 320 23.2 320c9.2 0 17.3 5.8 22.8 13.2C54.7 344.8 66.7 352 80 352c26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8C40.5 250.2 32.4 256 23.2 256C10.4 256 0 245.6 0 232.8V176c0-26.5 21.5-48 48-48H168.8c12.8 0 23.2-10.4 23.2-23.2z" />
      </svg>
      <h1 class="text-4xl font-bold text-gray-400 dark:text-gray-500 text-center w-6/12 mx-auto mt-5">
          No content to display
      </h1>
    </div>
`;
    this.pp.html("");

    fetch(app.routes.getPostsByCategory + "?category=" + category, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((posts) => {
        if (posts.length > 0) {
          usp = posts;
          html = "";
          for (let post of posts) {
            html += this.postsHtmlBuilder(post);
          }
        }
        this.pp.html(html);
      });
  },

  postsHtmlBuilder: function (post) {
    const hashtags = post.hashtag.split(",");
    const hashtagsHTML = hashtags
      .map((hashtag) => {
        return `
     <a class="text-white font-bold bg-gray-400 dark:bg-gray-500 rounded-full px-4 py-1 text-center">#${hashtag.trim()}</a>
     `;
      })
      .join("");
    return `
    <div class="post">
    <div id="post-card" class="bg-gray-100 dark:bg-slate-700 shadow-lg w-full rounded-xl flex flex-col relative h-fit self-start opacity-100 z-40 mt-5">
    <div class="flex mt-5 ml-5">
    <img id="profile_picture" class="w-12 h-11 bg-blue-500 rounded-full top-8 left-8" src="http://forus.com/resources/assets/img/profile/${
      post.profilePic
    }" alt="">
    <div class="flex flex-col ml-5">
        <h2 id="username" class="text-xl text-gray-400 font-semibold">${
          post.username
        }</h2>
        <p class="text-gray-400">${formatTimeSincePost(post.created_at)}</p>
        </div>
    <!-- CARD MENU -->
    <div class="absolute right-5 top-0">
        <span id="menu-card" class="text-5xl text-gray-400 cursor-pointer select-none">...</span>
    </div>
</div>

<p class="text-gray-400 w-10/12 mx-auto text-xl mt-8">${post.text}</p>

<img class="w-10/12 mx-auto rounded-xl mt-7" src="http://forus.com/resources/assets/img/post/${
      post.img
    }" alt="">

<div class="flex gap-4 w-10/12 mx-auto mt-5">
    ${hashtagsHTML}
</div>

<div class="flex w-10/12 relative mt-10 mb-5 mx-auto">
    <div id="" class="text-gray-400 w-8 h-8 transition-all cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path class="fill-current" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
    </div>
    <div ${
      !app.user.sv
        ? ""
        : `id="comment-button" onclick="app.postComments(${post.id})"`
    } class="text-gray-400 w-7 h-7 ml-5 mt-1 cursor-pointer comment-button ${
      !app.user.sv ? "nologued" : ""
    }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path class="fill-current" d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" />
        </svg>
    </div>
    <div ${
      !app.user.sv
        ? ""
        : `id="share-button" onclick="app.sharePost(${post.id})"`
    } class="text-gray-400 w-8 h-8 absolute right-3 cursor-pointer share-button ${
      !app.user.sv ? "nologued" : ""
    }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path class="fill-current" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
        </svg>
    </div>
</div>
</div>
</div>
          `;
  },

  getHashtags: function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get("category");

    let html = ``;
    this.ha.html("");

    fetch(app.routes.getHashtags + "?category=" + category, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((hstgs) => {
        if (hstgs.length > 0) {
          html = "";
          for (let htg of hstgs) {
            html += `
            <div class="hashtag text-white font-bold bg-gray-400 dark:bg-gray-500 rounded-full px-4 py-1 text-center h-fit cursor-pointer relative" href="">
              <div class="capa-hashtag absolute top-0 left-0 bg-rose-800 z-50 w-full rounded-full h-full">x</div> 
              <span class="z-10">#${htg.hashtag}</span>
            </div>
       
            `;
          }
        }
        if (hstgs.length > 0) {
          html = "";
          for (let htg of hstgs) {
            const hashtags = htg.hashtag.split(",");

            for (let tag of hashtags) {
              const cleanedHashtag = tag.trim();
              html += `
                  <div class="hashtag text-white font-bold bg-gray-400 dark:bg-gray-500 rounded-full px-4 py-1 text-center h-fit cursor-pointer relative" href="">
              <div class="capa-hashtag absolute top-0 left-0 bg-rose-800 z-50 w-full rounded-full h-full">x</div> 
              <span class="z-10">#${cleanedHashtag}</span>
            </div>
                  `;
            }
          }
        }
        this.ha.html(html);
        $(function () {
          $("#hashtags .hashtag").click(function () {
            if ($("#hashtags-selected .hashtag").length < 3) {
              var hashtagValue = $(this).find("span").text();
              $("#hashtags-selected").append($(this).clone());
              console.log(hashtagValue);
            }
          });

          $("#hashtags-selected").on("click", ".hashtag", function () {
            $(this).remove();
          });

          $("#hashtags-selected").on("mouseenter", ".hashtag", function () {
            $(this).find(".capa-hashtag").addClass("visible");
          });

          $("#hashtags-selected").on("mouseleave", ".hashtag", function () {
            $(this).find(".capa-hashtag").removeClass("visible");
          });
        });
      });
  },
};

function formatTimeSincePost(postDate) {
  var currentDate = new Date();
  var postDateObj = new Date(postDate);

  var timeDifference = currentDate - postDateObj;

  var seconds = Math.floor(timeDifference / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  if (days > 0) {
    return days + " d";
  } else if (hours > 0) {
    return hours + " h";
  } else if (minutes > 0) {
    return minutes + " min";
  } else {
    return seconds + " s";
  }
}