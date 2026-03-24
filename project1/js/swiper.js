// #slider swiper
// var slider_swiper = new Swiper(".sliderSwiper", {
//     navigation: {
//         nextEl: "#slider .swiper-button-next",
//         prevEl: "#slider .swiper-button-prev",
//     },
//     pagination: {
//         el: "#slider .swiper-pagination",
//         clickable: true,
//         renderBullet: function (index, className) {
//             return '<img class="' + className + '" src="">';
//         },
//     },
//     autoplay: {
//         delay: 3000,
//         disableOnInteraction: false,
//     },
// });
// book.js 데이터 로드하는 곳으로 이동

// #new swiper
var new_swiper = new Swiper(".newSwiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    pagination: {
        el: "#new .swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: "#new .swiper-button-next",
        prevEl: "#new .swiper-button-prev",
    },
});