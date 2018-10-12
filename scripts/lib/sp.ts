import { sp, setup, Web } from "sp-pnp-js";

setup({
	sp: {
		headers: {
			Accept: "application/json;odata=verbose"
		}
	},
	defaultCachingStore: "local",
	defaultCachingTimeoutSeconds: 30
});

export { Web, sp };
