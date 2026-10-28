import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Garde-fou : en cas d'erreur de rendu, affiche un message lisible
 * au lieu d'un ecran blanc total (plus facile a diagnostiquer).
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[Room241] Erreur de rendu :', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', padding: '48px 24px', fontFamily: 'Geist, Inter, sans-serif' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
            Une erreur est survenue lors de l'affichage.
          </h1>
          <pre
            style={{
              fontSize: '12px',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(255,173,0,0.4)',
              background: 'rgba(255,173,0,0.06)',
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
            }}
          >
            {String(this.state.error && (this.state.error.stack || this.state.error.message || this.state.error))}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 20px',
              borderRadius: '10px',
              border: '1px solid rgba(17,17,17,0.2)',
              background: '#111',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Recharger la page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

