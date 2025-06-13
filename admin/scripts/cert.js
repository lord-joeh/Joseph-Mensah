document.addEventListener('DOMContentLoaded', () => {
  const alertMessage = document.querySelector('.alert');
  const addNewCertBtn = document.querySelector('#add-new-cert-btn');
  const loadingSpinner = document.querySelector('#loading-spinner');
  const closeBtns = document.querySelectorAll('.close');
  const certTitle = document.getElementById('cert-title');
  const certImage = document.getElementById('cert-image-url');
  const certDescription = document.getElementById('cert-description');
  const addCertBtn = document.getElementById('add-cert-btn');
  const updatedCertTitle = document.querySelector('#updated-cert-title');
  const updatedCertImage = document.querySelector('#updated-cert-image-url');
  const updatedCertDescription = document.querySelector(
    '#updated-cert-description',
  );
  const cancelUpdateBtn = document.querySelector('#cancel-update-btn');
  const confirmUpdateBtn = document.querySelector('#confirm-update-btn');
  const cancelDeleteBtn = document.querySelector('#cancel-delete-btn');
  const confirmDeleteBtn = document.querySelector('#confirm-delete-btn');
  const certContainer = document.querySelector('.cert-container');

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = window.origin + '/admin/index.html';
    return;
  }

  //State Management
  let currentCertId;

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

  // Show add new cert modal
  addNewCertBtn?.addEventListener('click', () => {
    showModal('add-certModal');
  });

  //Function to send certificate data
  async function sendCertData() {
    const certData = {
      title: certTitle.value.trim(),
      description: certDescription.value.trim(),
      imageUrl: certImage.value.trim(),
    };
    try {
      const response = await postData(
        'POST',
        'http://localhost:5000/certificates/',
        certData,
      );

      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
      }
    } catch (error) {
      alertMess('error', error.message);
    } finally {
      hideModal('add-certModal');
    }
  }

  // Send cert data
  addCertBtn?.addEventListener('click', () => {
    sendCertData();
  });

  //Function to get all certs
  async function getCerts() {
    try {
      const response = await fetchData('http://localhost:5000/certificates/');
      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        response.forEach((cert) => {
          const certCard = document.createElement('div');
          certCard.className = 'card';
          certCard.dataset.certId = cert._id;
          certCard.dataset.certTitle = cert.title;
          certCard.dataset.certImage = cert.imageUrl;
          certCard.dataset.certDescription = cert.description;

          certCard.innerHTML = `
                  <img src="${cert.imageUrl}" class="card-img-top" alt="${
            cert.title
          }">
                  <div class="card-body">
                    <h5 class="card-title">${cert.title}</h5>
                    <p class="card-description">${cert.description.substring(
                      0,
                      50,
                    )}... </p>
                    <div class="card-btns">
                      <button type="button" class="btn btn-light edit-cert-btn" data-cert-id="${
                        cert._id
                      }" data-cert-title="${cert.title}" data-cert-image="${
            cert.imageUrl
          }" data-cert-description="${cert.description}">
                        <img src="../images/edit-icon.svg" alt="edit icon" /> Edit
                      </button>
                      <button type="button" class="btn btn-outline-danger delete-cert-btn" data-cert-id="${
                        cert._id
                      }">
                        <img src="../images/delete.svg" alt="delete icon" /> Delete
                      </button>
                    </div>
                  </div>
                `;

          certContainer.appendChild(certCard);
        });

        // Add event listeners after all cards are created
        document.querySelectorAll('.edit-cert-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const certId = btn.getAttribute('data-cert-id');
            const certTitle = btn.getAttribute('data-cert-title');
            const certImage = btn.getAttribute('data-cert-image');
            const certDescription = btn.getAttribute('data-cert-description');

            currentCertId = certId;

            updatedCertTitle.value = certTitle;
            updatedCertImage.value = certImage;
            updatedCertDescription.value = certDescription;

            showModal('edit-certModal');
          });
        });

        document.querySelectorAll('.delete-cert-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            currentCertId = btn.getAttribute('data-cert-id');
            showModal('delete-certModal');
          });
        });
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  }

  getCerts();

  // Function to update certificate
  async function updateCert(id) {
    const updatedData = {
      title: updatedCertTitle.value.trim(),
      imageUrl: updatedCertImage.value.trim(),
      description: updatedCertDescription.value.trim(),
    };
    try {
      const response = await postData(
        'PUT',
        `http://localhost:5000/certificates/${id}`,
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
      hideModal('edit-certModal');
    }
  }

  // Function to delete cert
  async function deleteCert(id) {
    try {
      const response = await deleteData(
        `http://localhost:5000/certificates/${id}`,
      );
      if (response.success === false) {
        alertMess('success', response.message);
      } else {
        alertMess('success', response.message);
      }
    } catch (error) {
      alertMess('error', error.message);
    } finally {
      hideModal('delete-certModal');
    }
  }

  //Close update cert modal
  cancelUpdateBtn?.addEventListener('click', () => {
    hideModal('edit-certModal');
  });

  //confirm update button
  confirmUpdateBtn?.addEventListener('click', () => {
    updateCert(currentCertId);
  });

  //Close Delete Modal
  cancelDeleteBtn?.addEventListener('click', () => {
    hideModal('delete-certModal');
  });

  //Confirm delete button
  confirmDeleteBtn?.addEventListener('click', () => {
    deleteCert(currentCertId);
  });
});
