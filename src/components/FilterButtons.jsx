import { useState } from "react";

export default function FilterButtons(
  categoriesFiltered
) {
  

console.log(categoriesFiltered);
  return (
    <section>
     
      {/* {categoriesFiltered.map((category) => (
        <button
          key={category.id}
          className={activeFilter === category.value ? "active" : ""}
          onClick={() => onChangeFilter(category.id)}
        >
          {category.label}
        </button>
      ))} */}
    </section>
  );
}
