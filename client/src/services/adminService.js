import api from '../config/api';

/**
 * Admin-only API calls. All of these require an admin session.
 */
export const adminService = {
  /** Dashboard overview metrics. */
  getStats: () => api.get('/admin/stats').then((res) => res.data),

  /** Every user in the system. */
  getUsers: () => api.get('/admin/users').then((res) => res.data),

  /** A single user by id. */
  getUser: (id) => api.get(`/admin/users/${id}`).then((res) => res.data),

  /** Add or remove credits. payload: { action, amount, reason } */
  updateCredits: (id, payload) =>
    api.patch(`/admin/users/${id}/credits`, payload).then((res) => res.data),

  /** Activate or suspend a user. payload: { status } */
  updateStatus: (id, payload) =>
    api.patch(`/admin/users/${id}/status`, payload).then((res) => res.data),

  /** Latest credit transactions across all users. */
  getTransactions: () => api.get('/admin/transactions').then((res) => res.data),
};

export default adminService;
