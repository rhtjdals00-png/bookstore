async function bookData() {
    const params = new URLSearchParams({
        target: "title",
        query: "축구",
        size: 10
    });

    try {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 5a066b71dc2aefc83244287f864c2a9e"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)

        // .box 요소 전체 선택
        const boxElements = document.querySelectorAll("#slider .swiper-slide");
        // console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // 요소 생성 및 추가
            box.innerHTML = `<img src="${data.documents[i].thumbnail}">
                    <h3>${data.documents[i].title}</h3>
                    <h6>${data.documents[i].authors}</h6>
                    <p>${data.documents[i].contents.substring(0, 60)}</p>
                    <button>click</button>
                    `
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();


// best셀러

async function bestBookData() {
    const params = new URLSearchParams({
        query: "공무원",
        size: 10
    });

    try {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params}`, {
            headers: {
                Authorization: "KakaoAK 5a066b71dc2aefc83244287f864c2a9e"
            }
        });

        const data = await response.json();

        renderBestBooks(data.documents);

    } catch (error) {
        console.log(error);
    }
}

bestBookData();

function renderBestBooks(books) {
    const container = document.querySelector(".best_list");

    container.innerHTML = "";

    books.forEach((book, i) => {
        const item = `
            <div class="best_item">
                <span class="rank">${i + 1}</span>
                <img src="${book.thumbnail}" alt="">
                <p class="title">${book.title}</p>
                <p class="author">${book.authors}</p>
                <p class="price">${book.price}원</p>
            </div>
        `;

        container.innerHTML += item;
    });
}