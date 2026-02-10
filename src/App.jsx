//import { useSelector, useDispatch } from 'react-redux'
//import { increment, decrement } from './store/counterSlice'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [postsRes, todosRes, usersRes] = await Promise.all([
          axios.get('https://dummyjson.com/posts?limit=6&delay=1200'),
          axios.get('https://dummyjson.com/todos?limit=8&delay=800'),
          axios.get('https://jsonplaceholder.typicode.com/users?delay=1500') // jsonplaceholder delay работает через внешний сервис иногда, но ок
        ]);

        setPosts(postsRes.data.posts);
        setTodos(todosRes.data.todos);
        setUsers(usersRes.data);
      } catch (err) {
        setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user === selectedUser ? null : user); // toggle detail
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '1.8rem', color: '#007bff' }}>Загрузка данных... (имитация задержки)</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, textAlign: 'center', padding: '4rem', color: 'red' }}>
          <h2>{error}</h2>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fa' }}>
      <Header />

      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Лабораторная 3 — Данные из JSON API</h1>

        {/* Блок 1: Посты (карточки) */}
        <section style={{ marginBottom: '4rem' }}>
          <h2>Последние посты</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {posts.map(post => (
              <div key={post.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.2rem',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginTop: 0 }}>{post.title}</h3>
                <p>{post.body.substring(0, 120)}...</p>
                <small>Автор ID: {post.userId}</small>
              </div>
            ))}
          </div>
        </section>

        {/* Блок 2: Задачи (простой список) */}
        <section style={{ marginBottom: '4rem' }}>
          <h2>Задачи (ToDo)</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map(todo => (
              <li key={todo.id} style={{
                padding: '0.8rem',
                borderBottom: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <input type="checkbox" checked={todo.completed} readOnly />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.todo}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Блок 3: Пользователи — LIST + DETAIL */}
        <section>
          <h2>Пользователи (List / Detail)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Список */}
            <div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                  <li 
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    style={{
                      padding: '1rem',
                      border: '1px solid #ccc',
                      marginBottom: '0.8rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: selectedUser?.id === user.id ? '#e7f3ff' : 'white'
                    }}
                  >
                    <strong>{user.name}</strong> <br />
                    <small>{user.email} • {user.company.name}</small>
                  </li>
                ))}
              </ul>
            </div>

            {/* Детали (показываются при клике) */}
            <div>
              {selectedUser ? (
                <div style={{
                  border: '1px solid #007bff',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  background: '#f0f8ff'
                }}>
                  <h3>{selectedUser.name}</h3>
                  <p><strong>Username:</strong> {selectedUser.username}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Телефон:</strong> {selectedUser.phone}</p>
                  <p><strong>Компания:</strong> {selectedUser.company.name}</p>
                  <p><strong>Сайт:</strong> <a href={`https://${selectedUser.website}`} target="_blank">{selectedUser.website}</a></p>
                  <p><strong>Адрес:</strong> {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.zipcode}</p>
                  <button 
                    onClick={() => setSelectedUser(null)}
                    style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>Выберите пользователя из списка слева, чтобы увидеть детали</p>
              )}
            </div>
          </div>
        </section>
      </main>

      {<Footer />}
    </div>
  );
}

export default App;