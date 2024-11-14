"use client"

import { addNewCar, updateCar } from '@/app/action'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React, { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { SubmitButton } from '../global/SubmitButton'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { UploadDropzone } from '@/app/lib/uploadthing'
import { Edit, X } from 'lucide-react'

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

export const UpdateCar = ({ car }: { car: CarData }) => {
    const initialState = { message: "", status: undefined, errors: {} }
    const [state, formAction] = useActionState(updateCar, initialState)
    const [tags, setTags] = useState<string[]>(car.tags)
    const [tagInput, setTagInput] = useState<string>("")
    const [images, setImages] = useState<string[]>(car.images)

    useEffect(() => {
        console.log("State updated:", state)
        if (state.status === "success") {
            toast.success(state.message)
            setImages([]);
            setTags([]);
        } else if (state.status === "error") {
            toast.error(state.message)
        }
    }, [state])

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setTags((prevTags) => [...prevTags, tagInput.trim()])
            setTagInput("")
        }
    }

    const handleRemoveTag = (index: number) => {
        setTags((prevTags) => prevTags.filter((_, i) => i !== index))
    }

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    }

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Edit className='size-4' />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-6">
                    <SheetHeader>
                        <SheetTitle className="text-3xl font-bold mb-6">Add Car</SheetTitle>
                    </SheetHeader>
                    <form action={formAction} className="space-y-6">
                        <input type="hidden" name="carId" value={car.id} id='carId'/>
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-left text-sm font-medium">
                                Name
                            </Label>
                            <Input id="name" name="name" defaultValue={car.name} placeholder="BMW" className="w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-left text-sm font-medium">
                                Description
                            </Label>
                            <Textarea placeholder="BMW is a great car" defaultValue={car.description} name="description" className="w-full min-h-[100px]" />
                        </div>
                        <div className="space-y-2">
                            <input type="hidden" name="images" value={JSON.stringify(images)} />
                            <Label className="text-sm font-medium">Product Images</Label>
                            <UploadDropzone
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    setImages((prevImages) => [...prevImages, ...res.map((item) => item.url)])
                                    toast.success("Your images have been uploaded")
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error("Something went wrong, try again")
                                }}
                            />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                {images.map((image, index) => (
                                    <div key={image} className="relative group border-2 border-primary/20 rounded-lg">
                                        <Image
                                            src={image}
                                            alt={`Uploaded image ${index + 1}`}
                                            width={200}
                                            height={200}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Car Type</Label>
                            <Input name="carType" type="text" defaultValue={car.carType} placeholder="Sports Car" required minLength={3} className="w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Company</Label>
                            <Input name="company" type="text" defaultValue={car.company} placeholder="BMW" required minLength={3} className="w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Dealer</Label>
                            <Input name="dealer" type="text" defaultValue={car.dealer} placeholder="AutoMax" required minLength={3} className="w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Enter a tag"
                                    className="flex-grow"
                                />
                                <Button type="button" onClick={handleAddTag} variant="outline">
                                    Add Tag
                                </Button>
                            </div>
                            <input type="hidden" name="tags" value={JSON.stringify(tags)} />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center gap-2"
                                    >
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(index)} className="text-secondary-foreground/70 hover:text-secondary-foreground">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <SubmitButton text="Update Car" />
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}