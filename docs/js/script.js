const productosContainer = document.getElementById("lista-productos");
const contador = document.getElementById("contador");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Exponer la función globalmente para que funcione el onclick en botones
window.agregarAlCarrito = function(id, nombre, precio, imagen) {
  const existente = carrito.find(p => p.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  alert("Producto agregado");
};

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => mostrarProductos(data.products))
  .catch(error => console.error("Error al cargar productos:", error));

function mostrarProductos(productos) {
  productosContainer.innerHTML = ""; // Limpia antes de agregar
  productos.forEach(prod => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4"; // Clases responsive de Bootstrap
    card.innerHTML = `
      <div class="card h-100">
        <img src="${prod.images[0]}" class="card-img-top" alt="${prod.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${prod.title}</h5>
          <p class="card-text mt-auto">$${prod.price}</p>
          <button class="btn btn-success mt-3" onclick="agregarAlCarrito(${prod.id}, '${escapeQuotes(prod.title)}', ${prod.price}, '${prod.images[0]}')">Agregar</button>
        </div>
      </div>
    `;
    productosContainer.appendChild(card);
  });

  actualizarContador();
}

function actualizarContador() {
  contador.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// Para evitar errores con comillas en títulos
function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}


// Cargar reseñas desde resenas.html y ponerlas dentro del div .reseñas-grid
fetch('resenas.html')
  .then(response => response.text())
  .then(html => {
    // Crear un elemento temporal para extraer solo el contenido de .reseñas-grid
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const reseñasContenido = tempDiv.querySelector('.reseñas-grid').innerHTML;
    
    // Insertar en el index.html
    document.querySelector('.reseñas-grid').innerHTML = reseñasContenido;
  })
  .catch(error => console.error('Error cargando reseñas:', error));