const API_URLS = {
    getAllWarehouses: 'http://localhost:8090/vibe-cart/inventory/get-all-warehouses',
    getAllInventories: 'http://localhost:8090/vibe-cart/inventory/get-all-inventories',
    inventoryReport: 'http://localhost:8090/vibe-cart/inventory/inventory-report',
    updateSingleInventory: 'http://localhost:8090/vibe-cart/inventory/update-single-inventory',

    getAllOrders: 'http://localhost:8090/vibe-cart/orders/getAllOrders',
    getInventoryReport: 'http://localhost:8090/vibe-cart/inventory/inventory-report',
    cancelOrder: (orderId) => `http://localhost:8090/vibe-cart/orders/cancelOrder/${orderId}`

  };
  
  export default API_URLS;
  