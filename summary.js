export function renderSummary(order) {
      summaryContent.innerHTML = `
        <div class="summary-header">
          <h2>Order Confirmed</h2>
          <span class="badge">Paid</span>
        </div>

        <div class="summary-info">
          <div>
            <h3>Order Details</h3>
            <p><strong>ID:</strong> ${order.orderId}</p>
            <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
          </div>
          <div>
            <h3>Customer</h3>
            <p>${order.customer.name}</p>
            <p>${order.customer.email}</p>
            <p>${order.customer.phone}</p>
          </div>
        </div>

        <div class="summary-items">
          <h3>Items</h3>
          ${order.items.map((item) => `
            <div class="summary-row">
              <span>${item.title} x ${item.quantity}</span>
              <span>${formatCurrency(item.price * item.quantity)}</span>
            </div>
          `).join('')}
          <div class="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div class="summary-row">
            <span>Total</span>
            <span>${formatCurrency(order.total)}</span>
          </div>
        </div>

        <div class="summary-actions">
          <button type="button" id="continueShopping" class="continue-btn">Continue Shopping</button>
        </div>
      `;

      document.getElementById('continueShopping').addEventListener('click', () => {
        cart.clear();
        checkoutForm.reset();
        setFieldError('fullName', '');
        setFieldError('email', '');
        setFieldError('phone', '');
        setFieldError('address', '');
        const existingWarning = document.querySelector('.cart-warning');
        if (existingWarning) {
          existingWarning.remove();
        }
        setView('products');
      });
    }
