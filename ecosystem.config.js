module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'index.js',
      cwd: '/app/serverNode_datn',
      env: {
        "PORT": 3000,
        "NODE_ENV": "production",
      }
    },
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: '/app/duantn',
      env: {
        "PORT": 3001,
        "NODE_ENV": "production",
      }
    },
    {
      name: 'nginx',
      script: 'nginx',
      args: '-g "daemon off;"',
      exp_backoff_restart_delay: 100
    }
  ]
}; 