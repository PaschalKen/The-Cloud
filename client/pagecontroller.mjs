const closeMenu = document.querySelector('.closeMenu');
const menuButtonu = document.querySelector('.menuButton');


function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}

closeMenu.addEventListener('click', hideSidebar);
menuButtonu.addEventListener('click', showSidebar);



//control pages
const buttons = document.querySelectorAll('.button');
const buttonArray = [...buttons];
buttonArray[0].classList.add('active');
buttonArray.forEach(function (button) {
  button.addEventListener('click', function () {
    buttonArray.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

const sectionName = document.querySelector('.sectionName');
const appBtn = document.querySelector('#apps');
const resBtn = document.querySelector('#res');
const appSection = document.querySelector('.categoriesContainer');
const resSection = document.querySelector('.resourcesContainer');
const appSearchBar = document.querySelector('.appSearchBar');
const resSearchBar = document.querySelector('#resSearchBar');

function showAppsSection() {
  sectionName.textContent = 'Applications';
  appSection.classList.remove('hide');
  resSection.classList.add('hide');
  resSearchBar.classList.add('hide');
  appSearchBar.classList.remove('hide');
}

appBtn.addEventListener('click', showAppsSection);

function showResSection() {
  sectionName.textContent = 'Resources';
  appSection.classList.add('hide');
  resSection.classList.remove('hide');
  resSearchBar.classList.remove('hide');
  appSearchBar.classList.add('hide');
}

resBtn.addEventListener('click', showResSection);
