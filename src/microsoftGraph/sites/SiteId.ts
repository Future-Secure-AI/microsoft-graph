export type SiteId = string & { // SiteId is in the format `{hostname},{site-collection-id},{web-id}` and therefore implicity contains the hostname
    __brand: "SiteId";
};

