
import * as fs from 'fs';
import * as path from 'path';

import { UIFileRequest } from '../interfaces/file.interface';

const destinationFiles = `${__dirname}../../uploads`;

const FileCore = {
    uploadFile: async (file: UIFileRequest) => {

        const regex = new RegExp(`^data:${file.mimetype}\/${file.extension};base64,`, 'gi');
        const base64Image = file.base64?.split(';base64,').pop();

        await fs.writeFileSync(path.resolve(__dirname, `../../../uploads/${file.id}.${file.extension}`), base64Image!, 'base64');
    },
    getBase64: async (file: UIFileRequest) => {
        const envFilePath = path.resolve(__dirname, `../../../uploads/${file.id}.${file.extension}`);
        const isExistsPath = fs.existsSync(envFilePath);

        if (!isExistsPath) {
            console.log('file does not exists!!!');
            process.exit(0);
        }

        const readFile = fs.readFileSync(envFilePath);

        const regex = new RegExp(`^data:${file.mimetype}\/${file.extension};base64,`, 'gi');
        const base64Data = readFile.toString('base64').replace(regex, "");

        return base64Data;
    },
    getFile: async (file: string) => {
        const envFilePath = `${destinationFiles}/${file}`;
        const isExistsPath = fs.existsSync(envFilePath);

        if (!isExistsPath) {
            console.log('file does not exists!!!');
            process.exit(0);
        }

        const readFile = fs.readFileSync(envFilePath);

        return readFile;
    }
}

export default FileCore;
