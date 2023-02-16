import axios from 'axios';

export default (config = {}) => {
  const client = axios.create(config);
  return {
    '*': async (req) => {
      const params = {
        method: req.method,
        url: req.params[0],
        query: req.query,
        data: req.body,
      };
      try {
        const { data } = await client(params);
        return { __raw: data };
      } catch (err) {
        return { code: 'ERROR' };
      }
    },
  };
};
