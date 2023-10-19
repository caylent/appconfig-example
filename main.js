import * as AWS from "@aws-sdk/client-appconfigdata";
import express from 'express';

const app = express();
const appConfig = new AWS.AppConfigData({ region: "us-east-1" });
const PORT = 3000;

const APP_ID = process.env.APP_ID;
const ENV_ID = process.env.ENV_ID;
const FF_ID = process.env.FF_ID;

console.log('APP_ID: ' + APP_ID)
console.log('ENV_ID: ' + ENV_ID)
console.log('FF_ID: ' + FF_ID)

/*
 {
    feature1: {
        enabled: true
        color: 'green'
    },
    feature2: {
        enabled: true,
        color: 'violet'
    }
 }
*/
app.get('/fflags', async (_, res) => {
    try {
        const session = await appConfig.startConfigurationSession({
            EnvironmentIdentifier: ENV_ID,
            ApplicationIdentifier: APP_ID,
            ConfigurationProfileIdentifier: FF_ID,
        });
    
        const response = await appConfig.getLatestConfiguration({
            ConfigurationToken: session.InitialConfigurationToken
        });

        const configStr = Buffer.from(response.Configuration).toString('utf8');
        const config = JSON.parse(configStr);

        res.json(config)
    } catch (err) {
        console.error('Error retrieving feature flags:', err);
        res.json(500, { error: err });
    }
});

app.use(express.static('public'));
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
