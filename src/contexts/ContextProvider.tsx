import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

type TNavInitialState = {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
};

type TContextObj = {
  activeMenu: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isClicked: TNavInitialState;
  setIsClicked: React.Dispatch<React.SetStateAction<TNavInitialState>>;
  screenSize: number | undefined;
  setScreenSize: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentColor: string;
  currentMode: string;
  setColor: (color: string) => void;
  setMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  themeSettings: boolean;
  setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: (clicked: string) => void;
};

const navInitialState: TNavInitialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const contextInitialState: TContextObj = {
  activeMenu: false,
  setActiveMenu: () => { },
  isClicked: navInitialState,
  setIsClicked: () => { },
  screenSize: undefined,
  setScreenSize: () => { },
  currentColor: '',
  currentMode: '',
  setColor: () => { },
  setMode: () => { },
  themeSettings: false,
  setThemeSettings: () => { },
  handleClick: () => { },
}

export const StateContext = createContext<TContextObj>(contextInitialState);

export const ContextProvider: React.FC<Props> = (props) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<TNavInitialState>(navInitialState);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState<string>("#9EDDFF");
  const [currentMode, setCurrentMode] = useState<string>("Light");
  const [themeSettings, setThemeSettings] = useState<boolean>(false);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);

    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };

  const handleClick = (clicked: string) => {
    setIsClicked({ ...navInitialState, [clicked]: true });
  };

  const contextValue: TContextObj = {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
    currentMode,
    setColor,
    setMode,
    themeSettings,
    setThemeSettings,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {props.children}
    </StateContext.Provider>
  )
};

export const useStateContext = () => useContext(StateContext);
