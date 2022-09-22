import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { logout } from '../../../utils/axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Select from './search';
import DisplayModeEnum from '../../../DTOs_and_Enums/DisplayMode_enum';
import MapViewStateDTO from '../../../DTOs_and_Enums/MapViewStateDTO';
import FirstOrderPortDTO from '../../../DTOs_and_Enums/FirstOrderPortDTO';
import { convertTypeAnyToString } from '../../../utils/convertors';
import DisplaySwitch from './switch';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export default function SearchAppBar({
  ports,
  setDisplayMode,
  setMapViewState,
  displayMode,
  setSearchBarValue,
}: {
  ports: FirstOrderPortDTO[];
  setDisplayMode: React.Dispatch<React.SetStateAction<DisplayModeEnum>>;
  setMapViewState: React.Dispatch<React.SetStateAction<MapViewStateDTO>>;
  displayMode: DisplayModeEnum;
  setSearchBarValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();

  const handelLogout = () => {
    const token = convertTypeAnyToString(Cookies.get('dockteck_token'));
    logout(token);
    Cookies.remove('dockteck_token');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ zIndex: 10 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            DockTech
          </Typography>
          <DisplaySwitch
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          />
          <Search>
            {ports && (
              <Select
                ports={ports}
                setMapViewState={setMapViewState}
                setSearchBarValue={setSearchBarValue}
              />
            )}
          </Search>
          <Button color="inherit" onClick={handelLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
