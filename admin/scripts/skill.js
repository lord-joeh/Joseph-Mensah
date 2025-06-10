document.addEventListener('DOMContentLoaded', () => {
  const addNewSkillBtn = document.querySelector('#add-new-skill-btn');
  const skillContainer = document.querySelector('.skill-container');
  const alertMessage = document.querySelector('.alert');
  const loadingSpinner = document.querySelector('#loading-spinner');
  const closeBtns = document.querySelectorAll('.close');
  const skillTitle = document.querySelector('#skill-title');
  const skillImage = document.querySelector('#skill-image');
  const sendSkillBtn = document.querySelector('#send-skill-btn');
  const updatedSkillName = document.querySelector('#updated-skill-name');
  const updatedSkillImage = document.querySelector('#updated-skill-image');
  const cancelUpdateBtn = document.querySelector('#cancel-update-btn');
  const confirmUpdateBtn = document.querySelector('#confirm-update-btn');
  const cancelDeleteBtn = document.querySelector('#cancel-delete-btn');
  const confirmDeleteBtn = document.querySelector('#confirm-delete-btn');

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = window.origin + '/admin/index.html';
    return;
  }

  //State Management
  let currentSkillName = '';
  let currentSkillImage = '';
  let currentSkillId = '';

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
      throw new Error(`Error sending request: ${error.message}`);
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

  addNewSkillBtn?.addEventListener('click', () => {
    showModal('add-skillModal');
  });

  // Function to add a new skill
  async function sendSkillData() {
    const skillData = {
      name: skillTitle.value.trim(),
      image: skillImage.value.trim(),
    };

    try {
      const response = await postData(
        'POST',
        'http://localhost:5000/skills/create',
        skillData,
      );

      if (response.success === false) {
        hideModal('add-skillModal');
        alertMess('error', response.message);
      } else {
        hideModal('add-skillModal');
        alertMess('success', response.message);
      }
    } catch (error) {
      hideModal('add-skillModal');
      alertMess('error', error.message);
    }
  }

  sendSkillBtn?.addEventListener('click', () => {
    sendSkillData();
  });

  // Function to get all skills
  async function getSkills() {
    try {
      const response = await fetchData('http://localhost:5000/skills/');

      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        // Clear existing skills
        skillContainer.innerHTML = '';

        response.forEach((skill) => {
          const skillCard = document.createElement('div');
          skillCard.className = 'card';
          skillCard.dataset.skillId = skill._id;
          skillCard.dataset.skillName = skill.name;
          skillCard.dataset.skillImage = skill.image;

          skillCard.innerHTML = `
            <img src="${skill.image}" class="card-img-top" alt="${skill.name}">
            <div class="card-body">
              <h5 class="card-title">${skill.name}</h5>
              <div class="card-btns">
                <button type="button" class="btn btn-light edit-skill-btn" data-skill-id="${skill._id}" data-skill-name="${skill.name}" data-skill-image="${skill.image}">
                  <img src="../images/edit-icon.svg" alt="edit icon" /> Edit
                </button>
                <button type="button" class="btn btn-outline-danger delete-skill-btn" data-skill-id="${skill._id}">
                  <img src="../images/delete.svg" alt="delete icon" /> Delete
                </button>
              </div>
            </div>
          `;

          skillContainer.appendChild(skillCard);
        });

        // Add event listeners after all cards are created
        document.querySelectorAll('.edit-skill-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const skillId = btn.getAttribute('data-skill-id');
            const skillName = btn.getAttribute('data-skill-name');
            const skillImage = btn.getAttribute('data-skill-image');

            currentSkillId = skillId;
            currentSkillName = skillName;
            currentSkillImage = skillImage;

            updatedSkillName.value = skillName;
            updatedSkillImage.value = skillImage;

            showModal('edit-skillModal');
          });
        });

        document.querySelectorAll('.delete-skill-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            currentSkillId = btn.getAttribute('data-skill-id');
            showModal('delete-skillModal');
          });
        });
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  }

  // Function update a skill
  async function updatedSkill(id) {
    const updatedSkillData = {
      name: updatedSkillName.value.trim(),
      image: updatedSkillImage.value.trim(),
    };

    try {
      const response = await postData(
        'PUT',
        `http://localhost:5000/skills/update/${id}`,
        updatedSkillData,
      );

      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
        await getSkills();
      }
    } catch (error) {
      alertMess('error', error.message);
    } finally {
      hideModal('edit-skillModal');
    }
  }

  // Function to delete skill
  async function deleteSkill(id) {
    if (!id) {
      alertMess('error', 'No skill selected for deletion');
      return;
    }

    try {
      const response = await deleteData(
        `http://localhost:5000/skills/delete/${id}`,
      );
      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
        await getSkills();
      }
    } catch (error) {
      alertMess('error', error.message);
    } finally {
      hideModal('delete-skillModal');
      currentSkillId = ''; // Reset the current skill ID after operation
    }
  }

  // edit buttons
  cancelUpdateBtn?.addEventListener('click', () => {
    hideModal('edit-skillModal');
  });

  confirmUpdateBtn?.addEventListener('click', () => {
    if (currentSkillId) {
      updatedSkill(currentSkillId);
    }
  });

  //delete buttons
  cancelDeleteBtn?.addEventListener('click', () => {
    hideModal('delete-skillModal');
    currentSkillId = ''; // Reset the current skill ID when canceling
  });

  confirmDeleteBtn?.addEventListener('click', () => {
    if (!currentSkillId) {
      alertMess('error', 'No skill selected for deletion');
      return;
    }
    deleteSkill(currentSkillId);
  });

  getSkills();
});
