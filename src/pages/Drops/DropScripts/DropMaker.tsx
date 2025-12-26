import React, { useEffect, useState, ReactNode } from 'react';
import ToolTypes from 'pages/Drops/constants/Enums';
import Header from 'pages/Drops/components/header';
import HeaderV2 from 'pages/Drops/components/HeaderV2';
import InfoBar from 'pages/Drops/components/InfoBarv1';
import TopBar from 'pages/Drops/components/TopBar';
import MainNavbar from 'pages/components/Navbar/MainNav';
import Footer from 'pages/Drops/components/Footer';
import StartCollection from 'pages/components/ElmoreDrop/StartCollection';
import FreeAccount from 'pages/components/ElmoreDrop/FreeAccount';
import DropDetails from 'pages/components/ElmoreDrop/components/dropDetail';
import GridandNftView from 'pages/components/ElmoreDrop/GridandNftView';
import { useAppSelector } from 'redux/hooks';

const DropMaker: React.FC<{ screenJson: any[] }> = ({ screenJson }) => {
  const [ElementNodes, setElementNodes] = useState<ReactNode[]>([]);

  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );

  useEffect(() => {
    const nodes = screenJson.map((item) => {
      if (item.toolType === ToolTypes.TOOL_TYPE_HEADER) {
        return (
          <>
            <Header {...item} />
          </>
        );
      }
      if (item.toolType === ToolTypes.TOOL_TYPE_HEADERV2) {
        return (
          <>
            <HeaderV2 {...item} />
          </>
        );
      }
      if (item.toolType === ToolTypes.TOOL_TYPE_INFO_BARV1) {
        return (
          <>
            <InfoBar {...item} />
          </>
        );
      }
      if (item.toolType === ToolTypes.TOOL_TYPE_DETAIL_SECTION) {
        return (
          <>
            <DropDetails {...item.data} viewNFT={item.viewNFT} />
          </>
        );
      }
      if (item.toolType === ToolTypes.TOOL_TYPE_GRID_SECTION) {
        return (
          <>
            <GridandNftView {...item.data} GridCss={item?.GridCss} />
          </>
        );
      }
      return <></>;
    });
    setElementNodes(nodes);
  }, [screenJson]);

  return (
    <>
      <TopBar />
      <MainNavbar />
      {ElementNodes.map((item) => item)}
      {!loggedIn && (
        <>
          <StartCollection />
          <FreeAccount />
        </>
      )}
      <Footer />
    </>
  );
};

export default DropMaker;
