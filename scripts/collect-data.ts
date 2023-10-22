import { Octokit } from '@octokit/core';
import { writeFileSync } from 'node:fs';

const octokit = new Octokit({ auth: process.env.PAT1 });

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
              descriptionHTML
              diskUsage
              homepageUrl
              primaryLanguage {
                color
                name
              }
              latestRelease {
                tagName
                publishedAt
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

  let exts: Array<Map<string, any>> = new Array();

  for (const repo_edge of extensions.search.edges) {
    let repo = repo_edge.node;
    let map = new Map();

    map.set("owner", repo.owner);
    map.set("name", repo.name);
    map.set("descriptionHTML", repo.descriptionHTML);
    map.set("diskUsage", repo.diskUsage);
    map.set("homepage", repo.homepageUrl);
    map.set("primaryLanguage", repo.primaryLanguage);
    map.set("latestRelease", repo.latestRelease);
    map.set("license", repo.licenseInfo?.spdxId);
    map.set("stars", repo.stargazerCount);
    map.set("updatedAt", repo.updatedAt);
    map.set("url", repo.url);

    exts.push(Object.fromEntries(map));
  }

  console.debug(`EXTS = ${exts}`)

  writeFileSync("data.json", JSON.stringify(exts));
})().then(() => console.log("done"));
