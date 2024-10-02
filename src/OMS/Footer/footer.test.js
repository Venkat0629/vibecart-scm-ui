import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './footer'; // Adjust the path if necessary

describe('Footer Component', () => {
  test('renders footer with correct text', () => {
    render(<Footer />);
    
    // Query the footer text
    const footerText = screen.getByText(/© 2024 VibeCart - Nisum All Rights Reserved/i);
    
    // Assert that the footer text is in the document
    expect(footerText).toBeInTheDocument();
  });
});
