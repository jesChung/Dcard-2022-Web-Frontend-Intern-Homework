import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com",
});

const apiGetRepoList = (username, page) =>
  instance.get(`/users/${username}/repos`, {
    params: { page: page, per_page: 10 },
  });

const apiGetRepoDetail = (owner, repo) =>
  instance.get(`/repos/${owner}/${repo}`);

export { apiGetRepoList, apiGetRepoDetail };
