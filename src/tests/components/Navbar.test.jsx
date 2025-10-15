import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar.jsx';
import { ThemeProvider } from '../../context/ThemeContext.jsx';
import { AuthProvider } from '../../context/AuthContext.jsx';

describe('Navbar', () => {
  test('renders UrbanConnect brand', () => {
  render(
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </ThemeProvider>
  );
  expect(screen.getByText(/UrbanConnect/i)).toBeInTheDocument();
  });
});

