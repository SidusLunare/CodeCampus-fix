export function lowercaseFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function setFilterLocalStorage(x) {
  localStorage.setItem("filterValue", x.value);
  localStorage.setItem("filterLabel", x.label);
}

export function getFilterLocalStorage() {
  const filter = {
    value: localStorage.getItem("filterValue"),
    label: localStorage.getItem("filterLabel"),
  };
  if (filter.value === null && filter.label === null) {
    return null;
  }

  return { filter };
}

export function setCategoryLocalStorage(cats) {
  if (Array.isArray(cats) && cats.length > 0) {
    localStorage.setItem("selectedCategories", JSON.stringify(cats));
  } else {
    localStorage.removeItem("selectedCategories");
  }
}

export function getCategoryLocalStorage() {
  const item = localStorage.getItem("selectedCategories");
  if (!item) return null;
  try {
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
