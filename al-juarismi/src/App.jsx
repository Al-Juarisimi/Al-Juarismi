// src/App.jsx
import React from 'react';
import Chart from './Chart';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#1e293b', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Al-Juarismi</h2>
        <a 
          href="https://github.com/ChristianFrisancho/Al-Juarismi" 
          target="_blank" 
          rel="noreferrer"
          style={{ textDecoration: 'none', color: '#4f46e5', fontWeight: 600 }}
        >
          GitHub
        </a>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
          Visualización y Algoritmos Interactivos
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Landing page impulsada por React y D3.js para análisis de datos y procesamiento algorítmico.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <button style={{ padding: '0.75rem 1.5rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Comenzar
          </button>
          <button style={{ padding: '0.75rem 1.5rem', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Ver Documentación
          </button>
        </div>

        {/* Gráfico D3 */}
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Métricas en Tiempo Real</h3>
          <Chart />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Al-Juarismi. Desplegado en GitHub Pages.
      </footer>
    </div>
  );
}