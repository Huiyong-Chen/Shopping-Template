import "jquery";
import "./js/public.js";
import "./js/nav.js";
import "flexslider";

import "./css/public.css";
import "./css/index.css";
import { get } from "lodash-es";

console.log(get({ a: 1 }, "a"));

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
