const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New Quote
function newQuote() {
  loading();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if Author field is blank and replace it with 'Unknow''
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

//Get Quotes from API
/* An asynchronous function can run at any time independently and it won't 
stop the browser from completing the loading of a  page*/
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch Error Here
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
window.onload = function () {
  Particles.init({
    // normal options
    selector: ".background",
    maxParticles: 450,
    color: "#38a1f3 ",
  });
};

getQuotes();
