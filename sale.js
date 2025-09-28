  let salesmen = JSON.parse(localStorage.getItem('salesmen') || '[]');
  let editIndex = -1; 


  function showSalesmen() {
    const table = document.getElementById('salesmenTable');

    table.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    `;

    salesmen.forEach((salesman, index) => {
      const row = table.insertRow();
      row.insertCell(0).innerText = salesman.name;
      row.insertCell(1).innerText = salesman.email;
      const actionsCell = row.insertCell(2);

      const editBtn = document.createElement('button');
      editBtn.innerText = 'Edit';
      editBtn.onclick = () => editSalesman(index);
      actionsCell.appendChild(editBtn);


      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.onclick = () => deleteSalesman(index);
      actionsCell.appendChild(deleteBtn);
    });
  }

  document.getElementById('saveButton').onclick = function() {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();

    if (!name || !email) {
      alert('Please enter both name and email.');
      return;
    }

    if (editIndex === -1) {

      salesmen.push({ name, email });
    } else {
   
      salesmen[editIndex] = { name, email };
      editIndex = -1;
    }

    localStorage.setItem('salesmen', JSON.stringify(salesmen));
    clearForm();
    showSalesmen();
  };


  function editSalesman(index) {
    const salesman = salesmen[index];
    document.getElementById('nameInput').value = salesman.name;
    document.getElementById('emailInput').value = salesman.email;
    editIndex = index;
  }


  function deleteSalesman(index) {
    if (confirm('Are you sure you want to delete this salesman?')) {
      salesmen.splice(index, 1);
      localStorage.setItem('salesmen', JSON.stringify(salesmen));
      clearForm();
      showSalesmen();
    }
  }


  function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    editIndex = -1;
  }


  showSalesmen();