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