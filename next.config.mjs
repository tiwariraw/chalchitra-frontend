const nextConfig = {
	/* config options here */
	// reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "chalchitra-s3-bucket.s3.us-east-1.amazonaws.com",
			},
		],
	},
	devIndicators: false,
};

export default nextConfig;