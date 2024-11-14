"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { Car, Building2, User, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { UpdateCar } from './UpdateCar'
import { DeleteCar } from './DeleteCar'

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

export function MyCarsCard({ car }: { car: CarData }) {

    return (
        <Card className="w-full mx-auto overflow-hidden flex flex-col justify-between">
            <div>
                <CardHeader className="p-3 border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-primary font-semibold truncate">{car.name}</CardTitle>
                        <div className='flex items-center gap-1'>
                            <UpdateCar car={car} />
                            <DeleteCar car={car} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {car.images && car.images.length > 0 && (
                        <Carousel className="w-full">
                            <CarouselContent>
                                {car.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative aspect-video">
                                            <Image
                                                src={image}
                                                alt={`${car.name} - Image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                        </Carousel>
                    )}
                    <div className="px-3 py-2 ">
                        <p className="text-sm text-muted-foreground line-clamp-2">{car.description}</p>
                        <div className="flex flex-wrap gap-1 pt-2">
                            {car.tags && car.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </div>
            <CardFooter className='p-3'>
                <Button className="w-full" onClick={() => redirect(`/my-cars/${car.id}`)}>
                    View Details
                </Button>
            </CardFooter>
        </Card>
    )
}