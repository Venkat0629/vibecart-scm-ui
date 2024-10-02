const API_URLS = {
    getAllWarehouses: 'http://10.3.45.15:4001/vibe-cart/scm/inventory/get-all-warehouses',
    getAllInventories: 'http://10.3.45.15:4001/vibe-cart/scm/inventory/get-all-inventories',
    inventoryReport: 'http://10.3.45.15:4001/vibe-cart/scm/inventory/inventory-report',
    updateSingleInventory: 'http://10.3.45.15:4001/vibe-cart/scm/inventory/update-single-inventory',

    getAllOrders: 'http://10.3.45.15:4001/vibe-cart/scm/orders/getAllOrders',
    getOrderById:(orderId)=> `http://10.3.45.15:4001/vibe-cart/scm/orders/getOrderById/${orderId}`,
    getInventoryReport: 'http://10.3.45.15:4001/vibe-cart/scm/inventory/inventory-report',
    cancelOrder: (orderId) => `http://10.3.45.15:4001/vibe-cart/scm/orders/cancelOrder/${orderId}`,

    validateAccount: 'http://10.3.45.15:4001/api/v1/vibe-cart/accounts/validate?type=user',


  };
  
  export default API_URLS;
  