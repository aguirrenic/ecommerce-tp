const tablaCarrito = document.getElementById("tabla-carrito");
const totalElement = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderizarCarrito() {
  tablaCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    tablaCarrito.innerHTML = `
      <tr>
        <td colspan="6">El carrito está vacío.</td>
      </tr>
    `;
    totalElement.textContent = "0";
    return;
  }

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${item.imagen}" alt="${item.nombre}" style="height: 60px; object-fit: contain;" /></td>
      <td>${item.nombre}</td>
      <td>$${item.precio.toFixed(2)}</td>
      <td>
        <input type="number" value="${item.cantidad}" min="1" class="form-control cantidad-input" data-index="${index}" />
      </td>
      <td>$${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm eliminar-btn" data-index="${index}">🗑️</button>
      </td>
    `;
    tablaCarrito.appendChild(fila);
  });

  totalElement.textContent = total.toFixed(2);
  agregarEventos();
}

function agregarEventos() {
  // Botones eliminar
  document.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      guardarYActualizar();
    });
  });

  // Inputs cantidad
  document.querySelectorAll(".cantidad-input").forEach(input => {
    input.addEventListener("input", e => {
      const index = e.target.dataset.index;
      let nuevaCantidad = parseInt(e.target.value);
      if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        nuevaCantidad = 1;
        e.target.value = 1;
      }
      carrito[index].cantidad = nuevaCantidad;
      guardarYActualizar();
    });
  });
}

function guardarYActualizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

renderizarCarrito();
