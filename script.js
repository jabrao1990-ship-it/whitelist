const STORAGE_KEY = "family-whitelist-wishes";

const form = document.getElementById("wishlist-form");
const nameInput = document.getElementById("name");
const wishInput = document.getElementById("wish");
const list = document.getElementById("wishes-list");
const emptyState = document.getElementById("empty-state");
const clearAllButton = document.getElementById("clear-all");

function loadWishes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveWishes(wishes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function renderWishes() {
  const wishes = loadWishes();
  list.innerHTML = "";

  wishes.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "wish-item";
    item.innerHTML = `<strong>${entry.name}</strong> quer ganhar: ${entry.wish}`;
    list.appendChild(item);
  });

  emptyState.style.display = wishes.length ? "none" : "block";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const wish = wishInput.value.trim();
  if (!name || !wish) return;

  const wishes = loadWishes();
  wishes.unshift({ name, wish });
  saveWishes(wishes);

  form.reset();
  renderWishes();
});

clearAllButton.addEventListener("click", () => {
  const confirmed = window.confirm("Tem certeza que deseja apagar todos os desejos?");
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  renderWishes();
});

renderWishes();
