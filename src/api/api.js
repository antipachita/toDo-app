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

  getUsers = async (login) => {
    const response = await fetch(`${this.baseUrl}users`, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Credentials': 'true'
      },
    });

    if (response.ok) {
       const users = await response.json();  
       const user = users.filter(user => user.username === login);
       
       return user[0];
    }
    console.error(response.status, response.statusText);
    
  };

  updateUser = async (login, name, description, id, column) => {
    console.log(column);
    const response = await fetch(`${this.baseUrl}user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({ login: login, name: name, description: description, id: id, columns: []}),
    });

    if (response.ok) {
      console.log('Информация обновлена');
      return await response.json();  
    }
    console.error(response.status, response.statusText);
  };
}

export const api = new API();