const xhr = new XMLHttpRequest(); 

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

// xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
xhr.open('GET', 'http://192.168.1.8:3000/api/v1/tasks');
xhr.send();
