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

      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Sírvete lo que quieras, pero paga primero.',
        icon: 'error',
        confirmButtonText: 'Okey, amigo',
        iconColor: 'orange',
        confirmButtonColor: 'orange',
        iconHtml:'<i class="bi bi-cup-straw"></i>',
        showConfirmButton: false,
        timer: '2000'
      })
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
  let total = parseFloat(localStorage.getItem("total")) || 0;

  // Función para agregar un producto al carrito
  function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    saveCartToLocalStorage();
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
    Toastify({
      text: "Producto removido del carrito.",
      duration: 2000,
      destination: "",
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #6807E3, #EB9705)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
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
    })
  
    const cartTotalElement = document.getElementById("cart-total");
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  
  // Función para guardar el carrito en el localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total.toString());
  }
    
    // Función para cargar el carrito desde el localStorage al cargar la página
  function loadCartFromLocalStorage() {
  const cartData = JSON.parse(localStorage.getItem("cart"));
  const totalData = localStorage.getItem("total");

  if (cartData && Array.isArray(cartData)) {
    cart.length = 0; // Limpiamos el carrito actual
    cart.push(...cartData);
  }

  if (totalData) {
    total = parseFloat(totalData);
  }

  updateCart();
}  
    
    // Cargar el carrito al cargar la página
    loadCartFromLocalStorage();

// Botón para comprar items
const buyButton = document.getElementById("buy-button");

// Agrega un listener para el evento click en el botón de "Comprar"
buyButton.addEventListener("click", () => {
    // Para corroborar si el carrito tiene por lo menos un elemento
    if (cart.length > 0) {
      Toastify({
        text: "Compra realizada, muchas gracias.",
        duration: 2000,
        destination: "",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #6807E3, #EB9705)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
        // Vacía el carrito después de la compra
        cart.length = 0;
        total = 0;
        updateCart();
    } 
    else {
      Toastify({
        text: "El carrito está vacío, amigo",
        duration: 2000,
        destination: "",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #6807E3, #EB9705)",
        },
        onClick: function(){} // Callback after click
      }).showToast();;
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

fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    const productos = data; 
  })
  .catch(error => console.error('Error al cargar productos:', error));
  

const tabContainer = document.querySelector(".tab-container");
  tabContainer.addEventListener("click", function() {
    this.classList.toggle("open");
  });
  


