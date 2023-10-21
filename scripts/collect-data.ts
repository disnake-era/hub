import { Octokit } from '@octokit/core';
import { createActionAuth } from '@octokit/auth-action';
import { writeFileSync } from 'fs';

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
              dependencyGraphManifests(first: 10, withDependencies: true) {
                edges {
                  node {
                    dependencies(first: 10) {
                      edges {
                        node {
                          packageManager
                          packageName
                          requirements
                        }
                      }
                    }
                  }
                }
              }
              descriptionHTML
              diskUsage
              homepageUrl
              primaryLanguage {
                color
                name
              }
              latestRelease {
                tagName
              }
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

  let exts: Array<Map<string, any>> = [];

  for (const repo_edge of extensions) {
    console.debug(`ITER REPO = ${repo_edge}`)
    let repo = repo_edge.node;
    let map = new Map();

    map.set("owner", repo.owner);
    map.set("name", repo.name);
    map.set("descriptionHTML", repo.descriptionHTML);
    map.set("diskUsage", repo.diskUsage);
    map.set("homepageUrl", repo.homepageUrl);
    map.set("primaryLanguage", repo.primaryLanguage);
    map.set("latestRelease", repo.latestRelease);
    map.set("licenseInfo", repo.licenseInfo);
    map.set("stargazerCount", repo.stargazerCount);
    map.set("updatedAt", repo.updatedAt);
    map.set("url", repo.url);

    exts.push(map);
  }

  console.debug(`EXTS = ${exts}`)

  writeFileSync("data.json", JSON.stringify(exts));
})().then(() => console.log("done"));
