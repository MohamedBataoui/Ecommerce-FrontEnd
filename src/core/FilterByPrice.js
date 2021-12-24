import React from "react";

const FilterByPrice = ({ handleFilters }) => {
  const prices = [
    {
      _id: 1,
      name: "Any",
      value: [],
    },
    {
      _id: 2,
      name: "0Dhs to 390Dhs",
      value: [0, 390],
    },
    {
      _id: 3,
      name: "400Dhs to 790Dhs",
      value: [400, 790],
    },
    {
      _id: 4,
      name: "800Dhs to 1190Dhs",
      value: [800, 1190],
    },
    {
      _id: 5,
      name: "1200 Dhs to 1600 Dhs",
      value: [1200, 1600],
    },
    {
      _id: 6,
      name: "More",
      value: [1610, 9999999],
    },
  ];

  const handlePrice = (e) => {
    handleFilters(prices[e.target.value]["value"]);
  };

  return (
    <div>
      <h4 className="mt-5">Filtrer par prix</h4>

      {prices.map((price, i) => (
        <div key={i} className="my-3">
          <label htmlFor={`${i}-${price.name}`}>
            <input
              onChange={handlePrice}
              className="mx-3"
              type="radio"
              name="price"
              id={`${i}-${price.name}`}
              value={i}
            />
            {price.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterByPrice;
