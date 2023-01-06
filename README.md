# surfCo
surfCo is a web app that helps you to search data of companies, view their IPO details, acquisitions, etc. It is built with React + Typescript on the frontend and NodeJS + express on the backend.
## Setup

##### 1. Clone the repository
##### 2. Install dependencies
Run `npm run setup` to install dependencies for both server and client.

##### 3. Build client
Run `npm run build:client` to build the frontend.

##### 4. Build server
Run `npm run build:server` to build the backend.

##### 5. Run the application
Run `npm start` to run the application and the application will be running on `http://localhost:3000/`. Open `http://localhost:3000/` in browser.

## Challenges I faced

I struggled quite a lot with the Reset button since I was not able to reset the filter values in UI. I could figure it out only for the TextField using inputRef and not the Checkbox. 

During loading data from CSVs, I got confused a bit with fast-csv events since I needed synchronization so that IPOs and Acquisition references are inserted into CompanyData map only after reading all the companies.

## Things I would have done differently

It took me a while to get the hang of deciding how to split the components. I would have designed the components more efficiently from the root level esp. separate out the filter fields.

I would have explored the idea of paginating at API level, currently it is just at the UI level. In this scenario, the response time is not bad, so pagination at UI level works since it's the rendering that takes time.

## Given more time I would

1. definitely refactor the filter UI and get Reset to work hopefully.
2. integrate a database in the backend.
3. have made Overview collapsed with a Read more to expand it.
4. have tried to parse overview text to make links clickable and fixed the broken links to full Crunchbase URLs(/product and /company).
5. have made the companies per page dynamic.
6. have tried to add a filter by starting letter of companies / sort functionality.
7. filter out duplicate acquisitions and IPOs.
8. explore the idea of stacked UI so that user can drill down to a company that one acquired and so on and with a back button as well.




