import { VIBECART_URI } from "./service";

export const API_URLS = {
  getAllWarehouses: `${VIBECART_URI}/api/v1/vibe-cart/scm/inventory/get-all-warehouses`,
  getAllInventories: `${VIBECART_URI}/api/v1/vibe-cart/scm/inventory/get-all-inventories`,
  inventoryReport: `${VIBECART_URI}/api/v1/vibe-cart/scm/inventory/inventory-report`,
  updateSingleInventory: `${VIBECART_URI}/api/v1/vibe-cart/scm/inventory/update-single-inventory`,
  getAllOrders: `${VIBECART_URI}/api/v1/vibe-cart/scm/orders/getAllOrders`,
  getOrderById: (orderId) => `${VIBECART_URI}/api/v1/vibe-cart/scm/orders/getOrderById/${orderId}`,
  getInventoryReport: `${VIBECART_URI}/api/v1/vibe-cart/scm/inventory/inventory-report`,
  cancelOrder: (orderId) => `${VIBECART_URI}/api/v1/vibe-cart/scm/orders/cancelOrder/${orderId}`,
  validateAccount: `${VIBECART_URI}/api/v1/vibe-cart/accounts/validate?type=user`,
};


