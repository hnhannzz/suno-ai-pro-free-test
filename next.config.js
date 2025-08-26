/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false // we parse multipart with formidable in routes that need it
  }
}
module.exports = nextConfig;