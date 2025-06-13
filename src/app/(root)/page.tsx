"use client"
import Link from "next/link";
import {TypingEffect} from "@/components/ui/typing-effect";
import {ShimmerButton} from "@/components/magicui/shimmer-button";
import {useEffect, useState} from "react";
import Loader from "@/components/other-ui/loader";

export default function Home() {

    const header = "How are you feeling today?"
    const [loading , setLoading] = useState<Boolean>(false);

    useEffect(() => {
        console.log("Loading page");
    } , [loading])

    return (

        <div className={"h-screen flex flex-col justify-center items-center gap-8"}>
            {
                loading ?  (

                    <div>
                        <Loader />
                    </div>
                    ) :  (

                    <>
                        <span className={"text-3xl font-bold text-gray-900"}>
                                <TypingEffect text={header} />
                            </span>

                                <Link href={"/mood"} >
                                    <ShimmerButton className={"text-lg h-16 w-full font-bold "} onClick={() => {
                                        setLoading(true);
                                    }}>
                                    Submit Your Mood
                                    </ShimmerButton >
                                </Link>
                    </>
    )
            }



        </div>
    );
}
