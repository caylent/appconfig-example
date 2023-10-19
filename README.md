# AWS AppConfig Example

## Feature flags

You should set a feature flags config profile with 2 features, `feature1` and `feature2` with an attribute `color`.
The expected `JSON` should look something like this:

```json
 {
    "feature1": {
        "enabled": true,
        "color": "green"
    },
    "feature2": {
        "enabled": true,        
        "color": "violet"
    }
 }
```

## Install dependecies

```bash
 ~$ npm i
```

## Run example

```bash
 ~$ npm start
```

Note: Be sure your aws credentials and the env variables are loaded in place

### Env variables

* `APP_ID`: The ID of the application in AWS AppConfig.
* `ENV_ID`: The environment ID of the application used.
* `FF_ID`: The feature flag configuration id of the application.
