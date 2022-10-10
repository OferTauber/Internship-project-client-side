import axios from 'axios';
import FirstOrderPortDTO from '../DTOs_and_Enums/FirstOrderPortDTO';
import SecondOrderPortDTO, {
  PortNotFound,
} from '../DTOs_and_Enums/SecondOrderPortDTO';
import {
  convertTypeAnyToFirstOrderPortArray,
  convertTypeAnyToSecondOrderPort,
} from './convertors';

const URL: string = process.env.REACT_APP_URL + '';

export async function getAuthToken(
  email: string,
  password: string
): Promise<string> {
  const apiResponse = await axios.post(URL + '/auth/login', {
    email,
    password,
  });

  return apiResponse.data;
}

export async function logout(token: string) {
  await axios.post(URL + '/auth/logout', null, {
    headers: { authorization: 'Bearer ' + token },
  });
}

export async function getHellow() {
  try {
    const hellow: any = await axios.get(URL);
    console.log(hellow.data);
  } catch (e) {
    console.warn(e);
  }
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const res: any = await axios.get(URL + '/auth/validate-token', {
      headers: { authorization: 'Bearer ' + token },
      timeout: 5000,
    });

    return !!res?.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getAllPorts(
  token: string
): Promise<FirstOrderPortDTO[] | false> {
  try {
    const res: any = await axios.get(URL + '/ports', {
      headers: { authorization: 'Bearer ' + token },
    });
    if (!res?.data) return false;

    return convertTypeAnyToFirstOrderPortArray(res.data);
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getSecondOrderPort(
  token: string,
  portId: string
): Promise<SecondOrderPortDTO | PortNotFound | false> {
  try {
    const res: any = await axios.get(URL + '/ports/' + portId, {
      headers: { authorization: 'Bearer ' + token },
    });
    if (!res?.data) return false;

    return convertTypeAnyToSecondOrderPort(res.data);
  } catch (err) {
    console.error(err);
    const error: PortNotFound = { error: 'Port Not Found' };
    return error;
  }
}
