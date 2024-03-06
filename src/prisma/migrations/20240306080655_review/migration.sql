/*
  Warnings:

  - You are about to drop the column `name` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `majorId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKr` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_majorId_fkey`;

-- DropIndex
DROP INDEX `Department_name_key` ON `Department`;

-- AlterTable
ALTER TABLE `Department` DROP COLUMN `name`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameKr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `majorId`,
    ADD COLUMN `departmentId` INTEGER NULL;

-- CreateTable
CREATE TABLE `_UserLikes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserLikes_AB_unique`(`A`, `B`),
    INDEX `_UserLikes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Department_code_key` ON `Department`(`code`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserLikes` ADD CONSTRAINT `_UserLikes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserLikes` ADD CONSTRAINT `_UserLikes_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
