// Base URL for json-server
const BASE_URL = 'http://localhost:3001';

// Generic fetch helpers
const get = (endpoint) => fetch(`${BASE_URL}/${endpoint}`).then(r => r.json());
const post = (endpoint, data) => fetch(`${BASE_URL}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
const put = (endpoint, id, data) => fetch(`${BASE_URL}/${endpoint}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
const del = (endpoint, id) => fetch(`${BASE_URL}/${endpoint}/${id}`, { method: 'DELETE' }).then(r => r.json());
const patch = (endpoint, id, data) => fetch(`${BASE_URL}/${endpoint}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());

// Students API
export const studentsApi = {
  getAll: () => get('students'),
  create: (data) => post('students', data),
  update: (id, data) => put('students', id, data),
  delete: (id) => del('students', id),
};

// Staff API
export const staffApi = {
  getAll: () => get('staff'),
  create: (data) => post('staff', data),
  update: (id, data) => put('staff', id, data),
  delete: (id) => del('staff', id),
};

// Fee Records API
export const feesApi = {
  getAll: () => get('feeRecords'),
  create: (data) => post('feeRecords', data),
  update: (id, data) => put('feeRecords', id, data),
  patch: (id, data) => patch('feeRecords', id, data),
  delete: (id) => del('feeRecords', id),
};

// Transport API
export const transportApi = {
  getAll: () => get('transport'),
};

// Dashboard Stats API
export const dashboardApi = {
  getStats: () => get('dashboard'),
};
