import * as fs from "fs"
import * as path from "path"
import * as fsPromise from "fs/promises"

import { InternalServerErrorException } from "@nestjs/common"
import { UIFileRequest } from "../interfaces/file.interface"

const destinationFiles: string = path.resolve(process.cwd(), "uploads")
const destinationFileDocuments: string = path.resolve(process.cwd(), "src", "documents")

class FileCore {

  static convertBufferToObjectFile(buffer: Buffer, attributes?: UIFileRequest): UIFileRequest {

    const base64 = Buffer.from(buffer).toString("base64")

    return <UIFileRequest>{
      base64: base64,
      ...attributes
    }
  }

  static fileExist(fileName: string): boolean {
    const envFilePath = `${destinationFiles}/${fileName}`
    const isExistsPath = fs.existsSync(envFilePath)
    return isExistsPath
  }

  // static async uploadFile(file: FileUpload) {
  //   const base64FIle = file.base64?.split("base64,").pop()

  //   const destination = path.resolve(destinationFiles, `./${file.id}.${file.extension}`)

  //   await fs.writeFileSync(destination, base64FIle, "base64")
  // }

  static async getBase64(file: UIFileRequest) {

    try {

      const envFilePath = path.resolve(destinationFiles, `./${file.id}.${file.extension}`)
      const isExistsPath = fs.existsSync(envFilePath)

      if (!isExistsPath) {
        throw new InternalServerErrorException("File does not exists!")
      }

      const readFile = fs.readFileSync(envFilePath)

      const regex = new RegExp(`^data:${file.mimetype}\/${file.extension}base64,`, "gi")
      const base64Data = readFile.toString("base64").replace(regex, "")

      return base64Data
    } catch (error) {

      throw error
    }
  }

  static async getFile(file: string) {
    try {

      const envFilePath = `${destinationFiles}/${file}`
      const isExistsPath = fs.existsSync(envFilePath)

      if (!isExistsPath) {
        throw new InternalServerErrorException("File does not exists!")
      }

      const readFile = fs.readFileSync(envFilePath)

      return readFile
    } catch (error) {

      throw error
    }
  }

  static async getFileFromDocuments(file: string) {

    try {

      const envFilePath = `${destinationFileDocuments}/${file}`
      const isExistsPath = fs.existsSync(envFilePath)

      if (!isExistsPath) {
        throw new InternalServerErrorException("File does not exists!")
      }

      const readFile = fs.readFileSync(envFilePath)

      return readFile
    } catch (error) {

      throw error
    }
  }

  static async getFileFromDocumentsUTF(file: string) {

    try {

      const envFilePath = `${destinationFileDocuments}/${file}`
      const isExistsPath = fs.existsSync(envFilePath)

      if (!isExistsPath) {
        throw new InternalServerErrorException("File does not exists!")
      }

      const readFile = await fsPromise.readFile(envFilePath, "utf-8")

      return readFile
    } catch (error) {

      throw error
    }
  }

}

export default FileCore
