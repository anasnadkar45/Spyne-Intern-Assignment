import { DeleteCar } from '@/app/components/cars/DeleteCar'
import prisma from '@/app/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Car, Building2, User } from 'lucide-react'
import { UpdateCar } from '@/app/components/cars/UpdateCar'

const getCarData = async (userId: string, id: string) => {
  const data = await prisma.car.findUnique({
    where: {
      userId: userId,
      id: id
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

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id as string;
  const id = (await params).id
  const car = await getCarData(userId, id)

  if (!car) {
    notFound()
  }

  return (
    <div className="mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{car.name}</h1>
        <div className='flex items-center gap-1'>
          <UpdateCar car={car} />
          <DeleteCar car={car} />
        </div>
      </div>

      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {car.images && car.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video">
                <Image
                  src={image}
                  alt={`${car.name} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{car.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="w-5 h-5" />
              <span className="font-semibold">Type:</span>
              <span>{car.carType}</span>
            </div>
            <Separator />
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span className="font-semibold">Company:</span>
              <span>{car.company}</span>
            </div>
            <Separator />
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span className="font-semibold">Dealer:</span>
              <span>{car.dealer}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>Features and characteristics of this car</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {car.tags && car.tags.map((tag, index) => (
              <Badge key={index} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}