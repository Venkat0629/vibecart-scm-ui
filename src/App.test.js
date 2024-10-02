import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './OMS/Header/header';  

test('renders header with title and subtitle', () => {
  render(<Header isLoggedIn={false} />);
  expect(screen.getByText('VIBE')).toBeInTheDocument();
  expect(screen.getByText('CART')).toBeInTheDocument();
  expect(screen.getByText('Order Management System')).toBeInTheDocument();
});
