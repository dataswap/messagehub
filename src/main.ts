/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as dotenv from "dotenv"
dotenv.config()

/**
 * Application bootstrap function.
 */
async function bootstrap() {
    // Create a NestJS application instance
    const app = await NestFactory.create(AppModule)

    // Start the application, listening on port 3000
    await app.listen(Number(process.env.PORT))
}

// Call the bootstrap function to start the application
bootstrap()
