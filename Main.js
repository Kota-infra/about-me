document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  setupMobileNavToggle();
  setCopyrightYear();
  setupContactForm();
});

function setActiveNavLink() {
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  if (navLinks.length === 0) return;

  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") currentPage = "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function setupMobileNavToggle() {
  const toggleButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".sidebar-nav");
  if (!toggleButton || !nav) return;

  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });
}

function setCopyrightYear() {
  const yearElements = document.querySelectorAll(".js-year");
  if (yearElements.length === 0) return;

  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
}

function setupContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const successMessage = document.querySelector(".form-success");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (successMessage) {
      successMessage.textContent =
        "送信内容を確認しました。ありがとうございます!(このフォームはデモのため、実際にはサーバーへ送信されません)";
      successMessage.classList.add("is-visible");
    }

    form.reset();
  });
}
