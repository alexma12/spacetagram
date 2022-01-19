import { useEffect, useState } from "react";
import axios from "axios";
import {
  nasaAPIDateFormat,
  addDaysToDate,
  dateComparison,
} from "../utils/dateUtils";

const calculateStartAndEndDates = (startDate, currBatch, batchSize) => {
  let modifiedStartDate = addDaysToDate(
    startDate,
    currBatch + batchSize * currBatch
  );

  let modifiedEndDate = addDaysToDate(modifiedStartDate, batchSize);
  let todaysDate = new Date();
  if (dateComparison(modifiedEndDate, todaysDate, "after")) {
    modifiedEndDate = todaysDate;
  }
  modifiedEndDate = nasaAPIDateFormat(modifiedEndDate);

  return [modifiedStartDate, modifiedEndDate];
};

const useBatchedNasaImageQuery = (startDate, currBatch, batchSize = 7) => {
  const [data, setData] = useState(null);
  const [isAllDataFetched, setIsAllDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData([]);
    setIsAllDataFetched(false);
  }, [startDate]);

  useEffect(() => {
    if (!isAllDataFetched) {
      let [modifiedStartDate, modifiedEndDate] = calculateStartAndEndDates(
        startDate,
        currBatch,
        batchSize
      );
      const url = `https://api.nasa.gov/planetary/apod?api_key=${
        process.env.REACT_APP_NASA_API_KEY
      }&start_date=${nasaAPIDateFormat(
        modifiedStartDate
      )}&end_date=${nasaAPIDateFormat(modifiedEndDate)}`;

      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setData((prevData) => prevData.concat(response.data));
          } else if (response.data) {
            setData((prevData) => prevData.concat([response.data]));
          }
          if (dateComparison(modifiedEndDate, new Date(), "equal")) {
            setIsAllDataFetched(true);
          }
        })
        .catch((error) => {
          setError(error);
        });
      setIsLoading(false);
    }
  }, [startDate, currBatch, isAllDataFetched]);

  return [data, isAllDataFetched, isLoading, error];
};
export default useBatchedNasaImageQuery;
