-- CreateTable
CREATE TABLE `SelectedCharacter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `selectedCharacter` VARCHAR(191) NULL,

    UNIQUE INDEX `SelectedCharacter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
