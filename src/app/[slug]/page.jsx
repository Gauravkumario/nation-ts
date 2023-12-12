"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const CPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams({});
  const search = searchParams.get("code");
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${search}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]); // Empty dependency array to run the effect only once on mount

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center">Error loading data</p>;
  }

  const getFlagURL = (nation) => {
    if (nation.flags) {
      return nation.flags.svg || nation.flags.png || nation.flags;
    }
    return null;
  };

  const handleGoBack = () => {
    router.back();
  };

  const nation = country[0];
  const money = Object.values(nation.currencies);
  const speak = Object.values(nation.languages);
  const nativeNameValues = Object.values(nation.name.nativeName);
  // Assuming there is only one dynamic key, you can access common like this
  const commonValue = nativeNameValues[0]?.common;

  return (
    <div className="max-w-screen-xl m-auto px-6 py-6">
      <div>
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1 rounded drop-shadow-2xl bg-slate-100 px-6 py-2"
        >
          <IoIosArrowRoundBack size={20} />
          Back
        </button>
      </div>
      <div className="md:flex  py-6">
        <div className="md:w-[50%] h-96 relative bg-pink-300">
          {getFlagURL(nation) && (
            <Image
              src={getFlagURL(nation)}
              alt={`Flag of ${nation.name}`}
              layout="fill"
              objectFit="cover"
              className=""
            />
          )}
        </div>
        <div className="md:w-[50%] md:p-8 py-8">
          <h1 className="text-2xl font-semibold mb-4">
            {nation.name.official}
          </h1>
          <div className="md:flex justify-between">
            <div className="md:w-[50%]">
              <div className="font-medium">
                Native Name:
                <span className="font-light"> {commonValue}</span>
              </div>
              <div className="font-medium">
                Population:
                <span className="font-light">
                  {" "}
                  {nation.population.toLocaleString()}
                </span>
              </div>
              <div className="font-medium">
                Region:
                <span className="font-light"> {nation.region}</span>
              </div>
              <div className="font-medium">
                Subregion:
                <span className="font-light"> {nation.subregion}</span>
              </div>
              <div className="font-medium">
                Capital:
                <span className="font-light"> {nation.capital}</span>
              </div>
            </div>
            <div className="md:w-[50%] my-8 md:my-0">
              <div className="font-medium">
                Top Level Domain:
                <span className="font-light"> {nation.tld.join(", ")}</span>
              </div>
              <div className="font-medium">
                Carrencies:
                {money.map((pay, index) => {
                  return <span key={index} className="font-light"> {pay.name}</span>;
                })}
              </div>
              <div className="font-medium">
                languages:
                <span className="font-light"> {speak.join(", ")}</span>
              </div>
            </div>
          </div>
          <div>
            <strong>Borders:</strong>
            <ul className="flex flex-wrap gap-4 mt-4">
              {nation.borders != null ? (
                nation.borders.map((border, index) => (
                  <li
                    key={index}
                    className="rounded drop-shadow-2xl bg-slate-100 px-6 py-2"
                  >
                    <Link href={`/country?code=${border}`}>{border}</Link>
                  </li>
                ))
              ) : (
                <span>{nation.name.official} has no border countries.</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPage;
