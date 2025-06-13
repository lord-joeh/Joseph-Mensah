document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const addImageBtn = document.querySelector('#add-head-image-btn');
  const closeBtns = document.querySelectorAll('.close');
  const addImageUrl = document.querySelector('#add-image-url');
  const editImageUrl = document.querySelector('#edit-image-url');
  const addImage = document.querySelector('#add-btn');
  const alertMessage = document.querySelector('.alert');
  const headContainer = document.querySelector('.container');
  const cancelDeleteBtn = document.querySelector('#cancel-delete-btn');
  const confirmDeleteBtn = document.querySelector('#confirm-delete-btn');
  const cancelEditBtn = document.querySelector('#cancel-edit-btn');
  const confirmUpdateBtn = document.querySelector('#confirm-update-btn');
  const loadingSpinner = document.querySelector('#loading-spinner');

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = window.origin + '/admin/index.html';
    return;
  }

  // Loading spinner functions
  function showLoading() {
    loadingSpinner?.classList.add('show');
  }

  function hideLoading() {
    loadingSpinner?.classList.remove('show');
  }

  // State management
  let currentImageUrl = '';

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
      // Clear input fields when closing modals
      if (modalId === 'myModal') {
        addImageUrl.value = '';
      } else if (modalId === 'editModal') {
        editImageUrl.value = '';
      }
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
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      hideModal(modalId);
    });
  });

  // API Request Functions
  const postData = async (method, url, data) => {
    showLoading();
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error sending request: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  const deleteData = async (method, url) => {
    showLoading();
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error sending request: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  const fetchData = async (url) => {
    showLoading();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    } finally {
      hideLoading();
    }
  };

  // Event Handlers
  addImageBtn?.addEventListener('click', () => {
    showModal('myModal');
  });

  addImage?.addEventListener('click', async (e) => {
    e.preventDefault();
    const image = addImageUrl.value.trim();

    if (!image) {
      alertMess('error', 'Please enter an image URL.');
      return;
    }

    try {
      const response = await postData(
        'POST',
        'http://localhost:5000/head/add-image',
        { image }
      );

      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
        hideModal('myModal');
        await getHead();
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  });

  // Delete Image Functions
  async function deleteImage() {
    try {
      const response = await deleteData(
        'DELETE',
        'http://localhost:5000/head/delete-image'
      );

      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
        hideModal('deleteModal');
        await getHead();
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  }

  // Update Image Function
  async function updateImage() {
    const image = editImageUrl.value.trim();

    if (!image) {
      alertMess('error', 'Please enter an image URL.');
      return;
    }

    try {
      const response = await postData(
        'PUT',
        'http://localhost:5000/head/update-image',
        { image }
      );

      if (response.success === false) {
        alertMess('error', response.message);
      } else {
        alertMess('success', response.message);
        hideModal('editModal');
        await getHead();
      }
    } catch (error) {
      alertMess('error', error.message);
    }
  }

  // Fetch and Display Image
  async function getHead() {
    try {
      // Clear existing content
      while (headContainer.firstChild) {
        if (headContainer.firstChild.classList?.contains('alert')) {
          break;
        }
        headContainer.removeChild(headContainer.firstChild);
      }

      const head = await fetchData('http://localhost:5000/head/image');
      if (!head || !head.image) {
        alertMess('error', 'No image found');
        return;
      }

      currentImageUrl = head.image;
      const imageDiv = document.createElement('div');
      imageDiv.className = 'head-image';
      imageDiv.innerHTML = `
        <img src="${head.image}" alt="profile image" class="head-image" id="profile-img">
        <div class="image-btns">
          <button type="button" class="btn btn-light" id="edit-head-image-btn">
            <img src="../images/edit-icon.svg" alt="edit icon" /> Edit
          </button>
          <button type="button" class="btn btn-outline-danger" id="delete-head-image-btn">
            <img src="../images/delete.svg" alt="delete icon" /> Delete
          </button>
        </div>
      `;
      headContainer.appendChild(imageDiv);

      // Add event listeners for the new buttons
      const editButton = document.getElementById('edit-head-image-btn');
      const deleteButton = document.getElementById('delete-head-image-btn');

      editButton?.addEventListener('click', () => {
        editImageUrl.value = currentImageUrl;
        showModal('editModal');
      });

      deleteButton?.addEventListener('click', () => {
        showModal('deleteModal');
      });
    } catch (error) {
      alertMess('error', error.message);
    }
  }

  // Modal button handlers
  cancelDeleteBtn?.addEventListener('click', () => {
    hideModal('deleteModal');
  });

  confirmDeleteBtn?.addEventListener('click', async () => {
    await deleteImage();
  });

  cancelEditBtn?.addEventListener('click', () => {
    hideModal('editModal');
  });

  confirmUpdateBtn?.addEventListener('click', async () => {
    await updateImage();
  });

  // Initial load
  getHead();
});
