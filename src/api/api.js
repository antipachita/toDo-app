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

  updateUser = async (login, name, description, id) => {
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

  createColumn = async (login, board, column, columnId) => {
    console.log(board)
      const response = await fetch(`${this.baseUrl}column`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ login: login, board: board.id, columnName: column, columnId: columnId}),
    });

    if (response.ok) {
      console.log('Колонка создана');
      return await response.json();  
    }
    console.error(response.status, response.statusText);
  };

  getColumn = async (login, board) => {
     const response = await fetch(`${this.baseUrl}column`, {
       method: "GET",
       headers: {
        'Access-Control-Allow-Credentials': 'true'
      }
    });

    if (response.ok) {
      const columns = await response.json();  
      const boardColumns = columns.filter(column => column.login === login && column.board === board);
      return boardColumns;
    }
    console.error(response.status, response.statusText);
  };

  changeColumn = async (login, board, columnId, task) => {
      const response = await fetch(`${this.baseUrl}chngcolumn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ login: login, board: board.id, columnId: columnId, tasks: task}),
    });

    if (response.ok) {
      console.log('Задача добавлена');
      return await response.json();  
    }
    console.error(response.status, response.statusText);
  };

  deleteTask = async (login, board, columnId, task) => {
    console.log(login, board, columnId, task)
      const response = await fetch(`${this.baseUrl}deltask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ login: login, board: board, columnId: columnId, task: task}),
    });

    if (response.ok) {
      console.log('Задача удалена');
      return await response.json();  
    }
    console.error(response.status, response.statusText);
  };

  async deleteUserColumn(login, board, columnId) {
    const response = await fetch(`${this.baseUrl}deltcolumn`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: login, board: board, columnId: columnId}),
    });
    const data = await response.json();
    return data;
  }

  async deleteUserField(login, boardsId) {
    const response = await fetch(`${this.baseUrl}deleteboard`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: login, boardsId: boardsId}),
    });
    if (response.ok) {
      console.log('Поле удалено');
      return await response.json();  
    }
  }

 
}

export const api = new API();