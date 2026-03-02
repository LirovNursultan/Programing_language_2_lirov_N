import { useState } from 'react';
import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '../../store/api/postsApi';

function PostsCrud() {
  const { data: posts = [], isLoading, error } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [form, setForm] = useState({ title: '', body: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, body: post.body });
    setEditingId(post.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;

    try {
      if (editingId) {
        await updatePost({ id: editingId, title: form.title, body: form.body }).unwrap();
        console.log("Пост обновлён");
      } else {
        await addPost({ title: form.title, body: form.body, userId: 1 }).unwrap();
        console.log("Пост добавлен");
      }
      setForm({ title: '', body: '' });
      setEditingId(null);
    } catch (err) {
      console.error("Ошибка мутации:", err);
      alert("Не удалось сохранить пост: " + (err.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить пост?")) return;
    try {
      await deletePost(id).unwrap();
      console.log("Пост удалён");
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  if (isLoading) return <div>Загрузка постов...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>CRUD Постов (Redux Toolkit + RTK Query)</h1>

      {/* Форма Create / Update */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Заголовок поста"
          style={{ padding: '0.8rem', fontSize: '1.1rem' }}
          required
        />
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Текст поста..."
          rows={4}
          style={{ padding: '0.8rem', fontSize: '1.1rem' }}
          required
        />
        <button type="submit" style={{ padding: '0.8rem', background: editingId ? '#ffc107' : '#28a745', color: 'white', border: 'none' }}>
          {editingId ? 'Обновить пост' : 'Добавить пост'}
        </button>
      </form>

      {/* Список постов */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ddd',
              padding: '1.2rem',
              borderRadius: '8px',
              background: 'white',
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => handleEdit(post)}
                style={{ background: '#ffc107', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                style={{ background: '#dc3545', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsCrud;