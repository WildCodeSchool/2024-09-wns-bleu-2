// src/context/SearchContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

interface SearchContextType {
  departure: string;
  setDeparture: (v: string) => void;
  arrival: string;
  setArrival: (v: string) => void;
  date: Date;
  setDate: (d: Date) => void;
  passengers: number;
  setPassengers: (n: number) => void;
  departureTime: Date | null;
  setDepartureTime: (d: Date | null) => void;
  sortByPrice: boolean;
  setSortByPrice: (b: boolean) => void;
  selectedOptions: string[];
  setSelectedOptions: (o: string[]) => void;
  openFilters: boolean;
  setOpenFilters: (b: boolean) => void;
  handleSearch: (redirect?: boolean) => void;
  handleResetFilters: () => void;
  hasResults: boolean;
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [departureTime, setDepartureTime] = useState<Date | null>(null);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    const departureParam = params.get("departure");
    const arrivalParam = params.get("arrival");
    const dateStr = params.get("date");
    const timeStr = params.get("time");

    if (departureParam) setDeparture(departureParam);
    if (arrivalParam) setArrival(arrivalParam);
    if (dateStr) setDate(new Date(dateStr));
    if (timeStr) setDepartureTime(new Date(`1970-01-01T${timeStr}:00`));
    if (params.get("passengers")) {
      setPassengers(Number(params.get("passengers")));
    }
  }, [params]);

  const handleSearch = (redirect: boolean = false) => {
    const newParams = new URLSearchParams({
      departure,
      arrival,
      date: date.toISOString().split("T")[0],
      passengers: passengers.toString(),
    });
    setParams(newParams);

    if (redirect) {
      navigate(`/search-page?${newParams.toString()}`);
    }
  };

  const handleResetFilters = () => {
    setSortByPrice(false);
    setSelectedOptions([]);
  };

  const hasResults = Boolean(params.get("departure") && params.get("arrival"));

  return (
    <SearchContext.Provider
      value={{
        departure,
        setDeparture,
        arrival,
        setArrival,
        date,
        setDate,
        passengers,
        setPassengers,
        departureTime,
        setDepartureTime,
        sortByPrice,
        setSortByPrice,
        selectedOptions,
        setSelectedOptions,
        openFilters,
        setOpenFilters,
        handleSearch,
        handleResetFilters,
        hasResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
