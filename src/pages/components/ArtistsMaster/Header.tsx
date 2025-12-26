import React from 'react';
import stlyes from '../styles/ArtistsMaster/Header.module.scss';

interface Array {
  bgimg: string;
  heading: string;
  content: string;
}
interface Data {
  data: Array[];
}
const Header: React.FC<Data> = ({ data }: Data) => {
  return (
    <>
      <div
        className={stlyes.headerWrap}
        style={{ backgroundImage: `url(${data[0].bgimg})` }}
      />
      <div className={stlyes.contentWrap}>
        <div className={stlyes.heading}>{data[0].heading}</div>
        <div className={stlyes.content}>{data[0].content}</div>
      </div>
    </>
  );
};

export default Header;
