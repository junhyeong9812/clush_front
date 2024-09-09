import { useState, useContext } from "react";
import { Layout, Menu, Avatar, Button, ConfigProvider, Select } from "antd";
import {
  HomeOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  SunOutlined,
  MoonOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMode } from "../theme"; // 테마 훅 가져오기
import { UserContext } from "../provider/UserProvider"; // UserContext 가져오기
import UserCreationModal from "./userCreationModal";

const { Sider } = Layout;
const { Option } = Select;

const Sidebar = () => {
  const { theme, toggleColorMode, mode } = useMode();
  const { users, selectedUser, handleUserSelect } = useContext(UserContext); // UserContext에서 유저 관리
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false); // 유저 생성 모달 상태
  const [selected, setSelected] = useState("Dashboard");

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleUserChange = (value) => {
    handleUserSelect(value); // 선택한 유저를 UserContext로 넘김
  };

  const handleUserModalOpen = () => {
    setIsUserModalVisible(true);
  };

  const handleUserModalClose = () => {
    setIsUserModalVisible(false);
  };

  return (
    <ConfigProvider theme={theme}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={toggleCollapsed}
        style={{
          minHeight: "100vh",
          backgroundColor: theme.token.colorBgBase, // 테마 배경색 적용
        }}
      >
        <div
          style={{
            padding: "10px",
            textAlign: isCollapsed ? "center" : "left",
          }}
        >
          {!isCollapsed ? (
            <Button
              type="text"
              icon={<HomeOutlined />}
              onClick={toggleCollapsed}
              style={{ color: theme.token.colorTextBase }} // 버튼 텍스트 색상 적용
            >
              Clush
            </Button>
          ) : (
            <Button
              type="text"
              icon={<HomeOutlined />}
              onClick={toggleCollapsed}
              style={{ color: theme.token.colorTextBase }} // 아이콘 버튼 텍스트 색상 적용
            />
          )}
        </div>
        {/* 다크/라이트 모드 전환 버튼 */}
        <div style={{ marginBottom: "25px", textAlign: "center" }}>
          <Button
            type="text"
            onClick={toggleColorMode}
            icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />} // 모드에 따른 아이콘
            style={{
              color: theme.token.colorTextBase, // 버튼 색상 적용
            }}
          >
            {!isCollapsed && (mode === "dark" ? "Dark Mode" : "Light Mode")}
          </Button>
        </div>

        {!isCollapsed && (
          <div style={{ marginBottom: "25px", textAlign: "center" }}>
            <Avatar size={100} src={`../../logo192.png`} />
            <div>
              {/* 유저 선택 Select 박스 */}
              <Select
                placeholder="Select User"
                style={{ width: 120 }}
                onChange={handleUserChange} // 유저 선택 이벤트 핸들러
                value={selectedUser} // 선택한 유저 ID
              >
                {users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.username}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        )}
        {/* 유저 생성 버튼 */}
        <Button
          type="text"
          icon={<UserAddOutlined />}
          onClick={handleUserModalOpen}
          style={{ color: theme.token.colorTextBase, marginBottom: "25px" }}
        >
          {!isCollapsed && "Create User"}
        </Button>

        <Menu
          mode="inline"
          style={{ backgroundColor: theme.token.colorBgBase }} // 메뉴 배경색 적용
          defaultSelectedKeys={[selected]}
          onClick={(e) => setSelected(e.key)}
        >
          <Menu.Item
            key="Dashboard"
            icon={<HomeOutlined />}
            style={{ color: theme.token.colorTextBase }} // 텍스트 색상 적용
          >
            <Link to="/" style={{ color: theme.token.colorTextBase }}>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item
            key="ToDO"
            icon={<CheckSquareOutlined />}
            style={{ color: theme.token.colorTextBase }} // 텍스트 색상 적용
          >
            <Link to="/TodoBoard" style={{ color: theme.token.colorTextBase }}>
              ToDO
            </Link>
          </Menu.Item>
          <Menu.Item
            key="Calendar"
            icon={<CalendarOutlined />}
            style={{ color: theme.token.colorTextBase }} // 텍스트 색상 적용
          >
            <Link to="/calendar" style={{ color: theme.token.colorTextBase }}>
              Calendar
            </Link>
          </Menu.Item>
        </Menu>
        {/* 유저 생성 모달 */}
        <UserCreationModal
          visible={isUserModalVisible}
          onClose={handleUserModalClose}
        />
      </Sider>
    </ConfigProvider>
  );
};

export default Sidebar;
