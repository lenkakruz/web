const items = document.querySelectorAll(".products-item");

function applyFilter(filter) {
  items.forEach((item) => {
    const type = item.getAttribute("data-type");

    if (type === filter || filter === "all") {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
