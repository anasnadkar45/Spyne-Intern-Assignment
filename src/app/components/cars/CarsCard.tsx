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

export function CarsCard({ car }: { car: CarData }) {

    return (
        <Card className="w-full max-w-sm mx-auto overflow-hidden">
            <CardHeader className="p-4 border-b mb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold truncate">{car.name}</CardTitle>
                    <div className='flex items-center gap-1'>
                        <UpdateCar car={car} />
                        <DeleteCar car={car} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-2">
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
                <div className="p-4 space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{car.description}</p>
                    <div className="flex items-center text-sm">
                        <Car className="w-4 h-4 mr-1" />
                        <span className="truncate">{car.carType}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span className="truncate">{car.company}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-1" />
                        <span className="truncate">{car.dealer}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2">
                        {car.tags && car.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4">
                <Button className="w-full" onClick={() => redirect(`/cars/${car.id}`)}>
                    View Details
                </Button>
            </CardFooter>
        </Card>
    )
}