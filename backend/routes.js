const pool = require('./db');
const crypto = require('crypto');
const salt = "nHBvb9INojnioygtcuVRETRYUIY890-nmvds";

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // app.post('/accounts', postAPI("INSERT INTO Accounts"));
  app.post('/accounts', async (req, res) => {
    pool.getConnection((err, connection) => {
      // Try to connect to database, return an error if cannot
      if (err) {
        logger.error("Could not connect to the database!", err);
        return res.status(400).json({
          "data": -1,
          "message": "Could not connect to the database!"
        });
      }

      // Require a first name, last name, email, and password in the req.body
      let validInformation = requireBodyParams(req, ["firstName", "lastName", "email", "password"]);
      if (!validInformation) {
        connection.release();
        return res.status(400).json({
          "data": -1,
          "message": "Not a valid request! Check API Schema!"
        });
      }

      // Get all the parameters in the body (in case later GUI allows you to write a bio, etc.
      logger.info(`Received create account request for account: ${req.body.email}`);

      // Make sure that account is available
      connection.query(`SELECT * FROM Accounts WHERE email = "${req.body.email}"`, (err, rows, fields) => {
        if (err) {
          logger.error("Could not connect to the database!", err);
          connection.release();
          return res.status(400).json({
            "data": -1,
            "message": "Could not connect to the database!"
          });
        }

        // Check if that account is taken
        let accountTaken = rows.length > 0;
        if (accountTaken) {
          logger.info(`That account is already taken!`);
          connection.release();
          return res.status(400).json({
            "data": -1,
            "message": "That account is already taken!"
          });
        }

        logger.info(`That account is available!`);

        // Hash password, with both password and email so that matching passwords don't have matching hashes
        const hash = crypto.createHash("sha256");
        hash.update(req.body.password + req.body.email + salt);
        req.body.password = hash.digest("hex");
        let {parameters, values} = getReqParamsFromBody(req);

        // Add account to database
        let sql = `INSERT INTO Accounts(${parameters.join(", ")})
                      VALUES(${values.join(", ")});`;
        logger.info(sql);

        connection.query(sql, (err, rows, fields) => {
          if (err) {
            logger.error("Could not create an account!", err);
            connection.release();
            return res.status(400).json({
              "data": -1,
              "message": "Failed to create an account!"
            });
          }

          logger.info(`Successfully created an account!`);

          connection.release();
          return res.status(200).json({
            "data": rows.insertId,
            "message": "Successfully created an account!"
          });
        });
      });
    });
  });

  app.post('/posts/post', postAPI("INSERT INTO Posts"));
}

// Sends queries back, whether successful or failure
function handleQuery(err, result, res) {
  if (err) {
    res.end(JSON.stringify(err));
    return;
  }
  res.end(JSON.stringify(result));
}

// Used in dynamic API handlers so this doesn't have to be written out every time
let handleQueryStr = "(error, results, fields) => handleQuery(error, results, res)";

function getReqParamsFromBody(req) {
  // What we return
  let returnValue = {
    "parameters": [],
    "values": []
  };

  // For each loop tracking all parameters and their values
  for (let obj in req.body) {
    returnValue.parameters.push(obj);
    returnValue.values.push(typeof req.body[obj] === "string" ? `"${req.body[obj]}"` : req.body[obj]);
  }

  return returnValue;
}

// Returns whether req.body has all the given parameters
function requireBodyParams(req, params) {
  for (let i=0; i<params.length; i++) {
    if (typeof req.body[params[i]] === "undefined") return false;
  }

  return true;
}

function postAPI(query) {
  return eval(`
    async (req, res) => {
      pool.getConnection((err, connection) => {
        // Get all the passed parameters and values
        let {parameters, values} = getReqParamsFromBody(req);

        // Convert the arrays to comma-separated values to fit SQL syntax
        let sql = \`${query}
          (\${parameters.join(", ")})
          VALUES (\${values.join(", ")});\`;

        if (err) {
          logger.error("Could not connect to SQL Database!", err);
          res.end(err);
        } else {
          connection.query(sql, ${handleQueryStr});
        }
      });
    }
  `);
}
