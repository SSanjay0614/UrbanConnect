export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', padding: '0.75rem 1rem', marginTop: 'auto', fontSize: 12 }}>
      © {new Date().getFullYear()} UrbanConnect · Built for inclusive, sustainable cities
    </footer>
  );
}

