## jettsequel

- Location based commission rates
- Gateway to submit order to vendor
- Sequelize script to import into SQLlite Table

---

## Install

    $ git clone https://github.com/sannimichaelse/jettsequel.git
    $ cd jettsequel
    $ npm install

## Configure app

create a `.env` file then add the following values.

```
PORT=9000

NODE_ENV=development

JETTI_CUSTOMER_UUID_URL=
JETTI_SALES_URL=
JETTI_VENDOR_SUBMISSION_URL=
JETTI_BEARER_TOKEN=

```
## Running the project - development

    $ npm run dev 

## Running the project - production

    $ npm run start 

## Database Setup
To run migrations

    $ npx sequelize-cli db:migrate

## Building the project

    $ npm run build 

## Running the sequelize script

    $ npm run import-variant-csv variants.csv 
     
## Running Tests

Integration Tests
    
    $ npm run test-integration 

Unit Tests
    
    $ npm run test-unit 
## Documentation

[Postman Collection](https://documenter.getpostman.com/view/3064040/U16ks5oQ)



