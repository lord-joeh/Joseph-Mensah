document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://joseph-mensah-api.onrender.com";

  const initTypewriter = () => {
    const element = document.getElementById("typewriter");
    if (!element) return;

    const text = element.textContent;
    let character = 0;
    element.textContent = "";

    const type = () => {
      if (character < text.length) {
        element.textContent += text.charAt(character++);
        setTimeout(type, 100);
      }
    };
    type();
  };

  const initScrollAnimations = () => {
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = [
      ".about",
      ".skills",
      ".projects",
      ".certifications",
      ".contact",
      ".services",
    ];
    sections.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) observer.observe(el);
    });
  };

  const initNavigation = () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const items = document.querySelectorAll(".nav-links a");

    const closeMenu = () => {
      navToggle?.classList.remove("active");
      navLinks?.classList.remove("active");
    };

    navToggle?.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    items.forEach((link) => link.addEventListener("click", closeMenu));
  };

  const initServices = () => {
    const cards = document.querySelectorAll(".service-card");

    cards.forEach((card) => {
      const plusIcon = card.querySelector('.service img[src*="plus"]');
      const description = card.querySelector(".service-description");

      plusIcon?.addEventListener("click", () => {
        cards.forEach((other) => {
          if (other !== card) {
            const icon = other.querySelector(".service-image");
            const desc = other.querySelector(".service-description");
            if (icon && desc && icon.src.includes("dash.png")) {
              icon.src = "/images/plus.png";
              desc.classList.remove("open");
            }
          }
        });

        const isOpen = plusIcon.src.includes("dash.png");
        plusIcon.src = isOpen ? "./images/plus.png" : "./images/dash.png";

        if (isOpen) {
          description.classList.remove("open");
        } else {
          description.classList.add("open");
        }
      });
    });
  };

  window.openFullscreen = (img) => {
    const container = document.getElementById("fullscreenContainer");
    const viewImg = document.getElementById("fullscreenImage");
    if (container && viewImg) {
      viewImg.src = img.src;
      container.style.display = "flex";
    }
  };

  window.closeFullscreen = () => {
    const container = document.getElementById("fullscreenContainer");
    if (container) container.style.display = "none";
  };

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error(`Fetch error at ${endpoint}:`, err);
      return null;
    }
  };

  const populateContent = async () => {
    const [headData, aboutData, skillsData, projectsData, certsData] =
      await Promise.all([
        fetchData("/head/image"),
        fetchData("/about/info"),
        fetchData("/skills/"),
        fetchData("/projects/"),
        fetchData("/certificates/"),
      ]);

    // Head
    const headBox = document.querySelector("#headImage");
    if (headBox) {
      headBox.innerHTML = `<img src="${
        headData?.image || "./images/default.JPG"
      }" alt="Profile">`;
    }

    // About
    const aboutBox = document.querySelector(".about");
    if (aboutBox && aboutData) {
      aboutBox.innerHTML = `<h1>About Me</h1>
      <p>${aboutData.aboutText}</p>
      <a href="${aboutData.resumeUrl}" class="btn" rel="noopener">Download CV</a>`;
    }

    // Skills
    const skillsBox = document.querySelector(".skills");
    skillsData?.forEach((s) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<img src="${s.image}" alt="${s.name}" loading="lazy">
                       <div class="overlay"><h2>${s.name}</h2></div>`;
      skillsBox?.appendChild(div);
    });

    // Projects
    const projectsBox = document.querySelector(".card-container");
    projectsData?.forEach((p) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<div class="image"><img src="${p.imageUrl}" alt="${
        p.title
      }" loading="lazy"></div>
                       <h2>${p.title}</h2><p>${p.description.slice(
        0,
        150
      )}...</p>
                       <a href="${
                         p.link
                       }" class="view-project-btn" target="_blank">Visit</a>`;
      projectsBox?.appendChild(div);
    });

    // Certificates
    const certsBox = document.querySelector("#certContainer");
    certsData?.forEach((c) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<div class="image"><img src="${c.imageUrl}" onclick="openFullscreen(this)" loading="lazy"></div>
                       <h2>${c.title}</h2><p>${c.description}</p>`;
      certsBox?.appendChild(div);
    });
  };

  // Contact Form Handler
  const initContactForm = () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill in all fields before submitting.",
        });
        return;
      }

      const submitBtn = document.getElementById("form-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const res = await fetch(`${API_URL}/notifications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for reaching out.",
          });
        } else {
          throw new Error("Failed to send message");
        }
      } catch (err) {
        console.error("Contact form error:", err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
        });
      } finally {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  };

  initTypewriter();
  initScrollAnimations();
  initNavigation();
  initServices();
  initContactForm();
  populateContent();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
