import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

/*
  Generated class for the CommercialDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommercialDbProvider {

  db: any;
  remote: any;
  data: any;

  constructor() {
    console.log('Hello CommercialDbProvider Provider');

    this.db = new PouchDB('commercial-db');
    this.remote = "https://1801a103-f342-4909-8289-42b1f4c948fa-bluemix.cloudant.com/commercial-db";
  
    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);
  }

  getCandidates() {
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
   
    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
   
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
   
        resolve(this.data);
   
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
   
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  handleChange(change) {

    let changedDoc = null;
    let changedIndex = null;
   
    this.data.forEach((doc, index) => {
   
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
   
    });
   
    //A document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    }
    else {
   
      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }
   
      //A document was added
      else {
        this.data.push(change.doc);
      }
   
    }
  }

  createCandidate(candidate){
      this.db.post(candidate);
  }
    
  updateCandidate(candidate){
      this.db.put(candidate).catch((err) => {
        console.log(err);
      });
  }
    
  deleteTodo(candidate){
      this.db.remove(candidate).catch((err) => {
        console.log(err);
      });
  }
}
