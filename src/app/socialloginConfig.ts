import {
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angular5-social-login';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("896599936424-sgksj21vmvarmdan0no33ie4f707hr6m.apps.googleusercontent.com")
      },
    ]
);
return config;
}
