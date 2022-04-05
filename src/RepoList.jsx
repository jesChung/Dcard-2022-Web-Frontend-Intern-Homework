import { useParams, useNavigate } from "react-router-dom";
import { apiGetRepoList } from "./service/api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import size from "lodash/size";
import Card from "antd/lib/card";
import List from "antd/lib/list";
import Divider from "antd/lib/divider";
import Skeleton from "antd/lib/skeleton";
import { StarOutlined, SwapLeftOutlined } from "@ant-design/icons";
import Typography from "antd/lib/typography";
import Button from "antd/lib/button";

const RepoList = () => {
  const { username } = useParams();
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);

    apiGetRepoList(username, currentPage)
      .then((result) => {
        if (!result || size(result?.data) <= 0) {
          setHasMore(false);
          throw new Error();
        }

        setData((prev) => [...prev, ...result?.data]);
        setLoading(false);

        setCurrentPage(currentPage + 1);
      })
      .catch((err) => setLoading(false));
  };

  const handleOnClick = (name) => {
    navigate(`/users/${username}/repos/${name}`);
  };

  return (
    <>
      <Typography.Title level={2} className="flex items-center">
        <Button type="link" onClick={() => navigate("/")}>
          <SwapLeftOutlined />
          Back
        </Button>
        <div >{username}'s Repositories</div>
      </Typography.Title>
      <Divider />

      <div id="scrollableDiv" className="h-[680px] overflow-auto">
        <InfiniteScroll
          dataLength={data?.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data || []}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <Card
                  title={item?.name}
                  onClick={() => handleOnClick(item?.name)}
                  className="border p-2 w-full cursor-pointer hover:shadow-gray-500/40 shadow-md"
                >
                  <div className="flex items-center space-x-2">
                    <StarOutlined />
                    <p>{item?.stargazers_count || 0}</p>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default RepoList;
