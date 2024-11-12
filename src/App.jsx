import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { BrowserRouter } from "react-router-dom"; // Added routes for routing

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NPR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, loading, error } = useCurrencyInfo(from);

  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    convert();
  };

  return (
    <BrowserRouter basename="/CurrencyConverter/">
      element=
      {
        <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/106152/euro-coins-currency-money-106152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          }}
        >
          <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
              <form onSubmit={handleSubmit}>
                {/* From Currency Input */}
                <div className="w-full mb-1">
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    selectCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                  />
                </div>

                {/* Swap Button */}
                <div className="relative w-full h-0.5">
                  <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                    onClick={swap}
                  >
                    Swap
                  </button>
                </div>

                {/* To Currency Input */}
                <div className="w-full mt-1 mb-4">
                  <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectCurrency={to}
                    amountDisable={true}
                  />
                </div>

                {/* Convert Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                  disabled={loading || amount <= 0 || options.length === 0} // Disable if loading or amount is 0
                >
                  {loading
                    ? "Loading..."
                    : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
                </button>
              </form>

              {/* Display Error Message */}
              {error && (
                <div className="mt-4 text-red-600 text-center">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </BrowserRouter>
  );
}

export default App;
