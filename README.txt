Goodreads Books Website

----------------------------------------------
How to access the site

    The site can be reached at http://165.106.10.170:32401/

----------------------------------------------
How to restart Node.js

    Go into the server ('./hw5/server') folder and run 'npm run start'. The startup script uses the PM2 package. 

----------------------------------------------
Included Files

    /client/     - holds all of the front end code
        /public/    - holds static resources for Reactjs
        /src/   - contains frontend source code
            index.tsx   - auto generated react file. Entry point for app.
            App.tsx     - holds very simple routing for frontend pages (there are only 3 pages)
            /pages/     - all the frontend pages
                Home.tsx    - homepage where users can select a database
                Mongodb.tsx     - MongoDB interface
                Psql.tsx    - PostgreSQL interface
            /hooks/     - contains custom Reactjs hooks
                useFetch.ts     - hook for using fetch API (Credit to Shaun Pelling)
            /components/    - Holds custom react components that are placed on the pages
                BookComponentPsql.tsx   - Drill down view for psql table elements
                BookComponentMongo.tsx  - Drill down view for mongodb table elements
                QueryComponentPsql.tsx  - Inputs for building a query for psql
                QueryComponentMongo.tsx  - Inputs for building a query for mongodb

    /server/    - holds all of the back end code
        /config/.env    - holds environment variables needed to connect to the databases. Used by npm scripts.
        /practice_queries/    - playground for seeing why my queries were breaking
        /public/    - the Reactjs app builds to this folder so it can be served by Express/Node.js
        /routes/    - contains the various express route files that contain all the server endpoints.
        app.js  - entry point into the express API.
        db-mongodb.js   - creates a new mongodb client that other express files use to connect to the database
        db-psql.js      - creates a new psql pool that other express files can connect to

----------------------------------------------
Changes 

----------------------------------------------
Known Issues

The dataset had many dates in a mm/dd/yy format, thus many of the years are incorrect as there was no
good way to add the correct century. Thus many the books have an incorrect date.