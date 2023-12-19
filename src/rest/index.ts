import Router from "@koa/router";
import Application from "koa";
import user from "./user";
import health from "./health";
import folder from "./publicFolder";
import auth from "./auth";
import userIDHandler from "../core/userIDHandler";

// From this file we will further install other routers to various endpoints.
// This is the main entry point for the REST API.
const installRest = (app: Application) => {
    // create a router for the /api endpoint
    const router = new Router({
        prefix: "/api",
    });

    router.use(async (ctx, next) => {
        userIDHandler.resetUserID(); // We're making sure that the userID is reset for each request.
        await next();
    });

    // add a route for the GET /api/ request
    // .get() is a method that takes a path and a callback function. If the path matches, the callback function is called.
    router.get("/", async (ctx) => {
        ctx.body = "API";
    });

    // Create nested routers for various endpoints
    health.installRouter(router); // install the health router
    user.installRouter(router); // install the user router
    folder.installRouter(router); // install the folder router
    auth.installRouter(router); // install the auth router

    // add the router to the koa app
    app.use(router.routes()).use(router.allowedMethods());
};

export default { installRest };
