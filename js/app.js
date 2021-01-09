// **GLOBAL CONST DEFINITION:**
const navbar = document.getElementById("navbar_content");
const navID = document.getElementById("nav");
const secs = document.querySelectorAll("section");

// consts for the bar animation:
const active2 = document.querySelector(".active2");
const colors = ["#FDF0E3", "#EBF4EC", "#F5F7F9"]; // orange, green, lightgrey

// **DYNAMIC NAVIGATION**
secs.forEach((section) => {
  const secId = section.id;
  const secMenuName = section.dataset.menuname;
  const secClass = section.classList[0];
  navbar.innerHTML += '<li class="nav_item">' + '<a data-page="' + secMenuName + '" ' + 'data-sectionclass ="' + secClass + '" href="#' + secId + '">' + '<h4>' + secMenuName + '</h4>' + '</a>' + '</li>';
});

// **MARK ITEMS AS ACTIVE IF YOU CLICK ON THEM**
//consts for active clicked items
const navbarItems = navbar.querySelectorAll("li");
const alreadyActive = document.getElementsByClassName("activebox");

navbarItems.forEach(item => {
  item.addEventListener('click', () => {
    alreadyActive[0].classList.toggle("activebox");
    item.classList.add("activebox");
  });
});

//**SCROLLDOWN FUNCTION**
//consts for scrolldown function
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

// ** ACTIVE STATES FOR BAR AND SECS IF SEC IS IN VIEWPORT
function detectGo() {
  const detectCustom = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  // create an intersection observe which observes if section is in viewport
  let observer = new IntersectionObserver(detectNav, detectCustom);

  function detectNav(items) {
    items.forEach(item => {
      const sectionClass = item.target.classList[0];
      const corrAnchor = document.querySelector(`[data-sectionclass = ${sectionClass}]`); //detects which one is the corrisponding anchor
      const colorsIndex = item.target.getAttribute('data-index'); //used for giving the div the colors of the section
      const position = corrAnchor.getBoundingClientRect();
      const aim = {
        x: position.x,
        y: position.y,
        height: position.height,
        width: position.width,
        top: position.top,
        left: position.left
      };
      console.log(aim);
      if (item.isIntersecting) {
        active2.style.setProperty('left', `${aim.left}px`);
        active2.style.setProperty('top', `${aim.top}px`);
        active2.style.setProperty('width', `${aim.width}px`);
        active2.style.setProperty('height', `${aim.height}px`);
        active2.style.setProperty('x', `${aim.x}px`);
        active2.style.setProperty('y', `${aim.y}px`);
        active2.style.setProperty('background', colors[colorsIndex]);
        console.log(sectionClass);
        const elmn = document.querySelector(`.${sectionClass}`);
        activeSection(elmn);
        const secPosition = elmn.getBoundingClientRect();
        console.log(secPosition);
      };
    });
  };

  secs.forEach(sec => {
    observer.observe(sec);
  });

  // detect if a section is active in viewport
  const sectionViewed = document.getElementsByClassName("active-class");

  function activeSection(sec) {
    sectionViewed[0].classList.toggle("active-class");
    sec.classList.add("active-class");
  };
};
detectGo();

// ** MAKE SECTIONS COLLAPSIBLE
secs.forEach((section) => {
  const collApse = section.querySelector(".collapse");
  console.log(collApse);
  collApse.addEventListener('click', () => {
    if (collApse.innerHTML === "++") {
      collApse.innerHTML = "--"
    } else if (collApse.innerHTML === "--") {
      collApse.innerHTML = "++"
    }
    // console.log(collText);
    // collText = "";
    subSection = section.querySelector(".actual-content");
    console.log(subSection);
    subSection.classList.toggle("collapsed");
  });
});

// ** CREATES A BUTTON TO GO UP TO PAGE TOP
const topBut = document.getElementById("go-top");
window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    topBut.style = "display: block;";
  } else {
    topBut.style = "display: none;";
  }
};


//** ADD AN EVENT WHICH DETECTS IF USER IS SCROLLING
let scrollTimer = "";

function changeBarBe() {
  document.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    navID.style = "position: sticky; top: 0px;";
    scrollTimer = setTimeout(changeStyle, 1000);
  });
};

document.addEventListener('mousemove', (event) => {
  if (event.pageY > 75) {
    navID.style = "position: sticky; top: 0px;";
  }
});

function changeStyle() {
  navID.style = "";
  active2.style = ""; // this is something I need for later on, where I track active states of the thing
};

changeBarBe();
