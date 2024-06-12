   /**
   * printText - displays the data in the div block that was processed in parserCSVText on the page
   * 
   * @param {*div block where the data will be located} outputeTextDiv 
   * @param {*processed text to be output (array)} parserCSVText 
   */
let printText = (outputeTextDiv, parserCSVText) => {
   /*
   *for each element of the array creates a <p> tag and adds text to it and adds it to the desired div block
   */
      parserCSVText.forEach(line => {
         let p = document.createElement('p');
         p.textContent = line;
         outputeTextDiv.appendChild(p);
      });
}
/**
 * works when the file is moved to the input, reads the file and checks it for correct design and
 * writing this displays the data on the screen
 */
document.getElementById('fileInput').addEventListener('change', (event) =>{
   const file = event.target.files[0]; //get the first file
   let outputeTextDiv = document.getElementById('outpute'); // gets a link to the desired div
   /**
    * checks whether the file exists, if so created by the reader, and reads the text from the file,
    */
   if(file){
    const reader = new FileReader();
    reader.readAsText(file);
    /**
     * after reading, it parses the text and displays it on the page
     * 
     * @param {*event object} event 
     */
    reader.onload = function(event){
    let parserText = parserCSVText(event.target.result); // gets the parsed text from the file
    printText(outputeTextDiv, parserText);   //displays the text on the screen
    }
   }
})

/**
 *will receive the text in csv format, filter and process it, and then output the data in the format 
 * Name of the city, ranking in the top 10 largest cities of Ukraine populated by .. people
 * 
 * @param {*received text for parsing } text 
 * @returns text ready for output
 */
function parserCSVText(text){
   /**
    * 1. Splits into an array by carriage.
    * 2. Filters the text in so that it is like xx.xx(number), xx.xx(number), text, any numbers,
    * 3. Create an array of objects that contain coordinates, name, population
    * 4. Sorts by popularity 
    * 5. cuts the TOP 10
    * 6. creates an object with objects that contain the name: data
    */
   text = text.split("\n")
   .filter(a => /^(?!#)\d{2}.\d{2},\d{2}.\d{2},.*,\d*,\r?$/.test(a))
   .map((c) => (words = c.split(','), {x: words[0], y: words[1], name: words[2], population: Number(words[3])}))
   .sort((a,b) => b.population - a.population ) 
   .slice(1,11)
   .reduce((a,b,c) => (  a[b.name] = {population: b.population, coordinatesX: b.x, coordinatesY: b.y, rating: c+1}, a),{});

/**
 * result takes the data object city: data about it and creates the correct lines for output 
 * 
 *@param {*object with objects that need to be processed into the correct lines} text 
 * @returns an array with the correct strings 
 */
      const result = (text) => {
      let keysValue = Object.entries(text);
      
      let wordPeople = (population) =>{ 
      let word = '';
      if(population % 10 === 1 && population % 100 !== 11 ){
         word = 'людина';
      }else if((population % 10 > 1 && population % 10 < 5) ?? !(population % 100 > 10 && population % 100 < 15) ){
         word = 'людини';
      }else{
         word = 'людей';
      }
      return word;
   }
      return keysValue.map(([key, value]) =>(`${String(key).replace(String(key), `${String(key)} це ${value.rating} місце в ТОП - 10 найбільших міст України населення ${value.population} ${wordPeople(Number(value.population))}`)}`)) 
   };

   return result(text);
}

   



