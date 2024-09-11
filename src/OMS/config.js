const API_URLS = {
    getAllWarehouses: 'http://localhost:4001/vibe-cart/scm/inventory/get-all-warehouses',
    getAllInventories: 'http://localhost:4001/vibe-cart/scm/inventory/get-all-inventories',
    inventoryReport: 'http://localhost:4001/vibe-cart/scm/inventory/inventory-report',
    updateSingleInventory: 'http://localhost:4001/vibe-cart/scm/inventory/update-single-inventory',

    getAllOrders: 'http://localhost:4001/vibe-cart/scm/orders/getAllOrders',
    getOrderById:(orderId)=> `http://localhost:4001/vibe-cart/scm/orders/getOrderById/${orderId}`,
    getInventoryReport: 'http://localhost:4001/vibe-cart/scm/inventory/inventory-report',
    cancelOrder: (orderId) => `http://localhost:4001/vibe-cart/scm/orders/cancelOrder/${orderId}`,

    validateAccount: 'http://localhost:4001/api/v1/vibe-cart/accounts/validate?type=user',


  };
  
  export default API_URLS;
  