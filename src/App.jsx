import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './store/counterSlice'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const count = useSelector(state => state.counter.value)
  const message = useSelector(state => state.counter.message)
  const dispatch = useDispatch()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
          <h1>Лабораторная работа 2 — Навигация</h1>
          <h2>{message}</h2>
          <p style={{ fontSize: '4rem', margin: '2rem 0' }}>{count}</p>
          
          <button 
            onClick={() => dispatch(increment())}
            style={{
              padding: '0.8rem 2rem',
              fontSize: '1.2rem',
              marginRight: '1rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            +1
          </button>

          <button 
            onClick={() => dispatch(decrement())}
            style={{
              padding: '0.8rem 2rem',
              fontSize: '1.2rem',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            -1
          </button>
        </main>

        {/* <Footer /> */}
      </div>
  );
}

export default App