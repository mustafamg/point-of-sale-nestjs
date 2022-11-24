export default (): any => {
	const config: any = {
		logger: {
			level: process.env.LOGGER_LEVEL || "debug",
		},
		sql: {
			host: process.env.ORM_HOST || 'localhost',
			port: process.env.ORM_PORT || "3307",
			username: process.env.ORM_USERNAME || 'root',
			password: process.env.ORM_PASSWORD || 'password',
			database: process.env.ORM_DB || 'PoS',
		}
	};
	return config;
};
