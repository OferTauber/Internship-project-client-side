declare class SecondOrderPortDTO {
  id: string;
  portname?: string;
  code?: string;
  prttype?: string;
  prtsize?: string;
  maxdepth: number;
  status?: string;
  humuse?: string;
  locprecision?: string;
  latitude?: number;
  longitude?: number;
  iso3?: string;
  iso3_op?: string;
  country?: string;
  createdate?: string;
  updatedate?: string;
  geonameid?: number;
  isDochTeckPartner?: boolean;
}

export default SecondOrderPortDTO;

export declare class PortNotFound {
  error: string;
}
