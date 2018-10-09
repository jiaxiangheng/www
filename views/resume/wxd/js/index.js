FastClick.attach(document.body);
(function () {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / 640 * 100 + "px";
})();
new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    onSlidePrevEnd: changeEnd,
    onSlideNextEnd: changeEnd
});

function changeEnd(swiper) {
    var n = swiper.activeIndex,
        slideAry = swiper.slides;
    [].forEach.call(slideAry, function (slide, index) {
        if (n === index) {
            if (n == 1 || n == 6) {
                slide.id = "page1";
                return;
            } else if (n == 2) {
                slide.id = "page2";
                return;
            } else if (n == 3) {
                slide.id = "page3";
                return;
            } else if (n == 4) {
                slide.id = "page4";
                return;
            } else if (n == 0 || n == 5) {
                slide.id = "page5";
                return;
            }
        }
        slide.id = null;
    })
}
var music = document.getElementById("music"),
    musicAudio = document.getElementById("musicAudio");
window.setTimeout(function () {
    musicAudio.play();
    musicAudio.addEventListener("canplay", function () {
        music.style.display = "block";
        music.className = "music move";
    }, false)
}, 1000);
music.addEventListener("click", function () {
    if (musicAudio.paused) {
        musicAudio.play();
        music.className = "music move";
        return;
    }
    musicAudio.pause();
    music.className = "music";
}, false);

var imgThreeup = document.getElementById("imgThreeup");
var imgThree = document.getElementById("imgThree");
var imgFourup = document.getElementById("imgFourup");
var imgFour = document.getElementById("imgFour");
var imgFiveup = document.getElementById("imgFiveup");
var imgFive = document.getElementById("imgFive");
window.setTimeout(function () {
        imgThreeup.style.opacity=0;
        imgThree.style.opacity=0;
        imgThreeup.style.webkitAnimation = "yuan 2s linear .3s infinite both";
        imgThree.style.webkitAnimation = "img2Move 2s linear .3s infinite both";
        imgFourup.style.webkitAnimation = "yuan 2s linear .3s infinite both";
        imgFour.style.webkitAnimation = "img2Move 2s linear .3s infinite both";
        imgFiveup.style.webkitAnimation = "yuan 2s linear .3s infinite both";
        imgFive.style.webkitAnimation = "img2Move 2s linear .3s infinite both";

}, 3000);
