import { http, HttpResponse } from "msw";
import type { LoginRequest, LoginResponse, ErrorResponse } from "../types/api";
import { user01History, user02History, user03History } from "./data";
import bcrypt from "bcryptjs";

export const handlers = [
    http.post("/login", async ({ request }) => {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "http://localhost",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        };

        const { username, password }: LoginRequest =
            (await request.json()) as LoginRequest;

        // Simulate a password check
        // In this case we compare with the hashed version of "1234"
        const salt = bcrypt.genSaltSync(10);
        const hashDefault = bcrypt.hashSync("1234", salt);

        // In a real application, you would check the hashed password against a database
        const match = await bcrypt.compare(password, hashDefault);

        if (username === "user01" && match) {
            const response: LoginResponse = {
                token: "user01-mock-token",
                user: { id: 1, firstName: "Daniel", lastName: "Lima" },
            };

            return HttpResponse.json(response, {
                status: 200,
                headers: corsHeaders,
            });
        }

        if (username === "user02" && match) {
            const response: LoginResponse = {
                token: "user03-mock-token",
                user: { id: 2, firstName: "Marco", lastName: "Polo" },
            };

            return HttpResponse.json(response, {
                status: 200,
                headers: corsHeaders,
            });
        }

        if (username === "user03" && match) {
            const response: LoginResponse = {
                token: "user03-mock-token",
                user: { id: 3, firstName: "Joana", lastName: "Ribeiro" },
            };

            return HttpResponse.json(response, {
                status: 200,
                headers: corsHeaders,
            });
        }

        const error: ErrorResponse = {
            message:
                "The provided credentials are invalid, check for spelling mistakes in your password or username.",
        };
        return HttpResponse.json(error, {
            status: 401,
            headers: corsHeaders,
        });
    }),

    http.get("/user", ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const corsHeaders = {
            "Access-Control-Allow-Origin": "http://localhost",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        };

        if (authHeader === "Bearer user01-mock-token") {
            return HttpResponse.json(
                { id: 1, firstName: "Daniel", lastName: "Lima" },
                {
                    status: 200,
                    headers: corsHeaders,
                },
            );
        }

        if (authHeader === "Bearer user02-mock-token") {
            return HttpResponse.json(
                { id: 2, firstName: "Marco", lastName: "Polo" },
                {
                    status: 200,
                    headers: corsHeaders,
                },
            );
        }

        if (authHeader === "Bearer user03-mock-token") {
            return HttpResponse.json(
                { id: 3, firstName: "Joana", lastName: "Ribeiro" },
                {
                    status: 200,
                    headers: corsHeaders,
                },
            );
        }

        const error: ErrorResponse = { message: "Access not authorized" };
        return HttpResponse.json(error, {
            status: 403,
            headers: corsHeaders,
        });
    }),

    http.get("/history", ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const corsHeaders = {
            "Access-Control-Allow-Origin": "http://localhost",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        };

        if (authHeader === "Bearer user01-mock-token") {
            return HttpResponse.json(user01History, {
                status: 200,
                headers: corsHeaders,
            });
        }

        if (authHeader === "Bearer user02-mock-token") {
            return HttpResponse.json(user02History, {
                status: 200,
                headers: corsHeaders,
            });
        }

        if (authHeader === "Bearer user03-mock-token") {
            return HttpResponse.json(user03History, {
                status: 200,
                headers: corsHeaders,
            });
        }

        const error: ErrorResponse = { message: "Access not authorized" };
        return HttpResponse.json(error, {
            status: 403,
            headers: corsHeaders,
        });
    }),
];
