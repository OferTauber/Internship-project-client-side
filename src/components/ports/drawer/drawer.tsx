import Drawer from '@mui/material/Drawer';
import { getSecondOrderPort } from '../../../utils/ports_local_storage';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  convertTypeAnyToString,
  convertTypeAnyToSecondOrderPort,
} from '../../../utils/convertors';
import SecondOrderPortDTO, {
  PortNotFound,
} from '../../../DTOs_and_Enums/SecondOrderPortDTO';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DrawerData from './DrawerData';

export default function TemporaryDrawer({
  drawerPortId,
  setDrawerPortId,
}: {
  drawerPortId: string | false;
  setDrawerPortId: React.Dispatch<React.SetStateAction<string | false>>;
}) {
  const [portData, setPortData] = useState<
    SecondOrderPortDTO | PortNotFound | false | any
  >(false);

  const closeDrawer = () => {
    setDrawerPortId(false);
  };

  useEffect(() => {
    const effect = async (): Promise<void> => {
      try {
        const token = convertTypeAnyToString(Cookies.get('dockteck_token'));
        const data = await getSecondOrderPort(token, drawerPortId || '');
        if (isMounted) {
          if (data && 'error' in data) {
            setPortData(<div>Sorry, port not found</div>);
          } else {
            setPortData(
              <DrawerData portData={convertTypeAnyToSecondOrderPort(data)} />
            );
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    let isMounted = true;
    if (!drawerPortId) return;
    effect();

    return () => {
      setPortData(false);
      isMounted = false;
    };
  }, [drawerPortId]);

  return (
    <div>
      <Drawer
        anchor={'right'}
        open={!!drawerPortId}
        onClose={closeDrawer}
        onClick={closeDrawer}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 450,
            height: '100%',
          }}
        >
          {portData || <CircularProgress />}
        </Box>
      </Drawer>
    </div>
  );
}
