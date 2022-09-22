import FirstOrderPortDTO from '../DTOs_and_Enums/FirstOrderPortDTO';
import SecondOrderPortDTO from '../DTOs_and_Enums/SecondOrderPortDTO';

export const convertTypeAnyToFirstOrderPort = (
  data: any
): FirstOrderPortDTO => {
  const DTO: FirstOrderPortDTO = data;
  return DTO;
};

export const convertTypeAnyToFirstOrderPortArray = (
  data: any
): FirstOrderPortDTO[] => {
  const DTO: FirstOrderPortDTO[] = data;
  return DTO;
};

export const convertTypeAnyToString = (data: any): string => {
  const string: string = data;
  return string;
};

export const convertTypeAnyToSecondOrderPort = (
  data: any
): SecondOrderPortDTO => {
  const port: SecondOrderPortDTO = data;
  return port;
};
