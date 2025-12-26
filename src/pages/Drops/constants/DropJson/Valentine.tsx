import ToolTypes from 'pages/Drops/constants/Enums';
import {
  elmoreImage,
  heavyMetalHeader,
  valentineBg,
  valentineLogo,
  viewNFTImage,
} from 'assets';
import style from '../../styles/wrap.module.scss';

const Valentine = [
  {
    toolType: ToolTypes.TOOL_TYPE_HEADERV2,
    backgroundImage: valentineBg,
    logo: valentineLogo,
    logoHeavy: heavyMetalHeader,
    mainImage: elmoreImage,
    data: null,
  },
  {
    toolType: ToolTypes.TOOL_TYPE_INFO_BARV1,
    data: null,
  },
  {
    toolType: ToolTypes.TOOL_TYPE_DETAIL_SECTION,
    viewNFT: viewNFTImage,
    data: null,
  },
  {
    toolType: ToolTypes.TOOL_TYPE_GRID_SECTION,
    data: null,
    GridCss: style.wrap2,
  },
];

export default Valentine;
