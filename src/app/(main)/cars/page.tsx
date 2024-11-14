import { AddCar } from '@/app/components/cars/AddCar'
import { CarsList } from '@/app/components/cars/CarsList'
import prisma from '@/app/lib/db'
import React from 'react'

const getCarData = async () => {
    const data = await prisma.car.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            carType: true,
            company: true,
            dealer: true,
            images: true,
            tags: true,
        },
    });
    return data;
}

const page = async () => {
    const cars = await getCarData();

    return (
        <div className='p-4'>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">All Cars</h1>
                <AddCar />
            </div>
            <CarsList cars={cars}/>
        </div>
    )
}

export default page