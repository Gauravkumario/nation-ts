// Assuming you are using Next.js Image component
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function YourComponent() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCountries(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center">Error loading data</p>;
  }

  const getFlagURL = (country) => {
    if (country.flags) {
      return country.flags.svg || country.flags.png || country.flags;
    }
    return null;
  };

  return (
    <div className="max-w-screen-xl m-auto px-6 py-6">
      <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((country) => (
          <Link
            href={`country?code=${country.alpha3Code}`}
            key={country.alpha3Code}
            className="flex flex-col drop-shadow-2xl bg-white rounded-md overflow-hidden"
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
                <span className="font-light"> {country.population}</span>
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
  );
}

export default YourComponent;
