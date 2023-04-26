// import fs from "fs"
import { firstnames, lastnames } from "../resources/FakeNames.js"

/*
export function getAllFilesFromFolder(dir: string) {
    return fs.readdirSync(dir).map(file => {
        file = dir + "/" + file
        const stat = fs.statSync(file)

        return stat && stat.isDirectory() ? getAllFilesFromFolder(file) : file
    })
}
*/

export function generateRandomNickname() {
    const firstnameIndex = Math.floor(Math.random() * firstnames.length)
    const lastnameIndex = Math.floor(Math.random() * lastnames.length)

    return `${firstnames[firstnameIndex]} ${lastnames[lastnameIndex]}`
}

/*
export function getRandomPhoto() {
    const images = this.getAllFilesFromFolder("./public/resources/images")
    const result = images[Math.floor(Math.random() * images.length)]

    return result.replace("./public/resources/images", "")
}
*/
