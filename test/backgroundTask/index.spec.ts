import { calibrationBgTask } from "../../src/config/backgroundTask"
import { delay } from "@unipackage/utils"
import * as dotenv from "dotenv"
dotenv.config()

describe("BackgroundTask", () => {
    beforeAll(() => {
        calibrationBgTask.start()
    })

    afterAll(() => {
        calibrationBgTask.stop()
    })

    it("background task test", async () => {
        expect(calibrationBgTask.isRunning()).toBe(true)

        const startHeight = calibrationBgTask.getStartHeight()
        expect(startHeight).toBe(Number(process.env.CALIBRATION_START_HEIGHT))

        const startSyncHeight = calibrationBgTask.getCurrentSyncHeight()
        await delay(40000)
        const endSyncHeight = calibrationBgTask.getCurrentSyncHeight()
        expect(endSyncHeight - startSyncHeight > 0).toBe(true)

        const tipsets = await calibrationBgTask.context.datastore.tipset.find(
            {}
        )
        const blocks = await calibrationBgTask.context.datastore.block.find({})
        const messages = await calibrationBgTask.context.datastore.message.find(
            {}
        )
        const dataswapMessages =
            await calibrationBgTask.context.datastore.dataswapMessage.find({})
        const datasetMetadata =
            await calibrationBgTask.context.datastore.datasetMetadata.find({})
        const car = await calibrationBgTask.context.datastore.car.find({})
        const carReplica =
            await calibrationBgTask.context.datastore.carReplica.find({})
        const datasetRequirement =
            await calibrationBgTask.context.datastore.datasetRequirement.find(
                {}
            )
        const datasetProofMetadata =
            await calibrationBgTask.context.datastore.datasetProofMetadata.find(
                {}
            )
        const matchingMetadata =
            await calibrationBgTask.context.datastore.matchingMetadata.find({})
        const matchingTarget =
            await calibrationBgTask.context.datastore.matchingTarget.find({})
        const member = await calibrationBgTask.context.datastore.member.find({})
        const matchingBids =
            await calibrationBgTask.context.datastore.matchingBids.find({})
        const datasetChallenge =
            await calibrationBgTask.context.datastore.datasetChallenge.find({})
        const datasetStatistics =
            await calibrationBgTask.context.datastore.datasetStatistics.find({})
        const matchingStorageStatisticsInfo =
            await calibrationBgTask.context.datastore.matchingStorageStatisticsInfo.find(
                {}
            )
        const storagesStatistics =
            await calibrationBgTask.context.datastore.storagesStatistics.find(
                {}
            )

        const matchingsStatistics =
            await calibrationBgTask.context.datastore.matchingsStatistics.find(
                {}
            )
        expect(tipsets.data.length > 0).toBe(true)
        expect(blocks.data.length > 0).toBe(true)
        expect(messages.data.length > 0).toBe(true)
        expect(dataswapMessages.data.length >= 0).toBe(true)
        expect(datasetMetadata.data.length >= 0).toBe(true)
        expect(car.data.length >= 0).toBe(true)
        expect(carReplica.data.length >= 0).toBe(true)
        expect(datasetRequirement.data.length >= 0).toBe(true)
        expect(datasetProofMetadata.data.length >= 0).toBe(true)
        expect(matchingMetadata.data.length >= 0).toBe(true)
        expect(matchingTarget.data.length >= 0).toBe(true)
        expect(member.data.length >= 0).toBe(true)
        expect(matchingBids.data.length >= 0).toBe(true)
        expect(datasetChallenge.data.length >= 0).toBe(true)
        expect(datasetStatistics.data.length >= 0).toBe(true)
        expect(matchingsStatistics.data.length >= 0).toBe(true)
        expect(matchingStorageStatisticsInfo.data.length >= 0).toBe(true)
        expect(storagesStatistics.data.length >= 0).toBe(true)
    }, 100000)
})
