import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '../../store/api/postsApi';

import { toggleLike, toggleFavorite, addRating } from '../../store/interactionSlice';

function PostsCrud() {
  const { data: posts = [], isLoading } = useGetPostsQuery();
  const interactions = useSelector(state => state.interactions);
  const dispatch = useDispatch();

  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [form, setForm] = useState({ title: '', body: '' });
  const [editingId, setEditingId] = useState(null);

  // Вычисление средней оценки
  const getAverageRating = (postId) => {
    const ratings = interactions.ratings[postId] || [];
    if (ratings.length === 0) return 0;
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  };

  const handleAddRating = (postId, rating) => {
    dispatch(addRating({ postId, rating }));
  };

  // ... остальной код handleSubmit, handleEdit, handleDelete остаётся

  if (isLoading) return <div>Загрузка постов...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Посты с Like, Избранное и Рейтингом</h1>

      {/* Форма добавления/редактирования */}
      {/* ... твой существующий код формы ... */}

      {/* Список постов */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {posts.map((post) => {
          const isLiked = interactions.likes[post.id];
          const isFavorite = interactions.favorites[post.id];
          const avgRating = getAverageRating(post.id);

          return (
            <div key={post.id} style={{
              border: '1px solid #ddd',
              padding: '1.5rem',
              borderRadius: '10px',
              background: 'white',
              position: 'relative'
            }}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>

              <div style={{ marginTop: '15px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Like */}
                <button 
                  onClick={() => dispatch(toggleLike(post.id))}
                  style={{ 
                    padding: '8px 16px', 
                    background: isLiked ? '#ff4757' : '#ddd', 
                    color: isLiked ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ❤️ {isLiked ? 'Лайкнуто' : 'Лайк'}
                </button>

                {/* Избранное */}
                <button 
                  onClick={() => dispatch(toggleFavorite(post.id))}
                  style={{ 
                    padding: '8px 16px', 
                    background: isFavorite ? '#ffa502' : '#ddd', 
                    color: isFavorite ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ⭐ {isFavorite ? 'В избранном' : 'В избранное'}
                </button>

                {/* Рейтинг */}
                <div>
                  <span>Оценка: <strong>{avgRating}</strong> ({interactions.ratings[post.id]?.length || 0} голосов)</span>
                  <div style={{ marginTop: '8px' }}>
                    {[1,2,3,4,5].map(rating => (
                      <button 
                        key={rating}
                        onClick={() => handleAddRating(post.id, rating)}
                        style={{ marginRight: '5px', padding: '6px 10px' }}
                      >
                        {rating}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostsCrud;