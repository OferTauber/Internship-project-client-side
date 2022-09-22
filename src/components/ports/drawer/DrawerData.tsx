import SecondOrderPortDTO from '../../../DTOs_and_Enums/SecondOrderPortDTO';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AnchorTwoToneIcon from '@mui/icons-material/AnchorTwoTone';
import LanguageIcon from '@mui/icons-material/Language';
import StraightenIcon from '@mui/icons-material/Straighten';
import WaterTwoToneIcon from '@mui/icons-material/WaterTwoTone';

const DrawerData = ({ portData }: { portData: SecondOrderPortDTO }) => {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AnchorTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Port Name"
          secondary={portData.portname || 'unknown'}
        />
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Country"
          secondary={
            portData.country || portData.iso3 || portData.iso3_op || 'unknown'
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StraightenIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Size"
          secondary={portData.prtsize || 'unknown'}
        />
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WaterTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Max deapth"
          secondary={portData.maxdepth || 'unknown'}
        />
      </ListItem>
    </List>
  );
};

export default DrawerData;
