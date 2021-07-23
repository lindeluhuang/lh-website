const headerNavTag = document.querySelector("nav.sticky")

const fadeBox = function () {
    const pixels = window.pageYOffset;
    let alpha = Math.min(pixels / 1000, 0.3);
    headerNavTag.style.boxShadow = `0 0 10px rgba(0,0,0,${alpha})`;
}

fadeBox();

document.addEventListener("scroll", function () {
    fadeBox();
})