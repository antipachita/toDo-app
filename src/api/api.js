class API {
  constructor() {
    this.baseUrl = 'http://localhost:5000/auth/';
  }

  createUser = async (userData) => {
    const response = await fetch(`${this.baseUrl}registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return await response.json();  
    }
    console.error(response.status, response.statusText);
    
  };

  loginUser = async (userData) => {
    const response = await fetch(`${this.baseUrl}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return await response.json();  
    }
    console.error(response.status, response.statusText);
  };
}

export const api = new API();