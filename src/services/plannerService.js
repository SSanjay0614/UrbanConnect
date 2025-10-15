import api from './api.js';

export const createProject = (payload) => api.post('/planner/projects', payload).then((r) => r.data);
export const updateProject = (id, payload) => api.put(`/planner/projects/${id}`, payload).then((r) => r.data);
export const listPlannerProjects = () => api.get('/planner/projects').then((r) => r.data);
export const getBudget = () => api.get('/planner/budget').then((r) => r.data);

export default { createProject, updateProject, listPlannerProjects, getBudget };

