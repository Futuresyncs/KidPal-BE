-- CreateTable
CREATE TABLE `Child_Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Parent_id` VARCHAR(191) NOT NULL,
    `nickName` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `character_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
