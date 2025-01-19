document.addEventListener("DOMContentLoaded", function() {
    var element = document.getElementById("typewriter");
    var text = element.textContent;
    var length = text.length;
    var character = 0;

    element.textContent = ""; // Clear the initial text

    (function typeWriter() { 
        if (character < length) {
            element.textContent += text.charAt(character);
            character++;
            setTimeout(typeWriter, 100); // Adjust the speed as needed
        }
    }());

    // Handle form submission
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const name = form.elements["name"].value;
        const email = form.elements["email"].value;
        const message = form.elements["message"].value;

        const mailtoLink = `mailto:josephtettehmensah37@gmail.com?subject=Contact Form Submission&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;

        window.location.href = mailtoLink;
    });

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
            setTimeout(() => {
                projectsSection.classList.add('visible');
            }, 500); // Add a delay of 500ms
        }

        const certificationsRect = certificationsSection.getBoundingClientRect();
        if (certificationsRect.top < window.innerHeight && certificationsRect.bottom >= 0) {
            setTimeout(() => {
                certificationsSection.classList.add('visible');
            }, 500); // Add a delay of 1000ms
        }

        const contactRect = contactSection.getBoundingClientRect();
        if (contactRect.top < window.innerHeight && contactRect.bottom >= 0) {
            setTimeout(() => {
                contactSection.classList.add('visible');
            }, 500); // Add a delay of 1500ms
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

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// Fullscreen functions
function openFullscreen(imgElement) {
    const fullscreenContainer = document.getElementById("fullscreenContainer");
    const fullscreenImage = document.getElementById("fullscreenImage");

    fullscreenImage.src = imgElement.src;
    fullscreenContainer.style.display = "flex";
}

function closeFullscreen() {
    const fullscreenContainer = document.getElementById("fullscreenContainer");
    fullscreenContainer.style.display = "none";
}