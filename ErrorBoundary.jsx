import React from 'react';

// Catches render-time errors so a single broken component cannot blank the
// whole kiosk screen. Uses inline styles (not Tailwind) so the fallback still
// renders even if the CSS bundle fails to load on a legacy browser.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App render error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            background: '#FFF8ED',
            color: '#171717',
          }}
        >
          <div
            style={{
              fontSize: '2.5rem',
              marginBottom: '0.75rem',
            }}
          >
            ⚠️
          </div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            เกิดข้อผิดพลาด
          </h1>
          <p style={{ color: '#777', marginBottom: '1.5rem', fontSize: '1rem' }}>
            กรุณาแตะปุ่มเพื่อโหลดหน้าใหม่อีกครั้ง
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '0.75rem 1.75rem',
              background: '#B5121B',
              color: '#fff',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            รีโหลดหน้า
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}