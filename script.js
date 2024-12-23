window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if ('SpeechRecognition' in window) {
    const recognition = new SpeechRecognition();
    const startButton = document.getElementById('start-button');
    const responseDiv = document.getElementById('response');

    recognition.continuous = false;
    recognition.lang = 'en-US';

    startButton.addEventListener('click', () => {
        recognition.start();
        responseDiv.textContent = "Listening...";
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        responseDiv.textContent = `You said: "${transcript}"`;
        const answer = generateResponse(transcript);
        respond(answer, transcript);
    };

    recognition.onerror = () => {
        responseDiv.textContent = "Sorry, I didn't catch that. Please try again!";
    };

    function generateResponse(input) {
        const responses = {
            "hello": "Hi there! How can I assist you today?",
            "how are you": "I'm doing great, thank you for asking!",
            "what is your name": "I'm Pookie, your friendly assistant.",
            "what can you do": "I can answer questions, tell jokes, and more!",
            "bye": "Goodbye! Have a great day!",
            "what is the time": `The current time is ${new Date().toLocaleTimeString()}.`,
            "what is the date": `Today's date is ${new Date().toLocaleDateString()}.`,
            "tell me a joke": "Why don’t skeletons fight each other? They don’t have the guts!",
            "what is the weather like": "I can't check the weather right now, but I recommend a weather app!",
            "who created you": "I was created by two brilliant developers: Shrishti and Somya to assist with tasks.",
            "tell me a fun fact": "Did you know that octopuses have three hearts?",
            "open google": "Opening Google for you.",
            "search something": "What would you like to search for?",
            "what is the capital of france": "The capital of France is Paris.",
            "what is the tallest mountain": "The tallest mountain is Mount Everest, standing at 8,849 meters.",
            "who is the president of the united states": "The president as of 2024 is Joe Biden.",
            "can you sing": "I’m not a great singer, but I can try! La la la!",
            "tell me a quote": "Here's a quote for you: 'The only limit to our realization of tomorrow is our doubts of today.' - FDR",
            "how old are you": "I’m as young as the code that created me!",
            "do you like humans": "I think humans are wonderful creators!",
            "what is gravity": "Gravity is a force that pulls objects towards the center of the Earth.",
            "why is the sky blue": "The sky appears blue because of the scattering of sunlight by the atmosphere.",
            "what is pi": "Pi is approximately 3.14159, the ratio of a circle's circumference to its diameter.",
            "who discovered electricity": "Benjamin Franklin is often credited with discovering electricity.",
            "tell me another joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "what is the speed of light": "The speed of light is about 299,792 kilometers per second.",
            "tell me a riddle": "What has to be broken before you can use it? An egg!",
            "what is the meaning of life": "Philosophers say the meaning of life is to find happiness and purpose.",
            "who is albert einstein": "Albert Einstein was a physicist famous for his theory of relativity.",
            "what is photosynthesis": "Photosynthesis is how plants convert sunlight into energy.",
            "tell me a tongue twister": "Sure! Peter Piper picked a peck of pickled peppers.",
            "can you dance": "I can’t dance, but I can cheer you on!",
            "how far is the sun": "The sun is about 93 million miles away from Earth.",
            "what is the largest ocean": "The Pacific Ocean is the largest ocean on Earth.",
            "what is a black hole": "A black hole is a region where gravity is so strong that nothing can escape.",
            "how many continents are there": "There are seven continents on Earth.",
            "what is the smallest country": "Vatican City is the smallest country in the world.",
            "tell me a proverb": "Here's a proverb: 'A stitch in time saves nine.'",
            "what is an atom": "An atom is the smallest unit of matter.",
            "what is dna": "DNA carries genetic instructions for life.",
            "who invented the telephone": "Alexander Graham Bell invented the telephone.",
            "tell me a bedtime story": "Once upon a time, in a land far, far away...",
            "what is artificial intelligence": "AI simulates human intelligence in machines.",
            "what is machine learning": "Machine Learning is a branch of AI where machines learn from data.",
            "what is the moon made of": "The moon is made of rock and dust.",
            "why do we sleep": "Sleep helps the body recover and process information.",
            "what is the milky way": "The Milky Way is the galaxy that contains our solar system.",
            "what is a computer": "A computer is a device that processes data and performs calculations.",
            "what is energy": "Energy is the ability to do work or cause change.",
            "what is a galaxy": "A galaxy is a system of stars, gas, and dust bound by gravity.",
            "what is your favorite color": "I don't have a favorite color, but I think blue is cool!",
            "who is the current ceo of tesla": "The CEO of Tesla is Elon Musk."
        };

        if (input.startsWith("open ")) {
            return "Opening the website you requested.";
        }

        for (let key in responses) {
            if (input.includes(key)) {
                return responses[key];
            }
        }

        return "I'm not sure how to respond to that. Maybe try rephrasing your question!";
    }

    function respond(message, transcript) {
        responseDiv.textContent = message;

        if (transcript.startsWith("open ")) {
            const website = transcript.replace("open ", "").trim();
            const websiteMap = {
                "google": "https://www.google.com",
                "youtube": "https://www.youtube.com",
                "facebook": "https://www.facebook.com",
                "twitter": "https://www.twitter.com",
                "github": "https://www.github.com",
                "linkedin": "https://www.linkedin.com",
                "stackoverflow": "https://stackoverflow.com"
            };

            if (websiteMap[website]) {
                window.open(websiteMap[website], "_blank");
            } else {
                window.open(`https://${website}.com`, "_blank");
            }
        }

        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }
} else {
    const responseDiv = document.getElementById('response');
    responseDiv.textContent = "Sorry, your browser doesn't support the Web Speech API.";
}
