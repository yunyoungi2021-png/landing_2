// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. 모든 섹션과 네비게이션 링크를 가져옵니다.
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
});
