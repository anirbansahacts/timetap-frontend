// src/components/Greeting.jsx

import React from "react";

const Greeting = ({ userName = "Harvey" }) => {
  // Added userName prop with a default value
  const currentHour = new Date().getHours(); // Gets the current hour (0-23)

  let greetingText;
  let funnyLine;

  // Define funny and creative lines for different times of day
  const funnyLines = {
    morning: [
      "Another day, another cup of coffee. Or five.",
      "Rise and shine! Or just rise. Shining is optional.",
      "The early bird gets the worm, but the second mouse gets the cheese.",
      "May your coffee be strong and your code be bug-free!",
    ],
    afternoon: [
      "Halfway to the weekend! Keep pushing those pixels.",
      "Lunch break's over, but the snack break is always an option.",
      "Afternoon slump? A little code and a lot of dreams.",
      "Stay hydrated, stay motivated, stay awesome!",
    ],
    evening: [
      "Coding into the night, powered by passion (and maybe a late-night snack).",
      "The stars are out, and so are the bugs. Happy hunting!",
      "Time to unwind, or perhaps, time for one last compile.",
      "May your evening be filled with peace, pixels, and maybe pizza.",
    ],
  };

  // Function to get a random funny line
  const getRandomLine = (timeOfDay) => {
    const lines = funnyLines[timeOfDay];
    if (lines && lines.length > 0) {
      return lines[Math.floor(Math.random() * lines.length)];
    }
    return "Time flies when you're having fun!";
  };

  if (currentHour >= 5 && currentHour < 12) {
    greetingText = "Good Morning";
    funnyLine = getRandomLine("morning");
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingText = "Good Afternoon";
    funnyLine = getRandomLine("afternoon");
  } else {
    greetingText = "Good Evening";
    funnyLine = getRandomLine("evening");
  }

  return (
    <div>
      <div className=" fw-bold fs-3">
        {greetingText}, {userName}!👋
      </div>{" "}
      <p className="fw-light" style={{ fontSize: "12px", margin: 0 }}>
        {funnyLine}
      </p>
    </div>
  );
};

export default Greeting;
