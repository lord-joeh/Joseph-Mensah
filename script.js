document.addEventListener('DOMContentLoaded', function () {
  var element = document.getElementById('typewriter');
  var text = element.textContent;
  var length = text.length;
  var character = 0;

  element.textContent = ''; // Clear the initial text

  (function typeWriter() {
    if (character < length) {
      element.textContent += text.charAt(character);
      character++;
      setTimeout(typeWriter, 100);
    }
  })();

  // Detect when the about, skills, projects, certifications, and contact sections are in the viewport
  const aboutSection = document.querySelector('.about');
  const skillsSection = document.querySelector('.skills');
  const projectsSection = document.querySelector('.projects');
  const certificationsSection = document.querySelector('.certifications');
  const contactSection = document.querySelector('.contact');
  const serviceSection = document.querySelector('.services');

  function checkVisibility() {
    const aboutRect = aboutSection.getBoundingClientRect();
    if (aboutRect.top < window.innerHeight && aboutRect.bottom >= 0) {
      aboutSection.classList.add('visible');
    }

    const skillsRect = skillsSection.getBoundingClientRect();
    if (skillsRect.top < window.innerHeight && skillsRect.bottom >= 0) {
      skillsSection.classList.add('visible');
    }

    const projectsRect = projectsSection.getBoundingClientRect();
    if (projectsRect.top < window.innerHeight && projectsRect.bottom >= 0) {
      projectsSection.classList.add('visible');
    }

    const certificationsRect = certificationsSection.getBoundingClientRect();
    if (
      certificationsRect.top < window.innerHeight &&
      certificationsRect.bottom >= 0
    ) {
      certificationsSection.classList.add('visible');
    }

    const contactRect = contactSection.getBoundingClientRect();
    if (contactRect.top < window.innerHeight && contactRect.bottom >= 0) {
      contactSection.classList.add('visible');
    }
    const serviceRect = serviceSection.getBoundingClientRect();
    if (serviceRect.top < window.innerHeight && serviceRect.bottom >= 0) {
      serviceSection.classList.add('visible');
    }
  }

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  checkVisibility(); // Initial check

  // Handle hamburger menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinkItems.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  //service script
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card) => {
    const plusIcon = card.querySelector('.service img[src*="plus"]');
    const description = card.querySelector('.service-description');

    plusIcon.addEventListener('click', () => {
      // Hide all other descriptions and reset icons
      serviceCards.forEach((otherCard) => {
        if (otherCard !== card) {
          const otherIcon = otherCard.querySelector('.service-image');
          const otherDesc = otherCard.querySelector('.service-description');
          if (otherIcon && otherDesc) {
            otherIcon.src = '/images/plus.png';
            otherDesc.style.animation = 'slideUp 0.3s ease-in-out forwards';
            setTimeout(() => {
              otherDesc.style.display = 'none';
            }, 300);
          }
        }
      });

      // Toggle current card
      if (plusIcon.src.includes('plus.png')) {
        plusIcon.src = '/images/dash.png';
        description.style.display = 'block';
        description.style.animation = 'slideDown 0.3s ease-in-out forwards';
      } else {
        plusIcon.src = '/images/plus.png';
        description.style.animation = 'slideUp 0.3s ease-in-out forwards';
        setTimeout(() => {
          description.style.display = 'none';
        }, 300);
      }
    });
  });

  // Fullscreen functions
  function openFullscreen(imgElement) {
    const fullscreenContainer = document.getElementById('fullscreenContainer');
    const fullscreenImage = document.getElementById('fullscreenImage');

    fullscreenImage.src = imgElement.src;
    fullscreenContainer.style.display = 'flex';
  }

  function closeFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreenContainer');
    fullscreenContainer.style.display = 'none';
  }

  // Year for footer
  let year = new Date().getFullYear();
  document.getElementById('year').textContent = year;

  const API_URL = 'https://joseph-mensah-api.onrender.com';

  //function to fetch requests.
  const fetchData = async (url) => {
    let results;
    try {
      const responses = await fetch(url);
      if (!responses.ok) {
        throw new Error(`Error sending request: ${error.message}`);
      }

      const response = await responses.json();
      results = response.data;
    } catch (error) {
      console.log(error);
    }
    return results;
  };

  // Api fetch for Head Section
  const headImg = document.querySelector('#headImage');
  async function getHeadImage() {
    const headImage = await fetchData(`${API_URL}/head/image`);
    headImg.innerHTML = `<img src=${headImage.image} alt="profile image" loading="lazy">`;
  }
  getHeadImage();

  // Api fetch for About Section
  const about = document.querySelector('.about');
  async function getAboutContent() {
    const content = await fetchData(`${API_URL}/about/info`);
    about.innerHTML = `
   <h1>About Me</h1>
   <p>${content.aboutText}</p>
   <a href=${content.resumeUrl} class="btn" rel="noopener noreferrer"> Download CV </a>
  `;
  }
  getAboutContent();

  // Api fetch for Skills Section
  const skills = document.querySelector('.skills');
  async function getSkills() {
    const allSkill = (await fetchData(`${API_URL}/skills/`)) || [];
    allSkill.forEach((skill) => {
      var skillCard = document.createElement('div');
      skillCard.className = 'card';
      skillCard.innerHTML = `
    <img src=${skill.image} alt=${skill.name} loading="lazy">
      <div class="overlay"> 
       <h2>${skill.name}</h2>
      </div>
    `;

      skills.appendChild(skillCard);
    });
  }
  getSkills();

  // Api fetch for Project Section
  const cardContainer = document.querySelector('.card-container');
  async function getProjects() {
    const allProject = (await fetchData(`${API_URL}/projects/`)) || [];
    allProject.forEach((project) => {
      var card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
    <div class="image"><img src=${project.imageUrl} alt=${
        project.title
      } loading="lazy" ></div>
      <h2> ${project.title} </h2>
      <p> ${project.description.slice(0, 150)}... </p>
      <a href=${
        project.link
      } class="btn" id="view-project-btn" target="_blank" rel="noopener noreferrer"> Visit </a> 
    `;
      cardContainer.appendChild(card);
    });
  }
  getProjects();

  // Api fetch for Certificate Section
  const certCardContainer = document.querySelector('#certContainer');
  async function getCertificates() {
    const allCert = (await fetchData(`${API_URL}/certificates/`)) || [];
    allCert.forEach((cert) => {
      var certCard = document.createElement('div');
      certCard.className = 'card';
      certCard.innerHTML = `
     <div class="image"><img src=${cert.imageUrl} alt=${cert.title} onclick="openFullscreen(this)" loading="lazy" ></div>
     <h2>Data Analysis Certificate</h2>
     <p>${cert.description}</p>
    `;
      certCardContainer.appendChild(certCard);
    });
  }
  getCertificates();

  //Contact Form
  const contactName = document.querySelector('#name');
  const contactEmail = document.querySelector('#email');
  const contactMessage = document.querySelector('#message');
  const contactForm = document.querySelector('form');
  const sendBtn = document.querySelector('#form-btn');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      name: contactName.value.trim(),
      email: contactEmail.value.trim(),
      message: contactMessage.value.trim(),
    };

    try {
      sendBtn.textContent = 'Sending...';
      sendBtn.toggleAttribute('disable');
      const response = await fetch(`${API_URL}/notifications/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const results = await response.json();
      results.success
        ? Swal.fire({
            title: `${results.message}`,
            icon: 'success',
            draggable: false,
          })
        : Swal.fire({
            title: 'Failed to send message!',
            icon: 'error',
            draggable: false,
          });
    } catch (error) {
      throw new Error(`${error.message}`);
    } finally {
      sendBtn.textContent = 'Send';
      contactForm.reset();
    }
  });
});
