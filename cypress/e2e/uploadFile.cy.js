

it.only("Uploading file", ()=>{


//cy.visit("http://10.187.54.147:8087/import-report")

//cy.get("input[name='fileAttachment']").click();


var fs = require('fs')

// directory path
const dir = 'uploadFolders/'

// list all files in the directory
fs.readFileSync(dir)
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err
  }

  // files object contains all files names
  // log them on console
  files.forEach(file => {
    console.log(file)
  })
})

})