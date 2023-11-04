// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (fromCurrency === toCurrency) {
        setOutput(input);
        return;
      }
      async function getConvertedCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        // console.log(data.rates.INR);
        setIsLoading(false);
        setOutput(data.rates[toCurrency]);
      }
      getConvertedCurrency();
    },
    [input, fromCurrency, toCurrency]
  );
  function handleInput(e) {
    setInput(Number(e.target.value));
  }
  function handleFromCurrency(e) {
    setFromCurrency(e.target.value);
  }
  function handleToCurrency(e) {
    setToCurrency(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={handleFromCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={handleToCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {toCurrency}
      </p>
    </div>
  );
}
