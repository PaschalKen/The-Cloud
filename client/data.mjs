
const path = 'https://engineering-task.elancoapps.com/api/applications';

// Fetch application names
export default async function getApps() {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch application names: ${response.statusText}`
      );
    }
    const applicationNames = await response.json();
    return Array.isArray(applicationNames) ? applicationNames : [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// export async function getAppDetails(appName) {
//   try {
//     const response = await fetch(`${path}/${encodeURIComponent(appName)}`);
//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch details for ${appName}: ${response.statusText}`
//       );
//     }
//     const applicationDetails = await response.json();
//     return applicationDetails;
//   } catch (error) {
//     console.error(`Error fetching details for ${appName}:`, error);
//     throw error; // Re-throw the error to propagate it to the caller
//   }
// }

// export async function fetchAppDetails() {
//   const appNames = await getApps();
//   // Loop through each app name and fetch details
//   for (const appName of appNames) {
//     try {
//       const details = await getAppDetails(appName);
//       return details;
//     } catch (error) {
//       // Handle error for each app if needed
//       console.error(`Error fetching details for ${appName}:`, error.message);
//     }
//   }
// }

// // Call the function to initiate the process
// fetchAppDetails();




