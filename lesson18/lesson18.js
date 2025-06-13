function xhrGet() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(JSON.parse(xhr.response));
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}

async function fetchGet() {
  const response = await fetch("https://supersimplebackend.dev/greeting");
  const text = await response.text();
  console.log(text);
}

async function postGreeting() {
  const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Bui Anh Tuan",
    }),
  });

  const text = await response.text();
  console.log(text);
}

async function getAmazon() {
  // try{
  //   const response = await fetch('https://amazon.com');
  //   const parse = await response.json();
  //   console.log(parse);
  // } catch(error) {
  //   console.log('CORS error. Your request was blocked by the backend.');
  // }

  fetch("https://amazon.com")
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(
        "CORS error. Your request was blocked by the backend.",
        error
      );
    });
}

async function testPOST() {
  try {
    const response = await fetch("https://supersimplebackend.dev/greeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (response.status >= 400) throw response;
    const text = await response.text();
    console.log(text);
  } catch (error) {
    if (error.status === 400) {
      const errorMsg = await error.json();
      console.log(errorMsg);
    } else console.log("Network error. Try again later");
  }
}

async function loadCartAsync(fun) {
  const promise = await new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      resolve(xhr.response);
      fun();
    });
  
    xhr.addEventListener("error", (error) => {
      console.log("Unexpected error. Please try again later.", error);
    });
  
    xhr.open("GET", "https://supersimplebackend.dev/cart");
    xhr.send();
  })

  const text = await promise;
  console.log(text);
}

loadCartAsync(()=>{
  console.log('test');
})

async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart")
  const text = await response.text();
  console.log(text);
}

loadCartFetch();

// function loadProducts(fun) {
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener("load", () => {
//     products = JSON.parse(xhr.response);
//     console.log("loading products");
//     fun();
//   });
//   console.log("load products");

//   xhr.addEventListener("error", (error) => {
//     console.log("Unexpected error. Please try again later.", error);
//   });

//   xhr.open("GET", "https://supersimplebackend.dev/products");
//   xhr.send();
// }

// async function testAsync() {
//   const value = await new Promise((resolve) => {
//     loadProducts(() =>{
//       resolve(1);
//     })
//   });
  
//   console.log(value);
// }

// testAsync();
