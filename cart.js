export class Cart {
      constructor() {
        this.items = JSON.parse(localStorage.getItem('nccMarketCart') || '[]');
      }

      save() {
        localStorage.setItem('nccMarketCart', JSON.stringify(this.items));
      }

      addItem(product) {
        const item = this.items.find((entry) => entry.id === product.id);

        if (item) {
          item.quantity += 1;
        } else {
          this.items.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
          });
        }

        this.save();
        renderCart();
      }

      removeItem(productId) {
        this.items = this.items.filter((item) => item.id !== productId);
        this.save();
        renderCart();
      }

      updateQuantity(productId, nextQuantity) {
        if (nextQuantity <= 0) {
          this.removeItem(productId);
          return;
        }

        const item = this.items.find((entry) => entry.id === productId);
        if (item) {
          item.quantity = nextQuantity;
          this.save();
          renderCart();
        }
      }

      getTotal() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
      }

      getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
      }

      clear() {
        this.items = [];
        this.save();
        renderCart();
      }
    }

    const cart = new Cart();

    // const currency = new Intl.NumberFormat('en-US', {
    //   style: 'currency',
    //   currency: 'USD'
    // });

    function formatCurrency(value) {
      return currency.format(value);
    }

    function renderCart() {
      cartItemsElement.innerHTML = '';

      if (!cart.items.length) {
        cartEmptyElement.classList.add('visible');
        cartTotalElement.textContent = formatCurrency(0);
        cartBadge.textContent = '0';
        checkoutButton.disabled = true;
        checkoutButton.style.opacity = '0.5';
        return;
      }

      cartEmptyElement.classList.remove('visible');
      cartBadge.textContent = String(cart.getItemCount());
      cartTotalElement.textContent = formatCurrency(cart.getTotal());
      checkoutButton.disabled = false;
      checkoutButton.style.opacity = '1';

      cart.items.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div>
            <h4>${item.title}</h4>
            <div class="cart-item-price">${formatCurrency(item.price)} each</div>
            <div class="quantity-controls">
              <button class="qty-btn" type="button" data-action="decrease" data-id="${item.id}">−</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn" type="button" data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <div>
            <div class="price" style="font-size:1rem;">${formatCurrency(item.price * item.quantity)}</div>
            <button class="remove-btn" type="button" data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        `;
        cartItemsElement.appendChild(cartItem);
      });
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
