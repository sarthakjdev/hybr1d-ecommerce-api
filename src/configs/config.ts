import path from 'path'
import dotenv from 'dotenv'

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// interface for env file
interface ENV {
    PORT: number | undefined;
    SERVER_URL: string | undefined;
    DATABASE_URL: string | undefined;
    JWT_SECRET_KEY: string | undefined;
    JWT_REFRESH_SECRET_KEY: string | undefined;
}

// interface for config object generation
interface Config {
    PORT: number;
    SERVER_URL: string;
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_SECRET_KEY: string;
}

// Loading process.env as ENV interface
const getConfig = (): ENV => ({
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
})

// checking if all the nev are defined if not throw ann error
const getVerifiedConfig = (config: ENV): Config => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`)
        }
    }

    return config as Config
}

const config = getConfig()

const verifiedConfig = getVerifiedConfig(config)

export default verifiedConfig
