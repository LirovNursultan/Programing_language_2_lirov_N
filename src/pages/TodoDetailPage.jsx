import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function TodoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = useSelector((state) =>
    state.todos.todos.find((t) => t.id === parseInt(id))
  );

  if (!todo) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>😕 Задача не найдена</h2>
        <button onClick={() => navigate('/')} style={styles.backBtn}>← На главную</button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Назад</button>

        <div style={styles.badge(todo.completed)}>
          {todo.completed ? '✅ Выполнено' : '⏳ В процессе'}
        </div>

        <h2 style={styles.title}>{todo.title}</h2>

        <div style={styles.descBox}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#555' }}>Описание:</h4>
          <p style={{ margin: 0, color: '#333', lineHeight: 1.7 }}>
            {todo.description || 'Описание отсутствует'}
          </p>
        </div>

        <div style={styles.meta}>
          ID задачи: <strong>#{todo.id}</strong>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', padding: '2rem 1rem' },
  card: { background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' },
  backBtn: { background: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '1.5rem', color: '#555' },
  badge: (done) => ({ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', background: done ? '#d4edda' : '#fff3cd', color: done ? '#155724' : '#856404', marginBottom: '1rem' }),
  title: { fontSize: '1.6rem', color: '#222', marginBottom: '1.5rem' },
  descBox: { background: '#f8f9fa', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem', border: '1px solid #eee' },
  meta: { color: '#999', fontSize: '0.85rem' },
};
