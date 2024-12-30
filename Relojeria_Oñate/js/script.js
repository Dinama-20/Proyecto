// Definir las traducciones
const translations = {
    es: {
        title: "Relojería y Joyería Oñate",
        login: "Iniciar Sesión",
        register: "Registrarse",
        cart: "Carrito",
        products: "Nuestros Productos",
        product1_title: "Reloj Clásico",
        product1_description: "Elegante reloj para ocasiones especiales.",
        add_to_cart: "Añadir al Carrito",
        product2_title: "Pulsera de Oro",
        product2_description: "Hermosa pulsera de oro de 18 quilates.",
        footer: "&copy; 2024 Relojería y Joyería Oñate. Todos los derechos reservados.",
        // Traducciones para login.html
        login_title: "Iniciar Sesión",
        email: "Correo Electrónico",
        password: "Contraseña",
        submit: "Iniciar Sesión",
        // Traducciones para register.html
        register_title: "Registrarse",
        name: "Nombre",
        last_name: "Primer Apellido",
        second_last_name: "Segundo Apellido (opcional)",
        phone: "Número de Teléfono",
        confirm_password: "Repite tu Contraseña",
        back_home: "Volver a la Página de Inicio",
        // Traducciones específicas para cart.html
        "Carrito": "Carrito",
        "Volver a la Página de Inicio": "Volver a la Página de Inicio",
        "Tu Carrito": "Tu Carrito",
        "Pagar con tarjeta VISA": "Pagar con tarjeta VISA",
        "Pagar": "Pagar",
        "Vaciar Carrito": "Vaciar Carrito",
        "Eliminar": "Eliminar"
    },
    en: {
        title: "Oñate Watch and Jewelry",
        login: "Login",
        register: "Register",
        cart: "Cart",
        products: "Our Products",
        product1_title: "Classic Watch",
        product1_description: "Elegant watch for special occasions.",
        add_to_cart: "Add to Cart",
        product2_title: "Gold Bracelet",
        product2_description: "Beautiful 18-karat gold bracelet.",
        footer: "&copy; 2024 Oñate Watch and Jewelry. All rights reserved.",
        // Traducciones para login.html
        login_title: "Login",
        email: "Email",
        password: "Password",
        submit: "Login",
        // Traducciones para register.html
        register_title: "Register",
        name: "Name",
        last_name: "Last Name",
        second_last_name: "Second Last Name (optional)",
        phone: "Phone Number",
        confirm_password: "Confirm Password",
        back_home: "Back to Home Page",
        // Traducciones específicas para cart.html
        "Carrito": "Cart",
        "Volver a la Página de Inicio": "Back to Home Page",
        "Tu Carrito": "Your Cart",
        "Pagar con tarjeta VISA": "Pay with VISA card",
        "Pagar": "Pay",
        "Vaciar Carrito": "Clear Cart",
        "Eliminar": "Remove"
    }
};

// Cambiar el idioma de la página
function changeLanguage() {
    const language = document.getElementById('language-selector').value;
    localStorage.setItem('language', language); // Guardar el idioma seleccionado

    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Obtener y cargar el idioma guardado en localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'es'; // Idioma por defecto 'es'
    document.getElementById('language-selector').value = savedLanguage;
    changeLanguage(); // Cambiar el idioma al cargar la página
});

// Carrito de compras
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const clearCartButton = document.getElementById('clear-cart');
    const removeButtonText = translations[localStorage.getItem('language') || 'es']["Eliminar"];
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>No hay productos en el carrito.</p>";
        } else {
            cartItems.innerHTML = cart.map(
                (item, index) =>
                    `<div class="cart-item">
                        <p>${item}</p>
                        <button class="remove-item" data-index="${index}">${removeButtonText}</button>
                    </div>`
            ).join('');
        }
    }
    if (clearCartButton) {
        clearCartButton.textContent = translations[localStorage.getItem('language') || 'es']["Vaciar Carrito"];
    }
}

// Añadir productos al carrito
const buttons = document.querySelectorAll('.add-to-cart');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.producto').querySelector('h3').textContent;
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage
        alert(`${product} añadido al carrito.`);
    });
});

// Eliminar productos del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cart.splice(index, 1); // Eliminar producto
        localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar carrito
        renderCart(); // Volver a renderizar el carrito
    }
});

// Vaciar el carrito
const clearCartButton = document.getElementById('clear-cart');
if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        alert('El carrito ha sido vaciado.');
        location.reload(); // Recargar la página
    });
}

// Cargar carrito al iniciar la página del carrito
document.addEventListener('DOMContentLoaded', renderCart);
