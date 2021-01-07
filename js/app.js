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

// add active states:
const navbarItems = navbar.querySelectorAll("li");

const alreadyActive = document.getElementsByClassName("activebox");

navbarItems.forEach(item => {
item.addEventListener('click', () => {
  alreadyActive[0].classList.toggle("activebox");
  item.classList.add("activebox");
});
});

// add a scrolldown function

const anchorSelector = 'a[href^="#"]';
const navLinks = navbar.querySelectorAll(anchorSelector);

navLinks.forEach(link => {
  link.addEventListener('click', (f) => {
    f.preventDefault();
    let scrollGetTo =
        document.querySelector(f.currentTarget.hash); // this was needed, since the "this" property does not work with arrow functions
    scrollGetTo.scrollIntoView({
        behavior: 'smooth'
    });
  });
});


// add a stopscrolling event which hides the bar
const navID = document.getElementById('nav');

// let scrollStop = () => {
//   document.addEventListener('scroll', () => {
//     setTimeout(() => {navID.style = "";}, 50)
//   });
// };
