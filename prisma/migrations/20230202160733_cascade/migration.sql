-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_vehicleModelId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_modelId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_userId_fkey";

-- DropForeignKey
ALTER TABLE "vehicleModel" DROP CONSTRAINT "vehicleModel_brandId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_vehicleModelId_fkey" FOREIGN KEY ("vehicleModelId") REFERENCES "vehicleModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "vehicleModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicleModel" ADD CONSTRAINT "vehicleModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "vehicleBrand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
