import mockData from './mock-data';

// Function to check the token's validity
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

// Function to exchange the authorization code for an access token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://ewtzdk5hid.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode // Replace with your actual endpoint
  );
  const { access_token } = await response.json();
  if (access_token) {
    localStorage.setItem("access_token", access_token);
  }
  return access_token;
};

// Function to remove query parameters from the URL
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// Function to retrieve or validate the access token
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://ewtzdk5hid.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url" // Replace with your actual endpoint
      );
      const result = await response.json();
      const { authUrl } = result;
      window.location.href = authUrl;
      return null; // Prevent further execution
    }
    return code && getToken(code);
  }
  return accessToken;
};

// Updated getEvents function
// Updated getEvents function with offline support
export const getEvents = async () => {
  // Check network status
  if (!navigator.onLine) {
    const storedEvents = localStorage.getItem("lastEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  // Existing code for online mode:
  // Mock data for localhost
  if (window.location.href.startsWith("http://localhost")) {
    // Ensure mockData is treated as an array
    return Array.isArray(mockData) ? mockData : [mockData];
  }

  // Get or refresh the access token
  const token = await getAccessToken();
  if (!token) {
    // If no token is found, return an empty array
    return [];
  }

  try {
    // Attempt to fetch events with the token
    removeQuery();
    const url = `https://ewtzdk5hid.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`; // Ensure this matches your actual endpoint structure
    const response = await fetch(url);
    const result = await response.json();
    if (result && result.events) {
      // Save the events to localStorage for offline use
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      // Check if 'events' in result is an array and return it
      return Array.isArray(result.events) ? result.events : [];
    } else {
      // Return an empty array if no events found
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    // Return an empty array in case of any errors during fetch
    return [];
  }
};


// Function to extract locations from events
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};
