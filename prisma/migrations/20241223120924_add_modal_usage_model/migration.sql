-- CreateTable
CREATE TABLE `ModalUsage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentName` VARCHAR(191) NOT NULL,
    `childName` VARCHAR(191) NOT NULL,
    `modelName` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
