import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import PostsCrud from './components/PostsCrud/PostsCrud.jsx';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/counterSlice';
import { loginUser, registerUser } from './store/authSlice';
import { addTodo, deleteTodo, toggleTodo, updateTodo } from './store/todoSlice';

// ====================== 1. ДЕТАЛИ НОВОГО TODO (Redux) ======================
function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = useSelector(state => state.todos.todos.find(t => t.id === parseInt(id)));

  if (!todo) return <div style={{ padding: '100px', textAlign: 'center' }}><h3>Задача не найдена</h3><button onClick={() => navigate('/')}>Назад</button></div>;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← Назад</button>
      <h2>{todo.title}</h2>
      <p><strong>Статус:</strong> {todo.completed ? '✅ Выполнено' : '⏳ В процессе'}</p>
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
        {todo.description || 'Описание отсутствует'}
      </div>
    </div>
  );
}

// ====================== 2. КОМПОНЕНТ НОВОГО TODO (CRUD) ======================
function NewTodoCRUD() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (editingId) {
      dispatch(updateTodo({ id: editingId, title, description: desc }));
      setEditingId(null);
    } else {
      dispatch(addTodo({ title, description: desc }));
    }
    setTitle(''); setDesc('');
  };

  return (
    <section style={{ marginBottom: '5rem', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', color: '#007bff' }}>ToDo Вариант 2 (Redux CRUD + Описание)</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <textarea placeholder="Описание" value={desc} onChange={(e) => setDesc(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <button type="submit" style={{ padding: '10px', background: editingId ? '#ffc107' : '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          {editingId ? 'Сохранить изменения' : 'Создать задачу'}
        </button>
      </form>

      {todos.map(todo => (
        <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }}>
          <div>
            <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
            <Link to={`/todo/${todo.id}`} style={{ marginLeft: '10px', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
              {todo.title} <span style={{ fontSize: '0.8rem', color: '#999' }}>(детали)</span>
            </Link>
          </div>
          <div>
            <button onClick={() => { setEditingId(todo.id); setTitle(todo.title); setDesc(todo.description); }}>✏️</button>
            <button onClick={() => dispatch(deleteTodo(todo.id))} style={{ color: 'red', marginLeft: '5px' }}>🗑️</button>
          </div>
        </div>
      ))}
    </section>
  );
}

// ====================== 3. ГЛАВНАЯ СТРАНИЦА ======================
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [oldTodos, setOldTodos] = useState([]); // Старые ToDo из API
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, todosRes, usersRes] = await Promise.all([
          axios.get('https://dummyjson.com/posts?limit=4'),
          axios.get('https://dummyjson.com/todos?limit=5'),
          axios.get('https://jsonplaceholder.typicode.com/users'),
        ]);
        setPosts(postsRes.data.posts);
        setOldTodos(todosRes.data.todos);
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Загрузка всех модулей...</div>;

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Портал Лабораторных Работ</h1>

      {/* НОВЫЙ TODO (Вариант с Redux CRUD) */}
      <NewTodoCRUD />

      {/* СТАРЫЙ TODO (Вариант из API DummyJSON) */}
      <section style={{ marginBottom: '5rem', opacity: 0.8 }}>
        <h2 style={{ textAlign: 'center' }}>ToDo Вариант 1 (Статичный из API)</h2>
        <div style={{ background: '#eee', padding: '20px', borderRadius: '10px' }}>
          {oldTodos.map(t => (
            <div key={t.id} style={{ padding: '5px 0' }}>
              <input type="checkbox" checked={t.completed} readOnly /> {t.todo}
            </div>
          ))}
        </div>
      </section>

      {/* ПОЛЬЗОВАТЕЛИ (List/Detail) */}
      <section id="users-section" style={{ marginBottom: '5rem' }}>
        <h2 style={{ textAlign: 'center' }}>Пользователи (List/Detail)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {users.map(u => (
              <div key={u.id} onClick={() => setSelectedUser(u)} style={{ padding: '10px', border: '1px solid #ddd', cursor: 'pointer', background: selectedUser?.id === u.id ? '#e7f3ff' : 'white' }}>
                {u.name}
              </div>
            ))}
          </div>
          <div style={{ padding: '20px', border: '1px solid #007bff', background: '#f0f8ff' }}>
            {selectedUser ? (
              <div><h3>{selectedUser.name}</h3><p>{selectedUser.email}</p><p>{selectedUser.phone}</p></div>
            ) : "Выберите пользователя"}
          </div>
        </div>
      </section>

      {/* CRUD ПОСТОВ (RTK Query) */}
      <section style={{ borderTop: '2px solid #ddd', paddingTop: '2rem' }}>
        <h2 style={{ textAlign: 'center' }}>Посты (RTK Query CRUD)</h2>
        <PostsCrud />
      </section>
    </>
  );
}

// ====================== 4. ОСТАЛЬНЫЕ СТРАНИЦЫ ======================
// (Функции LoginPage, RegisterPage, CounterPage остаются такими же, как в вашем коде)
function LoginPage() { /* ... код из вашего примера ... */ }
function RegisterPage() { /* ... код из вашего примера ... */ }
function CounterPage() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div style={{ textAlign: 'center', padding: '5rem' }}>
      <h1>Счётчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
}
function AboutPage() { return <h1 style={{ textAlign: 'center', padding: '5rem' }}>О проекте</h1>; }

// ====================== 5. ГЛАВНЫЙ APP ======================
function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fa' }}>
      <Header />
      <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/todo/:id" element={<TodoDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;