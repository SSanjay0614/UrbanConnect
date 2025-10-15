import api from './api.js';

export const submitFeedback = (payload) => api.post('/citizen/feedback', payload).then((r) => r.data);
export const voteProject = (projectId) => api.post(`/citizen/projects/${projectId}/vote`).then((r) => r.data);
export const reportIssue = (payload) => api.post('/citizen/report', payload).then((r) => r.data);
export const listProjects = () => api.get('/citizen/projects').then((r) => r.data);

export default { submitFeedback, voteProject, reportIssue, listProjects };

