// Assuming you are using Next.js Image component
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

function Nation() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      filterCountries();
    }, 100);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
    setSearchTerm(""); // Reset search term when region changes
    filterCountries();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterCountries = () => {
    let filtered = countries;

    if (selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  };

  if (isLoading) {
    return <p className="text-center dark:text-white">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center dark:text-white">Error loading data</p>;
  }

  const getFlagURL = (country) => {
    if (country.flags) {
      return country.flags.svg || country.flags.png || country.flags;
    }
    return null;
  };

  return (
    <div className="dark:bg-[#202C37] dark:text-white">
      <div className="max-w-screen-xl m-auto px-6 py-6">
        <div className="md:flex justify-between items-center mb-8">
          <div className="md:min-w-max flex gap-2 items-center drop-shadow-md rounded-md bg-white p-4 dark:bg-[#2B3945]">
            <IoIosSearch size={24} fill="gray" />
            <input
              type="text"
              className="outline-none bg-transparent"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="md:min-w-max drop-shadow-md bg-white p-4 flex gap-2 rounded-md sm:justify-end items-center dark:bg-[#2B3945]">
            <label htmlFor="region" className="font-medium">
              Filter by Region:
            </label>
            <select
              id="region"
              onChange={handleRegionChange}
              value={selectedRegion}
              className="p-2 border rounded-md outline-none bg-transparent dark:text-white"
            >
              <option className="dark:bg-[#202C37] dark:text-white" value="">All</option>
              <option className="dark:bg-[#202C37] dark:text-white" value="Africa">Africa</option>
              <option className="dark:bg-[#202C37] dark:text-white" value="Americas">Americas</option>
              <option className="dark:bg-[#202C37] dark:text-white" value="Asia">Asia</option>
              <option className="dark:bg-[#202C37] dark:text-white" value="Europe">Europe</option>
              <option className="dark:bg-[#202C37] dark:text-white" value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCountries.map((country) => (
            <Link
              href={`country?code=${country.alpha3Code}`}
              key={country.alpha3Code}
              className={`flex flex-col drop-shadow-2xl bg-white rounded-md overflow-hidden dark:bg-[#2B3945] dark:text-white`}
            >
              <div className="w-full h-40 relative">
                {getFlagURL(country) && (
                  <Image
                    src={getFlagURL(country)}
                    alt={`Flag of ${country.name}`}
                    layout="fill"
                    sizes="100vw"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="flex flex-col p-4">
                <div>
                  <strong>{country.name}</strong>
                </div>
                <div className="font-medium">
                  Population:
                  <span className="font-light">
                    {" "}
                    {country.population.toLocaleString()}
                  </span>
                </div>
                <div className="font-medium">
                  Region:
                  <span className="font-light"> {country.region}</span>
                </div>
                <div className="font-medium">
                  Capital:
                  <span className="font-light"> {country.capital}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Nation;
