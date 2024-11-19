// Створити тестовий сценарій за допомогою пекеджу axios.

// Використати безкоштовне і відкрите АПІ - JSONPlaceholder.

// Задача:

// створити 5 запитів за допомогою методів GET, POST
// обов'язково має бути перевірка респонсу - response status, data на коректність згідно з документацією по АПІ

// Додаткове завдання: (не обовʼязкове)

// Назва: Налаштування інтерсепторів

// Складність: середній

// додати логування за допомогою Axios interceptors запитів і респонсів


const axios = require('axios');

// Налаштування axios з інтерсепторами
const apiInterceptor = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Додавання інтерсепторів для логування запитів і відповідей
apiInterceptor.interceptors.request.use(
  (config) => {
    console.log(`[REQUEST]: ${config.method.toUpperCase()} ${config.url}`);
    if (config.data) {
      console.log("Request Data:", config.data);
    }
    if (config.params) {
      console.log("Request Params:", config.params);
    }
    return config;
  },
  (error) => {
    console.error("[REQUEST ERROR]:", error.message);
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  (response) => {
    console.log(`[RESPONSE]: ${response.status} ${response.config.url}`);
    console.log("Response Data:", response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `[RESPONSE ERROR]: ${error.response.status} ${error.config.url}`
      );
      console.error("Response Data:", error.response.data);
    } else {
      console.error("[NETWORK ERROR]:", error.message);
    }
    return Promise.reject(error);
  }
);


describe("JSONPlaceholder API Tests with Logging", () => {
  test("Get all posts list", async () => { 
    const response = await apiInterceptor.get(`/posts`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
});


  test('GET /posts/#id - отримання поста за ID', async () => {
    const response = await apiInterceptor.get(`/posts/1`);
    expect(response.status).toBe(200); // Перевірка статусу респонсу
    expect(response.data).toHaveProperty('id',1); // Перевірка, що ID збігається
    expect(response.data).toHaveProperty('title'); // Перевірка наявності поля title
    expect(response.data).toHaveProperty('body');
    // console.log(response.data);
  });

  test('POST /posts - створення нового поста', async () => {
    const myPost = {
      title: 'My Post',
      body: 'This is a test post.',
      userId: 20,
    };
    const response = await apiInterceptor.post(`/posts`, myPost);
    expect(response.status).toBe(201); // Перевірка статусу респонсу
    expect(response.data).toMatchObject(myPost); // Перевірка, що дані відповідають відправленим
    expect(response.data).toHaveProperty('id'); // Перевірка, що є новий ID
    // console.log(response.data);
  });

  test('GET /users/#id - отримання користувача за ID', async () => {
     const response = await apiInterceptor.get(`/users/1`);
    expect(response.status).toBe(200); // Перевірка статусу респонсу
    expect(response.data).toHaveProperty('id', 1); // Перевірка, що ID збігається
    expect(response.data).toHaveProperty('name'); // Перевірка наявності поля title
    expect(response.data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    // console.log(response.data);
  });

  test('POST /posts - створення нового коментарія', async () => {
    const myComment = {
      name: 'Kateryna',
      email: 'k@gmail.com',
      body: "Test comment",
      postId: 1,
    };
    const response = await apiInterceptor.post(`/comments`, myComment);
    expect(response.status).toBe(201); // Перевірка статусу респонсу
    expect(response.data).toMatchObject(myComment); // Перевірка, що дані відповідають відправленим
    expect(response.data).toHaveProperty('id'); // Перевірка, що є новий ID
    // console.log(response.data);
  });
});


  
