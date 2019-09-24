let hour = 0, minute = 0,  second = 0;
let day = 0, paused = false, started = false;
let timerID;

const prependZero = number => {
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
    ).textContent = prependZero(second);
    if (minute === 59) {
      minute = 0;
      document.getElementById(
        "minute"
      ).textContent = prependZero(minute);
      document.getElementById(
        "hour"
      ).textContent = prependZero(++hour);
    } else {
      document.getElementById(
        "minute"
      ).textContent = prependZero(++minute);
    }
  } else {
    document.getElementById(
      "second"
    ).textContent = prependZero(++second);
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
    ).textContent = prependZero(second);
    document.getElementById(
      "minute"
    ).textContent = prependZero(minute);
    document.getElementById(
      "hour"
    ).textContent = prependZero(hour);
    document.getElementById(
      "day"
      ).textContent = prependZero(day);

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
