// SENG513 Assignment1
// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB
// Yuan Liu: 30087153


function getStats(txt) {
    // fields
    //Attribute: nChar : integer
    let nChars = txt.length;
    let nWords = 0;
    let averageWordLength = 0;
    let ObjectWordArray = [];
    let wordArray = [];
    let uniquewordArray = [];
    let wordFrequent = [];
    let totalWordLength = 0;
    let tenLongestWords = [];
    let tenMostFrequentWords = [];
    //Attribute: nWords : integer
    let lineArray = txt.split(/\r\n|\r|\n/);
    let nLines = lineArray.length;
    //console.log(nLines);
    //Attribute: nNonEmptyLines : integer
    let nNonEmptyLines = 0;
    //Attribute: maxLineLength : integer
    let maxLineLength = 0;
    for(var i = 0; i < nLines; i++){
        //console.log(lineArray[i]); 
        if(lineArray[i].length > maxLineLength){
            maxLineLength = lineArray[i].length;
        } 
        if(/\S/.test(lineArray[i])) {
            nNonEmptyLines++;
        }
    }
 
    //Attribute of nWords : integer
    if(nChars != 0){
        //split the string in raw words that has punctuation
        let txtWithNum = txt.toLowerCase().split(/[\n\s]+/);        
        for(var i = 0; i < txtWithNum.length; i++){
            //not a empty raw words
            if(txtWithNum[i] != ""){               
                //console.log(txtWithNum[i]);
                //move punctuation
                txtWithNum[i] = txtWithNum[i].replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
                //console.log(txtWithNum[i]);
                //split the words include letter string and number string
                let numWITHletter = txtWithNum[i].match(/[a-z]+|[0-9]+/g);
                if(numWITHletter != null){   
                    wordArray = wordArray.concat(numWITHletter);
                }
                //console.log(numWITHletter);
                //console.log("wordarray");
                //console.log(wordArray);                
            }           
        }
        //Attribute: nWords : integer
        nWords = wordArray.length;
        for(var i = 0; i < wordArray.length; i++){
            //console.log(wordArray[i]);
            totalWordLength += wordArray[i].length; 
            //console.log(totalWordLength);
            ObjectWordArray.push({
                "word": wordArray[i],
                "length": wordArray[i].length
            });
        }
        //console.log(ObjectWordArray);
        //Attribute: averageWordLength: float
        if(nWords > 0){
            averageWordLength = Number.parseFloat(totalWordLength/(nWords)).toFixed(2);
        }

        //Sort: primary sort by words length, secondary sort by alphabetical   
        var SortedArray = ObjectWordArray.sort((a, b)=> {
            if (a.length === b.length){
              return a.word < b.word ? -1 : 1
            } else {
              return a.length > b.length ? -1 : 1
            }
          })
        //console.log("Sorting");
        //console.log(SortedArray);
        
        //Attribute: longestWord : array of strings
        SortedArray.forEach((c) => {
            if (!uniquewordArray.includes(c.word)) {
                uniquewordArray.push(c.word);
            }
        });
        //console.log(uniquewordArray);
        //get the 10 longest words
        if(uniquewordArray.length <= 10){
            tenLongestWords = uniquewordArray;
        }else{
            tenLongestWords = uniquewordArray.slice(0, 10);
        }
        //word frequency
        //Attribute: mostFrequentWords : array of strings
        for(var i = 0; i < uniquewordArray.length; i++){
            var count = wordArray.filter(function(value){
                return value === uniquewordArray[i];
            }).length
            wordFrequent.push({
                "word": uniquewordArray[i],
                "frequent": count
            });
        }
        //console.log(wordFrequent);
        //Sort: primary sort by words frequence, secondary sort by alphabetical 
        wordFrequent.sort((a, b)=> {
            if (a.frequent === b.frequent){
              return a.word < b.word ? -1 : 1
            } else {
              return a.frequent > b.frequent ? -1 : 1
            }
          })
        //console.log(wordFrequent);
        //get the 10 most frequent words
        for(var i = 0; i < wordFrequent.length && i < 10; i++){
            tenMostFrequentWords.push(wordFrequent[i].word.concat("(", wordFrequent[i].frequent, ")"));
        }
       

    }
   

    return {
        nChars,                                                     
        nWords,
        nLines,
        nNonEmptyLines,
        averageWordLength,
        maxLineLength,
        tenLongestWords,
        tenMostFrequentWords,
    };

}
