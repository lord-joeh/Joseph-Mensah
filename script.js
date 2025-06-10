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
  const allCert =
    (await fetchData(`${API_URL}/certificates/`)) || [];
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
