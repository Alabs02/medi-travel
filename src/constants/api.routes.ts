export const routes = {
  internal: {
    // SPOOL_POLLS: (queryParams: object) => {
    //   const filteredQueryParams = Object.fromEntries(
    //     Object.entries(queryParams).filter(([key, value]) => value !== null)
    //   );
    //   const queryStrings = new URLSearchParams(filteredQueryParams);
    //   const url = `/pandar-polls?${queryStrings.toString()}`;
    //   return url;
    // },
  },
  external: {
    SPOOL_STATES: `https://api.countrystatecity.in/v1/states`,
    SPOOL_COUNTRIES: `https://api.countrystatecity.in/v1/countries`,
    SPOOL_CITIES: (query: string) =>
      `https://www.universal-tutorial.com/api/cities/${query}`
  }
};
