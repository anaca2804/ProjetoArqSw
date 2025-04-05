import * as express from "express";
import { Router } from "./common/router";

const { name, version, description} = require('../package.json')

class MainRouter extends Router {
    applyrouter(application: express.Application){
        application.get('/', (req, resp, next) => {
            resp.json({
                name,
                version,
                description
            })
        })
    }
}

export const mainRouter = new MainRouter()