const fs = require("fs");
const util = require("util");

const fileRead = util.promisify(fs.readFile);
const fileWrite = util.promisify(fs.writeFile);

class Data {
    read() {
        console.log('testing :>> ');
        return fileRead("db/db.json","utf8");
    }
    write(note){
        return fileWrite("db/db.json",JSON.stringify(note))
    }
    getNotes(){
        return this.read().then((notes)=>{
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes));
            }
            catch(err){
                console.error(err);
                parsedNotes = [];
            }
            console.log('parsedNotes :>> ', parsedNotes);
            return parsedNotes;
        });
    }
    addNote(note){
        const {title, text, id} = note;

        if(!title || !text){
            throw new Error("Notes should contain a title and a text");
        }
        return this.getNotes()
        .then((notes) => [...notes,note])
        .then((updatedNotes)=>this.write(updatedNotes))
        .then(() => note);
    
    }
    removeNote(id){
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes)=>this.write(filteredNotes));
    }
}

module.exports = new Data();

