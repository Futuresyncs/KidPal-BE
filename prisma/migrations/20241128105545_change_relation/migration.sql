-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_child_id_fkey`;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `Child_Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
