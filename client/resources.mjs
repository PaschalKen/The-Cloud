//GET RESOURCES SECTION

const resourcesPath = 'https://engineering-task.elancoapps.com/api/resources';

export default async function getResource() {
  try {
    const response = await fetch(resourcesPath);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch application names: ${response.statusText}`
      );
    }
    const resourceNames = await response.json();
    return Array.isArray(resourceNames) ? resourceNames : [];
    // console.log(resourceNames);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

//GET RESOURCE DETAILS SECTION
// async function getResourceDetails(resourceName) {       
//     try {
//         const response = await fetch(`${resourcesPath}/${encodeURIComponent(resourceName)}`);
//         if (!response.ok) {
//         throw new Error(
//             `Failed to fetch details for ${resourceName}: ${response.statusText}`
//         );
//         }
//         const resourceDetails = await response.json();
//         return resourceDetails;
//         // console.log(resourceDetails);
//     } catch (error) {
//         console.error(`Error fetching details for ${resourceName}:`, error);
//         throw error; // Re-throw the error to propagate it to the caller
//     }
//     }


// async function fetchResourceDetails() {
//     const resNames = await getResource();

//     // console.log(resNames);
  
//     // Loop through each app name and fetch details
//     for (const resName of resNames) {
//       try {
//         const details = await getResourceDetails(resName);
//         return details;
//         // console.log(details);
//       } catch (error) {
//         // Handle error for each app if needed
//         console.error(`Error fetching details for ${resName}:`, error.message);
//       }
//     }
//   }

// fetchResourceDetails();