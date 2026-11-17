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

    