import {Score} from "./scores.get";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return await Score.create(body)
})
