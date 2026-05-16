import api from '../config/api';

/**
 * Credit API calls for the logged-in user.
 */
export const creditService = {
  /** Get the current balance + recent transactions for the logged-in user. */
  getMyCredits: () => api.get('/credits/me').then((res) => res.data),
};

export default creditService;
