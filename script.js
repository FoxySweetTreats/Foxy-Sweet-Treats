const cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((c, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item">
                <h3>${c.item}</h3>
                <p>$${c.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

function toggleAddressField() {
    const addressField = document.getElementById('address');
    const pickupCheckbox = document.getElementById('pickup');
    addressField.disabled = pickupCheckbox.checked;
}

const calendarContainer = document.getElementById('calendar-container');

const events = [
    { date: '2024-08-01', event: 'Baking class' },
    { date: '2024-08-15', event: 'Cupcake tasting event' }
];

events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `<strong>${event.date}</strong>: ${event.event}`;
    calendarContainer.appendChild(eventElement);
});

document.getElementById('order-form').addEventListener('submit', function(event) {
    const pickup = document.getElementById('pickup').checked ? "Yes" : "No";
    if (pickup === "No" && document.getElementById('address').value === '') {
        alert('Please provide a delivery address or select pickup.');
        event.preventDefault();
    } else {
        const cartDetails = cart.map(c => `${c.item} - $${c.price.toFixed(2)}`).join('\n');
        const cartTextarea = document.createElement('textarea');
        cartTextarea.name = 'cart';
        cartTextarea.value = cartDetails;
        cartTextarea.style.display = 'none';
        document.getElementById('order-form').appendChild(cartTextarea);
    }
});
