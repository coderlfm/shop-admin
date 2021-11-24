const TIME_OUT = 10000;
const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/admin' : 'http://101.35.200.60:8000/admin';

export { BASE_URL, TIME_OUT };
