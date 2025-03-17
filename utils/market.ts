import { Market } from '../api/types';
import dayjs from 'dayjs';

// export const testMarketItem: Market = {
//   publicKey: 'testbeh2b3h24e23hbebdasdsadfH',
//   id: 1,
//   price: 50.43,
//   priceFeedId: '0xecf8f87f810ecf450940c9f60066b4a7a501d6a7',
//   resolveFrom: new Date().getTime(),
//   resolveTo: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
//   subsidyAmount: 100,
//   numOutcome0: 100,
//   numOutcome1: 100,
//   priceOutcome0: 0.5,
//   priceOutcome1: 0.5,
//   isResolved: false,
//   outcome: 0,
//   createdAt: new Date().getTime(),
// };

export const getMarketAssertionText = (args: {
  price?: number;
  resolveFrom?: number;
  resolveTo?: number;
  asset?: string;
}) => {
  const dateFrom = args?.resolveFrom ? formatMarketDateTime(args.resolveFrom) : '--';
  const dateTo = args?.resolveTo ? formatMarketDateTime(args.resolveTo) : '--';
  const asset = args?.asset || '--';
  const price = args?.price || '--';

  return `Will the price of ${asset} hit ${price} between ${dateFrom} and ${dateTo}?`;
};

export const isMarketResolved = (market: Market) => {
  const now = new Date().getTime();
  return market.isResolved || now > market.resolveTo;
};

export const getMarketStatus = (market: Market) => {
  if (market.isResolved) {
    return 'resolved';
  }

  const now = new Date().getTime();

  if (now < market.resolveFrom) {
    return 'active';
  }

  if (now >= market.resolveFrom && now <= market.resolveTo) {
    return 'resolving';
  }

  if (now > market.resolveTo) {
    return 'closed';
  }

  return '--';
};

export const formatMarketDateTime = (ms: number) => {
  return dayjs(ms).format('MMM DD YYYY hh:mm A');
};
