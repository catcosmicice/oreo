import "module-alias/register";
import { Oreo } from "@oreo/lib/Oreo";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const client = new Oreo();

client.login(process.env.TOKEN);
