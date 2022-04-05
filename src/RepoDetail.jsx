import { useParams, useNavigate } from "react-router-dom";
import { apiGetRepoDetail } from "./service/api";
import { useEffect, useState } from "react";
import Card from "antd/lib/card";
import { GithubOutlined, StarOutlined, SwapLeftOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import Button from "antd/lib/button";


const RepoDetail = () => {
  const { username, repo } = useParams();
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const {
    full_name = "",
    description = "",
    stargazers_count = "",
    html_url = "",
  } = data;

  useEffect(() => {
    getRepoDetailData(username, repo);
  }, [username, repo]);

  const getRepoDetailData = async (userName, repo) => {
    try {
      const repoData = await apiGetRepoDetail(userName, repo);
      if (!repoData) throw new Error();

      setData(repoData?.data);
    } catch (_) {}
  };

  return (
    <>
    <Card 
      title={full_name}
      extra={
        <a href={html_url} target="_blank" rel="noreferrer">
          <GithubOutlined style={{ fontSize: "36px", color: "#08c" }} />
        </a>
      }
      className="shadow-md"
    >
      <Typography.Paragraph
        className={`${description ? "text-gray-700" : "text-gray-500"}`}
      >
        {description || "There is no description."}
      </Typography.Paragraph>

      <div className="flex items-center space-x-2 text-[#08c]">
        <StarOutlined />
        <p>{stargazers_count || 0}</p>
      </div>
    </Card>
    <Button type="link" onClick={() => navigate(`/users/${username}/repos/`)}>
    <SwapLeftOutlined />
    Back
  </Button>
  </>
  );
};

export default RepoDetail;
