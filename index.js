const btn = document.querySelector(".butam");
const input = document.querySelector("input");
const card1 = document.querySelector(".card1 .value1");
const card2 = document.querySelector(".card2 .value2");
const card3 = document.querySelector(".card3 .value3");
const cards = document.querySelectorAll(".crd");
const error = document.querySelector(".error");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  cards.forEach((cardd) => {
    if (cardd.classList.contains("show")) {
      cardd.classList.remove("show");
    }
  });

  //formatting the user input
  const userInput = input.value;
  const leng = userInput.length;
  const formattedInput =
    userInput.slice(0, 1).toUpperCase() +
    userInput.slice(1, leng).toLowerCase();

  const url = "https://api.covid19india.org/data.json";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let stateArray = data.statewise;
      var count = 0;

      for (var st of stateArray) {
        if (st.state === formattedInput) {
          card1.textContent = st.confirmed;
          card2.textContent = st.deaths;
          card3.textContent = st.active;
          cards.forEach((cardd) => {
            cardd.classList.add("show");
          });
          break;
        }
        count++;
      }

      console.log(count);
      console.log(stateArray.length);
      console.log(stateArray);
      if (count >= stateArray.length) {
        error.innerHTML = `<h4>SORRY DATA NOT AVAILABLE FOR ${formattedInput.toUpperCase()}!</h4>`;
        error.style.padding = "0.8rem";
        const para = document.createElement("p");
        para.innerHTML = "Tip: try another spelling !";
        error.appendChild(para);

        setTimeout(() => {
          error.innerHTML = ``;
          error.style.padding = "0rem";
        }, 3500);
      }
    });

  input.value = "";
});

//
