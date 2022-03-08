const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class dbchange1646707050301 {
    name = 'dbchange1646707050301'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
    }
}
