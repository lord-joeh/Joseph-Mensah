document.addEventListener('DOMContentLoaded', () => {
  const loginEmail = document.querySelector('#login-email');
  const loginPassword = document.querySelector('#login-password');
  const showPassword = document.querySelector('#show-password');
  const loginBtn = document.querySelector('#login-btn');
  const loadingSpinner = document.querySelector('#loading-spinner');
  const alertMessage = document.querySelector('.alert');
  const loginForm = document.querySelector('form');
  const API_URL = 'https://joseph-mensah-api.onrender.com';

  const token = localStorage.getItem('token');

  // Loading spinner functions
  function showLoading() {
    loadingSpinner?.classList.add('show');
  }

  function hideLoading() {
    loadingSpinner?.classList.remove('show');
  }

  // Alert function
  function alertMess(status, message) {
    if (!alertMessage) return;

    const alertClass = status === 'success' ? 'alert-success' : 'alert-danger';
    alertMessage.innerHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <small>${message}</small> 
      </div>`;

    // Auto hide after 3 seconds
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
      throw new Error(`${error.message}`);
    } finally {
      hideLoading();
    }
  };
  loginEmail?.addEventListener('change', (e) => {
    loginEmail.value = e.target.value.trim();
  });
  loginPassword?.addEventListener('change', (e) => {
    loginPassword.value = e.target.value.trim();
  });

  // Form Validation
  if (loginEmail?.length === 0) {
    return alertMess('error', 'Email should not be empty');
  }
  if (loginPassword?.length === 0) {
    return alertMess('error', 'Password should not be empty');
  }

  showPassword?.addEventListener('change', (e) => {
    showPassword.toggleAttribute('checked');
    showPassword?.getAttributeNames().includes('checked')
      ? loginPassword?.setAttribute('type', 'text')
      : loginPassword?.setAttribute('type', 'password');
  });

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginData = {
      email: loginEmail?.value.trim(),
      password: loginPassword?.value.trim(),
    };
    try {
      const response = await postData(
        'POST',
        `${API_URL}/auth/login`,
        loginData,
      );
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      window.location.replace('/admin/admin.html');
      alertMess('success', response.message);
    } catch (error) {
      alertMess('error', error.message);
    }
  });
});
