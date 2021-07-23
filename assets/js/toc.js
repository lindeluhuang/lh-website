const bodyTag = document.querySelector("body")
const tocTag = document.querySelector("nav.toc")
const mainContentTag = document.querySelector("article.main-content")

const sectionsAll = document.querySelectorAll("section")
const sectionFirst = document.querySelector("section.content-start")

// get page color
const pageColor = document.querySelector("section#top").getAttribute("data-color");

// set toc content
let tocContent = `<div class="toc-collection">`
// set title
const tocTitle = sectionsAll[0].childNodes[1].innerText;
tocContent = tocContent.concat(`<a href="#top" class="toc-title">${tocTitle}</a>`);
// set sections
sectionsAll.forEach(section => {
    let tocType = section.childNodes[1].nodeName;
    let tocId = section.id;

    // check for h2 or h3 for formatting
    if (tocType == "H2") {
        let sectionContent = section.childNodes[1].innerText;

        // visually condense if too many sections
        if (sectionsAll.length > 20) {
            tocContent = tocContent.concat(`<a href="#${tocId}" class="toc-h2-condensed">${sectionContent}</a>`)
        } else {
            tocContent = tocContent.concat(`<a href="#${tocId}" class="toc-h2">${sectionContent}</a>`)
        }
    } else if (tocType == "H3") {
        let sectionContent = section.childNodes[1].innerText;
        if (sectionsAll.length > 20) {
            tocContent = tocContent.concat(`<a href="#${tocId}" class="toc-h3-condensed">${sectionContent}</a>`)
        } else {
            tocContent = tocContent.concat(`<a href="#${tocId}" class="toc-h3">${sectionContent}</a>`)
        }
    }
})
tocContent = tocContent.concat("</div>")

// listen for scroll
document.addEventListener("scroll", function () {
    const pixelsScrolled = window.pageYOffset;

    // show TOC after scrolling past initial cover content
    if (pixelsScrolled >= sectionFirst.offsetTop - 100) {
        tocTag.classList.add("visible");
        tocTag.innerHTML = tocContent;
        mainContentTag.classList.add("toc-visible");
        mainContentTag.classList.remove("toc-hidden");
    } else {
        tocTag.classList.remove("visible")
        tocTag.innerHTML = "";
        mainContentTag.classList.remove("toc-visible");
        mainContentTag.classList.add("toc-hidden");
    }

    // for each section, bold if looking at it
    sectionsAll.forEach(section => {
        if (pixelsScrolled >= section.offsetTop - 100) {
            let sectionId = section.id;
            const tocListTag = document.querySelectorAll("nav.toc a");
            tocListTag.forEach(tocItem => {
                let tocItemString = tocItem.hash.substring(1);
                if (tocItemString == sectionId) {
                    tocItem.style.fontWeight = "bold";
                    tocItem.style.color = `var(--${pageColor})`;
                } else {
                    tocItem.style.fontWeight = "400";
                    tocItem.style.color = "var(--text-color)";
                }
            })
        }
    })

})

