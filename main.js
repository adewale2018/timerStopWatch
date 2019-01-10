let hour = 0;
let minute = 0;
let second = 0;
let day = 0;
let paused = false;
let started = false;
let timerID;

const prependZeroToASingleDigitNumber = number => {
  return number.toString().length === 1 ? `0${number}` : number;
};

// toggle buttons betweeen start and stop, pause and resume
const toggleButton = button => {
  let content = "";
  if (button.id === "pauseResume") {
    paused = !paused;
    content = paused ? "Resume" : "Pause";
  } else if (button.id === "startStop") {
    started = !started;
    content = started ? "Stop" : "Start";
  }

  button.textContent = content;
  button.className = content.toLowerCase();
};


const timer = () => {
  if (paused) {
    return;
  }

  if (second === 59) {
    second = 0;
    document.getElementById(
      "second"
    ).textContent = prependZeroToASingleDigitNumber(second);
    if (minute === 59) {
      minute = 0;
      document.getElementById(
        "minute"
      ).textContent = prependZeroToASingleDigitNumber(minute);
      document.getElementById(
        "hour"
      ).textContent = prependZeroToASingleDigitNumber(++hour);
      // if (hour === 23) {
      //   hour = 0;
      //   document.getElementById(
      //     "hour"
      //   ).textContent = prependZeroToASingleDigitNumber(hour);
      //   document.getElementById(
      //     "day"
      //   ).textContent = prependZeroToASingleDigitNumber(++day);
      // } else {
      //   document.getElementById(
      //     "hour"
      //   ).textContent = prependZeroToASingleDigitNumber(++hour);
      // }
    } else {
      document.getElementById(
        "minute"
      ).textContent = prependZeroToASingleDigitNumber(++minute);
    }
  } else {
    document.getElementById(
      "second"
    ).textContent = prependZeroToASingleDigitNumber(++second);
  }
};


// entry point
document.getElementById("startStop").onclick = e => {
  toggleButton(e.target);

  if (started) {
    paused = false;
    day = hour = minute = second = 0;
  

    document.getElementById(
      "second"
    ).textContent = prependZeroToASingleDigitNumber(second);
    document.getElementById(
      "minute"
    ).textContent = prependZeroToASingleDigitNumber(minute);
    document.getElementById(
      "hour"
    ).textContent = prependZeroToASingleDigitNumber(hour);
    document.getElementById(
      "day"
      ).textContent = prependZeroToASingleDigitNumber(day);

    timerID = setInterval(timer, 1000);
  } else if (timerID) {
    clearInterval(timerID);
    paused = true;
    toggleButton(document.getElementById("pauseResume"));
  }
};

document.getElementById("pauseResume").onclick = e => {
  if (!started) {
    return;
  }

  toggleButton(e.target);
};


