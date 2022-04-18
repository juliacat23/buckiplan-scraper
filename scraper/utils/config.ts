import fs from 'fs';
import { is } from 'typescript-is';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

export async function readConfigFromDisk(): Promise<ConfigRoot> {
    console.log('readConfigFromDisk');
    const configLoc = '/config/config.json';

    if (fs.existsSync('/config')) {
        // if file exists
        if (fs.existsSync(configLoc)) {
            // read it
            let configRaw: any = await readFile(configLoc, {
                encoding: 'utf-8',
            });
            // check its type
            let configData = null;
            try {
                configData = JSON.parse(configRaw);
            } catch (err) {}

            // automatically check type guard
            if (is<ConfigRoot>(configData)) {
                // if type is good
                return configData;
            }
        }
    } else {
        await mkdir('/config');
    }

    // if a valid file wasn't found, create a new one
    let sampleConfig: ConfigRoot = {
        Courses: [
            {
                Subject: 'BIO',
                CatalogNumber: '1113',
                SemesterCode: '1222',
                DesiredSectionNumbers: [],
            },
        ],
        Telegram: {
            BotToken: 'jladsoiasdmnaisdnasdh',
            ChatId: '-4467267424',
        },
    };

    await writeFile(configLoc, JSON.stringify(sampleConfig, null, 1), 'utf-8');
    return await readConfigFromDisk();
}

export interface ConfigRoot {
    Courses: ConfigCourse[];
    Telegram: ConfigTelegram;
}

export interface ConfigCourse {
    Subject: string;
    CatalogNumber: string;
    SemesterCode: string;
    DesiredSectionNumbers: string[];
}

export interface ConfigTelegram {
    BotToken: string;
    ChatId: string;
}

export const SAMPLE_PSID = '123456';
