document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  const subjectSelect = document.getElementById("subject");
  const otherSubjectInput = document.getElementById("otherSubject");

  if (subjectSelect && otherSubjectInput) {
    subjectSelect.addEventListener("change", () => {
      if (subjectSelect.value === "Digər") {
        otherSubjectInput.classList.remove("hidden");
        otherSubjectInput.setAttribute("required", "true");
      } else {
        otherSubjectInput.classList.add("hidden");
        otherSubjectInput.removeAttribute("required");
        otherSubjectInput.value = "";
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn =
        contactForm.querySelector(".btn-submit") ||
        contactForm.querySelector("button");
      const originalText = btn.textContent;

      let finalSubject = subjectSelect.value;
      if (finalSubject === "Digər") {
        finalSubject = otherSubjectInput.value;
      }

      console.log("Subject:", finalSubject); // lazimdir debugging

      btn.textContent = "Göndərilir...";
      btn.style.opacity = "0.7";

      setTimeout(() => {
        showNotification(
          "Mesajınız göndərildi! Sizinlə qısa müddətdə əlaqə saxlayacağıq.",
        );
        contactForm.reset();

        if (otherSubjectInput) otherSubjectInput.classList.add("hidden");

        btn.textContent = originalText;
        btn.style.opacity = "1";
      }, 1000);
    });
  }

  if (contactForm) {
    const inputs = contactForm.querySelectorAll(
      "input[required], textarea[required]",
    );
    inputs.forEach((input) => {
      input.addEventListener("invalid", () => {
        input.style.borderColor = "red";
      });
      input.addEventListener("input", () => {
        input.style.borderColor = "";
      });
    });
  }

  function showNotification(message) {
    const toast = document.createElement("div");
    toast.className = "success-toast";
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;

    document.body.appendChild(toast);

    void toast.offsetWidth;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  }

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".book-form-container, .contact-wrapper, .info-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    });

  const style = document.createElement("style");
  style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);

  // =========================================
  // Dark Mode deyisdirmek
  // =========================================
  const themeToggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    updateIcon(true);
  } else {
    body.classList.remove("dark-mode");
    updateIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateIcon(isDark);
    });
  }

  function updateIcon(isDark) {
    if (!themeToggleBtn) return;
    if (isDark) {
      themeToggleBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else {
      themeToggleBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  }
});
