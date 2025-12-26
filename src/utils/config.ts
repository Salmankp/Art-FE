import { abi as oatImplABI } from '../contracts/OATImplementation.json';
import { abi as oatSaleABI } from '../contracts/OATSaleImplementation.json';

export const commission = 10;
export const OATSaleABI = oatSaleABI;
export const OatSaleImplementationAddress =
  '0x2f2C12EeD76f1e22a60cA62bd92B45e48FE88Cfc';
export const OatSaleProxyAddress =
  process.env.REACT_APP_ENVIRONMENT !== 'production'
    ? '0xd6146a4d98266aAc502A5C87Ff56C458197e4380'
    : '0x70CDB8E6B791ec05b6E846ceA912a53eaa7cf289';

export const OATImplABI = oatImplABI;
export const OatImplementationAddress =
  '0x95B21b314E90F47920d94Fe682B1b0e9d3aD19a0';
export const OatProxyAddress =
  process.env.REACT_APP_ENVIRONMENT !== 'production'
    ? '0x603AbfAaF6D0086Ac522B8DEC5Db07675b622761'
    : '0xb126578f2c86f9504376490b807b8b8e4cf275c7';

export const OATAuctionAddress = '0xA3cCcaf9fc9214d6B4e79C8996093C14a633C555';
export const OATAuctionProxyAddress =
  '0x00fc622b923B61E6f6260ADd4CDEf0556BC46C2b';

export const OATMarketplaceImplementationAddress =
  process.env.REACT_APP_ENVIRONMENT !== 'production'
    ? '0x3FB7E8833C54938F38db937dc74c596a9af8f8F7'
    : '0x2A7abFe3031Af9eE878D9FCC4EAE776367fD7d7A';

export const OATMarketplaceProxyAddress =
  process.env.REACT_APP_ENVIRONMENT !== 'production'
    ? '0x32Be0E0757492b77D279F40f5822aD71848c3069'
    : '0x2E5F53441836D94A0c2AadE9Bcc8283F9198a06B';
