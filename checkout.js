    const checkoutButton = document.getElementById('checkoutButton');
    const checkoutForm = document.getElementById('checkoutForm');
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = {
      products: document.getElementById('productsView'),
      checkout: document.getElementById('checkoutView'),
      summary: document.getElementById('summaryView')
    };

    function validateField(fieldId, value) {
      const trimmed = value.trim();

      if (fieldId === 'fullName') {
        return trimmed ? '' : 'Please enter your full name.';
      }

      if (fieldId === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(trimmed) ? '' : 'Please enter a valid email address.';
      }

      if (fieldId === 'phone') {
        const cleaned = trimmed.replace(/\D/g, '');
        return cleaned.length >= 7 && cleaned.length <= 15 && /^\d+$/.test(trimmed) ? '' : 'Please enter a valid phone number with digits only.';
      }

      if (fieldId === 'address') {
        return trimmed.length >= 10 ? '' : 'Please enter a delivery address with at least 10 characters.';
      }

      return '';
    }

    function setFieldError(fieldId, message) {
      const errorNode = document.querySelector(`[data-error-for="${fieldId}"]`);
      if (errorNode) {
        errorNode.textContent = message;
      }
    }

    function validateForm() {
      let isValid = true;
      const fields = ['fullName', 'email', 'phone', 'address'];

      fields.forEach((fieldId) => {
        const value = document.getElementById(fieldId).value;
        const message = validateField(fieldId, value);
        setFieldError(fieldId, message);
        if (message) {
          isValid = false;
        }
      });

      return isValid;
    }

    function buildOrder() {
      const customer = {
        name: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim()
      };

      return {
        orderId: `ORD-${Date.now()}`,
        customer,
        items: cart.items.map((item) => ({ ...item })),
        total: cart.getTotal(),
        date: new Date().toISOString()
      };
    }