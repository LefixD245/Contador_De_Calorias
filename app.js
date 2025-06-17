const tableBody = document.getElementById('table-body');
const totalProteinsSpan = document.getElementById('total-proteins');
const totalCaloriesSpan = document.getElementById('total-calories');
const addRowBtn = document.getElementById('add-row');

function addRow(){
  const tr = document.createElement('tr');

  // Alimento dropdown
  const tdFood = document.createElement('td');
  const selectFood = document.createElement('select');
  foods.forEach((food, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = food.name;
    selectFood.appendChild(option);
  });
  tdFood.appendChild(selectFood);
  tr.appendChild(tdFood);

  // Cantidad
  const tdQty = document.createElement('td');
  const inputQty = document.createElement('input');
  inputQty.type = 'number';
  inputQty.min = '0';
  inputQty.value = 100;
  tdQty.appendChild(inputQty);
  tr.appendChild(tdQty);

  // Unidad
  const tdUnit = document.createElement('td');
  const selectUnit = document.createElement('select');
  tdUnit.appendChild(selectUnit);
  tr.appendChild(tdUnit);

  // Proteínas
  const tdProtein = document.createElement('td');
  tdProtein.textContent = '0';
  tr.appendChild(tdProtein);

  // Calorías
  const tdCalories = document.createElement('td');
  tdCalories.textContent = '0';
  tr.appendChild(tdCalories);

  // Botón eliminar
  const tdDelete = document.createElement('td');
  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'X';
  btnDelete.style.backgroundColor = '#e53935';
  btnDelete.style.border = 'none';
  btnDelete.style.color = 'white';
  btnDelete.style.padding = '5px 10px';
  btnDelete.style.borderRadius = '6px';
  btnDelete.style.cursor = 'pointer';
  tdDelete.appendChild(btnDelete);
  tr.appendChild(tdDelete);

  // Actualizar opciones de unidades y cálculo
  function updateUnitsAndCalculations(){
    const food = foods[selectFood.value];
    selectUnit.innerHTML = '';

    // Solo g o ml según food.unitType
    const unit = food.unitType === "ml" ? "ml" : "g";
    const option = document.createElement('option');
    option.value = unit;
    option.textContent = unit;
    selectUnit.appendChild(option);
    selectUnit.value = unit;

    recalc();
  }

  // Recalcular proteínas y calorías
  function recalc(){
    const food = foods[selectFood.value];
    const qty = parseFloat(inputQty.value) || 0;
    const proteinPerUnit = food.proteinPerUnit;
    const caloriesPerUnit = food.caloriesPerUnit;

    const proteinTotal = proteinPerUnit * qty;
    const caloriesTotal = caloriesPerUnit * qty;

    tdProtein.textContent = proteinTotal.toFixed(1);
    tdCalories.textContent = caloriesTotal.toFixed(0);

    updateTotals();
  }

  selectFood.addEventListener('change', updateUnitsAndCalculations);
  inputQty.addEventListener('input', recalc);
  selectUnit.addEventListener('change', recalc);
  btnDelete.addEventListener('click', () => {
    tr.remove();
    updateTotals();
  });

  tableBody.appendChild(tr);
  updateUnitsAndCalculations();
}

function updateTotals(){
  let totalProtein = 0;
  let totalCalories = 0;
  const rows = tableBody.querySelectorAll('tr');
  rows.forEach(row => {
    const p = parseFloat(row.cells[3].textContent) || 0;
    const c = parseFloat(row.cells[4].textContent) || 0;
    totalProtein += p;
    totalCalories += c;
  });
  totalProteinsSpan.textContent = totalProtein.toFixed(1);
  totalCaloriesSpan.textContent = totalCalories.toFixed(0);
}

addRow();

addRowBtn.addEventListener('click', () => {
  addRow();
});
