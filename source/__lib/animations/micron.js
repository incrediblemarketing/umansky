// Author: https://github.com/webkul/anim

var watchEvents = function() {

  var dataAnim = $("[data-anim]");


  dataAnim.on("mouseover touchstart", function (ev) {
console.log("mouseover");
    var self = $(this);
    var animTrigger = ev.target;
    var animPrefix = "anim-";
    var animData = animTrigger.dataset.anim;
    var animDataDuration = animTrigger.dataset.animDuration;

    /* +ADDED */
    var animDataRepeat = animTrigger.dataset.animRepeat;
    /* // +ADDED */

    var animDataTiming = animTrigger.dataset.animTiming;
    var animBind = animTrigger.dataset.animBind;
    var animPuppet = animTrigger.dataset.animId;
    //Global Trigger
    if (animData !== undefined) {
      if (animBind === "true") {
        if (animPuppet !== undefined) {
          var node = document.getElementById(animPuppet);
          if (node !== undefined && node !== null) {
            var twinNode = node;
            node.parentNode.replaceChild(twinNode, node);
            twinNode.classList.add(animPrefix + animData);
          } else {
            console.log("%c Animation Error : None of the DOM element reference to the declared ID", "color:red");
            return false;
          }
        } else {
          console.log("%c Animation Error : add data-anim-id to bind an interaction", "color:red");
          return false;
        }
      } else {
        var node = animTrigger;
        var twinNode = node;
        node.parentNode.replaceChild(twinNode, node);
        twinNode.classList.add(animPrefix + animData);
      }
    } else {
      return false;
    }

    //Duration
    if (animDataDuration !== undefined) {
      if (isNaN(animDataDuration)) {
        console.log("%c Animation Error : data-anim-duration can only be number or decimal", "color:red");
        console.log("%c Animation Fallback : data-anim-duration set to default", "color:orange");
        twinNode.style.animationDuration = "0.45s";
      } else {
        twinNode.style.animationDuration = animDataDuration + "s";
      }
    } else {
      twinNode.style.animationDuration = "0.45s";
    }

    //Easing Timing Function
    if (animDataTiming !== undefined) {
      if (animDataTiming === "linear" || animDataTiming === "ease-in" || animDataTiming === "ease-out" || animDataTiming === "ease-in-out") {
        twinNode.classList.add(animPrefix + animDataTiming);
      } else {
        console.log("%c Animation Error : data-anim-timing currently supports linear, ease-in, ease-out and ease-in-out only", "color:red");
        console.log("%c Animation Fallback : data-anim-timing set to default", "color:orange");
        twinNode.classList.add(animPrefix + "ease-in-out");
      }
    } else {
      twinNode.classList.add(animPrefix + "ease-in-out");
    }


    /* +ADDED */
    //Repeat
    if (animDataRepeat !== undefined) {

      if (animDataTiming === "infinite") {

        twinNode.style.animationIterationCount = "infinite";

      } else {

        twinNode.style.animationIterationCount = animDataRepeat;

      }


    } else {

      //console.log("%c Animation Error : data-anim-repeat can only be infinite or number", "color:red");
      //console.log("%c Animation Fallback : data-anim-repeat set to default", "color:orange");

      twinNode.style.animationIterationCount = "1";

    }


    self.removeClass("anim-pause");
    /* // +ADDED */


  /* +ADDED */
  }).on("mouseout touchend", function (ev) {

    var self = $(this);

    console.log( self.data("anim") )

    //self.css( { "animation-iteration-count" : "1", "animation-name" : "none" } );
    self.addClass("anim-pause");

  });
  



  $(".anim").on("mouseout touchend", function (ev) {

    //console.log("out");

    var self = $(this);

    self.css( { "animation-name" : "none" } );
    //self.addClass("anim-pause");

  });
  /* // +ADDED */

}






// If animations.microinteractions.js gets fetched asynchronously
// We may or may not catch the DOMContentLoaded event
if (document.readyState != "loading") {
  watchEvents();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    watchEvents();
  });
}

//Animation Prototype
var anim = function () {
    var ele;
    var node;

    //Get Element from DOM
    var getEle = function (paramEle) {
        ele = document.querySelector(paramEle);
        if (ele != undefined && ele != null) {
            node = ele;
            ele.parentNode.replaceChild(node, ele);
            return this;
        } else {
            console.log(
                "%c Animation Error : None of the DOM element reference to the argument which is passed to getEle() method",
                "color:red");
            return this;
        }
    }

    //Animation
    var interaction = function (paramInteraction) {
        if (node !== undefined && node !== null) {
            if (paramInteraction != undefined && paramInteraction != null && paramInteraction.indexOf(" ") ==
                -1) {
                var prefixAnimation = "anim-" + paramInteraction;
                node.classList.add(prefixAnimation);
                return this;
            } else {
                console.log(
                    "%c Animation Error : either you are missing an argument or trying to pass an argument with spaces to interaction() method",
                    "color:red");
                return this;
            }
        } else {
            return this;
        }
    }

    //Duration
    var duration = function (paramDuration) {
        if (node != undefined && node != null) {
            if (isNaN(paramDuration) == false) {
                node.style.animationDuration = paramDuration + "s";
                return this;
            } else {
                console.log("%c Animation Error : you can only pass number or decimal as arguments to duration() method", "color:red");
                return this;
            }
        } else {
            return this;
        }
    }

    var timing = function (paramTiming) {
        if (node != undefined && node != null) {
            if (paramTiming == "linear" || paramTiming == "ease-in" || paramTiming == "ease-out" ||
                paramTiming == "ease-in-out") {
                var prefixTiming = "anim-" + paramTiming;
                node.classList.add(prefixTiming);
                return this;
            } else {
                console.log("%c Animation Error : you can only pass linear, ease-in, ease-out and ease-in-out as arguments to timing() method", "color:red");
                return this;
            }
        } else {
            return this;
        }

    }


    /* +ADDED */
    //Repeat
    var repeat = function (paramRepeat) {
        if (node != undefined && node != null) {
            if (isNaN(paramRepeat) == false) {
                node.style.animationIterationCount = paramRepeat;
                return this;
            } else {
                console.log("%c Animation Error : you can only pass number infinite as arguments to repeat() method", "color:red");
                return this;
            }
        } else {
            return this;
        }
    }
    /* // +ADDED */




    return {
        getEle: getEle,
        interaction: interaction,
        duration: duration,
        timing: timing,
        repeat: repeat
    }
}

var anim = anim();

// Only export the CommonJS module if available
if(typeof module === "object" && module.exports) {
  module.exports = anim;
}

//Usage Sample
//anim.getEle().interaction().duration().timing();