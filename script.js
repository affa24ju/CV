const info1 = document.getElementById("info1")

fetch("info.json")
  .then(res => res.json())
  .then(data => {
    const parts = Object.keys(data);  

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const textInnehåll = data[part][0]; 

      info1.insertAdjacentHTML(
        "beforeend",
        `<div class="home-info">
           <p>${textInnehåll}</p>
         </div>`
      );

      // Om det inte är sista elementet, bryt rad
      if (i < parts.length - 1) {
        info1.insertAdjacentHTML("beforeend", "<br>");
      }
    }
  });
