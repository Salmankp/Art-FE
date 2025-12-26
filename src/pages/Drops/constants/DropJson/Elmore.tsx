import ToolTypes from 'pages/Drops/constants/Enums';
import { elmoreImage, elmorebg, elmoreLogo } from 'assets';

const Elmore = [
  {
    toolType: ToolTypes.TOOL_TYPE_HEADER,
    backgroundImage: elmorebg,
    logo: elmoreLogo,
    mainImage: elmoreImage,
    data: null,
  },
  {
    toolType: ToolTypes.TOOL_TYPE_DETAIL_SECTION,
    data: null,
  },
  {
    toolType: ToolTypes.TOOL_TYPE_GRID_SECTION,
    data: null,
  },
];

export default Elmore;
