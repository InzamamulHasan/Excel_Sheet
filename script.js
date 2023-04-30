/*function func(event){
    console.log(event.target);
  
}
function func1(event){
    console.log(event.target);
  
}*/
const boldBtn=document.getElementById("bold_btn");
const italicBtn=document.getElementById("italic_btn");
const underlineBtn=document.getElementById("underline_btn");
const thead=document.getElementById("table_head");
const textCol=document.getElementById("color");
const bgCol=document.getElementById("bg_color");
let left_align=document.getElementById("left_align");
let center_align=document.getElementById("center_align");
let right_align=document.getElementById("right_align");
const fontSize=document.getElementById("font_size");
const fontFam=document.getElementById("font_family");
const cutBtn=document.getElementById("cut_btn");
const copyBtn=document.getElementById("copy_btn");
const pasteBtn=document.getElementById("paste_btn");

let row1=100;
let col=26;

let currCell;
let cutValue;

let tr1=document.createElement("tr");
let th1=document.createElement("th");
th1.style.backgroundColor="rgb(105, 185, 180)"
tr1.append(th1)
for(let i=0;i<26;i++){
    let th=document.createElement("th");
    th.innerText=String.fromCharCode(i+65);
    th.style.backgroundColor="rgb(185, 185, 185)"
    tr1.append(th);
}
thead.append(tr1);

const tbody=document.getElementById("table_body");

for(let col=1;col<=100;col++){
    let tr2=document.createElement("tr");
    let th=document.createElement("th");
    th.innerText=col;
    th.style.backgroundColor="rgb(185, 185, 185)"
    tr2.append(th);
   
    for(let row=0;row<26;row++){
        let td=document.createElement("td");
        td.setAttribute("contenteditable","true");
        td.setAttribute("spellcheck","false");
        td.setAttribute("id",`${String.fromCharCode(row+65)}${col}`);
        td.addEventListener("focus",(event)=>{
            onFocusfnc(event);
        })
        td.addEventListener("input",(event)=>{
            onInputFnc(event);
        })

        tr2.append(td);
    }
    tbody.append(tr2)
}

//Creating 2D matrix

let matrix=new Array(100);


///Sheet
let numSheets=1;
let arrMatrix=[];
let currSheetNum=1;


for(let i=0;i<100;i++){
    matrix[i]=new Array(26);
    for(let j=0;j<26;j++){
        matrix[i][j]={};
    }
}
console.log(matrix);
function onFocusfnc(ev){
    //console.log(ev.target);
    document.getElementById("current_cell").innerText=ev.target.id;
    currCell=ev.target;
    //console.log(currCell.style.cssText)
    updatedJson(currCell);
 
}
function onInputFnc(ev){
   /* document.getElementById("current_cell").innerText=ev.target.id;
    currCell=ev.target;*/
    //console.log(currCell.style.cssText)
    updatedJson(ev.target);
}
function updatedJson(cell){
    let json={
        style: cell.style.cssText,
        text: cell.innerText,
        id: cell.id,
    };
    // update this json into matrix
    let id=cell.id.split("");
    console.log(id);
    let j=id[0].charCodeAt(0)-65;
    let i;
    if(id.length==3){
        i=(id[1]+id[2])-1;
    }else{
        i=id[1]-1;
    }
   
    matrix[i][j]=json;
    const matrix2 = matrix;
    console.log(matrix[i][j],i,j)
    console.log("matrix",matrix);
    /*
    if(arrMatrix.length==numSheets){
        arrMatrix[currSheetNum-1]=matrix;
    }else{
        arrMatrix.push(matrix);
    }
    console.log("arrmatrix",arrMatrix)*/

}

// text-bold
boldBtn.addEventListener("click",()=>{
    if(currCell==undefined){
        return;
    }
    if(currCell.style.fontWeight=="bold"){
        currCell.style.fontWeight="normal";
    }else{
        currCell.style.fontWeight="bold";
    }
    updatedJson(currCell);
})
// italic-text
italicBtn.addEventListener("click",()=>{
    if(currCell==undefined){
        return;
    }
    if(currCell.style.fontStyle=="italic"){
        currCell.style.fontStyle="normal";
    }else{
        currCell.style.fontStyle="italic";
    }
    updatedJson(currCell);
})
// Text-underline
underlineBtn.addEventListener("click",()=>{
    if(currCell==undefined){
        return;
    }
    if(currCell.style.textDecoration=="underline"){
        currCell.style.textDecoration=null;
    }else{
        currCell.style.textDecoration="underline";
    }
    updatedJson(currCell);
})
// Text-Color
textCol.addEventListener("input",()=>{
    if(currCell==undefined){
        return;
    }
    currCell.style.color=textCol.value;
    updatedJson(currCell);
   
})
// Background-color
bgCol.addEventListener("input",()=>{
    if(currCell==undefined){
        return;
    }
   
    currCell.style.backgroundColor=bgCol.value;
    updatedJson(currCell);
   
})
// Text_align
left_align.addEventListener("click",()=>{
    if(currCell==undefined){
        return;
    }
    currCell.style.textAlign="left";
    updatedJson(currCell);
})
center_align.addEventListener("click",()=>{
    if(currCell==undefined){
        return;
    }
    currCell.style.textAlign="center";
    updatedJson(currCell);
})
right_align.addEventListener("click",()=>{
    if(currCell==undefined){
        return;
    }
    currCell.style.textAlign="right";
    updatedJson(currCell);
})
// font-Family
fontSize.addEventListener("change",()=>{
    if(currCell==undefined){
        return;
    }
    currCell.style.fontSize=fontSize.value;
    updatedJson(currCell);
})

