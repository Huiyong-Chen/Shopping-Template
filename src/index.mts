import "jquery";
import "super-slide/jquery.SuperSlide.2.1.3.js";
import "flexslider";
import "./js/public.js";
import "./js/nav.js";
import "./js/pro.js";
import "./js/cart.js";
import "./js/user.js";

import "./css/public.css";
import "./css/index.css";
import "./css/login.css";
import "./css/mygxin.css";
import "./css/proList.css";
import "./css/idea.css";
import "./css/myorder.css";
import "./css/mygrxx.css";

$(function () {
  $("#home_slider").flexslider({
    animation: "slide",
    controlNav: true,
    directionNav: true,
    animationLoop: true,
    slideshow: true,
    slideshowSpeed: 2000,
    useCSS: false,
  });
});
$(function () {
  $("#home_slider").flexslider({
    animation: "slide",
    controlNav: true,
    directionNav: true,
    animationLoop: true,
    slideshow: true,
    slideshowSpeed: 2000,
    useCSS: false,
  });
});

jQuery(".bottom").slide({
  titCell: ".hd ul",
  mainCell: ".bd .likeList",
  autoPage: true,
  autoPlay: false,
  effect: "leftLoop",
  vis: 1,
});
jQuery(".bottom").slide({
  titCell: ".hd ul",
  mainCell: ".bd .likeList",
  autoPage: true,
  autoPlay: false,
  effect: "leftLoop",
  vis: 1,
});
