class GobalConfig {
    baseUrl!: string;
    constructor() {
        if (process.env.NODE_ENV == 'development') {
            this.baseUrl = 'https://uat.youngala.com'
        }
        else if (process.env.NODE_ENV == 'production') {
            this.baseUrl = 'https://openapi.youngala.com'
        }
    }
}

let gobalConfig = new GobalConfig()
export {
    gobalConfig
}