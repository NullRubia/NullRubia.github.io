const HP = document.querySelector(".home__contact");
let contactVisible = false;

HP.addEventListener("click", function () {
  const tel = document.getElementById("tel");

  if (!contactVisible) {
    const mail = document.createElement("li");
    const git = document.createElement("li");

    mail.innerText = "e-mail : nateriver0527@naver.com";

    const gitLink = document.createElement("a");
    gitLink.href = "https://github.com/NullRubia";
    gitLink.innerText = "git : https://github.com/NullRubia";
    gitLink.target = "_blank";
    gitLink.classList.add("git-link");

    git.appendChild(gitLink);

    mail.classList.add("contact-info");
    git.classList.add("contact-info");

    tel.appendChild(mail);
    tel.appendChild(git);

    HP.innerText = "연락처 닫기"; // 텍스트 변경
  } else {
    const infos = tel.querySelectorAll(".contact-info");
    infos.forEach((info) => info.remove());

    HP.innerText = "연락처 보기"; // 원래 텍스트로 되돌림
  }

  contactVisible = !contactVisible;
});

const header = document.querySelector(".header");

const headerHeight = header.offsetHeight; //요소의 총 높이
console.log(headerHeight); //74

document.addEventListener("scroll", () => {
  if (window.scrollY > headerHeight) {
    // console.log("window.scrollY가 headerHeight보다 큽니다.");
    header.classList.add("header--dark"); //클래스 추가
  } else {
    // console.log("window.scrollY가 headerHeight보다 작습니다.");
    header.classList.remove("header--dark"); //클래스 제거
  }
});

const home = document.querySelector(".home__container");
const homeHeight = home.offsetHeight;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

const arrowup = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowup.style.opacity = 1;
  } else {
    arrowup.style.opacity = 0;
  }
});

arrowup.addEventListener("click", (e) => {
  e.preventDefault(); //a태그의 기본동작 막기
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navbarMenu = document.querySelector(".header__menu");
const navbarToggle = document.querySelector(".header__toggle");
navbarToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

navbarMenu.addEventListener("click", () => {
  navbarMenu.classList.remove("open");
});

const categories = document.querySelector(".categories");
const projectsContainer = document.querySelector(".projects");
const projects = document.querySelectorAll(".project");

categories.addEventListener("click", (e) => {
  const filter = e.target.dataset.category;
  //   console.log(filter);
  //   console.log(e.target);
  if (filter == null) {
    return;
  }
  activeSelection(e.target);
  filterProjects(filter);
});

function activeSelection(target) {
  const active = document.querySelector(".category--selected");
  active.classList.remove("category--selected");
  target.classList.add("category--selected");
}

function filterProjects(filter) {
  projects.forEach((project) => {
    if (filter == "all" || filter == project.dataset.type) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
  projectsContainer.classList.add("anim-out");
  setTimeout(() => {
    projectsContainer.classList.remove("anim-out");
  }, 500);
}
