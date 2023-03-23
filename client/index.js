import { Client } from 'pg' //connection with pg will be changed to use https://github.com/brianc/node-libpq

class Client {

constructor({ host, port, user, password, database }){
    this.client = new Client({
        user,
        host,
        database,
        password,
        port,
      })
      
    this.client.connect()
}

query(sql){
    return this.client.query(sql)   
}

}

module.exports = Client


// To do
// change library to use node libpq
// validation