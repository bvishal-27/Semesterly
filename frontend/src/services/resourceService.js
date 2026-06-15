import api from './api'

export const resourceService = {
  getAll:      (params) => api.get('/resources', { params }),
  getById:     (id)     => api.get(`/resources/${id}`),
  trackOpen:   (id)     => api.post(`/resources/${id}/open`),  // call on Open click
  create:      (data)   => api.post('/resources', data),
  update:      (id, d)  => api.put(`/resources/${id}`, d),
  delete:      (id)     => api.delete(`/resources/${id}`),
  getSubjects: ()       => api.get('/resources/meta/subjects'),
  getStats:    ()       => api.get('/resources/meta/stats'),
}

export const authService = {
  login:    (creds) => api.post('/auth/login', creds),
  register: (data)  => api.post('/auth/register', data),
  me:       ()      => api.get('/auth/me'),
}

export const analyticsService = {
  getSummary:    (params) => api.get('/analytics/summary', { params }),
  getVisitors:   ()       => api.get('/analytics/visitors'),
}
