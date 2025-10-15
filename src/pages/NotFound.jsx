export default function NotFound() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '80vh' }}>
      <div>
        <h1 style={{ marginBottom: 8 }}>404</h1>
        <p>Page not found.</p>
        <a href="/">Go home</a>
      </div>
    </div>
  );
}

