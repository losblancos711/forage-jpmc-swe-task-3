import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert?: number;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceX =
      (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceY =
      (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceX / priceY;
    const upperBound = 1 + 0.1;
    const lowerBound = 1 - 0.1;
    return {
      price_abc: priceX,
      price_def: priceY,
      ratio,
      timestamp:
        serverResponds[0].timestamp > serverResponds[1].timestamp
          ? serverResponds[0].timestamp
          : serverResponds[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert:
        ratio > upperBound || ratio < lowerBound ? ratio : undefined,
    };
  }
}
