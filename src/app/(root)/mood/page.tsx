"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { motion } from 'framer-motion'
import { emojiOptions } from "@/constant"

const moodFormSchema = z.object({
    comment: z.string().optional(),
    moodOptions: z.enum(["happy", "neutral", "sad"]),
    time: z.date()
})

export default function Page() {
    const router = useRouter()
    const [submit, setSubmit] = useState(false)
    const [selectedMood, setSelectedMood] = useState("happy")

    const moodForm = useForm<z.infer<typeof moodFormSchema>>({
        resolver: zodResolver(moodFormSchema),
        defaultValues: {
            comment: "",
            moodOptions: "happy",
            time: new Date()
        }
    })

    async function onSubmit(values: z.infer<typeof moodFormSchema>) {
        values.time = new Date()
        const response = await axios.post("/api/mood", {
            emotion: values.moodOptions,
            comment: values.comment,
            time: values.time
        })

        if (response.status === 200) {
            setSubmit(true)
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 text-xl">
            {submit ? (
                <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg sm:p-8 mr-3">
                    <h2 className="text-2xl font-bold">Thank you!</h2>
                    <p className="text-gray-600">Your mood has been recorded</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                        <Button onClick={() => setSubmit(false)} variant="outline" className="w-full sm:w-auto">
                            Submit Another
                        </Button>
                        <Button onClick={() => router.push("/")} className="w-full sm:w-auto">
                            Return Home
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl sm:p-8">
                    <Form {...moodForm}>
                        <form onSubmit={moodForm.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="moodOptions"
                                control={moodForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">How are you feeling?</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-2 py-4 sm:gap-4">
                                                {emojiOptions.map((option) => (
                                                    <motion.button
                                                        key={option.value}
                                                        type="button"
                                                        className={`flex-1 rounded-lg p-2 sm:p-4 ${
                                                            selectedMood === option.value ? "bg-primary/10" : "hover:cursor-pointer"
                                                        }`}
                                                        onClick={() => {
                                                            setSelectedMood(option.value)
                                                            field.onChange(option.value)
                                                        }}
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <span className="text-4xl">{option.emoji}</span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="comment"
                                control={moodForm.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Share your thoughts</FormLabel>
                                        <FormControl>
                                            <Input placeholder="What's on your mind?" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <ShimmerButton type="submit" className="w-full font-bold">
                                Submit
                            </ShimmerButton>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    )
}
