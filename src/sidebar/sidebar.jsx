import { useState } from "react";
import { Layout, Menu, Avatar, Button, ConfigProvider } from "antd";
import {
  HomeOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMode } from "../theme"; // 테마 훅 가져오기

const { Sider } = Layout;

const Sidebar = () => {
  const { theme, toggleColorMode, mode } = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
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
              //   fontSize: "24px",
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
              <span style={{ color: theme.token.colorTextBase }}>UserName</span>
            </div>
          </div>
        )}

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
            <Link to="/User" style={{ color: theme.token.colorTextBase }}>
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
      </Sider>
    </ConfigProvider>
  );
};

export default Sidebar;
