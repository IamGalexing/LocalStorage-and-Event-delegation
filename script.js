const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const deleteButton = document.querySelector(".delte-item");
const items = JSON.parse(localStorage.getItem("items")) || [];

if (items.length) populateItems(items, itemsList);

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", handleListItem);

function addItem(e) {
  e.preventDefault();

  const text = this.querySelector('[name="item"]').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateItems(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateItems(items = [], itemsList) {
  itemsList.innerHTML = items
    .map((item, index) => {
      return `
    <li>
    <input type="checkbox" id="item${index}" data-index="${index}" ${
        item.done ? "checked" : ""
      } />
  <label for="item${index}">${item.text}</label>
   <button class="delete-item" data-index="${index}">✖</button>
    </li>
    `;
    })
    .join("");
}

function handleListItem(e) {
  if (e.target.matches("input")) return toggleDone(e);
  if (e.target.matches("button.delete-item")) return deleteItem(e);
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;

  const elementIndex = e.target.dataset.index;

  console.log(items[elementIndex].done);

  items[elementIndex].done = !items[elementIndex].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateItems(items, itemsList);
}

function deleteItem(e) {
  const elementIndex = e.target.dataset.index;
  items.splice(elementIndex, 1);

  localStorage.setItem("items", JSON.stringify(items));
  populateItems(items, itemsList);

  if (items.length === 0) itemsList.innerHTML = "<li>Loading Tapas...</li>";
}
