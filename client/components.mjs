import getApps from './data.mjs';

//function to generate HTML for each application
function generateCategoryHTML(parent, category, newCat) {
  // Create elements
  const cardSection = document.createElement('section');
  const cardTitle = document.createElement('h3');
  const cardText = document.createElement('p');

  // Add classes and content
  cardSection.classList.add('category');
  cardSection.id = newCat;
  cardTitle.classList.add('categoryName');
  cardTitle.textContent = category;
  cardText.textContent = `Click to view further information`;

  // Append elements to parent
  cardSection.appendChild(cardTitle);
  cardSection.appendChild(cardText);
  parent.appendChild(cardSection);
}

// Function to render categories based on search query
export function renderCategories(applicationNames, searchQuery = '') {
  const categoriesContainer = document.querySelector('.categoriesContainer');

  if (!categoriesContainer) {
    console.error('Container for categories not found.');
    return;
  }
  // Clear existing content
  categoriesContainer.innerHTML = '';
  // Filter application names based on search query
  const filteredCategories = applicationNames.filter((appName) =>
    appName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render filtered categories
  if (filteredCategories.length === 0) {
    categoriesContainer.innerHTML = '<p>No results found</p>';
    return;
  } else {
    filteredCategories.forEach(async (category, index) => {
      const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-0-9]/g;
      let newCat = category.replace(regex, '').replace('18', '');
      // const totals = await fetchAppDetails();
      generateCategoryHTML(categoriesContainer, category, newCat);
      const cardBtn = document.querySelector(`#${newCat}`);
      cardBtn.addEventListener('click', async (e) => {
        // Clear existing content
        const totals = {};
        const loadingPara = document.createElement('p');
        loadingPara.textContent = 'Loading...';
        const detailsContainer = document.createElement('div');
        const detailsPara1 = document.createElement('p');
        const detailsPara2 = document.createElement('p');
        const detailsPara3 = document.createElement('p');

        if (cardBtn.childNodes.length === 3) {
          let children = cardBtn.childNodes;
          children[2].remove();
          return;
        }

        // Fetch details for the applications
        try {
          // Loading message

          cardBtn.appendChild(loadingPara);

          const response = await fetch(
            `https://engineering-task.elancoapps.com/api/applications/${encodeURIComponent(
              category
            )}`
          );

          const details = await response.json();

          details.forEach((entry) => {
            const environment = entry.Tags?.environment; // Use optional chaining to handle undefined Tags
            const cost = parseFloat(entry.Cost);

            // Check if environment is defined
            if (environment) {
              // If the environment is not in the totals object, initialize it
              if (!totals[environment]) {
                totals[environment] = 0;
              }
              // Add the cost to the total for the environment
              totals[environment] += Math.round(cost);
            }
          });

          // Render cost details
          detailsPara1.textContent = `Production Cost: ${totals.Production}`;
          detailsPara2.textContent = `Test Cost: ${totals.Test}`;
          detailsPara3.textContent = `Development Cost: ${totals.Development}`;
          detailsContainer.appendChild(detailsPara1);
          detailsContainer.appendChild(detailsPara2);
          detailsContainer.appendChild(detailsPara3);
          cardBtn.removeChild(loadingPara);

          cardBtn.appendChild(detailsContainer);
        } catch (error) {
          cardBtn.removeChild(loadingPara);
          const errorPara = document.createElement('p');
          errorPara.textContent = 'Error fetching details';
          detailsContainer.appendChild(errorPara);
          cardBtn.appendChild(detailsContainer);
          console.log('Error:', error);
        }
      });
    });
  }
}

(async () => {
  // Fetch application names
  const applicationNames = await getApps();

  // Render categories initially
  renderCategories(applicationNames);

  // Add event listener for the search bar
  const searchBar = document.querySelector('.toolSearch');
  searchBar.addEventListener('input', () => {
    const searchQuery = searchBar.value.trim();
    renderCategories(applicationNames, searchQuery);
  });
})();

// GET RESOURCES SECTION
import getResource from './resources.mjs';

function generateResourceHTML(resource) {
  return `
    <section class="resource">
      <h3 class="resourceName">${resource}</h3>
      <p class="">Click to view ${resource}</p>
    </section>
  `;
}

// Function to render resources based on search query
async function renderResources(searchQuery = '') {
  const resNames = await getResource(); // This should fetch resources, not applications
  const resourcesContainer = document.querySelector('.resourcesContainer');

  if (!resourcesContainer) {
    console.error('Container for resources not found.');
    return;
  }
  resourcesContainer.innerHTML = ''; // Clear existing content
  if (resNames.length === 0) {
    resourcesContainer.innerHTML = '<p>No resources found</p>';
    return;
  }
  // Filter resources based on search query
  const filteredResources = resNames.filter((resName) =>
    resName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (filteredResources.length === 0) {
    resourcesContainer.innerHTML = '<p>No matching resources found</p>';
    return;
  }
  filteredResources.forEach((resName) => {
    resourcesContainer.innerHTML += generateResourceHTML(resName);
  });
}

// Initial render without search query
renderResources();

// Add event listener for the search bar
const resSearchBar = document.getElementById('resSearchBar');
resSearchBar.addEventListener('input', () => {
  const searchQuery = resSearchBar.value.trim();
  renderResources(searchQuery);
});
