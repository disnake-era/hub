"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@octokit/core");
var auth_action_1 = require("@octokit/auth-action");
var octokit = new core_1.Octokit({
    authStrategy: auth_action_1.createActionAuth,
});
var extensions = octokit.graphql("\n    query {\n      search(query: \"topic:disnake-extension\", type: REPOSITORY, first: 10) {\n        edges {\n          node {\n            ... on Repository {\n              owner {\n                url\n              }\n              name\n              stargazerCount\n            }\n          }\n        }\n      }\n    }\n  ");
console.log(extensions);
