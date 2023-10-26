/* N.B. Keep in sync with scripts/collect-data.ts */
export type Repo = {
    owner: {
        avatarUrl: string;
        login: string;
        url: string;
    };
    name: string;
    descriptionHTML: string | null;
    diskUsage: number;
    primaryLanguage: {
        color: string;
        name: string;
    } | null;
    latestRelease: string | null;
    license: string | null;
    stars: number | null;
    updatedAt: string;
    url: string;
};
