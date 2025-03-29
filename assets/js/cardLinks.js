function changeLinkOnCards(selectors) {
    var boxes = document.querySelectorAll(selectors.join(", "));

    boxes.forEach(function (box) {
        var link = box.querySelector("a");
        if (link) {
            var url = link.getAttribute("href");
            box.addEventListener("click", function () {
                location.href = url;
                link.preventDefault;
            });
            box.classList.add("linkify");
            link.addEventListener("focus", function () {
                box.classList.add("isfocused");
            });
            link.addEventListener("blur", function () {
                box.classList.remove("isfocused");
            });
        }
    });
}
// DOMContentLoaded ensures this runs after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    changeLinkOnCards([
        ".post-grid-item--outter.card-style",
        ".category-card__outer"
      ]);
});