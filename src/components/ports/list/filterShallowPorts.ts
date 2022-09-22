import ShallowPortObject from '../../../DTOs_and_Enums/ShallowPortObjectClass';

const filterShalowPorts = (
  userInput: string,
  allShallowPorts: ShallowPortObject[]
): ShallowPortObject[] => {
  return allShallowPorts.filter((port) => {
    const codeMatch: boolean =
      !port.code.startsWith('Unknown') &&
      port.code.toLowerCase().includes(userInput);

    const countryMatch: boolean =
      port.country !== 'unknown country' &&
      port.country.toLowerCase().includes(userInput);

    const nameMatch: boolean =
      port.portname !== '' && port.portname.toLowerCase().includes(userInput);

    return codeMatch || countryMatch || nameMatch;
  });
};

export default filterShalowPorts;
