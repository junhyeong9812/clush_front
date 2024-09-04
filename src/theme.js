import React, { createContext, useState, useMemo, useContext } from "react";
import { ConfigProvider } from "antd";

// 테마 관련 Context 생성
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    return mode === "dark"
      ? {
          token: {
            colorPrimary: "#141b2d",
            colorSecondary: "#4cceac",
            colorTextBase: "#e0e0e0",
            colorBgBase: "#1f1f1f",
          },
        }
      : {
          token: {
            colorPrimary: "#f0f2f5",
            colorSecondary: "#4cceac",
            colorTextBase: "#141414",
            colorBgBase: "#ffffff",
          },
        };
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, theme }}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

// 테마 상태를 사용하는 커스텀 훅
export const useMode = () => useContext(ThemeContext);
