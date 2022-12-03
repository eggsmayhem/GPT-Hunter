import React, {useState, useRef} from "react"
import axios from "axios"
import { Configuration, OpenAIApi } from "openai"

const Textspace = () => {
    const [message, setMessage] = useState('');
    const [newsText, setNewsText] = useState('');

    const handleMessageChange = event => {
        // 👇️ access textarea value
        setMessage(event.target.value);
        console.log(event.target.value);
      };
    const speechText = useRef();

    // let s3_url = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
    const newsHandler = async e => {
        e.preventDefault();
       

        try {
            const newskey = import.meta.env.VITE_NEWS_API_KEY;
            const theNews = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newskey}`);
            console.log(theNews.data.articles.length);
            const resultsAmount = await theNews.data.articles.length;
            const articleNum = Math.floor(Math.random() * resultsAmount);
            const newsArray = [theNews.data.articles[articleNum].title, theNews.data.articles[articleNum].description];

            setNewsText(newsArray);
            // const newsArray = await axios.get('relayURL');
            const configuration = new Configuration({
                apiKey: import.meta.env.VITE_OPEN_API_KEY,
              })
            const openai = new OpenAIApi(configuration);
            const result = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `The following is a conversation between a human and journalist Hunter S Thompson. The AI speaks as though it is Hunter S Thompson. \nHuman: What do you think about today's news, ${newsArray[0]}, ${newsArray[1]} \nAI:`,
                temperature: 0.9,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            })

            const hunterText = result.data.choices[0].text;
            console.log('this should be hunters response' + hunterText)

            const textToSpeech = {
                text: hunterText,
                "voice": "Joey"
            }

            console.log(hunterText);
            const speech = await axios.post(import.meta.env.VITE_BUCKET_NAME, textToSpeech)
            // console.log(postText + "butttt")
            const s3_url = speech.data.url
            console.log(speech.data.url)
            let audio = new Audio(s3_url);
            audio.play();

        }
        catch(err) {
            console.log(err);
        }
    }

    const submitHandler = async e => {
        e.preventDefault();
  
        const userInput = speechText.current.value;
        // console.log(speechData)
        try {
            //Send user text to GPT-3 to get "hunter" reponse
            const configuration = new Configuration({
                apiKey: import.meta.env.VITE_OPEN_API_KEY,
              })
            const openai = new OpenAIApi(configuration);
            const result = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `The following is a conversation between a human and journalist Hunter S Thompson. The AI speaks as though it is Hunter S Thompson. \nHuman: ${userInput}\nAI:`,
                temperature: 0.9,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
            })

            const hunterText = result.data.choices[0].text;
            console.log('this should be hunters response' + hunterText)

            const textToSpeech = {
                text: hunterText,
                "voice": "Joey"
            }

            console.log(hunterText);
            const speech = await axios.post(import.meta.env.VITE_BUCKET_NAME, textToSpeech)
            // console.log(postText + "butttt")
            const s3_url = speech.data.url
            console.log(speech.data.url)
            let audio = new Audio(s3_url);
            audio.play();
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Click Send to send a message, or News to get GPT-Hunter's opinion on a random news story</label>
            <div>Selected Article:</div>
            <div>{newsText}</div>
            <textarea id="message" name="message" value={message} onChange={handleMessageChange} ref={speechText} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
            <div className="flex space-x-2 justify-center">
                <button onClick={submitHandler} type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Send</button>
                <button onClick={newsHandler} type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">News</button>
            </div>
        </div>
    )
}

export default Textspace; 