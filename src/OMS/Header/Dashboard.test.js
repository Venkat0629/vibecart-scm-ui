/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../Inventory/OMS-Dashboard';
import { API_URLS } from '../config';

// Mock the global fetch API
global.fetch = jest.fn((url) => {
  if (url === API_URLS.getAllOrders) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          data: [
            { orderStatus: 'DELIVERED' },
            { orderStatus: 'PROCESSING' },
            { orderStatus: 'CANCELLED' },
          ],
        }),
    });
  }
  
  if (url === API_URLS.getAllInventories) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { category: 'Jackets', quantity: 10 },
          { category: 'Shoes', quantity: 20 },
          { category: 'Jackets', quantity: 5 },
        ]),
    });
  }
  
  return Promise.reject('Unknown URL');
});

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and processes order data correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(API_URLS.getAllOrders, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      // Adjust to the number of calls your component makes
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  test('fetches and processes inventory data correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(API_URLS.getAllInventories, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        // Adjust to the number of calls your component makes
        expect(global.fetch).toHaveBeenCalledTimes(2); 
    });
  });

  test('displays correct total order count', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Total Orders/i)).toBeInTheDocument();
    });
  });

  test('displays correct processed orders count', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Processed Orders/i)).toBeInTheDocument();
    });
  });

  test('displays correct completed orders count', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Orders Completed/i)).toBeInTheDocument();
    });
  });

  test('displays correct inventory data', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Total Products/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Jackets/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Shoes/i)).toBeInTheDocument();
    });
  });

  test('renders the order pie chart', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Order Status Distribution/i)).toBeInTheDocument();
      expect(screen.getByTestId('orderPieChart')).toBeInTheDocument();
    });
  });

  test('renders the inventory pie chart', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Inventory Status Distribution/i)).toBeInTheDocument();
      expect(screen.getByTestId('inventoryPieChart')).toBeInTheDocument();
    });
  });
});
