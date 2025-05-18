const ENV = {
  Production: 'production',
}

module.exports = {
  apps: [
    {
      name: 'moon-web-start',
      script: './dist/src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 20,
      max_memory_restart: '200M',
      restart_delay: 5000,
      env: {
        NODE_ENV: ENV.Production,
        PORT: 1890,
        FAVICON_API: 'google',
      },
    },
  ],
}
