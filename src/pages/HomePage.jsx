import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTodos } from '../hooks/useTodos';
import { toggleLike, toggleFavorite, addRating } from '../redux/slices/interactionSlice';
import PostsCrud from '../components/PostsCrud/PostsCrud';
import { getAverageRating } from '../utils/helpers';

// ── ToDo секция ──────────────────────────────────────────────────
function TodoSection() {
  const { filteredTodos, filter, searchQuery, add, toggle, update, remove, changeFilter, changeSearch } = useTodos();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (editingId) {
      update({ id: editingId, title, description: desc });
      setEditingId(null);
    } else {
      add({ title, description: desc });
    }
    setTitle(''); setDesc('');
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setTitle(todo.title);
    setDesc(todo.description);
  };

  return (
    <section id="todo-section" style={s.section}>
      <h2 style={s.sectionTitle}>📋 ToDo List (Redux CRUD)</h2>

      {/* Поиск и фильтр */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          placeholder="🔍 Поиск задач..."
          value={searchQuery}
          onChange={(e) => changeSearch(e.target.value)}
          style={{ flex: 1, padding: '9px 14px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '180px' }}
        />
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => changeFilter(f)}
            style={{ padding: '9px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: filter === f ? '#667eea' : '#eee', color: filter === f ? 'white' : '#555', fontWeight: '600' }}
          >
            {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
          </button>
        ))}
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <input
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <textarea
          placeholder="Описание (необязательно)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={2}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none' }}
        />
        <button type="submit" style={{ padding: '10px', background: editingId ? '#ffc107' : '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
          {editingId ? '💾 Сохранить изменения' : '➕ Создать задачу'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setTitle(''); setDesc(''); }}
            style={{ padding: '8px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Отмена
          </button>
        )}
      </form>

      {/* Список */}
      {filteredTodos.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#aaa', padding: '2rem' }}>😶 Задачи не найдены</div>
      ) : (
        filteredTodos.map((todo) => (
          <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: todo.completed ? '#f9fff9' : 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo.id)} />
              <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none', color: '#333', fontWeight: '500', textDecorationLine: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => startEdit(todo)} style={s.iconBtn}>✏️</button>
              <button onClick={() => remove(todo.id)} style={s.iconBtn}>🗑️</button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

// ── Пользователи секция ──────────────────────────────────────────
function UsersSection({ users, loading }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>⏳ Загрузка пользователей...</div>;

  return (
    <section id="users-section" style={s.section}>
      <h2 style={s.sectionTitle}>👥 Пользователи</h2>
      <input
        placeholder="🔍 Поиск по имени или email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '9px 14px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '1rem', boxSizing: 'border-box' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ maxHeight: '360px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '1rem', color: '#aaa', textAlign: 'center' }}>Не найдено</div>
          ) : filtered.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelectedUser(u)}
              style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f5f5f5', background: selectedUser?.id === u.id ? '#eef0ff' : 'white', transition: 'background 0.2s' }}
            >
              <div style={{ fontWeight: '600' }}>{u.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>{u.email}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '10px', background: '#f8f9fa' }}>
          {selectedUser ? (
            <>
              <h3 style={{ margin: '0 0 1rem', color: '#333' }}>{selectedUser.name}</h3>
              <p style={{ margin: '0.3rem 0', color: '#555' }}>📧 {selectedUser.email}</p>
              <p style={{ margin: '0.3rem 0', color: '#555' }}>📞 {selectedUser.phone}</p>
              <p style={{ margin: '0.3rem 0', color: '#555' }}>🌐 {selectedUser.website}</p>
              <p style={{ margin: '0.3rem 0', color: '#555' }}>🏢 {selectedUser.company?.name}</p>
            </>
          ) : (
            <div style={{ color: '#aaa', textAlign: 'center', paddingTop: '2rem' }}>
              👈 Выберите пользователя
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Главная страница ─────────────────────────────────────────────
export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch(() => setUsersError('Не удалось загрузить пользователей'))
      .finally(() => setLoadingUsers(false));
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#333' }}>🎓 Портал Лабораторных Работ</h1>
        <p style={{ color: '#888' }}>React + Redux Toolkit + RTK Query</p>
      </div>

      <TodoSection />

      {usersError ? (
        <div style={{ ...s.section, background: '#fff0f0', color: '#c0392b', textAlign: 'center', padding: '2rem' }}>
          ⚠️ {usersError}
        </div>
      ) : (
        <UsersSection users={users} loading={loadingUsers} />
      )}

      <section style={s.section}>
        <h2 style={s.sectionTitle}>📰 Посты (RTK Query CRUD)</h2>
        <PostsCrud />
      </section>
    </>
  );
}

const s = {
  section: { background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' },
  sectionTitle: { textAlign: 'center', color: '#333', marginBottom: '1.5rem', fontSize: '1.4rem' },
  iconBtn: { background: 'none', border: '1px solid #eee', borderRadius: '6px', cursor: 'pointer', padding: '4px 8px' },
};
