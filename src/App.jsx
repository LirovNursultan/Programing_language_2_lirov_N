import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './store/counterSlice'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const count = useSelector(state => state.counter.value)
  const message = useSelector(state => state.counter.message)
  const dispatch = useDispatch()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f8f9fa'
    }}>
      <Header />

      <main style={{
        flex: 1,
        textAlign: 'center',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1>Лабораторная работа 1</h1>
        <h2 style={{ color: '#007bff', margin: '1rem 0' }}>
          {message}
        </h2>
        
        <p style={{ fontSize: '3rem', margin: '2rem 0', fontWeight: 'bold' }}>
          {count}
        </p>

        <div>
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
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App