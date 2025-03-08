/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/search-pokemon",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
