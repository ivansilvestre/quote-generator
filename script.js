const quoteContainer = document.getElementById("quote-generator");
const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author");
const btnNewQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let data = [];

function addLoading() {
  loader.style.display = "initial";
  quoteContainer.style.display = "none";
}

function removeLoading() {
  loader.style.display = "none";
  quoteContainer.style.display = "initial";
}

function getNewQuote() {
  const quote = data[Math.floor(Math.random() * data.length)];

  quote.author === ""
    ? (author.textContent = "Unknow")
    : (author.textContent = quote.author);

  quote.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
}

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";

  try {
    addLoading();
    const response = await fetch(apiUrl);
    data = await response.json();

    setTimeout(function () {
      getNewQuote();
      removeLoading();
    }, 500);
  } catch (error) {
    alert("oops... something went wrong");
    console.log(error);
  }
}

btnNewQuote.addEventListener("click", getQuotes);

getQuotes();
