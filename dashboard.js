  let orders = JSON.parse(localStorage.getItem("orders") || "[]");

  function toggleForm(edit = false) {
    const form = document.getElementById("newOrderSection");
    form.style.display = form.style.display === "none" || !edit ? "block" : "none";
    if (!edit) {
      document.getElementById("orderForm")?.reset?.();
      document.getElementById("editIndex").value = "";
      document.getElementById("formTitle").innerText = "New Order";
    }
  }

  function placeOrder(e) {
    e.preventDefault();
    let product = document.getElementById("product").value;
    let qty = document.getElementById("qty").value;
    let date = new Date().toISOString().slice(0, 10);
    let index = document.getElementById("editIndex").value;

    if (index === "") {

      orders.push({ product, qty, date, salesman: "John Doe" });
    } else {

      orders[index].product = product;
      orders[index].qty = qty;

    }

    localStorage.setItem("orders", JSON.stringify(orders));
    e.target.reset();
    toggleForm();
    showOrders();
  }

  function deleteOrder(index) {
    if (confirm("Delete this order?")) {
      orders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(orders));
      showOrders();
    }
  }

  function editOrder(index) {
    let order = orders[index];
    document.getElementById("product").value = order.product;
    document.getElementById("qty").value = order.qty;
    document.getElementById("editIndex").value = index;
    document.getElementById("formTitle").innerText = "Edit Order";
    toggleForm(true);
  }

  function showOrders() {
    let tbody = document.getElementById("orders");
    let total = 0;
    tbody.innerHTML = "";
    orders.forEach((o, i) => {
      if (o.salesman === "John Doe") {
        tbody.innerHTML += `
          <tr>
            <td>${o.product}</td>
            <td>${o.qty}</td>
            <td>${o.date}</td>
            <td>
              <button onclick="editOrder(${i})">Edit</button>
              <button onclick="deleteOrder(${i})">Delete</button>
            </td>
          </tr>
        `;
        total++;
      }
    });
    document.getElementById("totalOrders").innerText = total;
  }

  showOrders();





function showTopProducts() {
  const productTotals = {}; 

  for (let order of orders) {
    const product = order.product;
    const qty = parseInt(order.qty);

    if (product in productTotals) {
      productTotals[product] += qty;
    } else {
      productTotals[product] = qty;
    }
  }

  const tbody = document.getElementById("topProducts");
  tbody.innerHTML = "";

  for (let product in productTotals) {
    tbody.innerHTML += `
      <tr>
        <td>${product}</td>
        <td>${productTotals[product]}</td>
      </tr>
    `;
  }
}
showTopProducts();
showOrders();
showTopProducts();



function showRecentOrders() {
  const tbody = document.getElementById("recentOrders");
  tbody.innerHTML = "";


  const sorted = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));


  const recent = sorted.slice(0, 5);


  for (let order of recent) {
    tbody.innerHTML += `
      <tr>
        <td>${order.product}</td>
        <td>${order.qty}</td>
        <td>${order.date}</td>
        <td>${order.salesman}</td>
      </tr>
    `;
  }
}



showOrders();
 showTopProducts();
  showRecentOrders();
















