// servers must allow CORS requests for these urls to work
const custBaseURL = 'http://localhost:8080/api/customers';
const eventsBaseURL = 'http://localhost:8080/api/events';
const registrationsBaseURL = 'http://localhost:8080/api/registrations';
const authBaseUrl = 'http://localhost:8081/account';

let token = null;
/* CUSTOMER REQUESTS */

let getHeaders = (token) => {   
  const myHeaders = new Headers({ "Content-Type": "application/json" });
  myHeaders.append('Access-Control-Allow-Origin', '*');
  if (token != null && token !== undefined) {
    myHeaders.append("Authorization", "Bearer " + token)
  }
  return myHeaders;
}

export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors',
    headers: getHeaders(token)
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert(error);
    }
  }
  fetchData(custBaseURL);
}

export async function deleteById(id, postopCallback) {
  const myInit = {
    method: 'DELETE',
    mode: 'cors',
    headers: getHeaders(token)
  };
  const deleteItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error deleting data: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  deleteItem(custBaseURL + "/" + id);
}

export function post(customer, postopCallback) {
  delete customer.id;
  const myInit = {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: getHeaders(token),
    mode: 'cors'
  };
  const postItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error posting data: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  postItem(custBaseURL);
}

export function put(customer, postopCallback) {
  const myInit = {
    method: 'PUT',
    body: JSON.stringify(customer),
    headers: getHeaders(token),
    mode: 'cors'
  };
  const putItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error puting data: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  putItem(custBaseURL + "/" + customer.id);
}

export function lookupCustomerByName(username) {
  var myInit = {
    method: 'POST',
    body: username,
    headers: getHeaders(token),
    mode: 'cors'
  };
  const lookupCustomer = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error looking up customer: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      alert(error);
    }
  };
  lookupCustomer(custBaseURL + "/byname");
}


/* LOGIN REQUESTS */
export async function registerUser( username, password, email) {
  let url = authBaseUrl +"/register";
  let customer = {
    name: username,
    email: email,
    password: password
  }
  let body = JSON.stringify(customer);
  var myInit = {
    method: 'POST',
    body: body,
    headers: getHeaders(token),
    mode: 'cors'
  };
  try {
    console.log("Registering user with body: " + body);
    const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error registering user: ${response.status}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    alert(error);
  }
}

export function callTokenService(customer) {
  let url = authBaseUrl +"/token";
  let body = JSON.stringify(customer);
  console.log("Calling token service with body: " + body);
  var myInit = {
    method: 'POST',
    body: body,
    headers: getHeaders(token),
    mode: 'cors'
  };
  let promise = fetch(url, myInit);
  return promise;
}


export async function getJWTToken(username, password) {
  let customer = { "name": username, password };

  const response = await callTokenService(customer);
  token = await response.text();

  if (!response.ok) {
    return { "status": "error", "message": "Login failed: " + response.status };
  }
  return { "status": "success", "message": "Login successful", "token": token };
}

/* EVENTS REQUESTS */
export async function getAllEvents(setEvents) {
  const myInit = {
    method: 'GET',
    mode: 'cors',
    headers: getHeaders(token)
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      alert(error);
    }
  }
  fetchData(eventsBaseURL);
}

export async function deleteEventById(id, postopCallback) {
  const myInit = {
    method: 'DELETE',
    mode: 'cors',
    headers: getHeaders(token)
  };
  const deleteItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error deleting event: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  deleteItem(eventsBaseURL + "/" + id);
}

export function postEvent(event, postopCallback) {
  delete event.id;
  const myInit = {
    method: 'POST',
    body: JSON.stringify(event),
    headers: getHeaders(token),
    mode: 'cors'
  };
  const postItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error posting event: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  postItem(eventsBaseURL);
}

export function putEvent(event, postopCallback) {
  const myInit = {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: getHeaders(token),
    mode: 'cors'
  };
  const putItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error updating event: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  putItem(eventsBaseURL + "/" + event.id);
}

/* REGISTRATIONS REQUESTS */
export async function getAllRegistrations(setRegistrations) {
  const myInit = {
    method: 'GET',
    mode: 'cors',
    headers: getHeaders(token)
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching registrations: ${response.status}`);
      }
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      alert(error);
    }
  }
  fetchData(registrationsBaseURL);
}

export async function getRegistrationsByCustomer(customerId, setRegistrations) {
  const myInit = {
    method: 'GET',
    mode: 'cors',
    headers: getHeaders(token)
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching customer registrations: ${response.status}`);
      }
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      alert(error);
    }
  }
  fetchData(registrationsBaseURL + "/customer/" + customerId);
}

export async function deleteRegistrationById(id, postopCallback) {
  const myInit = {
    method: 'DELETE',
    mode: 'cors',
    headers: getHeaders(token)
  };
  const deleteItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error deleting registration: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  deleteItem(registrationsBaseURL + "/" + id);
}

export function postRegistration(registration, postopCallback) {
  delete registration.id;
  const myInit = {
    method: 'POST',
    body: JSON.stringify(registration),
    headers: getHeaders(token),
    mode: 'cors'
  };
  const postItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error posting registration: ${response.status}`);
      }
      postopCallback();
    } catch (error) {
      alert(error);
    }
  }
  postItem(registrationsBaseURL);
}

export async function checkRegistration(customerId, eventId) {
  const myInit = {
    method: 'GET',
    mode: 'cors',
    headers: getHeaders(token)
  };
  try {
    const response = await fetch(registrationsBaseURL + "/check/" + customerId + "/" + eventId, myInit);
    if (!response.ok) {
      throw new Error(`Error checking registration: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    alert(error);
    return false;
  }
}


