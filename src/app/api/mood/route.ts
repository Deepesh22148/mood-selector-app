import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {append, getAllData} from "@/app/api/utils/moods";

export async function POST(request: NextRequest) {

    try {
        const requestBody = await request.json();

        const {emotion, comment, time} = requestBody;

        const data = {
            emotion: emotion,
            comment: comment,
            time: time
        }
        const response = append({
            body: data,
        })

        if(!response){
            return NextResponse.json({
                status: 500,
                message: 'Something went wrong while saving the data!'
            })
        }

        console.log(data);

        return NextResponse.json(
            {
                status: 200,
                message: "Your response has been registered successfully",
            }
        );
    }
    catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                status: 500,
                message: "Error while retrieving the data!",
                data : []
            }
        );
    }
}

export async function GET(request: NextRequest) {
    const response = getAllData();
    // if response is empty it either means the data is empty or some error occurred
    // since the array is on runtime so there is almost no chance of error while fetching

    console.log(response);

    return NextResponse.json({
        status: 200,
        message : "Successfully retrieved data!",
        data : response
    })

}
