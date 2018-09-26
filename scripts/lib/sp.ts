import { sp, setup, Web } from 'sp-pnp-js';

setup({
  sp: {
    headers: {
      Accept: 'application/json;odata=verbose',
    },
  },
});

export { Web, sp };
