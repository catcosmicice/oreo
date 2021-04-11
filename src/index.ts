import * as dotenv from "dotenv";
import "module-alias/register";
import { Oreo } from "@oreo/lib/Oreo";
import '@oreo/lib/structures'

dotenv.config({
    path: ".env"
});

const client = new Oreo();

client.login(process.env.TOKEN);
