import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import "./CurrencyConverter.css";
import Select from "react-select";
import { FaExchangeAlt } from "react-icons/fa";
import { useGetActiveCurrenciesQuery } from "../api/apis";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrencyId, setFromCurrencyId] = useState(null);
  const [toCurrencyId, setToCurrencyId] = useState(null);

  // Fetch active currencies (includes rateToUSD)
  const { data: currenciesData, isLoading: currenciesLoading } =
    useGetActiveCurrenciesQuery();

  // Transform currencies data for react-select, keeping full currency object
  const currencyOptions = useMemo(() => {
    if (!currenciesData) return [];
    return currenciesData.map((currency) => ({
      value: currency._id,
      label: `${currency.code} - ${currency.name}`,
      code: currency.code,
      rateToUSD: currency.rateToUSD || 1, // Default to 1 if not provided
      currency: currency, // Keep full currency object for reference
    }));
  }, [currenciesData]);

  // Set default currencies when data loads
  useEffect(() => {
    if (currencyOptions.length > 0 && !fromCurrencyId && !toCurrencyId) {
      // Set first currency as from, second as to
      setFromCurrencyId(currencyOptions[0].value);
      if (currencyOptions.length > 1) {
        setToCurrencyId(currencyOptions[1].value);
      }
    } else if (currencyOptions.length > 0 && fromCurrencyId && !toCurrencyId) {
      // If from is set but to is not, set the first available option
      const available = currencyOptions.filter((c) => c.value !== fromCurrencyId);
      if (available.length > 0) {
        setToCurrencyId(available[0].value);
      }
    } else if (currencyOptions.length > 0 && !fromCurrencyId && toCurrencyId) {
      // If to is set but from is not, set the first available option
      const available = currencyOptions.filter((c) => c.value !== toCurrencyId);
      if (available.length > 0) {
        setFromCurrencyId(available[0].value);
      }
    }
  }, [currencyOptions, fromCurrencyId, toCurrencyId]);

  const fromCurrency = currencyOptions.find((c) => c.value === fromCurrencyId);
  const toCurrency = currencyOptions.find((c) => c.value === toCurrencyId);

  // Filter options to prevent selecting same currency on both sides
  const fromCurrencyOptions = useMemo(() => {
    return currencyOptions.filter((option) => option.value !== toCurrencyId);
  }, [currencyOptions, toCurrencyId]);

  const toCurrencyOptions = useMemo(() => {
    return currencyOptions.filter((option) => option.value !== fromCurrencyId);
  }, [currencyOptions, fromCurrencyId]);

  // Calculate exchange automatically based on rateToUSD
  const result = useMemo(() => {
    if (
      !fromCurrency ||
      !toCurrency ||
      !amount ||
      amount <= 0 ||
      !fromCurrency.rateToUSD ||
      !toCurrency.rateToUSD ||
      fromCurrencyId === toCurrencyId
    ) {
      return null;
    }

    // Formula: amount * (fromCurrency.rateToUSD / toCurrency.rateToUSD)
    // This converts: fromCurrency -> USD -> toCurrency
    const exchangeRate = fromCurrency.rateToUSD / toCurrency.rateToUSD;
    const calculatedAmount = Number(amount) * exchangeRate;

    // Round to 6 decimal places
    return Math.round(calculatedAmount * 1000000) / 1000000;
  }, [fromCurrency, toCurrency, amount, fromCurrencyId, toCurrencyId]);

  const swapCurrencies = () => {
    // Swap the currency IDs
    const newFromId = toCurrencyId;
    const newToId = fromCurrencyId;
    
    // Only swap if both are selected and different
    if (newFromId && newToId && newFromId !== newToId) {
      setFromCurrencyId(newFromId);
      setToCurrencyId(newToId);
    }
  };

  const loading = currenciesLoading;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="converter-box"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="title"
      >
        محوّل العملات
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="row"
      >
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
        />

        <div className="dark-select">
          <Select
            options={fromCurrencyOptions}
            value={fromCurrency}
            onChange={(option) => {
              if (option) {
                setFromCurrencyId(option.value);
                // If the new from currency is the same as to currency, clear to currency
                if (option.value === toCurrencyId) {
                  setToCurrencyId(null);
                }
              }
            }}
            isLoading={currenciesLoading}
          />
        </div>
      </motion.div>

      <motion.button
        className="swap-btn"
        onClick={swapCurrencies}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <FaExchangeAlt />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="row"
      >
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: result !== null ? 1 : 0.5 }}
          disabled
          value={result !== null ? result.toFixed(6) : ""}
          className="input-field"
          placeholder="Result will appear here"
        />

        <div className="dark-select">
          <Select
            options={toCurrencyOptions}
            value={toCurrency}
            onChange={(option) => {
              if (option) {
                setToCurrencyId(option.value);
                // If the new to currency is the same as from currency, clear from currency
                if (option.value === fromCurrencyId) {
                  setFromCurrencyId(null);
                }
              }
            }}
            isLoading={currenciesLoading}
          />
        </div>
      </motion.div>

      {result !== null && fromCurrency && toCurrency && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="exchange-rate-info"
        >
          <p>
            Exchange Rate: 1 {fromCurrency.code} ={" "}
            {(fromCurrency.rateToUSD / toCurrency.rateToUSD).toFixed(6)}{" "}
            {toCurrency.code}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
