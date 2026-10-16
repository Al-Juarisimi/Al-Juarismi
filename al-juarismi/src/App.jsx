// src/App.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function App() {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const gBackground = svg.append('g');
    const gSymbols = svg.append('g');
    const gAstrolabe = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // 1. Círculos concéntricos y polígonos geométricos (Astrolabio / Geometría Sagrada)
    const rings = [100, 160, 220, 280, 360, 440];
    rings.forEach((r, idx) => {
      gAstrolabe.append('circle')
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#c29d59')
        .attr('stroke-width', idx % 2 === 0 ? 1.5 : 0.75)
        .attr('stroke-dasharray', idx % 3 === 0 ? '4, 4' : 'none')
        .attr('opacity', 0.45);
    });

    // Rosetón de 8 puntas rotatorio (Símbolo de Álgebra de Al-Juarismi)
    const numPoints = 8;
    const starPoints1 = [];
    const starPoints2 = [];
    const rOuter = 260;
    const rInner = 130;

    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints;
      const radius = i % 2 === 0 ? rOuter : rInner;
      starPoints1.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
      starPoints2.push([radius * 0.75 * Math.cos(angle + Math.PI / 8), radius * 0.75 * Math.sin(angle + Math.PI / 8)]);
    }

    const lineGen = d3.line();

    const poly1 = gAstrolabe.append('path')
      .attr('d', lineGen(starPoints1) + 'Z')
      .attr('fill', 'none')
      .attr('stroke', '#b8860b')
      .attr('stroke-width', 1.2)
      .attr('opacity', 0.5);

    const poly2 = gAstrolabe.append('path')
      .attr('d', lineGen(starPoints2) + 'Z')
      .attr('fill', 'none')
      .attr('stroke', '#8b5a2b')
      .attr('stroke-width', 1)
      .attr('opacity', 0.4);

    // 2. Fórmulas algebraicas y raíces flotantes históricas
    const formulas = [
      'ax² + bx = c',
      'x = (-b ± √(b² - 4ac)) / 2a',
      'al-jabr',
      'al-muqābala',
      'x² + 21 = 10x',
      '√(x² + y²)',
      'x³ + px = q',
      '∑ (i = 1 to n)',
      'x + 10 = 25',
      'f(x) = dx/dt',
      'x² = 40x - 4x²',
    ];

    const symbolData = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      text: formulas[i % formulas.length],
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 6 + 14,
      opacity: Math.random() * 0.35 + 0.15,
    }));

    const textNodes = gSymbols.selectAll('text')
      .data(symbolData)
      .join('text')
      .text(d => d.text)
      .attr('font-size', d => `${d.size}px`)
      .attr('font-family', '"Cinzel", "Times New Roman", serif')
      .attr('font-style', 'italic')
      .attr('fill', '#78350f')
      .attr('opacity', d => d.opacity)
      .attr('text-anchor', 'middle');

    // 3. Rotación continua con d3.timer
    let rotation = 0;
    const timer = d3.timer(() => {
      rotation += 0.12;
      poly1.attr('transform', `rotate(${rotation})`);
      poly2.attr('transform', `rotate(${-rotation * 0.8})`);

      // Mover símbolos flotantes suavemente
      symbolData.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < -100) d.x = width + 100;
        if (d.x > width + 100) d.x = -100;
        if (d.y < -50) d.y = height + 50;
        if (d.y > height + 50) d.y = -50;
      });

      textNodes
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    // Ajuste dinámico de pantalla
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      svg.attr('width', w).attr('height', h);
      gAstrolabe.attr('transform', `translate(${w / 2}, ${h / 2})`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      timer.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#fbf6eb radial-gradient(circle at center, #fefae0 0%, #f7edd4 60%, #e9d8b4 100%)',
        color: '#451a03',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Lienzo D3 de astrolabio, geometría y álgebra */}
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Tarjeta tipo Pergamino clásico */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          userSelect: 'none',
          padding: '3rem 4rem',
          borderRadius: '16px',
          background: 'rgba(255, 252, 245, 0.88)',
          boxShadow: '0 20px 45px rgba(120, 53, 15, 0.12), inset 0 0 30px rgba(217, 119, 6, 0.08)',
          border: '2px solid #b8860b',
          outline: '1px solid #d4af37',
          outlineOffset: '6px',
          maxWidth: '90%',
          zIndex: 10,
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: '0.9rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#b45309',
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontWeight: 700,
            marginBottom: '0.8rem',
          }}
        >
          ـ كِتَاب الْجَبْر وَالْمُقَابَلَة ـ
        </span>

        <h1
          style={{
            fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
            fontWeight: 800,
            margin: 0,
            color: '#451a03',
            fontFamily: '"Cinzel", "Georgia", "Baskerville", serif',
            letterSpacing: '0.04em',
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
          }}
        >
          Al-Juarismi
        </h1>

        <div
          style={{
            height: '2px',
            width: '100px',
            background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
            margin: '1.2rem auto',
          }}
        />

        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#78350f',
            fontStyle: 'italic',
            fontFamily: '"Georgia", serif',
            margin: 0,
          }}
        >
          Página en construcción
        </p>

        <span
          style={{
            display: 'block',
            marginTop: '1.2rem',
            fontSize: '0.85rem',
            color: '#92400e',
            letterSpacing: '0.08em',
            fontFamily: 'monospace',
          }}
        >
          ax² + bx = c 
        </span>
      </div>
    </div>
  );
}