module.exports = {
  apps: [
    {
      name: 'Staging',
      script: 'bin/www',
      // watch: '.',
      watch: 'false',
      env_staging: {
        name: 'Staging',
        NODE_ENV: 'staging',
      },
      env_production: {
        name: 'Production',
        NODE_ENV: 'production',
      },
    },
    {
      name: 'Production',
      script: 'bin/www',
      // watch: '.',
      watch: 'false',
      env_staging: {
        name: 'Staging',
        NODE_ENV: 'staging',
      },
      env_production: {
        name: 'Production',
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      name: 'Production',
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/production',
      repo: 'GIT_REPOSITORY',
      path: '/var/www/aperol-trivia.debrain.cloud',
      'pre-deploy-local': '',
      'post-deploy': 'npm cache clean -f && npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production --only Production',
      'pre-setup': '',
      env: {
        NODE_ENV: 'production',
      },
    },
    staging: {
      name: 'Staging',
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/staging',
      repo: 'GIT_REPOSITORY',
      path: '/var/www/staging.aperol-trivia.debrain.cloud',
      'pre-deploy-local': '',
      'post-deploy': 'npm cache clean -f && npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env staging --only Staging',
      'pre-setup': '',
      env: {
        NODE_ENV: 'staging',
      },
    },
  },
};
