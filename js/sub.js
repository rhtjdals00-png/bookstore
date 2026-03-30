// -------------------------- 텍스트 파일 불러오기 --------------------------

async function loadTextFile(filePath, elementId) {
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error('파일을 불러오지 못했습니다.');
    }

    const text = await response.text();
    const target = document.getElementById(elementId);

    if (target) {
      target.innerText = text;
    }
  } catch (error) {
    console.log(elementId + ' 불러오기 실패:', error);
  }
}

// loadTextFile('./text/info.txt', 'infoBox');
loadTextFile('./text/review.txt', 'reviewBox');
loadTextFile('./text/cut.txt', 'cutBox');
loadTextFile('./text/delivery.txt', 'deliveryBox');


// -------------------------- 탭 메뉴 --------------------------

const tabLinks = document.querySelectorAll('.tab_menu a');
const sections = document.querySelectorAll('.detail_section');

tabLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    tabLinks.forEach(function (item) {
      item.classList.remove('active');
    });

    this.classList.add('active');
  });
});

window.addEventListener('scroll', function () {
  let current = '';

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  tabLinks.forEach(function (link) {
    link.classList.remove('active');

    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// -------------------------- 펼치기 / 접기 --------------------------

const toggleBtn = document.querySelector('.toggle_btn');
const detailBox = document.querySelector('.detail_box');

if (toggleBtn && detailBox) {
  toggleBtn.addEventListener('click', function () {
    if (detailBox.classList.contains('collapsed')) {
      detailBox.classList.remove('collapsed');
      detailBox.classList.add('expanded');
      this.innerText = '접기';
    } else {
      detailBox.classList.remove('expanded');
      detailBox.classList.add('collapsed');
      this.innerText = '펼치기';
    }
  });
}


// -------------------------- 위로 가기 --------------------------

const arrowUp = document.querySelector('.arrow_up');

if (arrowUp) {
  arrowUp.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
