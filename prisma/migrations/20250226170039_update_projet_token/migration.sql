/*
  Warnings:

  - You are about to drop the column `publicKey` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `secretKey` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `publicKey`,
    DROP COLUMN `secretKey`,
    ADD COLUMN `token` VARCHAR(191) NULL;
