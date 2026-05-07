import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from '../redux/slices/counterSlice';
import { useState } from 'react';

export default function CounterPage() {
  const { value, message } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [step, setStep] = useState(5);

  const color = value > 0 ? '#28a745' : value < 0 ? '#dc3545' : '#6c757d';

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔢 Счётчик</h1>
        <p style={styles.subtitle}>{message}</p>

        <div style={{ ...styles.counter, color }}>{value}</div>

        <div style={styles.btnRow}>
          <button style={styles.btn('#dc3545')} onClick={() => dispatch(decrement())}>− 1</button>
          <button style={styles.btn('#6c757d')} onClick={() => dispatch(reset())}>Сброс</button>
          <button style={styles.btn('#28a745')} onClick={() => dispatch(increment())}>+ 1</button>
        </div>

        <div style={styles.stepRow}>
          <label style={{ fontWeight: '600' }}>Шаг:</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={styles.stepInput}
            min="1"
          />
          <button style={styles.btn('#007bff')} onClick={() => dispatch(incrementByAmount(step))}>
            + {step}
          </button>
          <button style={styles.btn('#fd7e14')} onClick={() => dispatch(incrementByAmount(-step))}>
            − {step}
          </button>
        </div>

        <div style={styles.info}>
          <span>Использован <strong>Redux Toolkit</strong> — createSlice, useSelector, useDispatch</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: 'white', borderRadius: '20px', padding: '3rem 2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', textAlign: 'center', width: '100%', maxWidth: '500px' },
  title: { marginBottom: '0.3rem', color: '#333' },
  subtitle: { color: '#888', marginBottom: '2rem' },
  counter: { fontSize: '6rem', fontWeight: '800', lineHeight: 1, marginBottom: '2rem', transition: 'color 0.3s' },
  btnRow: { display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' },
  btn: (bg) => ({ padding: '12px 24px', background: bg, color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }),
  stepRow: { display: 'flex', gap: '0.8rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' },
  stepInput: { padding: '8px', borderRadius: '8px', border: '1px solid #ddd', width: '70px', textAlign: 'center', fontSize: '1rem' },
  info: { background: '#f0f8ff', padding: '12px', borderRadius: '10px', fontSize: '0.85rem', color: '#555' },
};
