import * as SQLite from 'expo-sqlite';
import Moment from 'moment';

const db = SQLite.openDatabase('db.db');

export default class DBHelper {
    
    // Creates database tables
    initDB() {
        db.transaction(tx => {
            // Maybe add a check constraint to some of the rows in both tables? to make sure ratings are between 1-5 inclusive
            // https://www.sqlitetutorial.net/sqlite-check-constraint/
      
            /*
            dateTime = date and time of entry
            workloadRating = workload rating
            summary = summary
            */
            tx.executeSql('CREATE TABLE IF NOT EXISTS isa (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dateTime TEXT NOT NULL, workloadRating INTEGER NOT NULL, summary TEXT)'
            );
            /*
            date = date of night slept
            timeTilSleep = time taken from getting into bed to being asleep (in hours)
            timesWokenUp = # of times woken up throughout the night
            sleepQuality = subjective sleep quality rating
            */
            tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, timeInBed REAL NOT NULL, timeTilSleep REAL NOT NULL, timesWokenUp INTEGER NOT NULL, sleepQuality INTEGER NOT NULL)'
            );
            /*
            name = name of program
            date = date of entry
            interval = which half hour time interval this entry resides in
            time = time spent on program (in seconds)
            category = category of program
            */
            tx.executeSql('CREATE TABLE IF NOT EXISTS screenTime (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, date TEXT NOT NULL, interval TEXT NOT NULL, time INTEGER NOT NULL, category TEXT NOT NULL)'
            );
            
            console.log("initialised database!");
        });
    }   

    // Populates database with example data (for dev purposes)
    exampleData() {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 3, ?)', ['01/04/2021-17:12:13', 'this is the summary 9']);
            tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', ['01/04/2021-18:12:13', 'this is the summary 10']);
            tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', ['01/04/2021-19:12:13', 'this is the summary 11']);
            tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', ['01/04/2021-20:12:13', 'this is the summary 12']);
            tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 3, ?)', ['01/04/2021-21:12:13', 'this is the summary 13']);
            tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 2, ?)', ['01/04/2021-22:12:13', 'this is the summary 14']);
      
            tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0.5, 0, 3)', ['01/04/2021']);
            tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9, 0, 0, 5)', ['02/04/2021']);
            tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8, 1, 1, 2)', ['03/04/2021']);
            tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0, 0, 3)', ['04/04/2021']);
            tx.executeSql('INSERT INTO sleep (date, timeInBed, timeTilSleep, timesWokenUp, sleepQuality) values (?, 9.5, 0.5, 2, 5)', ['05/04/2021']);
      
            tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 100, ?)', ['Microsoft Word', '01/04/2021', '10:30:00-11:00:00', 'productive']);
            tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 25, ?)', ['Adobe Reader', '01/04/2021', '10:30:00-11:00:00', 'productive']);
            tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 225, ?)', ['Microsoft Outlook', '01/04/2021', '10:30:00-11:00:00', 'productive']);
            tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 20, ?)', ['wordpress.com', '01/04/2021', '10:30:00-11:00:00', 'neutral']);
            tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 111, ?)', ['Photos', '01/04/2021', '10:30:00-11:00:00', 'neutral']);
            tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 20, ?)', ['youtube.com', '01/04/2021', '10:30:00-11:00:00', 'unproductive']);
        });
    }

    // Retrieve ISA data to be displayed on graph
    getISAData(date, xAxis) {
        let data = [];
        let axis = xAxis;
        // Promise placed here to make sure the full database transaction has been complete before continuing 
        return new Promise((resolve, reject) => 
            db.transaction(tx => {
                try {
                    tx.executeSql('SELECT workloadRating, dateTime from isa ORDER BY dateTime', [], (_, { rows }) => {
                        for (var i=0; i < rows._array.length; i++) {
                            // For all returned rows which match the date we're after
                            // push the time and workload ratings to the data array
                            if (rows._array[i].dateTime.slice(0, 10) == Moment(date).format('DD/MM/YYYY')) {
                                var dT = rows._array[i].dateTime.slice(11, 16);
                                data.push({
                                    x: dT,
                                    y: rows._array[i].workloadRating
                                });  
                                // Push all unique times to the x axis array
                                if (axis.includes(dT) == false) axis.push(dT);
                            }
                        }
                        // Sort the x axis array to allow accurate comparison of data
                        axis = axis.sort();

                        resolve([data, axis]);
                    });
                    
                } catch (error) {
                    reject(error);
                }
                
        }));
    }

    // Insert ISA data
    insertISA(date, time, rating, summary) {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, ?, ?)', [date + '-' + time, rating, summary]);
        })
    }
}