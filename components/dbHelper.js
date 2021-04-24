import * as SQLite from 'expo-sqlite';
import Moment from 'moment';

const db = SQLite.openDatabase('db.db');

// This function adds screen time to the right dictionary
// Used by getScreenTimeCondensed class function
function addTime(time, interval, cat) {
    if (!(cat.some(i => i.x == interval))) {
        cat.push({
            x: interval,
            y: time
        });
    }
    else {
        for (var j=0; j<cat.length; j++) {
            if (cat[j].x == interval) {
                cat[j].y += time;
            }
        }
    }
}

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
            hoursInBed = time spent in bed (in hours)
            hoursUntilSleep = time taken from getting into bed to being asleep (in hours)
            timesWokenUp = # of times woken up throughout the night
            sleepQuality = subjective sleep quality rating
            */
            tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, hoursInBed REAL NOT NULL, hoursUntilSleep REAL NOT NULL, timesWokenUp INTEGER NOT NULL, sleepQuality INTEGER NOT NULL)'
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
        });
    }   

    // Populates database with example data (for dev purposes)
    exampleData() {
        let date = Moment(new Date()).format('DD/MM/YYYY');
        let tomorrow = Moment().add(1, 'days').format('DD/MM/YYYY');

        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                try {
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 3, ?)', [date+'-17:12:13', 'this is the summary 9']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', [date+'-18:12:13', 'this is the summary 10']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', [date+'-19:12:13', 'this is the summary 11']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', [date+'-20:12:13', 'this is the summary 12']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 3, ?)', [date+'-21:12:13', 'this is the summary 13']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 2, ?)', [date+'-22:12:13', 'this is the summary 14']);
    
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 5, ?)', [tomorrow+'-17:12:13', 'this is the summary 15']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 2, ?)', [tomorrow+'-18:12:13', 'this is the summary 16']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 2, ?)', [tomorrow+'-19:12:13', 'this is the summary 17']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 2, ?)', [tomorrow+'-20:12:13', 'this is the summary 18']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 4, ?)', [tomorrow+'-21:12:13', 'this is the summary 19']);
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, 1, ?)', [tomorrow+'-22:12:13', 'this is the summary 20']);
            
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0.5, 0, 3)', [date]);
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 9, 0, 0, 5)', [Moment().add(1, 'days').format('DD/MM/YYYY')]);
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 8, 1, 1, 2)', [Moment().add(2, 'days').format('DD/MM/YYYY')]);
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 0, 0, 3)', [Moment().add(3, 'days').format('DD/MM/YYYY')]);
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 9.5, 0.5, 2, 5)', [Moment().add(4, 'days').format('DD/MM/YYYY')]);
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 7, 0.5, 0, 1)', [Moment().add(5, 'days').format('DD/MM/YYYY')]);
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 9, 0, 0, 5)', [Moment().add(6, 'days').format('DD/MM/YYYY')]);
                    tx.executeSql('INSERT INTO sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, 8.5, 1.5, 1, 3)', [Moment().add(7, 'days').format('DD/MM/YYYY')]);
            
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 120, ?)', ['Microsoft Word', date, '11:00:00-11:30:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 25, ?)', ['Adobe Reader', date, '11:00:00-11:30:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 125, ?)', ['Microsoft Outlook', date, '11:00:00-11:30:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 20, ?)', ['wordpress.com', date, '11:00:00-11:30:00', 'neutral']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 11, ?)', ['Photos', date, '11:00:00-11:30:00', 'neutral']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 204, ?)', ['youtube.com', date, '11:00:00-11:30:00', 'unproductive']);
    
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 700, ?)', ['Microsoft Word', date, '11:30:00-12:00:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 254, ?)', ['Adobe Reader', date, '11:30:00-12:00:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 225, ?)', ['Microsoft Outlook', date, '11:30:00-12:00:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 203, ?)', ['wordpress.com', date, '11:30:00-12:00:00', 'neutral']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 111, ?)', ['Photos', date, '11:30:00-12:00:00', 'neutral']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 202, ?)', ['youtube.com', date, '11:30:00-12:00:00', 'unproductive']);
    
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 100, ?)', ['Microsoft Word', date, '12:30:00-13:00:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 25, ?)', ['Adobe Reader', date, '12:30:00-13:00:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 225, ?)', ['Microsoft Outlook', date, '12:30:00-13:00:00', 'productive']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 20, ?)', ['wordpress.com', date, '12:30:00-13:00:00', 'neutral']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 111, ?)', ['Photos', date, '12:30:00-13:00:00', 'neutral']);
                    tx.executeSql('INSERT INTO screenTime (name, date, interval, time, category) values (?, ?, ?, 20, ?)', ['youtube.com', date, '12:30:00-13:00:00', 'unproductive']);

                    resolve(true)
                } catch(error) {
                    reject(error);
                }
                
        }));
        
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
                            if (rows._array[i].dateTime.slice(0, 10) == date) {
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

    // Get screen time data condensed
    getScreenTimeCondensed(date) {
        var productive = [];
        var neutral = [];
        var unproductive = [];
        let totalScreenTime = 0;
        let productiveTime = 0;
        let neutralTime = 0;
        let unproductiveTime = 0;

        return new Promise((resolve, reject) => 
            db.transaction(tx => {
                try {
                    tx.executeSql('SELECT name, date, interval, time, category from screenTime ORDER BY interval, category', [], (_, { rows }) => {
                        for (var i=0; i < rows._array.length; i++) {
                            if (rows._array[i].date == date) {
                                let time = rows._array[i].time;
                                let interval = rows._array[i].interval.slice(0,5);
                                let category = rows._array[i].category;
                                
                                totalScreenTime += time;
                    
                                // O(N^2) need more efficient
                                if (category == 'productive'){
                                    productiveTime += time;
                                    addTime(time / 60, interval, productive);
                                    addTime(0, interval, neutral);
                                    addTime(0, interval, unproductive);
                                } else if (category == 'neutral'){
                                    neutralTime += time;
                                    addTime(0, interval, productive);
                                    addTime(time / 60, interval, neutral);
                                    addTime(0, interval, unproductive);
                                } else if (category == 'unproductive') {
                                    unproductiveTime += time;
                                    addTime(0, interval, productive);
                                    addTime(0, interval, neutral);
                                    addTime(time / 60, interval, unproductive);
                                } 
                            }
                        }

                        resolve([productive, neutral, unproductive, totalScreenTime, productiveTime, neutralTime, unproductiveTime]);
                    });
                } catch(error) {
                    reject(error);
                }
                
        }));
    }

    // Gets sleep data
    getSleepData(fromDate, toDate) {
        let hoursInBedData = [];
        let hoursUntilSleepData = [];
        let timesWokenUpData = [];
        let sleepQualityData = [];

        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                try{
                    tx.executeSql('SELECT date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality from sleep ORDER BY date', [], (_, { rows }) => {
                        for (var i=0; i < (rows._array.length); i++) {
                            let date = Moment(rows._array[i].date, 'DD/MM/YYYY');
                            //console.log('From: ' + fromDate + ', To: ' + toDate + ', : ' + date);
                            if (date.isAfter(fromDate) && date.isBefore(toDate)) {
                                //console.log('^ is between');
                                date = date.format('DD/MM/YYYY').slice(0, 5);
                
                                hoursInBedData.push({
                                    x: date,
                                    y: rows._array[i].hoursInBed
                                });
                    
                                hoursUntilSleepData.push({
                                    x: date,
                                    y: rows._array[i].hoursUntilSleep
                                });
                    
                                timesWokenUpData.push({
                                    x: date,
                                    y: rows._array[i].timesWokenUp
                                });
                    
                                sleepQualityData.push({
                                    x: date,
                                    y: rows._array[i].sleepQuality
                                });
                            }
                        }

                        resolve([hoursInBedData, hoursUntilSleepData, timesWokenUpData, sleepQualityData]);
                    });    
                } catch(error){
                    reject(error);
                }
            })
        )
    }

    // Insert ISA Data
    insertISA(date, time, rating, summary) {
        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                try {
                    tx.executeSql('INSERT INTO isa (dateTime, workloadRating, summary) values (?, ?, ?)', [date + '-' + time, rating, summary]);
                    resolve(true);
                } catch(error) {
                    reject(error);
                }
                
            })
        )
        
    }

    // Insert Screen Time Data
    insertScreenTime(name, date, interval, time, category) {
        return new Promise((resolve, reject) =>
            db.transaction(tx => {
                try {
                    tx.executeSql('INSERT into screenTime (name, date, interval, time, category) values (?, ?, ?, ?, ?)', [name, date, interval, time, category]);
                    resolve(true);
                } catch(error) {
                    reject(error);
                }
            })
        )
    }

    // Insert Sleep Data
    insertSleep(date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) {
        return new Promise((resolve, reject) => 
            db.transaction(tx => {
                try {
                    tx.executeSql('INSERT into sleep (date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality) values (?, ?, ?, ?, ?)', [date, hoursInBed, hoursUntilSleep, timesWokenUp, sleepQuality]);
                    resolve(true);
                } catch(error) {
                    reject(error);
                }
            })
        )
    }
}