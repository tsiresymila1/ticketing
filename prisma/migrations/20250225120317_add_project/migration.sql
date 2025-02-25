/*
  Warnings:

  - You are about to drop the column `token` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `token`,
    ADD COLUMN `publicKey` VARCHAR(191) NULL,
    ADD COLUMN `secretKey` VARCHAR(191) NULL;
