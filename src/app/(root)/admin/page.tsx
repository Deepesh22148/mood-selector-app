"use client"

import React, { useEffect, useState } from 'react'
import { dataType } from "@/app/api/utils/moods"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Loader from "@/components/other-ui/loader"
import { emojiOptions } from "@/constant"
// Pagination configuration
const ITEMS_PER_PAGE = 10

export default function Page() {
    const [moodCollection, setMoodCollection] = React.useState<dataType[]>([])
    const [error, setError] = React.useState<string>("")
    const [loading, setLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter()

    const getDataFunction = async () => {
        try {
            const response = await axios.get("/api/mood")
            return {
                status: response.status,
                data: response.data.data,
                message: "Data Received successfully."
            }
        } catch (e) {
            console.log(e)
            return {
                status: 500,
                message: e instanceof Error ? e.message : "An error occurred",
                data: []
            }
        }
    }

    useEffect(() => {
        getDataFunction().then(response => {
            if (response.status === 500) {
                setError(response.message)
                setLoading(false)
                setMoodCollection([])
                return
            }

            setMoodCollection(response.data)
            setError("")
            setLoading(false)
        })
    }, [])

    const totalItems = moodCollection?.length || 0
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedData = moodCollection?.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    if (loading) {
        return (
            <div className="flex justify-center items-center w-screen h-screen">
                <Loader />
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center w-full p-4">
            {error.length > 0 ? (
                <div className="text-red-500">
                    Error: {error}
                </div>
            ) : (
                <div className="w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-4">
                        <Button onClick={() => router.push("/")}>
                            Home
                        </Button>
                        {totalItems > 0 && (
                            <div className="text-sm text-gray-500">
                                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} entries
                            </div>
                        )}
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <Table >
                            <TableHeader>
                                <TableRow className={"text-lg font-bold hover:transition-none"}>


                                    <TableHead>Index</TableHead>
                                    <TableHead>Emotion</TableHead>
                                    <TableHead>Comment</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className={"divide-y divide-gray-200 "}>
                                {paginatedData?.map((item, index) => (
                                    <TableRow key={startIndex + index} className={"odd:bg-white even:bg-gray-50 hover:cursor-pointer p-20"}>
                                        <TableCell>{startIndex + index + 1}</TableCell>
                                        <TableCell>
                                            {emojiOptions.find(option => option.value === item.emotion)?.emoji || item.emotion}
                                        </TableCell>
                                        <TableCell>{item.comment}</TableCell>
                                        <TableCell>{new Date(item.time).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
