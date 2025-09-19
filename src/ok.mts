import "jquery";
import './js/public.js';
import './js/pro.js';
import "super-slide/jquery.SuperSlide.2.1.3.js";


import './css/public.css';
import './css/proList.css';


jQuery(".bottom").slide({
        titCell: ".hd ul",
        mainCell: ".bd .likeList",
        autoPage: true,
        autoPlay: false,
        effect: "leftLoop",
        vis: 1,
      });
