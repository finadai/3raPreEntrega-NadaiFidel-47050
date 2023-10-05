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

const productos = [
    { name: "Cerveza duff", price: 5.00 },
    { name: "Llamarada Moe", price: 30.00 },
    { name: "Cóctel Olvidame", price: 25.00 },
    { name: "Cóctel Ambrosia de Cupido", price: 40.00 },
    { name: "Skittlebrau", price: 7.50 }
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  
  // Función para agregar un producto al carrito
  function addToCart(productName, price) {
      cart.push({ name: productName, price: price });
      total += price;
      saveCartToLocalStorage();
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
  
  // Función para guardar el carrito en el localStorage
  function saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    // Función para cargar el carrito desde el localStorage al cargar la página
    function loadCartFromLocalStorage() {
      if (localStorage.getItem("cart")) {
        cart.length = 0; // Limpiamos el carrito actual
        const cartData = JSON.parse(localStorage.getItem("cart"));
        cart.push(...cartData);
        updateCart();
      }
    }
    
    // Cargar el carrito al cargar la página
    loadCartFromLocalStorage();

// Botón para comprar items
const buyButton = document.getElementById("buy-button");

// Agrega un listener para el evento click en el botón de "Comprar"
buyButton.addEventListener("click", () => {
    // Para corroborar si el carrito tiene por lo menos un elemento
    if (cart.length > 0) {
        alert("Compra realizada con éxito. Gracias por su compra.");
        // Vacía el carrito después de la compra
        cart.length = 0;
        total = 0;
        updateCart();
    } 
    else {
        alert("El carrito está vacío, agrega productos antes de comprar.");
    }
});


//Intentando un Buscador
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const results = productos.filter(producto => producto.name.toLowerCase().includes(searchTerm));
  
  displayResults(results);
});

function displayResults(results) {
  searchResults.innerHTML = "";
  
  if (results.length === 0) {
    searchResults.innerHTML = "No se encontraron resultados.";
    return;
  }
  
  results.forEach(producto => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("image-container");
    
    const productImage = document.createElement("img");
    productImage.src = `./images/${producto.name.toLowerCase().replace(/ /g, "")}.jpg`;
    productImage.alt = producto.name;
    productImage.title = producto.name;
    
    const productDescription = document.createElement("p");
    productDescription.classList.add("image-description");
    productDescription.textContent = `${producto.name} $${producto.price.toFixed(2)}`;
    
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart-btn");
    addToCartButton.dataset.productId = "1";
    addToCartButton.textContent = "Añadir al carrito";
    
    productContainer.appendChild(productImage);
    productContainer.appendChild(productDescription);
    productContainer.appendChild(addToCartButton);
    
    searchResults.appendChild(productContainer);
  });
}
  



