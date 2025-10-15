import api from './api.js';

export const analyzeText = (text) => api.post('/analytics/sentiment', { text }).then((r) => r.data);
export const summarize = (items) => api.post('/analytics/summarize', { items }).then((r) => r.data);
export const trends = () => api.get('/analytics/trends').then((r) => r.data);

export default { analyzeText, summarize, trends };

