import fs from "fs"
import { globby } from "globby"
import { firstnames, lastnames } from "../resources/FakeNames.js"

export function generateRandomNickname() {
    const firstnameIndex = Math.floor(Math.random() * firstnames.length)
    const lastnameIndex = Math.floor(Math.random() * lastnames.length)

    return `${firstnames[firstnameIndex]} ${lastnames[lastnameIndex]}`
}

export async function getRandomProfilePicture() {
    const images = await globby("public/images", {
        expandDirectories: {
            extensions: ["png"]
        }
    })

    if (images.length == 0)
        throw new Error("Server doesn't have any images yet.")

    const result = images[Math.floor(Math.random() * images.length)]

    return result.replace("public", "")
}

export function pictureExists(picturePath: string) {
    return fs.existsSync(`public/${picturePath}`)
}
