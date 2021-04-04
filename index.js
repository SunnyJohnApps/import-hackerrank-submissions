const hackerrank = require("./inputfilename.json");
const fs = require("fs");
const path = require('path');
  

var submissions = hackerrank.submissions;

var count = 0


for (i = 0; i < submissions.length; i++) {
    let name = submissions[i].challenge;
    let score = submissions[i].score;

    if (score != 1) continue
    let lang = submissions[i].language;
    let code = submissions[i].code;


    let fileName = camelCase(name);

    if (lang == "kotlin") fileName = fileName + ".kt"
    else if (lang == "javascript") fileName = fileName + ".js"
    else {
        console.log("language " + lang + " has no extension")
        continue
    }


    let fileDir = path.join(__dirname, lang);
   
     if (!fs.existsSync(fileDir)){

        fs.mkdirSync(fileDir);
    }

     let fullFileName = path.join(fileDir, fileName);



      try {
        if (fs.existsSync(fullFileName)) {
          //file exists
          console.log("File exists - "+ fullFileName)
          continue;
        }
        else {
                count++
                writeFile(fullFileName, code)
        }
      } catch(err) {
        console.error(err)
      }

}

console.log("Completed writing of "+ count.toString() + " files");

function camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
    {
        return  word.toUpperCase();
    }).replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g,'');
}

function writeFile(fileName, codeString) {
    fs.writeFile(fileName, codeString, err => {
     
        // Checking for errors
        if (err) throw err; 
       

        console.log("Done writing "+ fileName); // Success
    });
    
}
