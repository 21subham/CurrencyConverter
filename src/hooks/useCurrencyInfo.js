import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/193f3ce1c529999278888ce3/latest/${currency}`
        );
        const result = await response.json();

        // Handle success and set data
        if (result.result === "success") {
          setData(result.conversion_rates); // Get the conversion rates
        } else {
          setError("Failed to fetch exchange rates.");
        }
      } catch (err) {
        setError("Error fetching currency data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyInfo();
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;
