export const environment = {
  production: true,
  WSO2: {
      ISSUER: 'https://www.monex.com.mx/api/iam/oauth2/token',
      LOGIN_REDIRECT: '/login',
      LOGOUT_REDIRECT: '/',
      CONSUMER: {
          KEY: '7mtNj6Bx5dHHWVaNUlTtzwZdQJ8a',
          SECRET: 's8tf__mJWlHqr2WQOEXWHTHCslYa'
      },
      AUTH_URL: 'https://www.monex.com.mx/api/iam',
  // DESARROLLO
      APIS: {
          FX_URL: 'https://fx-mgw-fxdivisas-dev.apps.monex-desarroll.q4v7.p1.openshiftapps.com/fx/v1',
          SCOPES: 'openid'
      },
  },
};
