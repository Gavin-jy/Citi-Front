const baseUrl = "http://localhost:3000/api"

export async function get({ url, params }) {
  const items = Object.entries(params);
  let str = "";
  for (let i = 0; i < items.length; i++) {
    if (i < items.length - 1) {
      str += items[i][0] + "=" + items[i][1] + "&";
    } else {
      str += items[i][0] + "=" + items[i][1];
    }
  }
  try {
    const res = await fetch(str == "" ? baseUrl + url : `${baseUrl + url}?${str}`);
    return await res.json();
  } catch (err) {
    return await Promise.reject(err);
  }
}

export async function post({ url, params }) {
  try {
    const res = await fetch(baseUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(params),
    });
    return await res.json();
  } catch (err) {
    return await Promise.reject(err);
  }
}
// function fetcher({ url, method, params }) {
//   if (method == "GET") {
//     const items = Object.entries(params);
//     let str = "";
//     for (let i = 0; i < items.length; i++) {
//       if (i < items.length - 1) {
//         str += items[i][0] + "=" + items[i][1] + "&";
//       } else {
//         str += items[i][0] + "=" + items[i][1];
//       }
//     }
//     return fetch(str == "" ? url : `${url}?${str}`)
//       .then((res) => res.json())
//       .catch((err) => Promise.reject(err));
//   } else {
//     return fetch(url, {
//       method: "POST",
//       header: {
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//       body: JSON.stringify(params),
//     })
//       .then((res) => res.json())
//       .catch((err) => Promise.reject(err));
//   }
// }

// export default fetcher;
