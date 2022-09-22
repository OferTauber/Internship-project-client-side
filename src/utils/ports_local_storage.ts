import * as axios from './axios';
import FirstOrderPortDTO from '../DTOs_and_Enums/FirstOrderPortDTO';
import SecondOrderPortDTO, {
  PortNotFound,
} from '../DTOs_and_Enums/SecondOrderPortDTO';
import {
  convertTypeAnyToFirstOrderPortArray,
  convertTypeAnyToSecondOrderPort,
} from './convertors';

//* This function is a middelware - first traying to get data from local storage and only if it failes getting it using axios
export const getAllPorts = async (
  token: string
): Promise<FirstOrderPortDTO[] | false> => {
  const firstOrderPortsKey = 'firstOrderPorts';
  const jsonPorts = localStorage.getItem(firstOrderPortsKey);

  if (jsonPorts) {
    const ports = JSON.parse(jsonPorts);

    return convertTypeAnyToFirstOrderPortArray(ports);
  }

  const ports = await axios.getAllPorts(token);

  if (ports) localStorage.setItem(firstOrderPortsKey, JSON.stringify(ports));

  return ports;
};

//* This function is a middelware - first traying to get data from local storage and only if it failes getting it using axios
export const getSecondOrderPort = async (
  token: string,
  portId: string
): Promise<SecondOrderPortDTO | PortNotFound | false> => {
  const secondOrderPortKey = 'SOP' + portId;
  const jsonPorts = localStorage.getItem(secondOrderPortKey);

  if (jsonPorts) {
    const port = JSON.parse(jsonPorts);

    return convertTypeAnyToSecondOrderPort(port);
  }

  const port = await axios.getSecondOrderPort(token, portId);

  localStorage.setItem(secondOrderPortKey, JSON.stringify(port));

  return port;
};
