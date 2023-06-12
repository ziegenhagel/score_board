import {Score} from "./scores.get";
import * as fs from "fs";

const filename = "scores.json"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Read scores from file
    let scores = [];
    try {
        const fileContent = await fs.readFileSync(filename, "utf8")
        scores = JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading scores file:", error);
    }

    // Add new score to scores array
    scores.push(body);

    // Sort scores by score value in descending order
    scores.sort((a, b) => b.score - a.score);

    // Write updated scores to file
    try {
        await fs.writeFileSync(filename, JSON.stringify(scores));
        console.log("Scores written to file successfully");
    } catch (error) {
        console.error("Error writing scores to file:", error);
    }

})
