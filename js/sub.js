// -------------------------- 탭메뉴 ----------------------

// 탭메뉴
const tabMenu = document.querySelectorAll('.tab_menu li');
const tabContent = document.querySelectorAll('.tabcontent');
const btns = document.querySelectorAll('.tabcontent button');

// 처음에는 첫 번째 탭만 보이기
tabContent.forEach((tc, i) => {
  if (i === 0) {
    tc.style.display = 'block';
    tc.style.minHeight = '300px';
    tc.classList.add('active_content');
  } else {
    tc.style.display = 'none';
    tc.classList.remove('active_content');
  }
});

// 탭메뉴 클릭
tabMenu.forEach((tm, i) => {
  tm.addEventListener('click', () => {
    // 탭 active 제거
    tabMenu.forEach(item => item.classList.remove('active'));
    tm.classList.add('active');

    // 내용 보이기 / 숨기기
    tabContent.forEach((tc, j) => {
      if (i === j) {
        tc.style.display = 'block';
        tc.style.minHeight = '300px';
        tc.classList.add('active_content');

        const btn = tc.querySelector('button');
        if (btn) btn.innerText = '펼치기';
      } else {
        tc.style.display = 'none';
        tc.style.minHeight = '300px';
        tc.classList.remove('active_content');

        const btn = tc.querySelector('button');
        if (btn) btn.innerText = '펼치기';
      }
    });
  });
});

// 더보기 클릭
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.tabcontent');

    if (btn.textContent === '펼치기') {
      parent.style.minHeight = '500px';
      btn.innerText = '접기';
    } else {
      parent.style.minHeight = '300px';
      btn.innerText = '펼치기';
    }
  });
});