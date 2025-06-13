document.addEventListener('DOMContentLoaded', () => {
  const projectContainer = document.querySelector('.project-container');
  const alertMessage = document.querySelector('.alert');
  const addNewProjectBtn = document.querySelector('#add-new-project-btn');
  const loadingSpinner = document.querySelector('#loading-spinner');
  const closeBtns = document.querySelectorAll('.close');
  const projectTitle = document.getElementById('project-title');
  const projectImage = document.getElementById('project-image-url');
  const projectDescription = document.getElementById('project-description');
  const projectLink = document.getElementById('project-url');
  const addProjectBtn = document.getElementById('add-project-btn');
  const updatedProjectTitle = document.querySelector('#updated-project-title');
  const updatedProjectImage = document.querySelector(
    '#updated-project-image-url',
  );
  const updatedProjectDescription = document.querySelector(
    '#updated-project-description',
  );
  const updatedProjectLink = document.querySelector('#updated-project-url');
  const cancelUpdateBtn = document.querySelector('#cancel-update-btn');
  const confirmUpdateBtn = document.querySelector('#confirm-update-btn');
  const cancelDeleteBtn = document.querySelector('#cancel-delete-btn');
  const confirmDeleteBtn = document.querySelector('#confirm-delete-btn');
    const API_URL = 'https://joseph-mensah-api.onrender.com';

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = window.origin + '/admin/index.html';
    return;
  }

  //State Management
  let currentProjectId;

  // Loading spinner functions
  function showLoading() {
    loadingSpinner?.classList.add('show');
  }

  function hideLoading() {
    loadingSpinner?.classList.remove('show');
  }

  // Enhanced fetch with timeout
  const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw new Error(
          'Request timed out. Please check your internet connection.',
        );
      }
      throw error;
    }
  };

  // Enhanced postData with timeout
  const postData = async (method, url, data) => {
    showLoading();
    try {
      const response = await fetchWithTimeout(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      if (error.message.includes('timed out')) {
        throw new Error(
          'Server is taking too long to respond. Please try again later.',
        );
      }
      throw new Error(`${error.message}`);
    } finally {
      hideLoading();
    }
  };
  // Enhanced Delete Data with timeout
  const deleteData = async (url) => {
    showLoading();
    try {
      const response = await fetchWithTimeout(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      if (error.message.includes('timed out')) {
        throw new Error(
          'Server is taking too long to respond. Please try again later.',
        );
      }
      throw new Error(`Error sending request: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  // Enhanced fetchData with timeout
  const fetchData = async (url) => {
    showLoading();
    try {
      const response = await fetchWithTimeout(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`,
        );
      }

      const data = await response.json();
      if (!data || !data.data) {
        throw new Error('Invalid response format from server');
      }
      return data.data;
    } catch (error) {
      if (error.message.includes('timed out')) {
        throw new Error(
          'Server is taking too long to respond. Please try again later.',
        );
      }
      throw new Error(`Error fetching data: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  // Alert function
  function alertMess(status, message) {
    if (!alertMessage) return;

    const alertClass = status === 'success' ? 'alert-success' : 'alert-danger';
    alertMessage.innerHTML = `
              <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <small>${message}</small> 
              </div>`;

    // Auto hide after 5 seconds
    setTimeout(() => {
      const alertElement = alertMessage.querySelector('.alert');
      if (alertElement) {
        alertElement.classList.add('fade');
        setTimeout(() => {
          alertElement.remove();
        }, 150);
      }
    }, 3000);
  }

  // Modal handling
  function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      const modalId = event.target.id;
      hideModal(modalId);
    }
  });

  // Close buttons event listeners
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      hideModal(modalId);
    });
  });

  // Show add new project modal
  addNewProjectBtn?.addEventListener('click', () => {
    showModal('add-projectModal');
  });

  // Function to send projectData
  async function sendProjectData() {
    const projectData = {
      title: projectTitle.value.trim(),
      description: projectDescription.value.trim(),
      imageUrl: projectImage.value.trim(),
      link: projectLink.value.trim(),
    };

    try {
      const response = await postData(
        'POST',
        `${API_URL}/projects/`,
        projectData,
      );

      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
      }
    } catch (error) {
      alertMess('error', error.message);
    } finally {
      hideModal('add-projectModal');
    }
  }

  // Send project data
  addProjectBtn?.addEventListener('click', () => {
    sendProjectData();
  });

  //Function to get all projects
  async function getProjects() {
    try {
      const response = await fetchData(`${API_URL}/projects/`);
      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        response.forEach((project) => {
          const projectCard = document.createElement('div');
          projectCard.className = 'card';
          projectCard.dataset.projectId = project._id;
          projectCard.dataset.projectTitle = project.title;
          projectCard.dataset.projectImage = project.imageUrl;
          projectCard.dataset.projectDescription = project.description;
          projectCard.dataset.projectLink = project.link;

          console.log(projectCard.dataset.projectDescription);

          projectCard.innerHTML = `
              <img src="${project.imageUrl}" class="card-img-top" alt="${
            project.title
          }">
              <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-description">${project.description.slice(
                  0,
                  50,
                )}... </p>
                <div class="card-btns">
                  <button type="button" class="btn btn-light edit-project-btn" data-project-id="${
                    project._id
                  }" data-project-title="${
            project.title
          }" data-project-image="${
            project.imageUrl
          }" data-project-description="${
            project.description
          }" data-project-link=${project.link}>
                    <img src="../images/edit-icon.svg" alt="edit icon" /> Edit
                  </button>
                  <button type="button" class="btn btn-outline-danger delete-project-btn" data-project-id="${
                    project._id
                  }">
                    <img src="../images/delete.svg" alt="delete icon" /> Delete
                  </button>
                </div>
              </div>
            `;

          projectContainer.appendChild(projectCard);
        });

        // Add event listeners after all cards are created
        document.querySelectorAll('.edit-project-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project-id');
            const projectTitle = btn.getAttribute('data-project-title');
            const projectImage = btn.getAttribute('data-project-image');
            const projectLink = btn.getAttribute('data-project-link');
            const projectDescription = btn.getAttribute(
              'data-project-description',
            );

            currentProjectId = projectId;

            updatedProjectTitle.value = projectTitle;
            updatedProjectImage.value = projectImage;
            updatedProjectDescription.value = projectDescription;
            updatedProjectLink.value = projectLink;

            console.log(projectDescription);

            showModal('edit-projectModal');
          });
        });

        document.querySelectorAll('.delete-project-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            currentProjectId = btn.getAttribute('data-project-id');
            showModal('delete-projectModal');
          });
        });
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  }
  getProjects();

  // Function to update project
  async function updateProject(id) {
    const updatedData = {
      title: updatedProjectTitle.value.trim(),
      imageUrl: updatedProjectImage.value.trim(),
      description: updatedProjectDescription.value.trim(),
      link: updatedProjectLink.value.trim(),
    };
    try {
      const response = await postData(
        'PUT',
        `${API_URL}/projects/${id}`,
        updatedData,
      );
      if (response.success === false) {
        alertMess('success', response.message);
      } else {
        alertMess('success', response.message);
      }
    } catch (error) {
      alertMess('error', error.message);
    } finally {
      hideModal('edit-projectModal');
    }
  }
  // Function to delete project
  async function deleteProject(id) {
    try {
      const response = await deleteData(`${API_URL}/projects/${id}`);
      if (response.success === false) {
        alertMess('success', response.message);
      } else {
        alertMess('success', response.message);
      }
    } catch (error) {
      alertMess('error', error.message);
    } finally {
      hideModal('delete-projectModal');
    }
  }

  //Close update project modal
  cancelUpdateBtn?.addEventListener('click', () => {
    hideModal('edit-projectModal');
  });

  //confirm update button
  confirmUpdateBtn?.addEventListener('click', () => {
    updateProject(currentProjectId);
  });

  //Close Delete Modal
  cancelDeleteBtn?.addEventListener('click', () => {
    hideModal('delete-projectModal');
  });

  //Confirm delete button
  confirmDeleteBtn?.addEventListener('click', () => {
    deleteProject(currentProjectId);
  });
});
