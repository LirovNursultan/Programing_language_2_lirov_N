function Header() {
  return (
    <header style={{
      background: '#007bff',
      color: 'white',
      padding: '1.5rem',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ margin: 0 }}>React + Redux</h1>
      <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
        Лабораторная работа №1
      </p>
    </header>
  )
}

export default Header