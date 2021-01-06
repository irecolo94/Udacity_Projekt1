// global const:

const navbar = document.getElementById("navbar_content");
// console.log(navbar);

const secs = document.querySelectorAll("section");
// console.log(secs);

// dynamic navigation: 
secs.forEach(function(section) {
    const secId = section.id;
    const secMenuName = section.dataset.menuname;
    navbar.innerHTML += '<li class="nav_item">' + '<a data-page="' + secMenuName + '" href="#' + secId + '">' + '<h4>' + secMenuName + '</h4>' + '</a>' + '</li>';
  });
