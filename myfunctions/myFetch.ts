const myFetch = async (
  base_url: string,
  url_path: string,
  queryParams = "",
  method = "GET",
  body_data = {}
) => {
  try {
    const url = `${base_url}/${url_path}?${queryParams}`;
    const headers = {
      "Content-Type": "application/json", // Set the content type to JSON
    };

    const res = await fetch(url, {
      method: "POST", // Use POST request method
      headers,
      body: JSON.stringify(body_data), // Convert data to JSON string and send it in the request body
    });
    // console.log("res");
    // console.log(res);
    const data = await res.json();
    // console.log(`FETCHED ${base_url}: ${JSON.stringify(data)}`);
    return data;
  } catch (_e) {
    console.log("ERROR FETCHING");
    console.log(_e);
    return {};
  }
};

export default myFetch;
