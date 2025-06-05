export function lowercaseFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function setFilterLocalStorage(x) {
    localStorage.setItem("filterValue", x.value)
    localStorage.setItem("filterLabel", x.label)
}

export function getFilterLocalStorage() {
    const filter = {
        value: localStorage.getItem("filterValue"),
        label: localStorage.getItem("filterLabel")
    }
    if (filter.value === null && filter.label === null) {
      return null;
    }

    return { filter };
}