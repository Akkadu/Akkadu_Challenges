var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: 'postgresql://xiaoxiayao:1234@localhost/product_review_staging',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: 'postgresql://xiaoxiayao:1234@localhost/product_review_test',
      entities: ['**/*.entity.js'],
      migrationsRun: true,
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
