import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "antd/lib/card";
import Input from "antd/lib/input";

const Home = () => {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleOnChange = (e) => {
    setUserName(e.target.value);
  };

  const handleOnSearch = () => {
    navigate(`/users/${userName}/repos`);
  };

  return (
    <Card title="Search Repositories on Github" className="w-full">
      <Input.Search
        allowClear
        required
        value={userName}
        onChange={handleOnChange}
        placeholder="Please input user name"
        onSearch={handleOnSearch}
      />
    </Card>
  );
};

export default Home;
