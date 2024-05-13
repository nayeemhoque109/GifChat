const API_BASE_URL = "https://daily-choice-cattle.ngrok-free.app";

const fetchWithHeaders = (url, options) => {
  return fetch(url, {
    ...options,
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
  });
};

const createUser = async (userData) => {
  const response = await fetchWithHeaders(`${API_BASE_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
};

const searchUser = async (email) => {
  const response = await fetchWithHeaders(`${API_BASE_URL}/search-user?email=${email}`);
  const data = await response.json();
  return data;
};

const createChannel = async (requestData) => {
  const response = await fetchWithHeaders(`${API_BASE_URL}/channel`, {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
};

const getChannelList = async (email) => {
  const response = await fetchWithHeaders(`${API_BASE_URL}/channel-list?email=${email}`);
  const data = await response.json();
  return data;
};

const sendMessage = async (requestData) => {
  const response = await fetchWithHeaders(`${API_BASE_URL}/message`, {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
};

export const httpManager = {
  createUser,
  searchUser,
  createChannel,
  getChannelList,
  sendMessage,
};
export default httpManager;