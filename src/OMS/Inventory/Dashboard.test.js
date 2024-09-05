import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Dashboard from './OMS-Dashboard';

// Mock the global fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
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
  })
);

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and processes order data correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8090/vibe-cart/orders/getAllOrders', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
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
