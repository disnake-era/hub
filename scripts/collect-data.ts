import { Octokit } from '@octokit/core';
import { createActionAuth } from '@octokit/auth-action';

const octokit = new Octokit({
  authStrategy: createActionAuth,
});

const extensions = octokit.graphql(`
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
