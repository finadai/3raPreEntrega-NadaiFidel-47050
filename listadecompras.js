// Función para verificar la edad
function verificarEdad() {
  // Pide al usuario que ingrese su edad
  var edad = prompt("Oye, necesito que ingreses tu edad:", "");

  // Verifica si la edad ingresada es menor de 18
  if (edad !== null && parseInt(edad) < 18) {
      alert("Oye oye no, tienes que ser mayor de 18 años para entrar a esta página, zoquete.");
      window.close();
  } else {
      var overlay = document.createElement("div");
      overlay.className = "overlay";

      var popup = document.createElement("div");
      popup.className = "popup";

      var welcomeHeading = document.createElement("h1");
      welcomeHeading.textContent = "Bienvenido";
      var welcomeMessage = document.createElement("p");
      welcomeMessage.textContent = "Sirvete lo que quieras, pero paga primero.";

      
      popup.appendChild(welcomeHeading);
      popup.appendChild(welcomeMessage);
      overlay.appendChild(popup);

      
      document.body.appendChild(overlay);

      
      setTimeout(function () {
          overlay.style.display = "none";
      }, 3000);
  }
}

// Llama a la función para verificar la edad cuando se carga la página
verificarEdad();

// Variables para mantener el estado del carrito
const cart = [];
let total = 0;

// Función para agregar un producto al carrito
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
}

// Función para actualizar el contenido del carrito
function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    cartItemsElement.innerHTML = "";

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsElement.appendChild(listItem);
    });

    const cartTotalElement = document.getElementById("cart-total");
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Event listeners para los botones "Añadir al carrito"
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const productDescription = document.querySelectorAll(".image-description")[index].textContent;
        const productPrice = parseFloat(productDescription.match(/\d+\.\d+/)[0]); // Extrae el precio del texto

        addToCart(productDescription, productPrice);
        updateCart();
    });
});



// Función para eliminar un producto del carrito
function removeFromCart(index) {
  const removedItem = cart.splice(index, 1)[0];
  total -= removedItem.price;
}

// Función para actualizar el contenido del carrito
function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      
      const removeButton = document.createElement("button");
      removeButton.textContent = "Eliminar";
      removeButton.addEventListener("click", () => {
          removeFromCart(index);
          updateCart();
      });

      listItem.appendChild(removeButton);
      cartItemsElement.appendChild(listItem);
  });

  const cartTotalElement = document.getElementById("cart-total");
  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}



