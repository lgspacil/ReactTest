export const config = {
    version: 2,
    environment: {
        dev: {
            title: 'Development',
            api: {
                endpoint: 'https://dev.terraclear.com/v1',
                region: 'us-west-2',
            },
            cognito: {
                region: 'us-west-2',
                userPoolId: 'us-west-2_XBMXioBoa',
                userPoolWebClientId: '439cjv2en2k6eso4r8stgb0uou',
                identityPoolId: 'us-west-2:fd6709e5-8381-4071-a0b9-2e00d2906fb8',
            },
            tileBucket: 'https://terramap-services-tile-bucket-dev.s3-us-west-2.amazonaws.com',
        },
        staging: {
            title: 'Staging',
            api: {
                endpoint: 'https://staging.terraclear.com/v1',
                region: 'us-west-2',
            },
            cognito: {
                region: 'us-west-2',
                userPoolId: 'us-west-2_j6qjFSjU2',
                userPoolWebClientId: '5f5gln2pv47k4mi5ubj9fp1bak',
                identityPoolId: 'us-west-2:fd6709e5-8381-4071-a0b9-2e00d2906fb8',
            },
            tileBucket: 'https://terramap-services-tile-bucket-staging.s3-us-west-2.amazonaws.com',
        },
        prod: {
            title: 'Production',
            api: {
                endpoint: 'https://prod.terraclear.com/v1',
                region: 'us-west-2',
            },
            cognito: {
                region: 'us-west-2',
                userPoolId: 'us-west-2_GQ96ueNL4',
                userPoolWebClientId: '7mjrs2ombragmie5ducc8ls930',
                identityPoolId: 'us-west-2:fd6709e5-8381-4071-a0b9-2e00d2906fb8',
            },
            tileBucket: 'https://terramap-services-tile-bucket-prod.s3-us-west-2.amazonaws.com',
        }
    },
}