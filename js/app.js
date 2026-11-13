(function () {
  var toggle = document.querySelector(".menu-toggle");
  var sidebar = document.querySelector(".sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  }

  var input = document.querySelector("#search-input");
  var results = document.querySelector("#search-results");
  if (!input || !results || typeof SEARCH_INDEX === "undefined") {
    return;
  }

  function render(items) {
    if (!items.length) {
      results.innerHTML = '<div class="search-empty">Aucun résultat</div>';
      results.classList.add("open");
      return;
    }
    results.innerHTML = items
      .slice(0, 12)
      .map(function (item) {
        return (
          '<a href="' +
          item.url +
          '"><span class="result-title">' +
          item.title +
          '</span><span class="result-page">' +
          item.page +
          "</span></a>"
        );
      })
      .join("");
    results.classList.add("open");
  }

  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    if (!q) {
      results.classList.remove("open");
      results.innerHTML = "";
      return;
    }
    var matches = SEARCH_INDEX.filter(function (item) {
      return item.keywords.toLowerCase().indexOf(q) !== -1;
    });
    render(matches);
  });

  input.addEventListener("focus", function () {
    if (input.value.trim()) {
      results.classList.add("open");
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-wrap")) {
      results.classList.remove("open");
    }
  });
})();
