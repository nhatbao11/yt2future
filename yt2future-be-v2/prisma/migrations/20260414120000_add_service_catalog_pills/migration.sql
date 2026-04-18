-- AlterTable
ALTER TABLE "Service" ADD COLUMN "catalogPills" TEXT[] DEFAULT ARRAY[]::TEXT[];
