// ------------------------------ 공통 API 함수 ------------------------------
async function fetchBooks(paramsObj) {
    const params = new URLSearchParams(paramsObj);

    const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
        method: "GET",
        headers: {
            Authorization: "KakaoAK 5a066b71dc2aefc83244287f864c2a9e"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }

    return await response.json();
}


// ------------------------------ 메인 추천 슬라이더 ------------------------------
async function bookData() {
    try {
        const data = await fetchBooks({
            target: "title",
            query: "축구",
            size: 10
        });

        const boxElements = document.querySelectorAll("#slider .swiper-slide");

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            if (!doc) return;

            box.innerHTML = `
                <img src="${doc.thumbnail}" alt="${doc.title}">
                <div>
                    <h3>${doc.title}</h3>
                    <h6>${Array.isArray(doc.authors) ? doc.authors.join(", ") : doc.authors}</h6>
                    <p>${doc.contents ? doc.contents.substring(0, 60) : ""}</p>
                </div>
            `;
        });

        new Swiper(".sliderSwiper", {
            rewind: true,
            navigation: {
                nextEl: "#slider .swiper-button-next",
                prevEl: "#slider .swiper-button-prev",
            },
            pagination: {
                el: "#slider .swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    const imgUrl = data.documents[index] ? data.documents[index].thumbnail : "";
                    return `<img class="${className}" src="${imgUrl}" style="width:40px; height:auto;">`;
                },
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });

    } catch (error) {
        console.log("추천 슬라이더 에러:", error);
    }
}


// ------------------------------ 베스트셀러 (주간 / 월간 탭) ------------------------------
let weeklyBooks = [];
let monthlyBooks = [];

async function bestBookData() {
    try {
        // 주간용
        const weekData = await fetchBooks({
            query: "공무원 모의고사",
            size: 10
        });

        // 월간용
        const monthData = await fetchBooks({
            query: "공무원 기본서",
            size: 10
        });

        weeklyBooks = weekData.documents || [];
        monthlyBooks = monthData.documents || [];

        renderBestBooks(weeklyBooks);
        bindBestTabs();

    } catch (error) {
        console.log("베스트셀러 에러:", error);
    }
}

function renderBestBooks(books) {
    const container = document.querySelector(".best_list");
    if (!container) return;

    container.innerHTML = "";

    books.forEach((book, i) => {
        const authorsText = Array.isArray(book.authors) ? book.authors.join(", ") : book.authors;

        const item = `
            <div class="best_item">
                <img src="${book.thumbnail || ""}" alt="${book.title}">
                <span class="rank">${i + 1}</span>
                <p class="title">${book.title}</p>
                <p class="author">${authorsText || ""}</p>
                <p class="price">${book.price}원</p>
            </div>
        `;

        container.innerHTML += item;
    });
}

function bindBestTabs() {
    const tabs = document.querySelectorAll(".best_tab");
    if (!tabs.length) return;

    tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            tabs.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            const type = this.dataset.type;

            if (type === "week") {
                renderBestBooks(weeklyBooks);
            } else if (type === "month") {
                renderBestBooks(monthlyBooks);
            }
        });
    });
}


// ------------------------------ 새로나온 교재 ------------------------------
let newSwiper;

async function newBookData() {
    try {
        const data = await fetchBooks({
            query: "모의고사",
            sort: "latest",
            size: 10
        });

        renderNewBooks(data.documents || []);

    } catch (error) {
        console.log("새로나온 교재 에러:", error);
    }
}

function renderNewBooks(books) {
    const container = document.querySelector(".newbook");
    if (!container) return;

    container.innerHTML = "";

    books.forEach((book) => {
        const authorsText = Array.isArray(book.authors) ? book.authors.join(", ") : book.authors;

        const item = `
            <div class="swiper-slide new_item">
                <img src="${book.thumbnail || ""}" alt="${book.title}">
                <p class="title">${book.title}</p>
                <p class="author">${authorsText || ""}</p>
                <p class="price">${book.price}원</p>
            </div>
        `;
        container.innerHTML += item;
    });

    if (newSwiper) {
        newSwiper.destroy(true, true);
    }

    newSwiper = new Swiper(".newSwiper", {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerGroup: 1,
        navigation: {
            nextEl: ".new_next",
            prevEl: ".new_prev",
        },
        pagination: {
            el: ".new_pagination",
            type: "fraction",
        },
        observer: true,
        observeParents: true,
        watchOverflow: false,
    });
}


bookData();
bestBookData();
newBookData();


// sub

const topBtn = document.querySelector(".arrow_up");

topBtn.addEventListener("click", function () {
    window.scrollTo(0, 0);  // 맨 위로 이동
});

if (document.querySelector(".product_detail")) {
    getBookDetail();
}

async function getBookDetail() {
    const params = new URLSearchParams({
        target: "title",
        query: "2026 심우철 실전 동형 모의고사 Season 2",
        size: 1
    });

    try {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
            method: "GET",
            headers: {
                Authorization: "KakaoAK 5a066b71dc2aefc83244287f864c2a9e"
            }
        });

        const data = await response.json();
        const book = data.documents[0];

        document.getElementById("bookImg").src = book.thumbnail;
        document.getElementById("bookTitle").textContent = book.title;
        document.getElementById("bookAuthor").textContent = book.authors.join(", ");
        document.getElementById("bookPublisher").textContent = book.publisher;
        document.getElementById("bookSalePrice").textContent = book.sale_price.toLocaleString();
        document.getElementById("bookPrice").textContent = book.price.toLocaleString();

        const discount = Math.round(((book.price - book.sale_price) / book.price) * 100);
        document.getElementById("discountPercent").textContent = discount + "%";

    } catch (error) {
        console.log("에러 발생:", error);
    }
}