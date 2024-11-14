"use server"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod'
import prisma from './lib/db';
import { revalidatePath } from 'next/cache';

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

const carSchema = z.object({
    name: z
        .string()
        .min(3, { message: "The name has to be a minimum character length of 3" }),
    description: z
        .string()
        .min(3, { message: "The description has to be a minimum character length of 3" }),
    carType: z
        .string()
        .min(1, { message: "Car type is required" }),
    company: z
        .string()
        .min(1, { message: "Company is required" }),
    dealer: z
        .string()
        .min(1, { message: "Dealer is required" }),
    images: z.array(z.string(), { message: "Images are required" }),
    tags: z.array(z.string()).optional(),
});

export async function addNewCar(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: 'User not found. Please login to add new car'
        }
    }

    const validateFields = carSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        carType: formData.get('carType'),
        company: formData.get('company'),
        dealer: formData.get('dealer'),
        images: JSON.parse(formData.get("images") as string),
        tags: JSON.parse(formData.get('tags') as string)
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    try {
        const data = await prisma.car.create({
            data: {
                name: validateFields.data?.name,
                description: validateFields.data?.description,
                carType: validateFields.data?.carType,
                company: validateFields.data?.company,
                dealer: validateFields.data?.dealer,
                images: validateFields.data.images,
                tags: validateFields.data?.tags ?? [],
                userId: user.id
            }
        })

        revalidatePath(`/cars`);
        if (data) {
            return {
                status: "success",
                message: "Your Car has been Added successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your Car has been Added successfully",
        };
        return state;

    } catch (err) {
        return {
            status: "error",
            message: "An error occurred while Adding the car. Please try again later.",
        };
    }
}

export async function updateCar(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: 'User not found. Please login to add new car'
        }
    }

    const validateFields = carSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        carType: formData.get('carType'),
        company: formData.get('company'),
        dealer: formData.get('dealer'),
        images: JSON.parse(formData.get("images") as string),
        tags: JSON.parse(formData.get('tags') as string)
    })

    if (!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, I think there is a mistake with your inputs.",
        };

        console.log(state);
        return state;
    }

    const carId = formData.get('carId') as string;
    try {
        const data = await prisma.car.update({
            where: {
                id: carId,
                userId: user.id
            },
            data: {
                name: validateFields.data?.name,
                description: validateFields.data?.description,
                carType: validateFields.data?.carType,
                company: validateFields.data?.company,
                dealer: validateFields.data?.dealer,
                images: validateFields.data.images,
                tags: validateFields.data?.tags ?? [],
                userId: user.id
            }
        })

        revalidatePath(`/cars`);
        if (data) {
            return {
                status: "success",
                message: "Your Car has been Updated successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your Car has been Updated successfully",
        };
        return state;

    } catch (err) {
        return {
            status: "error",
            message: "An error occurred while Updating the car. Please try again later.",
        };
    }
}

export async function deleteCar(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            status: "error",
            message: "User not found. Please log in to assign a task.",
        };
    }

    const carId = formData.get('carId') as string;

    try {
        const data = await prisma.car.delete({
            where: {
                id: carId,
                userId: user.id
            },
        });

        revalidatePath(`/cars`);

        if (data) {
            return {
                status: "success",
                message: "Your Car has been Deleted successfully",
            };
        }

        const state: State = {
            status: "success",
            message: "Your Car has been Deleted successfully",
        };
        return state;
    } catch (error) {
        console.error("Error deleting task:", error);
        return {
            status: "error",
            message: "An error occurred while deleting the task. Please try again later.",
        };
    }
}
