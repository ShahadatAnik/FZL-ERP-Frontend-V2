const { VITE_API_BASE_URL, VITE_NANOID_CHARSET, VITE_NANOID_SIZE } = import.meta.env;

const BASE_API = VITE_API_BASE_URL;
const NANOID_CHARSET = VITE_NANOID_CHARSET;
const NANOID_SIZE = VITE_NANOID_SIZE;

export { BASE_API, NANOID_CHARSET, NANOID_SIZE };
