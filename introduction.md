### Steps that i need to do:
1 - check to see what is in pages
2 - build context data with what is in pages
3 - each page needs a layout, so i need this layout for pages
4 - build index.js
5 - output everything to a output folder

### maybe the structure can be:
- everything needs to be on /site
- the root layout.html file on /site is used to built index.js
- individual pages are on /site/_folder_
- any layout.html file inside a _folder_ is used to build the pages in that folder
- i'll use json for data right now
- for example, on /site, i'll have /site/data.json to house the data and /site/layout.html to to generate the output
- and another example, on /site/_folder_, i'll have /site/_folder_/data.json to house the data and /site/_folder_/layout.html to generate the output
