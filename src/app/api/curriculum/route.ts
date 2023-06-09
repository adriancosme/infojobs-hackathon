import { ICurriculum } from "@/models";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.infojobs.net"
const CURRICULUM_ENDPOINT = `${BASE_URL}/api/2/curriculum`;
const EXPERIENCE_ENDPOINT = (id: string) => `${BASE_URL}/api/2/curriculum/${id}/experience`;
const CLIENT_ID = process.env.INFOJOBS_CLIENT_ID;
const CLIENT_SECRET = process.env.INFOJOBS_CLIENT_SECRET;
const BASIC_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
);
export async function GET(req: NextRequest) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const { accessToken } = session;
    const resListCurriculums = await fetch(CURRICULUM_ENDPOINT, {
        headers: {
            Authorization: `Basic ${BASIC_TOKEN},Bearer ${accessToken}`,
        }
    })
    const data = await resListCurriculums.json();

    const getPrincipalCurriculum = data.find((curriculum: ICurriculum) => curriculum.principal === true);

    if (!getPrincipalCurriculum) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const curriculum = getPrincipalCurriculum;

    const resExperiences = await fetch(EXPERIENCE_ENDPOINT(curriculum.code), {
        headers: {
            Authorization: `Basic ${BASIC_TOKEN},Bearer ${accessToken}`,
        },
    })

    const dataExperience = await resExperiences.json();

    return NextResponse.json({
        dataExperience,
    });
}