import { Octokit } from '@octokit/core';
import { createActionAuth } from '@octokit/auth-action';
import { writeFile } from 'fs';

const octokit = new Octokit({
  authStrategy: createActionAuth,
  previews: ["hawkgirl-preview"],
});

(async () => {
  const extensions: any = await octokit.graphql(`
    query {
      search(query: "topic:disnake-extension", type: REPOSITORY, first: 10) {
        edges {
          node {
            ... on Repository {
              owner {
                avatarUrl
                login
                url
              }
              name
              dependencyGraphManifests { ... }
              descriptionHTML
              diskUsage
              homepageUrl
              primaryLanguage { ... }
              latestRelease { ... }
              licenseInfo {
                spdxId
              }
              stargazerCount
              updatedAt
              url
            }
          }
        }
      }
    }
  `);

  const content = JSON.stringify(extensions);
  writeFile("./data.json", content, () => {});
})().then(() => console.log("done"));
