document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. 스티키 네비게이션 스크롤 감지
  ========================================= */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".subnav__list li");

  const observerOptions = {
    root: null, // 뷰포트 기준
    rootMargin: "-20% 0px -70% 0px", // 화면 상단 20% 지점에서 감지
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 모든 리스트에서 active 클래스 제거
        navLinks.forEach((li) => li.classList.remove("is-active"));
        
        // 현재 화면에 들어온 섹션의 ID를 가져와 해당하는 링크에 active 클래스 추가
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.subnav__list a[href="#${id}"]`);
        
        if (activeLink) {
          activeLink.parentElement.classList.add("is-active");
        }
      }
    });
  }, observerOptions);

  // 각 섹션을 관찰 대상으로 지정
  sections.forEach((section) => observer.observe(section));


  /* =========================================
     2. 커리큘럼 드롭다운 기능
  ========================================= */
  // 드롭다운 열기/닫기 토글
  document.querySelectorAll(".dropdown-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("is-open");
    });
  });

  // 항목 선택 및 버튼 텍스트 변경
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      const dropdown = item.closest(".dropdown");
      const parentList = item.parentElement;
      const headerWrap = dropdown.querySelector(".header-text-wrap");

      // 1. 기존 선택된 항목 해제 후, 클릭한 항목에만 is-selected 적용
      parentList.querySelectorAll(".dropdown-item").forEach(el => el.classList.remove("is-selected"));
      item.classList.add("is-selected");

      // 2. 클릭된 항목의 텍스트 가져오기
      const selectedText = item.textContent.trim();

      // 3. 텍스트 형태에 따라 헤더 디자인(빨간색 포인트) 적용하여 변경
      if (selectedText.match(/^\d+개월/)) {
        // '1개월' 등 "숫자+개월"로 시작하는 경우 (첫 번째 단어를 빨간색으로)
        const parts = selectedText.split(' ');
        const month = parts.shift(); // 첫 단어 분리 (예: 1개월)
        const rest = parts.join(' '); // 나머지 텍스트
        headerWrap.innerHTML = `<span class="text-red">${month}</span><span>${rest}</span>`;
      } else {
        // 그 외의 경우 (빨간색 점 추가)
        headerWrap.innerHTML = `<span class="text-red" style="font-size: 10px;">●</span><span>${selectedText}</span>`;
      }

      // 4. 선택 완료 후 드롭다운 메뉴 닫기
      dropdown.classList.remove("is-open");
    });
  });
});
// 기존 main.js에 추가
const modal = document.getElementById('subsidyModal');
const btnDetail = document.querySelector('.btn-detail'); // '자세히 보기' 버튼 클래스명 확인 필요
const btnClose = document.querySelector('.modal-close');

// 열기
if (btnDetail) {
  btnDetail.addEventListener('click', () => modal.classList.add('is-open'));
}

// 닫기
if (btnClose) {
  btnClose.addEventListener('click', () => modal.classList.remove('is-open'));
}

// 배경 클릭 시 닫기
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('is-open');
});
const trigger = document.getElementById('eduInfoTrigger');
const popup = document.getElementById('eduInfoPopup');
const close = document.getElementById('eduInfoClose');

if (trigger) {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.add('is-open');
  });
}

if (close) {
  close.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.remove('is-open');
  });
}
