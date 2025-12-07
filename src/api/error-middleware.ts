import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { AuthActions } from "../store/slices/auth-slice";
import { dispatch } from "./store";


export const ErrorLoggerMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action: any) => {
        const message =
            action?.payload?.data?.message || action?.payload?.data?.Message || "";
        const status = action?.payload?.status;

        if (message && status) {
            console.log("ErrorLoggerMiddleware triggered", {
                message,
                status,
            });
            // ErrorToast({ message })
            //   errorToast({
            //     message,
            //     description: `Status: ${status}`,
            //   });

            console.log("ErrorLoggerMiddleware triggered", {
                message,
                status,
            });
        }

        if (status === 401) {
            console.log("Unauthorized access detected, redirecting to sign-in page");

            // dispatch(AuthActions.logout());

            // history.push(
            //     `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
            // );
        }
        return next(action);
    };
