/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
  apps: [
    {
      name: 'prodmaker', // pm2 start App name
      script: 'dist/server.js',
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instance_var: 'INSTANCE_ID', // instance variable
      instances: 1, // pm2 instance count
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 6002,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'dev', // pm2 start App name
      script: './node_modules/.bin/ts-node', // ts-node
      args: '-r tsconfig-paths/register --transpile-only src/server.ts', // ts-node args
      exec_mode: 'cluster', // 'cluster' or 'fork'
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 6002,
        NODE_ENV: 'development',
      },
    },
  ],
  deploy: {
    production: {
      user: 'user',
      host: '0.0.0.0',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: 'dist/server.js',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --only prod',
    },
  },
};
