export function lowercaseFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function setFilterLocalStorage(filter) {
  localStorage.setItem("filterValue", filter.value);
  localStorage.setItem("filterLabel", filter.label);
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

// **Nieuw voor je SearchBar:**
export function setSearchLocalStorage(term) {
  if (term && term.trim() !== "") {
    localStorage.setItem("searchTerm", term);
  } else {
    localStorage.removeItem("searchTerm");
  }
}

export function getSearchLocalStorage() {
  const item = localStorage.getItem("searchTerm");
  return item !== null ? item : null;
}

export function setTabLocalStorage(tab) {
  // only persist non-default tabs
  if (tab && tab !== "all") {
    localStorage.setItem("activeTab", tab);
  } else {
    localStorage.removeItem("activeTab");
  }
}

export function getTabLocalStorage() {
  const item = localStorage.getItem("activeTab");
  return item !== null ? item : null;
}

export function setFavoritesLocalStorage(ids) {
  if (Array.isArray(ids) && ids.length > 0) {
    localStorage.setItem("favoriteCourses", JSON.stringify(ids));
  } else {
    localStorage.removeItem("favoriteCourses");
  }
}

export function getFavoritesLocalStorage() {
  const item = localStorage.getItem("favoriteCourses");
  if (!item) return [];
  try {
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}