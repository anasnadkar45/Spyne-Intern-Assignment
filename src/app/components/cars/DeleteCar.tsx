"use client"
import { deleteCar, State } from '@/app/action'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { DeleteButton } from '../global/SubmitButton'

interface CarData {
    id: string
    name: string
    description: string
    carType: string
    company: string
    dealer: string
    images: string[]
    tags: string[]
}

export const DeleteCar = ({ car }: { car: CarData }) => {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useActionState(deleteCar, initialState);
    useEffect(() => {
        console.log("State updated:", state);
        if (state.status === "success") {
            toast.success(state.message);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    
    return (
        <form action={formAction} className='flex gap-2 items-center cursor-pointer'>
            <input type="hidden" name="carId" value={car.id} />
            <DeleteButton text='' />
        </form>
    )
}