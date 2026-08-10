

import fs from "fs";
import {parse} from 'csv-parse/sync';

export class JsonHelper{
    static readJson(filePath: string): Record<string, string>[]{
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
}