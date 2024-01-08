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

import { calibrationBgTask } from "../src/config/backgroundTask"
import { delay } from "@unipackage/utils"
import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import request from "supertest"
import { AppModule } from "./../src/app.module"

describe("AppController (e2e)", () => {
    let app: INestApplication
    beforeAll(async () => {
        calibrationBgTask.start()
        await delay(20000)
    }, 30000)

    afterAll(() => {
        calibrationBgTask.stop()
    })

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    afterEach(async () => {
        await app.close()
    })

    it("/tipset/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/tipset/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            .expect(201)
    }, 30000)

    it("/block/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/block/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            .expect(201)
    }, 30000)

    it("/message/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/message/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            .expect(201)
    }, 30000)

    it("/dataswapmessage/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/dataswapmessage/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            .expect(201)
    }, 30000)

    it("/datasetmetadata/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/datasetmetadata/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ datasetId: { $gt: 0, $lt: 3 } }],
                },
            })
            .expect(201)
    }, 30000)

    it("/car/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/car/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ carId: { $gt: 0, $lt: 3 } }],
                },
            })
            .expect(201)
    }, 30000)
    it("/carreplica/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/carreplica/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ carId: { $gt: 0, $lt: 3 } }],
                },
            })
            .expect(201)
    }, 30000)
    it("/datasetrequirement/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/datasetrequirement/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ datasetId: { $gt: 0, $lt: 3 } }],
                },
            })
            .expect(201)
    }, 30000)
    it("/datasetproofmetadata/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/datasetproofmetadata/query")
            .send({
                network: "calibration",
                queryFilter: {
                    conditions: [{ datasetId: { $gt: 0, $lt: 3 } }],
                },
            })
            .expect(201)
    }, 30000)

    it("/syncstatus/query (POST)", async () => {
        return request(app.getHttpServer())
            .post("/syncstatus/query")
            .send({ network: "calibration" })
            .expect(201)
    }, 30000)

    it("/version (GET)", async () => {
        return request(app.getHttpServer()).get("/version").expect(200)
    }, 30000)
})
