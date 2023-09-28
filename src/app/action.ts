"use server";

import { cookies } from "next/headers";

export async function setIntervieweeCookie() {
    cookies().set({
        name: "hirelight_access_token",
        value: "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJuZ2tpZW4yOTlAZ21haWwuY29tIiwiZW1haWwiOiJuZ2tpZW4yOTlAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ0FORElEQVRFIiwicm9sZSI6IkNBTkRJREFURSIsImV4cCI6MTY5NTcyNzIzMX0.q6HjYGDbQc-pKma5yP3XIvXMlie9_M-Yhkgz-F0162YESuGshlyVjSe6I4ONElaE6xM7QYbnfqmsacxrvKzqxg",
        httpOnly: true,
        sameSite: true,
        domain: "jobs.localhost:3000",
    });
}
