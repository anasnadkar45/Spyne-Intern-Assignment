'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { CarsCard } from './CarsCard'

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

export const CarsList = ({ cars }: { cars: CarData[] }) => {
    const [searchInput, setSearchInput] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [updatedResults, setUpdatedResults] = useState(cars)

    useEffect(() => {
        const searchCar = () => {
            const updatedCars = cars.filter((car) => {
                const matchesSearch = 
                    car.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    car.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                    car.company.toLowerCase().includes(searchInput.toLowerCase())
                
                const matchesFilter = 
                    filterType === 'all' || car.carType.toLowerCase() === filterType.toLowerCase()
                
                return matchesSearch && matchesFilter
            })
            setUpdatedResults(updatedCars)
        }

        searchCar()
    }, [searchInput, filterType, cars])

    const clearSearch = () => {
        setSearchInput('')
        setFilterType('all')
    }

    const uniqueCarTypes = Array.from(new Set(cars.map(car => car.carType)))

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <Input
                        placeholder="Search cars..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-10 pr-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    {searchInput && (
                        <Button
                            variant="ghost"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={clearSearch}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueCarTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            {updatedResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {updatedResults.map((car) => (
                        <CarsCard key={car.id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-xl text-muted-foreground">No cars found. Try adjusting your search or filter.</p>
                </div>
            )}
        </div>
    )
}