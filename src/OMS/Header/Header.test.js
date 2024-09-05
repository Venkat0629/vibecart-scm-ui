import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';


// beforeAll(() => {
//   Object.defineProperty(window, 'localStorage', {
//     value: {
//       getItem: jest.fn((key) => {
//         if (key === 'username') return 'TestUser';
//         return null;
//       }),
//       setItem: jest.fn(),
//       clear: jest.fn(),
//     },
//     writable: true
//   });
// });

describe('Header Component', () => {
  test('renders header with title and subtitle', () => {
    render(<Header isLoggedIn={false} />);
    expect(screen.getByText('VIBE')).toBeInTheDocument();
    expect(screen.getByText('CART')).toBeInTheDocument();
    expect(screen.getByText('Order Management System')).toBeInTheDocument();
  });

  test('renders user icon and dropdown when logged in', () => {
    render(<Header isLoggedIn={true} />);
    const userIcon = screen.getByLabelText('user');
    expect(userIcon).toBeInTheDocument();
  });

  test('toggles dropdown on user icon click', () => {
    render(<Header isLoggedIn={true} />);
    const userIcon = screen.getByLabelText('user');
    fireEvent.click(userIcon);
    expect(screen.getByText('Account Details')).toBeVisible();
  });

  test('calls onLogout function when "Sign out" is clicked', () => {
    const onLogoutMock = jest.fn();
    render(<Header isLoggedIn={true} onLogout={onLogoutMock} />);
    const userIcon = screen.getByLabelText('user');
    fireEvent.click(userIcon);
    const signOutLink = screen.getByText('Sign out');
    fireEvent.click(signOutLink);
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });

//   test('shows stored username from localStorage', async () => {
//     const mockUsername = 'TestUser';
//     localStorage.setItem('username', mockUsername);
    
//     render(<Header isLoggedIn={true} onLogout={() => {}} />);
    
//     // Use findByText for async updates
//     const usernameElement = await screen.findByText(mockUsername);
    
//     expect(usernameElement).toBeInTheDocument();
// });

  
});
