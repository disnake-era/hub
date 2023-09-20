import { Octokit } from '@octokit/core';
import { createActionAuth } from '@octokit/auth-action';

const octokit = new Octokit({
  authStrategy: createActionAuth,
});

(async () => {
  const extensions = await octokit.graphql(`
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

  console.log(extensions);
})().then(() => console.log("done"));
