import cors from "restify-cors-middleware2"

export default cors({
    allowHeaders: ['*'],
    exposeHeaders: ['*'],
    allowCredentialsAllOrigins: true
})