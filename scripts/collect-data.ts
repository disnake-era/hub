import { Octokit } from '@octokit/core';
import { createActionAuth } from '@octokit/auth-action';

const octokit = new Octokit({
  authStrategy: createActionAuth,
});

(async () => {
  const extensions: any = await octokit.graphql(`
    query {
      search(query: "topic:disnake-extension", type: REPOSITORY, first: 10) {
        edges {
          node {
            ... on Repository {
              owner {
                url
              }
              name
              stargazerCount
            }
          }
        }
      }
    }
  `);

  for (const ext of extensions.search.edges) {
    console.log(ext);
  }
})().then(() => console.log("done"));
