/*
  Warnings:

  - You are about to alter the column `title` on the `asset` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `mac` on the `asset` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(17)`.
  - You are about to alter the column `firstName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[mac]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `asset` MODIFY `title` VARCHAR(150) NOT NULL,
    MODIFY `link` VARCHAR(500) NOT NULL,
    MODIFY `mac` VARCHAR(17) NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `firstName` VARCHAR(100) NOT NULL,
    MODIFY `lastName` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Asset_mac_key` ON `Asset`(`mac`);

-- CreateIndex
CREATE INDEX `Asset_mac_idx` ON `Asset`(`mac`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);
