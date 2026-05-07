import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '../../services/postsApi';
import { toggleLike, toggleFavorite, addRating } from '../../redux/slices/interactionSlice';
import { getAverageRating, truncate } from '../../utils/helpers';

export default function PostsCrud() {
  const { data: posts = [], isLoading, isError, error } = useGetPostsQuery();
  const interactions = useSelector((state) => state.interactions);
  const dispatch = useDispatch();

  const [addPost, { isLoading: isAdding }] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [form, setForm] = useState({ title: '', body: '' });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [formError, setFormError] = useState('');

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.title.trim() || !form.body.trim()) {
      setFormError('Заполните заголовок и текст поста');
      return;
    }
    try {
      if (editingId) {
        await updatePost({ id: editingId, ...form });
        setEditingId(null);
      } else {
        await addPost({ ...form, userId: 1 });
      }
      setForm({ title: '', body: '' });
    } catch {
      setFormError('Ошибка при сохранении. Попробуйте снова.');
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({ title: post.title, body: post.body });
    setFormError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить пост?')) await deletePost(id);
  };

  // ── Loading state ──
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
        Загрузка постов...
      </div>
    );
  }

  // ── Error state ──
  if (isError) {
    return (
      <div style={{ background: '#fff0f0', border: '1px solid #f5c6cb', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#c0392b' }}>
        <div style={{ fontSize: '2rem' }}>⚠️</div>
        <h3>Ошибка загрузки постов</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{error?.message || 'Проверьте подключение к интернету'}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Форма */}
      <form onSubmit={handleSubmit} style={s.form}>
        {formError && <div style={s.formError}>⚠️ {formError}</div>}
        <input
          style={s.input}
          placeholder="Заголовок поста"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          style={{ ...s.input, resize: 'none' }}
          rows={3}
          placeholder="Текст поста"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button type="submit" style={s.btn(editingId ? '#ffc107' : '#667eea')} disabled={isAdding}>
            {isAdding ? '⏳' : editingId ? '💾 Сохранить' : '➕ Добавить пост'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', body: '' }); }} style={s.btn('#6c757d')}>
              Отмена
            </button>
          )}
        </div>
      </form>

      {/* Поиск */}
      <input
        placeholder="🔍 Поиск по постам..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '1.5rem', boxSizing: 'border-box' }}
      />

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div style={{ textAlign: 'center', color: '#aaa', padding: '2rem' }}>😶 Постов не найдено</div>
      )}

      {/* Список */}
      <div style={{ display: 'grid', gap: '1.2rem' }}>
        {filteredPosts.map((post) => {
          const isLiked = interactions.likes[post.id];
          const isFav = interactions.favorites[post.id];
          const avgRating = getAverageRating(interactions.ratings[post.id]);
          const ratingCount = interactions.ratings[post.id]?.length || 0;

          return (
            <div key={post.id} style={s.card}>
              <h4 style={{ margin: '0 0 0.4rem', color: '#222' }}>{post.title}</h4>
              <p style={{ margin: '0 0 1rem', color: '#666', fontSize: '0.9rem' }}>{truncate(post.body, 120)}</p>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Like */}
                <button onClick={() => dispatch(toggleLike(post.id))} style={s.actionBtn(isLiked ? '#ff4757' : '#eee', isLiked ? 'white' : '#555')}>
                  ❤️ {isLiked ? 'Лайкнуто' : 'Лайк'}
                </button>

                {/* Избранное */}
                <button onClick={() => dispatch(toggleFavorite(post.id))} style={s.actionBtn(isFav ? '#ffa502' : '#eee', isFav ? 'white' : '#555')}>
                  ⭐ {isFav ? 'В избранном' : 'В избранное'}
                </button>

                {/* Рейтинг */}
                <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button key={r} onClick={() => dispatch(addRating({ postId: post.id, rating: r }))}
                      style={{ padding: '4px 7px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', background: '#eee' }}>
                      {r}★
                    </button>
                  ))}
                  <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '4px' }}>
                    {avgRating > 0 ? `${avgRating} (${ratingCount})` : 'нет оценок'}
                  </span>
                </div>

                {/* Edit / Delete */}
                <button onClick={() => handleEdit(post)} style={s.actionBtn('#e3f2fd', '#1565c0')}>✏️ Ред.</button>
                <button onClick={() => handleDelete(post.id)} style={s.actionBtn('#fdecea', '#c0392b')}>🗑️ Удалить</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  form: { display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem', background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px' },
  formError: { background: '#fff0f0', color: '#c0392b', padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' },
  btn: (bg) => ({ padding: '10px 18px', background: bg, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }),
  card: { background: 'white', border: '1px solid #eee', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  actionBtn: (bg, color) => ({ padding: '6px 12px', background: bg, color, border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }),
};