fontFam.addEventListener("change",()=>{
    if(currCell==undefined){
        return;
    }
    currCell.style.fontFamily=fontFam.value;
    updatedJson(currCell);
})

/// moving from one to other location
cutBtn.addEventListener("click",()=>{
   
    cutValue={
        style: currCell.style.cssText,
        text: currCell.innerText,
    }
    let id=currCell.id.split("");
    console.log(id);
    let j=id[0].charCodeAt(0)-65;
    let i;
    if(id.length==3){
        i=(id[1]+id[2])-1;
    }else{
        i=id[1]-1;
    }
   
    matrix[i][j]={};
    currCell.style=null;
    currCell.innerText=null;

})
copyBtn.addEventListener("click",()=>{
   
    cutValue={
        style: currCell.style.cssText,
        text: currCell.innerText,
    }
  
})

pasteBtn.addEventListener("click",()=>{
    currCell.style.cssText=cutValue.style;
    currCell.innerText=cutValue.text;
    updatedJson(currCell)
})

/// download jsonfile
function downloadJson() {
    // Define your JSON data
  
    // Convert JSON data to a string
    const jsonString = JSON.stringify(matrix);
  
    // Create a Blob with the JSON data and set its MIME type to application/json
    const blob = new Blob([jsonString], { type: "application/json" });
  
    // Create an anchor element and set its href attribute to the Blob URL
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json"; // Set the desired file name
  
    // Append the link to the document, click it to start the download, and remove it afterward
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //json file
  document.getElementById("jsonFile").addEventListener("change",readJsonFile);

  function readJsonFile(event) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const fileContent = e.target.result;
  
        // {id,style,text}
        // Parse the JSON file content and process the data
        try {
          const jsonData = JSON.parse(fileContent);
          console.log("matrix2", jsonData);
          matrix = jsonData;
          jsonData.forEach((row) => {
            row.forEach((cell) => {
              if (cell.id) {
                var myCell = document.getElementById(cell.id);
                myCell.innerText = cell.text;
                myCell.style.cssText = cell.style;
              }
            });
          });
          // Process the JSON data as needed
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
  
      reader.readAsText(file);
    }
  }

  // Sheet Part

  document.getElementById("add_sheet_btn").addEventListener("click",()=>{
    alert("Adding a new sheet....");

    if (numSheets == 1) {
        var myArr = [matrix];
        localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
      } else {
        var localStorageArr = JSON.parse(localStorage.getItem("ArrMatrix"));
        var myArr = [...localStorageArr, matrix];
        localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
      }


    numSheets++;
    currSheetNum=numSheets;
    for(let i=0;i<100;i++){
        matrix[i]=new Array(26);
        for(let j=0;j<26;j++){
            matrix[i][j]={};
        }
    }

    tbody.innerHTML = ``;
    for(let col=1;col<=100;col++){
        let tr2=document.createElement("tr");
        let th=document.createElement("th");
        th.innerText=col;
        tr2.append(th);
       
        for(let row=0;row<26;row++){
            let td=document.createElement("td");
            td.setAttribute("contenteditable","true");
            td.setAttribute("spellcheck","false");
            td.setAttribute("id",`${String.fromCharCode(row+65)}${col}`);
            td.addEventListener("focus",(event)=>{
                onFocusfnc(event);
            })
            td.addEventListener("input",(event)=>{
                onInputFnc(event);
            })
    
            tr2.append(td);
        }
        tbody.append(tr2)
    }
    document.getElementById("sheet_name").innerText="Sheet "+currSheetNum;
  
})
  
document.getElementById("sheet-2").addEventListener("click", () => {
    var myArr = JSON.parse(localStorage.getItem("ArrMatrix"));
    let tableData = myArr[1];
    matrix = tableData;
    console.log(tableData);
    tableData.forEach((row) => {
      row.forEach((cell) => {
        if (cell.id) {
          var myCell = document.getElementById(cell.id);
          myCell.innerText = cell.text;
          myCell.style.cssText = cell.style;
        }
      });
    });
  });
  
document.getElementById("sheet-1").addEventListener("click", () => {
    var myArr = JSON.parse(localStorage.getItem("ArrMatrix"));
    let tableData = myArr[0];
    matrix = tableData;
    tableData.forEach((row) => {
      row.forEach((cell) => {
        if (cell.id) {
          var myCell = document.getElementById(cell.id);
          myCell.innerText = cell.text;
          myCell.style.cssText = cell.style;
        }
      });
    });
  });
  
document.getElementById("sheet-3").addEventListener("click", () => {
    var myArr = JSON.parse(localStorage.getItem("ArrMatrix"));
    let tableData = myArr[2];
    matrix = tableData;
    tableData.forEach((row) => {
      row.forEach((cell) => {
        if (cell.id) {
          var myCell = document.getElementById(cell.id);
          myCell.innerText = cell.text;
          myCell.style.cssText = cell.style;
        }
      });
    });
  });