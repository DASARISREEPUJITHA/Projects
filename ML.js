const diaryEntries = {
    "happy": "Today was one of those days where everything just felt right. The sun was shining, and I accomplished more than I expected. I feel grateful for all the little things that made today special, like the random compliments and the laughter with friends. Life feels so full of possibilities!",
    "sad": "Today felt heavy. Everything seemed to be out of sync, and I couldn't shake off the sadness. I miss the joy that used to come so easily, but I’m trying to remind myself that tough days don’t last forever.",
    "angry": "I’m so frustrated right now! It feels like nothing is going my way, and people are being inconsiderate. I just want to scream, but I know that won’t fix anything. Maybe I need to take a step back and cool down before I say something I regret.",
    "surprised": "Wow, today took an unexpected turn! I wasn’t expecting to hear that news at all. It’s crazy how things can change in the blink of an eye, but sometimes surprises bring new opportunities or perspectives. I’ll just have to see how this plays out.",
    "neutral": "Nothing too exciting or too bad happened today. It was one of those ‘in-between’ days, where everything feels routine. Sometimes it’s okay to just have a normal, uneventful day, I guess. It leaves me time to reflect without rushing."
  };
  
  function generateEntry() {
    const moodSelect = document.getElementById("mood-select");
    const promptInput = document.getElementById("prompt");
    const diaryEntryDiv = document.getElementById("diary-entry");
  
    const selectedMood = moodSelect.options[moodSelect.selectedIndex].text.toLowerCase();
    const prompt = promptInput.value.trim();
  
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
  
    let entryText = diaryEntries[selectedMood];
  
    // Process the prompt
    if (prompt) {
        const words = prompt.split("-");
    
        // Build the sentence using a more flexible approach
        let sentence = "";
        if (words.length > 1) {
          sentence = "I ";
          words.forEach((word, index) => {
            if (index === words.length - 1) {
              sentence += word;
            } else {
              sentence += word + " ";
            }
          });
          sentence = " Today." + sentence;
        } else {
          sentence = "Couldn't understand the prompt to create a specific sentence.";
        }
    
        entryText += ` ${sentence}`;
      }
  
    diaryEntryDiv.textContent = `${formattedDate}: ${entryText}`;
  }
  ML.html = `<h2>${formattedDate}</h2><p>${entryText}</p>`;
  // Event listeners for image clicks (unchanged)
  const images = document.querySelectorAll("img");
  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      moodSelect.selectedIndex = index;
      generateEntry();
    });
  });