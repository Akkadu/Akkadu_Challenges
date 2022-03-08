const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class dbchange1646710333772 {
    name = 'dbchange1646710333772'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "name"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" ADD "name" character varying NOT NULL`);
    }
}
