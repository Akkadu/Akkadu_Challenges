import React, { useEffect, useState } from "react";
import axios from "axios";
function Get() {
  const [data, setData] = useState();
  const getUser = () => {
    axios.get("http://localhost:5000").then(
      (response) => {
        console.log(response.data);
        setData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getUser(); 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
  }, [data]);

  console.log(data)

  return (
      <>
      <div>getUser</div>
      <p>{`Name: ${data?.name}`}</p>
      <p>{`Password: ${data?.password}`}</p>
      
      </>
  );
}

export default Get;
