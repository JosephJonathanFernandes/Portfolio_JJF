import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Joseph Fernandes | Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#0f172a', // Slate 900 / Dark Navy
          padding: '80px 120px',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            right: '-10%',
            bottom: '-20%',
            width: '800px',
            height: '800px',
            borderRadius: '400px',
            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(15,23,42,0) 70%)',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-10%',
            top: '-20%',
            width: '600px',
            height: '600px',
            borderRadius: '300px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(15,23,42,0) 70%)',
            zIndex: 0,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center', zIndex: 10 }}>
          <div style={{ fontSize: 32, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '16px' }}>
            Portfolio website
          </div>
          
          <div style={{ fontSize: 96, fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '24px' }}>
            Joseph Jonathan Fernandes
          </div>
          
          <div style={{ fontSize: 48, color: '#38bdf8', marginBottom: '48px', fontWeight: 500 }}>
            Software engineer • AI • systems
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: 32, color: '#cbd5e1' }}>
            <span style={{ padding: '12px 32px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>Projects</span>
            <span style={{ padding: '12px 32px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>Research</span>
            <span style={{ padding: '12px 32px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>Open source</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
