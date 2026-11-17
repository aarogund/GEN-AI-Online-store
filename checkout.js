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
    document.addEventListener('click', (event) => {
      const addButton = event.target.closest('.add-btn');
      const actionButton = event.target.closest('[data-action]');
      const navButton = event.target.closest('.nav-btn');

      if (addButton) {
        const product = allProducts.find((item) => String(item.id) === addButton.dataset.id);
        if (product) {
          cart.addItem(product);
        }
      }

      if (actionButton) {
        const { action, id } = actionButton.dataset;
        if (action === 'increase') {
          cart.updateQuantity(Number(id), cart.items.find((item) => item.id === Number(id)).quantity + 1);
        }
        if (action === 'decrease') {
          const item = cart.items.find((entry) => entry.id === Number(id));
          if (item && item.quantity > 1) {
            cart.updateQuantity(Number(id), item.quantity - 1);
          } else {
            cart.removeItem(Number(id));
          }
        }
        if (action === 'remove') {
          cart.removeItem(Number(id));
        }
      }

      if (navButton) {
        const viewName = navButton.dataset.view;
        if (viewName === 'checkout' && !cart.items.length) {
          setFieldError('fullName', '');
          setFieldError('email', '');
          setFieldError('phone', '');
          setFieldError('address', '');
          const notice = document.createElement('div');
          notice.className = 'cart-warning';
          notice.style.color = '#ef4444';
          notice.style.fontWeight = '700';
          notice.style.marginBottom = '0.75rem';
          notice.textContent = 'Your cart is empty. Add items before checkout.';
          const form = document.getElementById('checkoutForm');
          if (!form.querySelector('.cart-warning')) {
            form.insertBefore(notice, form.firstChild);
          }
          return;
        }

        const existingWarning = document.querySelector('.cart-warning');
        if (existingWarning) {
          existingWarning.remove();
        }
        setView(viewName);
      }
    });
    