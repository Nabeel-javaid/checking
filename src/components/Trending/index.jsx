import React from "react";
import emoji from "react-easy-emoji";

import CoinRow from "./CoinRow";

export default function ListCoin({ title, more, data }) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-bold text-lg flex items-center">{emoji(title)}</h2>
        
      </div>
      <div>
        <div className="grid grid-cols-3 text-sm my-4">
          <span className="text-gray">Name</span>
          <span className="text-gray">Count</span>
          <span className="text-gray">Chart</span>
        </div>
        {data?.map(({ image, name, price, uptrend }, i) => (
          <CoinRow
            key={i}
            image={image}
            coinName={name}
            coinPrice={price}
            coinUpTrend={uptrend}
          />
        ))}
      </div>
    </>
  );
}
