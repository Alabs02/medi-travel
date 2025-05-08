export const routes = {
  internal: {
    ROLES: "/roles",
    ROLE_BY_ID: (id: string) => `/roles/${id}`,

    ADMIN_ANALYTICS: "/admin/analytics",
    ADMIN_USERS: "/admin/users",

    ADMIN_USER: (id: string) => `/admin/users/${id}`,
    ADMIN_ENABLE_USER: (id: string) => `/admin/users/${id}/enable`,
    ADMIN_DISABLE_USER: (id: string) => `/admin/users/${id}/disable`,

    USER_PROFILE: "/users/me",
    SPOOL_USERS: (queryParams: object) => {
      const filteredQueryParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          ([key, value]) => value !== null && value !== undefined
        )
      );

      const queryStrings = new URLSearchParams(filteredQueryParams);
      const url = `/admin/users?${queryStrings.toString()}`;
      return url;
    }
  },
  external: {
    SPOOL_STATES: `https://api.countrystatecity.in/v1/states`,
    SPOOL_COUNTRIES: `https://api.countrystatecity.in/v1/countries`,
    SPOOL_CITIES: (query: string) =>
      `https://www.universal-tutorial.com/api/cities/${query}`
  }
};
