let body = document.body


// Bura linklere daxil olanda etraflarini deyisen linkler ucun koddur. 
let currentPath_with_slash = window.location.pathname

let currentPath = currentPath_with_slash.slice(1, currentPath_with_slash.length)

console.log(currentPath);

let a = document.querySelectorAll(".nav-link")

a.forEach((x) => {
    console.log(x.getAttribute("href"));

    if (x.getAttribute("href") == currentPath) {
        x.classList.add("active-link")
        console.log("we are here");

    }else if(currentPath=="book.html"){
        a[0].classList.add("active-link")
    }
}
);


// booking button
let down_items_div = document.querySelector(".down-items")
let btn_book = down_items_div.querySelector("button")

btn_book.addEventListener("click", () => {
    window.open("book.html", "_self")
})
btn_book.addEventListener("mousedown", () => {
    btn_book.classList.toggle("btn-color-on-click")
})
btn_book.addEventListener("mouseup", () => {
    btn_book.classList.toggle("btn-color-on-click")

})

// Sliding menu implementation
let slider_nav = document.querySelector(".slider-nav")
let bar_btn = document.querySelector(".fa-bars")
slider_nav.classList.toggle("move-down")

bar_btn.addEventListener("click", () => {
    slider_nav.classList.toggle("move-down")

    // slider_nav.classList.toggle("display-none")
    // setTimeout(() => {

    // },2)
})