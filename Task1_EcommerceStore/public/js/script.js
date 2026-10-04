let cart = [];

function addToCart(productName, price) {
    const product = {
        name: productName,
        price: price,
        quantity: 1
    };

    cart.push(product);

    alert(productName + " added to cart!");
    displayCart();
}
function displayCart() {
    const cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${product.name}</h3>
                <p>
    <button onclick="decreaseQuantity(${index})">−</button>
    Quantity: ${product.quantity}
    <button onclick="increaseQuantity(${index})">+</button>
</p>
                <p>₹${product.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
        cartItems.innerHTML += `<h3>Total: ₹${total}</h3>`;
}
displayCart();
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}
function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        displayCart();
    }
}
function showDetails(name, price, description) {
    alert(
        "Product: " + name +
        "\nPrice: ₹" + price +
        "\n\n" + description
    );
}
async function loadProducts() {
    try {
        const response = await fetch("/api/products");
        const products = await response.json();

        const productContainer = document.getElementById("product-container");

        productContainer.innerHTML = "";

        products.forEach(product => {
            productContainer.innerHTML += `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>

                    <button onclick="addToCart('${product.name}', ${product.price})">
                        Add to Cart
                    </button>

                    <button onclick="showDetails('${product.name}', ${product.price}, 'Product available at CodeAlpha Store.')">
                        View Details
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadProducts();