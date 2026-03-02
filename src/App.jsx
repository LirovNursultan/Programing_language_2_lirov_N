import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import PostsCrud from './components/PostsCrud/PostsCrud.jsx';

// Счётчик из первой лабы
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/counterSlice';

function CounterPage() {
  const count = useSelector(state => state.counter.value);
  const message = useSelector(state => state.counter.message);
  const dispatch = useDispatch();

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '6rem 2rem',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1>Счётчик (Redux) — Лабораторная 1</h1>
      <h2 style={{ color: '#007bff', margin: '1.5rem 0' }}>{message}</h2>
      
      <p style={{ 
        fontSize: '8rem', 
        fontWeight: 'bold', 
        margin: '2rem 0',
        color: count >= 0 ? '#28a745' : '#dc3545'
      }}>
        {count}
      </p>

      <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
        <button
          onClick={() => dispatch(increment())}
          style={{
            padding: '1.2rem 4rem',
            fontSize: '2rem',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
          }}
        >
          +1
        </button>

        <button
          onClick={() => dispatch(decrement())}
          style={{
            padding: '1.2rem 4rem',
            fontSize: '2rem',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
          }}
        >
          -1
        </button>
      </div>
    </div>
  );
}

function TodoPage() {
  return (
    <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
      <h1>TODO List</h1>
      <p>Этот раздел будет реализован позже</p>
    </div>
  );
}

function UsersApiPage() {
  return (
    <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
      <h1>Пользователи (API)</h1>
      <p>Расширенная страница пользователей</p>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>О проекте</h1>
      <p>Учебный проект по React + Redux + RTK Query</p>
      <p>Курс «Языки программирования II»</p>
      <ul style={{ textAlign: 'left', margin: '2rem 0', lineHeight: '1.8' }}>
        <li>Счётчик на Redux Toolkit</li>
        <li>Навигация react-router-dom</li>
        <li>Загрузка данных из DummyJSON и JSONPlaceholder</li>
        <li>List / Detail для пользователей</li>
        <li>CRUD постов с оптимистичными обновлениями</li>
      </ul>
    </div>
  );
}

// Главная страница
function HomePage() {
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
          axios.get('https://jsonplaceholder.typicode.com/users'),
        ]);

        setPosts(postsRes.data.posts || []);
        setTodos(todosRes.data.todos || []);
        setUsers(usersRes.data || []);
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
    setSelectedUser(user?.id === selectedUser?.id ? null : user);
  };

  if (loading) {
    return (
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '2rem',
        color: '#007bff',
        padding: '6rem 1rem'
      }}>
        Загрузка данных... (имитация задержки)
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        flex: 1, 
        textAlign: 'center', 
        padding: '8rem 1rem',
        color: '#dc3545',
        fontSize: '1.5rem'
      }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '3.5rem', fontSize: '2.8rem' }}>
        Главная страница — React + Redux проект
      </h1>

      {/* Посты */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Последние посты</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.8rem' }}>
          {posts.map(post => (
            <div key={post.id} style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '1.4rem',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ marginTop: 0, fontSize: '1.4rem' }}>{post.title}</h3>
              <p style={{ color: '#555' }}>{post.body.substring(0, 140)}...</p>
              <small style={{ color: '#888' }}>Автор ID: {post.userId}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Задачи */}
      <section id="todo-section" style={{ marginBottom: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Задачи (ToDo)</h2>
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: '700px', margin: '0 auto' }}>
          {todos.map(todo => (
            <li key={todo.id} style={{
              padding: '1rem',
              borderBottom: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              background: 'white',
              marginBottom: '0.8rem',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}>
              <input type="checkbox" checked={todo.completed} readOnly style={{ width: '20px', height: '20px' }} />
              <span style={{ 
                fontSize: '1.1rem',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#6c757d' : '#212529'
              }}>
                {todo.todo}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Пользователи */}
      <section id="users-section" style={{ marginBottom: '6rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Пользователи (List / Detail)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {users.map(user => (
                <li 
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  style={{
                    padding: '1.2rem',
                    border: '1px solid #ccc',
                    marginBottom: '1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: selectedUser?.id === user.id ? '#e7f3ff' : 'white',
                    transition: 'background 0.3s, transform 0.2s',
                    transform: selectedUser?.id === user.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <strong style={{ fontSize: '1.2rem' }}>{user.name}</strong><br />
                  <small style={{ color: '#555' }}>{user.email} • {user.company.name}</small>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {selectedUser ? (
              <div style={{
                border: '1px solid #007bff',
                borderRadius: '10px',
                padding: '1.8rem',
                background: '#f0f8ff',
                boxShadow: '0 4px 12px rgba(0,123,255,0.15)'
              }}>
                <h3 style={{ marginTop: 0 }}>{selectedUser.name}</h3>
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Телефон:</strong> {selectedUser.phone}</p>
                <p><strong>Компания:</strong> {selectedUser.company.name}</p>
                <p><strong>Сайт:</strong> <a href={`https://${selectedUser.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>{selectedUser.website}</a></p>
                <p><strong>Адрес:</strong> {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.zipcode}</p>
                <button 
                  onClick={() => setSelectedUser(null)}
                  style={{ 
                    marginTop: '1.5rem', 
                    padding: '0.8rem 1.6rem', 
                    background: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <div style={{ 
                padding: '2rem', 
                background: '#f8f9fa', 
                borderRadius: '10px', 
                textAlign: 'center',
                color: '#666',
                fontStyle: 'italic'
              }}>
                Выберите пользователя из списка слева
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CRUD */}
      <section style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '3px solid #dee2e6' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>CRUD Постов (лабораторная 4)</h2>
        <PostsCrud />
      </section>
    </>
  );
}

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fa' }}>
      <Header />

      <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/users" element={<UsersApiPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;