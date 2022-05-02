document.addEventListener('click', function (event) {

    if (!event.target.matches('.submit-btn')) return;

    let wordleData = document.getElementById("wordle_input").value;
    let mappleData = document.getElementById("mapple_input").value;
    let framedData = document.getElementById("framed_input").value;

    console.log("wordleData", wordleData);
    console.log("mappleData", mappleData);
    console.log("framedData", framedData);

    let formattedCombinedData = processData(wordleData, mappleData, framedData);

    navigator.clipboard.writeText(formattedCombinedData.formattedResult + "\n" + formattedCombinedData.overallStats);
    document.getElementById("popUp").classList.add('active');


});


function processData(wordleData, mappleData, framedData) {

    let maximumGuesses = 18;
    let returnObj = {
        formattedResult: "",
        overallStats: ""
    }

   //get wordle num guesses
   let wordleNumGuesses = wordleData.split('/')[0].slice(-1);
   wordleNumGuesses = wordleNumGuesses != 'X' ? wordleNumGuesses : '10000';
   
   let mappleNumGuesses = mappleData.split('/')[0].slice(-1);
   mappleNumGuesses = mappleNumGuesses != 'X' ? mappleNumGuesses : '10000';


   let framedNumGuesses = framedData.split("🟥").length;
   framedNumGuesses = framedNumGuesses > 6 ? "10000" : framedNumGuesses;

   let totalGuessNumber = parseInt(wordleNumGuesses) + parseInt(mappleNumGuesses) + parseInt(framedNumGuesses);

   let formattedResult = wordleData + "\n" + "\n" + mappleData + "\n"  + framedData;
    formattedResult = formattedResult.replace("https://framed.wtf", '').replace("https://worldle.teuteuf.fr", '');
    returnObj.formattedResult = formattedResult;
    totalGuessNumber = isNaN(totalGuessNumber) ? "According to all known laws of aviation, there is no way that a bee should be able to fly." : totalGuessNumber;
    returnObj.overallStats = "My Total Stats: " + totalGuessNumber + "/" + maximumGuesses;

    return returnObj;

}