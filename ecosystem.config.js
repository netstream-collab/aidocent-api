module.exports = {
  apps: [
    {
      name: 'aidocent-api',
      script: './dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      wait_ready: true,
      listen_timeout: 30000, //30 s
      kill_timeout: 5000, // 5s
      merge_logs: true,
      log_date_format: '',
    },
  ],
};
