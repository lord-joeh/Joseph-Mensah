document.addEventListener('DOMContentLoaded', () => {
  const alertMessage = document.querySelector('.alert');
  const closeBtns = document.querySelectorAll('.close');
  const loadingSpinner = document.querySelector('#loading-spinner');
  const addContentBtn = document.querySelector('#add-about-content-btn');
  const sendContentBtn = document.querySelector('#add-content-btn');
  const resume = document.querySelector('#resume-url');
  const about = document.querySelector('#about-text');
  const aboutInfo = document.querySelector('.about-info');
  const updatedAboutText = document.querySelector('#update-about-text');
  const updatedResumeUrl = document.querySelector('#update-resume-url');
  const confirmUpdateBtn = document.querySelector('#update-content-btn');

  // Loading spinner functions
  function showLoading() {
    loadingSpinner?.classList.add('show');
  }

  function hideLoading() {
    loadingSpinner?.classList.remove('show');
  }

  // URL validation function
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Confirmation dialog function
  function showConfirmationDialog(message) {
    return new Promise((resolve) => {
      const dialog = document.createElement('div');
      dialog.className = 'modal';
      dialog.style.display = 'block';
      dialog.innerHTML = `
        <div class="modal-content" style="width: 400px;">
          <h3>Confirm Action</h3>
          <p>${message}</p>
          <div class="modal-buttons">
            <button class="btn btn-secondary" id="cancel-btn">Cancel</button>
            <button class="btn btn-primary" id="confirm-btn">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(dialog);

      dialog.querySelector('#confirm-btn').addEventListener('click', () => {
        dialog.remove();
        resolve(true);
      });

      dialog.querySelector('#cancel-btn').addEventListener('click', () => {
        dialog.remove();
        resolve(false);
      });

      // Close on outside click
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          dialog.remove();
          resolve(false);
        }
      });
    });
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

  // State management
  let currentResumeUrl = '';
  let currentAboutText = '';

  // Alert function
  function alertMess(status, message) {
    if (!alertMessage) return;

    const alertClass = status === 'success' ? 'alert-success' : 'alert-danger';
    alertMessage.innerHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>${message}</strong> 
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

  addContentBtn?.addEventListener('click', () => {
    showModal('contentModal');
  });

  sendContentBtn?.addEventListener('click', async (e) => {
    e.preventDefault();

    const aboutData = {
      resumeUrl: resume.value.trim(),
      aboutText: about.value.trim(),
    };

    if (!aboutData.resumeUrl) {
      alertMess('error', 'Please paste resume link');
      return;
    }
    if (!isValidUrl(aboutData.resumeUrl)) {
      alertMess('error', 'Please enter a valid URL for the resume link');
      return;
    }
    if (!aboutData.aboutText) {
      alertMess('error', 'Please type some about text');
      return;
    }

    const confirmed = await showConfirmationDialog(
      'Are you sure you want to add this content?',
    );
    if (!confirmed) return;

    try {
      const response = await postData(
        'POST',
        'http://localhost:5000/about/add-content',
        aboutData,
      );
      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
        hideModal('contentModal');
        await fetchAboutInfo();
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  });

  // Fetch about Info
  async function fetchAboutInfo() {
    try {
      const response = await fetchData('http://localhost:5000/about/info');
      currentAboutText = response.aboutText;
      currentResumeUrl = response.resumeUrl;

      if (response.success === false) {
        alert('error', response.message);
      } else {
        const content = document.createElement('div');
        content.className = 'content';

        content.innerHTML = `
                <div class="mb-3">
                <label for="about-text" class="form-label" id="about-text-label">About</label>
                <textarea
                    class="form-control"
                    id="about-text"
                    rows="5"
                    readonly
                    aria-labelledby="about-text-label"
                    aria-readonly="true"
                >${response.aboutText}</textarea>
                </div>

                <label for="resume-url" class="form-label" id="resume-url-label">Resume</label>
                <div class="input-group">
                <span class="input-group-text" id="add-visible-addon" aria-hidden="true">
                    <img src="../images/link.svg" alt="" />
                </span>
                <input
                    type="text"
                    class="form-control"
                    value="${response.resumeUrl.replace(/"/g, '&quot;')}"
                    aria-label="Resume URL"
                    aria-labelledby="resume-url-label"
                    aria-describedby="add-visible-addon"
                    id="resume-url"
                    readonly
                    aria-readonly="true"
                />
                </div>

                <button
                    type="submit"
                    class="btn btn-outline-light"
                    id="confirm-update-btn"
                    aria-label="Update content"
                >
                    <img src="../images/edit-icon.svg" alt="" aria-hidden="true" />
                    Update Content
                </button>

            `;
        aboutInfo.appendChild(content);
        const updateBtn = document.querySelector('#confirm-update-btn');

        updateBtn?.addEventListener('click', () => {
          showModal('updateModal');
          updatedAboutText.value = currentAboutText;
          updatedResumeUrl.value = currentResumeUrl;
        });
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  }

  fetchAboutInfo();

  async function updateContent() {
    const aboutText = updatedAboutText.value.trim();
    const resumeUrl = updatedResumeUrl.value.trim();

    if (!aboutText) {
      alertMess('error', 'Please enter about text');
      return;
    }
    if (!resumeUrl) {
      alertMess('error', 'Please enter resume URL');
      return;
    }
    if (!isValidUrl(resumeUrl)) {
      alertMess('error', 'Please enter a valid URL for the resume link');
      return;
    }

    const confirmed = await showConfirmationDialog(
      'Are you sure you want to update this content?',
    );
    if (!confirmed) return;

    const updatedAboutData = {
      aboutText,
      resumeUrl,
    };

    try {
      const response = await postData(
        'PUT',
        'http://localhost:5000/about/edit-content',
        updatedAboutData,
      );
      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
        hideModal('updateModal');
        await fetchAboutInfo();
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  }

  // Add cancel button handler
  const cancelUpdateBtn = document.querySelector('#cancel-update-btn');
  cancelUpdateBtn?.addEventListener('click', () => {
    hideModal('updateModal');
  });

  confirmUpdateBtn?.addEventListener('click', async () => {
    await updateContent();
  });
});
