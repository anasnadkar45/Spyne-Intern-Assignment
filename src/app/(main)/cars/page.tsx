import { AddCar } from '@/app/components/cars/AddCar'
import { CarsCard } from '@/app/components/cars/CarsCard'
import prisma from '@/app/lib/db'
import { Card, CardHeader } from '@/components/ui/card'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'

const getCarData = async (userId: string) => {
    const data = await prisma.car.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            carType: true,
            company: true,
            dealer: true,
            images: true,
            tags: true,
        }
    });
    return data;
}

const page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user.id as string;
    const cars = await getCarData(userId)
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">All Cars</h1>
                <AddCar />
            </div>
            {cars && cars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cars.map((car) => (
                        <CarsCard key={car.id} car={car}/>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-xl text-muted-foreground">No cars found. Add your first car!</p>
                </div>
            )}
        </div>
    )
}

export default page