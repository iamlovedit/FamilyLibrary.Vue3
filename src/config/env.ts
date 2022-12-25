class GobalConfig {
    baseUrl!: string;
    constructor() {
        if (process.env.NODE_ENV == 'development') {
            this.baseUrl = 'https://localhost:5001/'
        }
        else if (process.env.NODE_ENV == 'production') {

        }
    }
}

let gobalConfig = new GobalConfig()
export {
    gobalConfig
}