let printText = (outputeTesxtDiv, textResult) => {
         let p = document.createElement('p');
         p.textContent = textResult;
         outputeTesxtDiv.appendChild(p);
}
let parserText;
document.getElementById('fileInput').addEventListener('change', (event) =>{
   const file = event.target.files[0]; 
   let outputeTextDiv = document.getElementById('outpute');
   
   if(file){
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event){
    parserText = parserCSVText(event.target.result); 
    creatInutText(outputeTextDiv);
    }
   }
})
creatInutText = (outputeTextDiv) => {
   let textArea = document.createElement('textarea');
   let button = document.createElement('button');
   
   button.textContent = 'name city';
   button.id ='nameCity';
   
   outputeTextDiv.appendChild(textArea);
   outputeTextDiv.appendChild(button);
   
   button.addEventListener('click',  () => {
      let resultText = parserText(textArea.value);
      printText(outputeTextDiv, resultText);
   })
}

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

function parserCSVText(text){
   const textParsed = text.split("\n")
   .filter(line => /^(?!#)\d{2}.\d{2},\d{2}.\d{2},.*,\d*,\r?$/.test(line))
   .map((arrLine) => (words = arrLine.split(','), {x: words[0], y: words[1], name: words[2], population: Number(words[3])}))
   .sort((a,b) => b.population - a.population ) 
   .slice(0,10)
   .reduce((acc,currentObject,index) => (  acc[currentObject.name] = {population: currentObject.population, coordinatesX: currentObject.x, coordinatesY: currentObject.y, rating: index+1}, acc),{});

   return (inputText) =>{
       return inputText.replace(/[а-яА-ЯґҐєЄіІїЇ]+|[?!.,]/g, nameCity => {
         if(nameCity in textParsed){
         return `${[nameCity]} це ${textParsed[nameCity].rating} місце в ТОП - 10 найбільших міст України населення ${textParsed[nameCity].population} ${wordPeople(Number(textParsed[nameCity].population))}`
         }else{
            return nameCity;
         }
      })
   } 
}