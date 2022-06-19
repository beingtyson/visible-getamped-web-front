export interface AccessoryType {
  id: number;
  code: string;
  name: string;
  img: string;
  statImg: string;
  price?: string;
  priceType?: string;
  detailDescription: string;
  detailCommand: string;
  availableCharacter: Array<string>;
  averageRate: number;
}
