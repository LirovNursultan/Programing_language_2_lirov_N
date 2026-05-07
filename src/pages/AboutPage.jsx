export default function AboutPage() {
  const features = [
    { icon: '⚛️', title: 'React 18', desc: 'Современный UI с хуками и функциональными компонентами' },
    { icon: '🗃️', title: 'Redux Toolkit', desc: 'createSlice, createAsyncThunk, configureStore' },
    { icon: '🔄', title: 'RTK Query', desc: 'Автоматическое кэширование, оптимистичные обновления' },
    { icon: '🛣️', title: 'React Router v6', desc: 'Навигация между 5 страницами приложения' },
    { icon: '🌐', title: 'REST API', desc: 'JSONPlaceholder, DummyJSON — реальные HTTP запросы' },
    { icon: '📦', title: 'CRUD операции', desc: 'Создание, чтение, обновление и удаление данных' },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '0.5rem' }}>О проекте</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>
        Финальный проект по курсу <strong>Programming Languages II</strong>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {features.map((f) => (
          <div key={f.title} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{f.icon}</div>
            <h3 style={{ margin: '0 0 0.3rem', color: '#333' }}>{f.title}</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 0.5rem' }}>Структура Redux</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>
          counterSlice · authSlice · todoSlice · interactionSlice · postsApi (RTK Query)
        </p>
      </div>
    </div>
  );
}
