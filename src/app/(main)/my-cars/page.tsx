import { AddCar } from '@/app/components/cars/AddCar'
import { MyCarsList } from '@/app/components/cars/MyCarsList'
import prisma from '@/app/lib/db'
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
    const cars = await getCarData(userId);

    return (
        <div className='p-4'>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Cars</h1>
                <AddCar />
            </div>
            <MyCarsList cars={cars}/>
        </div>
    )
}

export default page