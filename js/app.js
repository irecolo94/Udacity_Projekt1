// **GLOBAL CONST DEFINITION:**
const navbar = document.getElementById('navbar_content');
const navID = document.getElementById('nav');
const secs = document.querySelectorAll('section');

// **DYNAMIC NAVIGATION**
function updateNav() {
  // following "let" will be updated with list content
  let list = "";
  // loop over each section to create a corrisponding nav item
  secs.forEach((section) => {
    const secId = section.id;
    const secMenuName = section.dataset.menuname;
    const secClass = section.classList[0];
    const toUpdate = '<li class="nav_item">' + '<a data-page="' + secMenuName + '" ' + 'data-sectionclass ="' + secClass + '" href="#' + secId + '">' + '<h4>' + secMenuName + '</h4>' + '</a>' + '</li>';
    list += toUpdate;
  });
  // update innerHTML with content
  navbar.innerHTML += list;
};

updateNav();

// **MARK ITEMS AS ACTIVE ON NAV IF YOU CLICK ON THEM**
//consts for active clicked items
const navbarItems = navbar.querySelectorAll('li');
const alreadyActive = document.getElementsByClassName('activebox');
// add a black border to the item clicked 
navbarItems.forEach(item => {
  item.addEventListener('click', () => {
    alreadyActive[0].classList.toggle('activebox');
    item.classList.add('activebox');
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
      document.querySelector(f.currentTarget.hash); // this was needed, since the 'this' property does not work with arrow functions
    scrollGetTo.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ** ACTIVE STATES FOR BAR AND SECS IF SEC IS IN VIEWPORT**
// consts for the bar animation:
const colors = ['#FDF0E3', '#EBF4EC', '#F5F7F9']; // orange, green, lightgrey

// add a border to a particular section (which will be active section)
const sectionViewed = document.getElementsByClassName('active-class');

function activeSection(sec) {
  sectionViewed[0].classList.toggle('active-class');
  sec.classList.add('active-class');
};

// function to detect intersection observer
function detectGo() {
  // define the parameters for intersection: section viewed if 50% is in viewport
  const detectCustom = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
  };
  //function to call if intersection meets conditions
  function detectNav(items) {
    items.forEach(item => {
      const sectionClass = item.target.classList[0];
      const corrAnchor = document.querySelector(`[data-sectionclass = ${sectionClass}]`); //detects which one is the corrisponding anchor
      const colorsIndex = item.target.getAttribute('data-index'); //used for giving the div the colors of the section
      if (item.isIntersecting) {
        // change colors of active navbar item to highlight it
        const previousActive = navbar.querySelectorAll('h4');
        previousActive.forEach(head => {
          head.style.setProperty('background-color', 'white')
        });
        const anchorHead = corrAnchor.querySelector('h4');
        anchorHead.style.setProperty('background', colors[colorsIndex]);
        // change class of the active section to highlight it
        const elmn = document.querySelector(`.${sectionClass}`);
        activeSection(elmn);
        // uncomment following to see section position:
        // const secPosition = elmn.getBoundingClientRect();
        // console.log(secPosition);
      };
    });
  };

  // create an intersection observe which observes if section is in viewport
  let observer = new IntersectionObserver(detectNav, detectCustom);

  //observes each sections with section observer
  secs.forEach(sec => {
    observer.observe(sec);
  });

};

detectGo();

// ** MAKE SECTIONS COLLAPSIBLE**
secs.forEach((section) => {
  const collApse = section.querySelector('.collapse');
  collApse.addEventListener('click', () => {
    if (collApse.innerHTML === '++') {
      collApse.innerHTML = '--'
    } else if (collApse.innerHTML === '--') {
      collApse.innerHTML = '++'
    }
    subSection = section.querySelector('.actual-content');
    subSection.classList.toggle('collapsed');
  });
});

// hide two posts in responsive mode for better user experience
const postButton = document.getElementById('button-posts');

postButton.addEventListener('click', () => {
  if (postButton.innerHTML === 'more') {
    postButton.innerHTML = 'less'
  } else if (postButton.innerHTML === 'less') {
    postButton.innerHTML = 'more'
  }
  collPosts = secs[0].querySelectorAll('div[data-collapse = "killme"]');
  collPosts.forEach(post => {
    post.classList.toggle("collapsible-post")
  }); // collPost.classList.toggle('collapsed');
});

// ** CREATES A BUTTON TO GO UP TO PAGE TOP**
const topBut = document.getElementById('go-top');

window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    topBut.style = 'display: inline-block;';
  }
};

//** ADD AN EVENT WHICH DETECTS IF USER IS SCROLLING**
let scrollTimer = '';

function changeStyle() {
  navID.style = '';
};

function changeBarBe() {
  document.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    navID.style = 'position: sticky; top: 0px;';
    scrollTimer = setTimeout(changeStyle, 1000);
  });
};

document.addEventListener('mousemove', (event) => {
  if (event.pageY > 75) {
    navID.style = 'position: sticky; top: 0px;';
  }
});

changeBarBe();
