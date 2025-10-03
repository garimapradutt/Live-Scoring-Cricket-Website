// already decided teams, calasses for each team with players, ease in accessing players
let CSK = {
    players: ["Ruturaj Gaikwad", "Devon Conway", "Ajinkya Rahane", "Moeen Ali", 
      "Shivam Dube", "Ravindra Jadeja", "MS Dhoni", "Deepak Chahar", 
      "Maheesh Theekshana", "Tushar Deshpande", "Matheesha Pathirana"]
}
let MI={
    players: ["Rohit Sharma", "Ishan Kishan", "Suryakumar Yadav", "Cameron Green", 
      "Tilak Varma", "Tim David", "Nehal Wadhera", "Jasprit Bumrah", 
      "Piyush Chawla", "Jason Behrendorff", "Kumar Kartikeya"]
}
let RCB={
    players: ["Faf du Plessis", "Virat Kohli", "Glenn Maxwell", "Mahipal Lomror", 
        "Dinesh Karthik", "Shahbaz Ahmed", "Wanindu Hasaranga", "Harshal Patel", 
        "Mohammed Siraj", "Josh Hazlewood", "Karn Sharma"]
}
let KKR={
    players: ["Rahmanullah Gurbaz", "Venkatesh Iyer", "Nitish Rana", "Rinku Singh", 
        "Andre Russell", "Shardul Thakur", "Sunil Narine", "Lockie Ferguson", 
        "Umesh Yadav", "Varun Chakaravarthy", "Harshit Rana"]
}
let DC={
    players: ["David Warner", "Prithvi Shaw", "Mit  chell Marsh", "Rilee Rossouw", 
      "Rishabh Pant", "Axar Patel", "Lalit Yadav", "Anrich Nortje", 
      "Kuldeep Yadav", "Khaleel Ahmed", "Mukesh Kumar"]
}
const siddhuCommentaries = {
    '0': "Oh ho! The bowler sent a missile, but the batter stood like a missile launcher! No run, just a stare-off—like two goats fighting over the last samosa at a wedding!",
    '1': "A gentle tap, a quick sprint—like a thief escaping with just one ladoo from the kitchen! The batter whispers, 'One is better than none, but six is better than fun!'",
    '2': "Two runs, two legs, double the drama! Like a biryani with extra meat—just enough to make the fielders sweat! The batters run faster than uncles chasing the last bus home!",
    '3': "Triple trouble! The ball races like a drunk uncle dancing at a wedding but stops short! Three runs—neither here nor there, like a philosopher stuck between chai and coffee!",
    '4': "Chakka nahi, par dhamaka hai! The ball kisses the grass like Shah Rukh Khan in a romantic scene—four runs, and the crowd goes 'Waah, kya shot tha!'",
    '5': "Paanch! Five runs—like finding a Rs. 500 note in old jeans! Fielders chase like dogs after a stolen paratha, batters run like students late for exams!",
    '6': "SIXER! The ball flies like Modi's dreams of a developed India—out of the stadium! Bowler's face? Like a kid who lost his ice cream to a crow!",
    'out_bowled': "Timber! The stumps dance like aunties at garba night! Batter walks back, dreams shattered like a cheap China-made phone!",
    'out_caught': "Catch hai, catch! Fielder holds on like a politician to power! Batter's face? Like a student who forgot his admit card!",
    'out_lbw': "Plumb! Umpire's finger rises faster than petrol prices! Batter protests like a WhatsApp uncle—'Haw, haw, haw!'—but technology says OUT!",
    'no_ball': "Free hit loading! Bowler oversteps like a greedy dieter at a buffet. Next ball? Batter's eyes glow like a kid in a candy store!",
    'leg_bye': "Off the pads, like a sneaky tax evasion! Runs count, but the bat stays innocent—'Maine kuch nahi kiya!'",
    'bye': "Ball escapes like a leaked government secret! Keeper dives like a meme-worthy politician—'Main bhi chowkidar hoon!'"
  };
  
  
let teams = {
    'RCB': RCB,
    'MI': MI,
    'CSK' : CSK,
    'KKR' : KKR,
    'DC' : DC 
}
// all data in one place so that its easier to access
let data={
    team1: null,team2: null,
    toss_winner: null,
    innings: 1,
    batting_team: null,
    bowling_team: null,
    overs:0, 
    noball: false

}

//stores data of all players of both the teams, added using add_players function
let player_data={
}

//required in live.html to dynamically updata values and stuff
let score_data={
    runs:0,
    wickets:0,
    overs:0,
    balls:0,
    current_striker:{
        name: null,
        runs:0,
        balls:0,
        fours:0,
        sixes:0
    },
    current_non_striker:{
        name: null,
        runs:0,
        balls:0,
        fours:0,
        sixes:0
    },
    inning1_score: { 
        runs: 0, 
        wickets: 0, 
        overs:0,
        balls:0
         },
    inning2_score: { 
        overs: 0,
        runs: 0, 
        balls:0,
        wickets: 0,  },

    current_bowler: {
        name:null,
        overs:0,
        maidens:0,
        runs_conceded:0,
        wickets:0,
        overdots:0,
        er:0
    },
    crr: 0.0
}
//function to add players to player_data
function add_players(team){
    player_data[team] = {}
    console.log(teams[team])
    for (let i = 0; i<= 10; i++){
        player_data[team][teams[team].players[i]] = {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            runrate:0,
            overs: 0,
            maidens:0,
            runs_conceded: 0,
            er: 0,
            wickets: 0,
            overdots: 0,
            got_out: false,
            batted: false,
            bowled: false
        }
    }     
}


function RUN(runs,match_data,score_data,player_data,bye='o'){
    if (match_data.noball){
        match_data.noball = false;
    }
    score_data.runs+=runs
    score_data.balls++;
    score_data.current_striker.runs+=runs
    score_data.current_striker.balls++
    score_data.current_bowler.runs_conceded+=runs
    player_data[match_data.bowling_team][score_data.current_bowler.name].runs_conceded+=runs
    score_data.crr = (score_data.runs/(score_data.overs + score_data.balls/6)).toFixed(2)

    player_data[match_data.batting_team][score_data.current_striker.name].runrate = ((score_data.current_striker.runs / score_data.current_striker.balls) * 100).toFixed(2);
    player_data[match_data.batting_team][score_data.current_striker.name].runs+=runs
    player_data[match_data.batting_team][score_data.current_striker.name].balls++    
    
    player_data[match_data.bowling_team][score_data.current_bowler.name].overs += 0.1;
    score_data.current_bowler.overs += 0.1;
    player_data[match_data.bowling_team][score_data.current_bowler.name].overs = parseFloat(player_data[match_data.bowling_team][score_data.current_bowler.name].overs.toFixed(2));
    score_data.current_bowler.overs = parseFloat(score_data.current_bowler.overs.toFixed(2));
    let totalballs = parseInt((player_data[match_data.bowling_team][score_data.current_bowler.name].overs).toString().split(".")[0])*6 + parseInt((player_data[match_data.bowling_team][score_data.current_bowler.name].overs).toString().split(".")[1][0])
    score_data.current_bowler.er =  parseFloat((score_data.current_bowler.runs_conceded/totalballs).toFixed(2))
    player_data[match_data.bowling_team][score_data.current_bowler.name].er =  parseFloat((score_data.current_bowler.runs_conceded/totalballs).toFixed(2))
    console.log(totalballs,score_data.current_bowler.er)
    if(runs == 0){
        score_data.current_bowler.overdots++
        player_data[match_data.bowling_team][score_data.current_bowler.name].overdots++
        if (score_data.current_bowler.overdots == 6) {
            score_data.current_bowler.maidens++
            player_data[match_data.bowling_team][score_data.current_bowler.name].maidens++
        }
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['0']} </p>` + commentaryBox.innerHTML;
    }
    if (runs === 1){
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['1']} </p>` + commentaryBox.innerHTML;

        }
    if (runs === 2){
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['2']} </p>` + commentaryBox.innerHTML;

    }
    if (runs === 3) {
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['3']} </p>` + commentaryBox.innerHTML;

    }
    if (runs === 4) {

        score_data.current_striker.fours++;
        player_data[match_data.batting_team][score_data.current_striker.name].fours++
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['4']} </p>` + commentaryBox.innerHTML;

    }
    if (runs === 5){
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['5']} </p>` + commentaryBox.innerHTML;

    }
    if (runs === 6) {
        player_data[match_data.batting_team][score_data.current_striker.name].sixes++
        score_data.current_striker.sixes++;
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['6']} </p>` + commentaryBox.innerHTML;

    }
    if (bye === 'b'){
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['bye']} </p>` + commentaryBox.innerHTML;

    }
    if (bye === 'lb'){
        const commentaryBox = document.getElementById('live_commentary');
        commentaryBox.innerHTML = `<p> ${siddhuCommentaries['leg_bye']} </p>` + commentaryBox.innerHTML;

    }
    
    
    if(runs%2!=0){
        // strike rotate
        rotatestrike(match_data,score_data)
  
    }
    console.log(score_data.overs, parseInt(match_data.overs ))
    
    console.log(document.getElementById("current_run_rate").textContent,(score_data.runs)/(score_data.balls))
    if (score_data.balls == 6) { //over completed 
        score_data.balls = 0;
        score_data.overs++;
        
        console.log(parseInt((player_data[match_data.bowling_team][score_data.current_bowler.name].overs).toString().split(".")[0]))
        player_data[match_data.bowling_team][score_data.current_bowler.name].overs = parseInt((player_data[match_data.bowling_team][score_data.current_bowler.name].overs).toString().split(".")[0])+1
        score_data.current_bowler.overs = player_data[match_data.bowling_team][score_data.current_bowler.name].overs
        console.log(score_data.current_bowler.overs)
        console.log( player_data[match_data.bowling_team][score_data.current_bowler.name].overs)
        score_data.current_bowler.overdots = 0;
        player_data[match_data.bowling_team][score_data.current_bowler.name].overdots = 0;
        rotatestrike(match_data,score_data)

    //logic to enter innings2
    if (score_data.overs < parseInt(match_data.overs)) {
        // Show new bowler prompt for regular over change
        document.getElementById('prompt_for_newbowler').style.display='flex';
        document.getElementById('prompt_for_newbowler').style.justifyContent='center';
        document.getElementById('prompt_for_newbowler').style.alignItems='center';
        
        document.getElementById("newwbowler").innerHTML = "";
        for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.bowling_team])) {
            document.getElementById("newwbowler").innerHTML += `<option value='${player_of_teamname}'>${player_of_teamname}</option>`;
        }
        
        rotatestrike(match_data, score_data);
    }

        if (score_data.overs == parseInt(match_data.overs) && match_data.innings == 1){
            innningsover(match_data, score_data, player_data)
            
        }
        else if (score_data.overs == parseInt(match_data.overs) && match_data.innings == 2){
            score_data.inning2_score.runs = score_data.runs;
            score_data.inning2_score.wickets = score_data.wickets;
            score_data.inning2_score.overs = score_data.overs;
            score_data.inning2_score.balls = score_data.balls;

            if (score_data.runs < score_data.inning1_score.runs) {localStorage.setItem('winner', match_data.bowling_team)}
            else{localStorage.setItem('winner', match_data.batting_team)}
            window.location.href = "summary.html"
        }
        else{
            alert("Over completed! Enter New Bowler's Name: ");

        document.getElementById('prompt_for_newbowler').style.display='flex'
        document.getElementById('prompt_for_newbowler').style.justifyContent='center'
        document.getElementById('prompt_for_newbowler').style.alignItems='center'
        for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.bowling_team])){
            document.getElementById("newwbowler").innerHTML+=`<option value='${player_of_teamname}'>${player_of_teamname}</option>`
        }
        document.getElementById("prompt_new_bowler").addEventListener('click', ()=>{
            let newbowler = document.getElementById("newwbowler").value
            score_data.current_bowler = {
                name: newbowler,
                overs: player_data[match_data.bowling_team][newbowler].overs,
                maidens: player_data[match_data.bowling_team][newbowler].maidens,
                runs_conceded: player_data[match_data.bowling_team][newbowler].runs_conceded,
                wickets: player_data[match_data.bowling_team][newbowler].wickets,
                er: player_data[match_data.bowling_team][newbowler].er,
                
            }
            player_data[match_data.bowling_team][newbowler].bowled=true
            localStorage.setItem("score_data", JSON.stringify(score_data));
            localStorage.setItem("player_data", JSON.stringify(player_data));
            update_score(match_data,score_data)
            document.getElementById('prompt_for_newbowler').style.display='none'



        })
        rotatestrike(match_data,score_data);
        }
        
    }
    if (match_data.innings == 2){
        if (score_data.runs > score_data.inning1_score.runs){
            localStorage.setItem('winner', match_data.batting_team)
            window.location.href = "summary.html"
        }
    }
    localStorage.setItem("data",JSON.stringify(match_data))
    localStorage.setItem("player_data",JSON.stringify(player_data))
    console.log(player_data)
    console.log(score_data)
    localStorage.setItem("score_data", JSON.stringify(score_data));
    update_score(match_data,score_data)


}

function rotatestrike(match_data,score_data){``
    a=score_data.current_striker
    score_data.current_striker=score_data.current_non_striker
    score_data.current_non_striker=a}


//function to dynamically update scores in live page
function update_score(match_data,score_data){
    if(match_data.noball){
        document.getElementById('wicket_button').disabled=true
    }
    else{
        document.getElementById('wicket_button').disabled=false
    }
    if(match_data.innings==1){
        document.getElementById("display_team").textContent=`${match_data.batting_team} ${score_data.runs}/${score_data.wickets} (${score_data.overs}\.${score_data.balls}) VS ${match_data.bowling_team}`
    }
    else if(match_data.innings==2){
        document.getElementById("display_team").textContent=`${match_data.batting_team} ${score_data.runs}/${score_data.wickets} (${score_data.overs}\.${score_data.balls}) VS ${match_data.bowling_team} ${score_data.inning1_score.runs}/${score_data.inning1_score.wickets} (${score_data.inning1_score.overs}\.${score_data.inning1_score.balls}) `
    }
    document.getElementById("display_innings").textContent=`${match_data.innings === 1 ? '1st' : '2nd'} Innings`
    document.getElementById("current_run_rate").textContent=`CRR: ${score_data.crr}`
             
    if(match_data.innings==2){
                document.getElementById("required_run_rate").textContent=`RRR: ${(((score_data.inning1_score.runs-score_data.runs)/(parseInt(match_data.overs)*6 - score_data.balls))*6).toFixed(2)}`
    }


            document.getElementById("striker_name").textContent = score_data.current_striker.name;
            document.getElementById("striker_runs").textContent = score_data.current_striker.runs;
            document.getElementById("strikerr_balls").textContent = score_data.current_striker.balls;
            document.getElementById("striker_fours").textContent = score_data.current_striker.fours;
            document.getElementById("striker_sixes").textContent = score_data.current_striker.sixes;
            document.getElementById("striker_sr").textContent = score_data.current_striker.balls > 0 ?((score_data.current_striker.runs / score_data.current_striker.balls) * 100).toFixed(2) : "0.00";

            console.log(score_data)
            document.getElementById("non_striker_name").textContent = score_data.current_non_striker.name;
            document.getElementById("non_striker_runs").textContent = score_data.current_non_striker.runs;
            document.getElementById("non_striker_balls").textContent = score_data.current_non_striker.balls;
            document.getElementById("non_striker_fours").textContent = score_data.current_non_striker.fours;
            document.getElementById("non_striker_sixes").textContent = score_data.current_non_striker.sixes;
            document.getElementById("non_striker_sr").textContent = score_data.current_non_striker.balls > 0 ? ((score_data.current_non_striker.runs / score_data.current_non_striker.balls) * 100).toFixed(2) : "0.00";

            document.getElementById("bowl_name").textContent = score_data.current_bowler.name;
            document.getElementById("bowl_overs").textContent = score_data.current_bowler.overs;
            document.getElementById("bowl_maidens").textContent = score_data.current_bowler.maidens;
            document.getElementById("bowl_runs").textContent = score_data.current_bowler.runs_conceded;
            document.getElementById("bowl_wickets").textContent = score_data.current_bowler.wickets;
            document.getElementById("bowl_er").textContent = score_data.current_bowler.er;

}


function run_out(match_data, score_data, player_data) {
    
    document.getElementById('prompt_for_runout').style.display='flex';
    document.getElementById('prompt_for_runout').style.justifyContent='center';
    document.getElementById('prompt_for_runout').style.alignItems='center';
    
    document.getElementById("batsman").innerHTML = "";
    for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.batting_team])) {
        if (player_of_team.got_out==false && player_of_team.batted==true){
            document.getElementById("batsman").innerHTML += `<option value='${player_of_teamname}'>${player_of_teamname}</option>`;
        }
    }
    document.getElementById("prompt_for_run_out").addEventListener('click', ()=>{
        let wicketed = document.getElementById("batsman").value;
        let runs = parseInt(document.getElementById('runs').value);
        score_data.runs += runs;
        score_data.balls++;
        score_data.current_bowler.runs_conceded += runs;
        score_data.wickets++;
        score_data.current_bowler.wickets++;
        player_data[match_data.batting_team][wicketed].got_out = true;
        player_data[match_data.batting_team][wicketed].balls += 1;
        player_data[match_data.batting_team][wicketed].runs += runs;
        localStorage.setItem("data",JSON.stringify(match_data));
        localStorage.setItem("player_data",JSON.stringify(player_data));
        localStorage.setItem("score_data", JSON.stringify(score_data));
        document.getElementById('prompt_for_runout').style.display='none';
        document.getElementById('prompt_for_newbatter').style.display='flex';
    document.getElementById('prompt_for_newbatter').style.justifyContent='center';
    document.getElementById('prompt_for_newbatter').style.alignItems='center';

    let nonstrikk = wicketed;
    
    document.getElementById("newwbatter").innerHTML = "";
    for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.batting_team])){
        if(player_of_team.got_out == false && player_of_teamname != nonstrikk && player_of_team.batted == false){
            document.getElementById("newwbatter").innerHTML+=`<option value='${player_of_teamname}'>${player_of_teamname}</option>`
        }
    }
    document.getElementById("prompt_new_batter").addEventListener('click', ()=>{
        let newbatter = document.getElementById("newwbatter").value;
        if(wicketed == score_data.current_striker.name){
            score_data.current_striker = {
                name: newbatter,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                runrate: 0,
                
            };
        }
        else {
            score_data.current_non_striker = {
                name: newbatter,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                runrate: 0,
                
            };
        }
        player_data[match_data.batting_team][newbatter].batted=true
        localStorage.setItem("data",JSON.stringify(match_data));
        localStorage.setItem("player_data",JSON.stringify(player_data));
        localStorage.setItem("score_data", JSON.stringify(score_data));
        update_score(match_data,score_data);
        document.getElementById('prompt_for_newbatter').style.display='none';
    })
    })
    
    
    
        
    
    
    
}


function widee(match_data, score_data, player_data) {
    score_data.runs += 1;
    score_data.current_bowler.runs_conceded += 1;
    
    score_data.crr = (score_data.runs/(score_data.overs + score_data.balls/6)).toFixed(2);
    
    localStorage.setItem("data",JSON.stringify(match_data));
    localStorage.setItem("player_data",JSON.stringify(player_data));
    localStorage.setItem("score_data", JSON.stringify(score_data));
    update_score(match_data,score_data);
}

function no_ball(match_data, score_data, player_data) {
    const runsss = prompt("Enter runs scored:");
    if (runsss === null) return; // User cancelled
    
    const runs = parseInt(runsss);
    score_data.runs += 1 + runs;
    score_data.current_bowler.runs_conceded += 1 + runs;
    
    score_data.current_striker.runs += runs;
    
    player_data[match_data.batting_team][score_data.current_striker.name].runs += runs;
   
    score_data.crr = (score_data.runs/(score_data.overs + score_data.balls/6)).toFixed(2);
    match_data.noball = true;
    // Next ball is a free hit (you'll need to implement this logic)
    // For now, just alert
    alert("Free Hit!");
    
    localStorage.setItem("data",JSON.stringify(match_data));
    localStorage.setItem("player_data",JSON.stringify(player_data));
    localStorage.setItem("score_data", JSON.stringify(score_data));
    document.getElementById('live_commentary').innerHTML +=`<p> ${siddhuCommentaries['no_ball']} </p>`
    update_score(match_data,score_data);
}


function wicc(match_data,score_data,player_data){
    score_data.wickets++
    if (score_data.wickets === 10 && match_data.innings === 1){
        innningsover(match_data,score_data,player_data)
        return
    }
    else if (score_data.wickets === 10 && match_data.innings === 2){
        localStorage.setItem('winner', match_data.bowling_team)
        window.location.href = "summary.html"

    }
    score_data.balls++
    score_data.current_bowler.wickets++
    player_data[match_data.bowling_team][score_data.current_bowler.name].wickets += 1;
    player_data[match_data.bowling_team][score_data.current_bowler.name].overs += 0.1;
    
    player_data[match_data.bowling_team][score_data.current_bowler.name].overs = parseFloat(player_data[match_data.bowling_team][score_data.current_bowler.name].overs.toFixed(2));
    score_data.current_bowler.overs = player_data[match_data.bowling_team][score_data.current_bowler.name].overs;
    
    

    alert("Wicket!")

    player_data[match_data.batting_team][score_data.current_striker.name].got_out=true;
    console.log(player_data[match_data.batting_team][score_data.current_striker.name])

    document.getElementById('prompt_for_newbatter').style.display='flex'
    document.getElementById('prompt_for_newbatter').style.justifyContent='center'
    document.getElementById('prompt_for_newbatter').style.alignItems='center'

    let nonstrikk = score_data.current_non_striker.name
    document.getElementById("newwbatter").innerHTML = "";
    
    for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.batting_team])){
        if(player_of_team.got_out == false && player_of_teamname != nonstrikk){
            document.getElementById("newwbatter").innerHTML+=`<option value='${player_of_teamname}'>${player_of_teamname}</option>`
        }
    }
    
    document.getElementById("prompt_new_batter").addEventListener('click', ()=>{
        let newbatter = document.getElementById("newwbatter").value
        score_data.current_striker = {
            name: newbatter,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            runrate: 0,
           
        }
        player_data[match_data.batting_team][newbatter].batted=true
        localStorage.setItem("player_data",JSON.stringify(player_data))
        localStorage.setItem("score_data", JSON.stringify(score_data));
        update_score(match_data,score_data)

        document.getElementById('prompt_for_newbatter').style.display='none'
        if (score_data.balls == 6) { //over completed 
            score_data.balls = 0;
            score_data.overs++;
            
            console.log(parseInt((player_data[match_data.bowling_team][score_data.current_bowler.name].overs).toString().split(".")[0]))
            player_data[match_data.bowling_team][score_data.current_bowler.name].overs = parseInt((player_data[match_data.bowling_team][score_data.current_bowler.name].overs).toString().split(".")[0])+1
            score_data.current_bowler.overs = player_data[match_data.bowling_team][score_data.current_bowler.name].overs
            console.log(score_data.current_bowler.overs)
            console.log( player_data[match_data.bowling_team][score_data.current_bowler.name].overs)
            score_data.current_bowler.overdots = 0;
            player_data[match_data.bowling_team][score_data.current_bowler.name].overdots = 0;
            rotatestrike(match_data,score_data)
    
        //logic to enter innings2
        if (score_data.overs < parseInt(match_data.overs)) {
            // Show new bowler prompt for regular over change
            document.getElementById('prompt_for_newbowler').style.display='flex';
            document.getElementById('prompt_for_newbowler').style.justifyContent='center';
            document.getElementById('prompt_for_newbowler').style.alignItems='center';
            
            document.getElementById("newwbowler").innerHTML = "";
            for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.bowling_team])) {
                document.getElementById("newwbowler").innerHTML += `<option value='${player_of_teamname}'>${player_of_teamname}</option>`;
            }
            
            rotatestrike(match_data, score_data);
        }
    
            if (score_data.overs == parseInt(match_data.overs) && match_data.innings == 1){
                score_data.inning1_score.runs = score_data.runs;
                console.log(score_data.overs)
                score_data.inning1_score.wickets = score_data.wickets;
                score_data.inning1_score.overs = score_data.overs;
                score_data.inning1_score.balls = score_data.balls; //store data for innings1
                
    
                document.getElementById('prompt_for_innings1').style.display='flex'; //input for second ininngs data
                document.getElementById('prompt_for_innings1').style.justifyContent='center'
                document.getElementById('prompt_for_innings1').style.alignItems='center'
                let batting_team_players=[]
        
                for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.bowling_team])){
                    batting_team_players.push(player_of_teamname)
                    document.getElementById("strikerr").innerHTML+=`<option value='${player_of_teamname}'> ${player_of_teamname}</option>`
                }
        
                document.getElementById("strikerr").addEventListener('change', ()=> {
                    const selected_value = document.getElementById("strikerr").value;
                    document.getElementById("nonstrikerr").innerHTML = ""
                        for (let i = 0; i < batting_team_players.length; i++) {
    
                        if (batting_team_players[i] != selected_value) {
                            console.log(batting_team_players[i] , selected_value)
                            
                            const option_element=document.createElement("option");
                            option_element.value=batting_team_players[i]
                            option_element.text=batting_team_players[i]
                            document.getElementById("nonstrikerr").appendChild(option_element)
                        }
                        }
                })
        
        
                for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.batting_team])){
                    document.getElementById("bowlerr").innerHTML+=`<option value='${player_of_teamname}'>${player_of_teamname}</option>`
                }
                document.getElementById("prompt_for_innings_1").addEventListener('click', ()=>{
                    let newbowler = document.getElementById("bowlerr").value
                    score_data.current_bowler = {
                        name: newbowler,
                        overs: player_data[match_data.batting_team][newbowler].overs,
                        maidens: player_data[match_data.batting_team][newbowler].maidens,
                        runs_conceded: player_data[match_data.batting_team][newbowler].runs_conceded,
                        wickets: player_data[match_data.batting_team][newbowler].wickets,
                        er: player_data[match_data.batting_team][newbowler].er,
                       
                }
                player_data[match_data.batting_team][newbowler].bowled=true
                
        
                    document.getElementById('prompt_for_innings1').style.display='none'
                    let currentstriker = document.getElementById("strikerr").value
                    score_data.current_striker = {
                        name: currentstriker,
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        runrate: 0,
                        
                    }
                    player_data[match_data.bowling_team][currentstriker].batted=true
                    let currentnstriker = document.getElementById("nonstrikerr").value
                    score_data.current_non_striker = {
                        name: currentnstriker,
                        runs: 0,
                        balls: 0,
                        fours: 0,
                        sixes: 0,
                        runrate: 0,
        
                    }
                    player_data[match_data.bowling_team][currentnstriker].batted=true
                    
                    score_data.runs = 0;
                    score_data.wickets= 0;
                    score_data.overs = 0;
                    score_data.balls = 0;
                    match_data.innings = 2;
                    [match_data.batting_team,match_data.bowling_team] = [match_data.bowling_team, match_data.batting_team];
                    localStorage.setItem("data",JSON.stringify(match_data))
                    localStorage.setItem("player_data",JSON.stringify(player_data))
                    localStorage.setItem("score_data", JSON.stringify(score_data));
                    update_score(match_data,score_data)
                    })
            }
            else if (score_data.overs == parseInt(match_data.overs) && match_data.innings == 2){
                score_data.inning2_score.runs = score_data.runs;
                score_data.inning2_score.wickets = score_data.wickets;
                score_data.inning2_score.overs = score_data.overs;
                score_data.inning2_score.balls = score_data.balls;
    
                if (score_data.runs < score_data.inning1_score.runs) {localStorage.setItem('winner', match_data.bowling_team)}
                else{localStorage.setItem('winner', match_data.batting_team)}
                window.location.href = "summary.html"
            }
            else{
                alert("Over completed! Enter New Bowler's Name: ");
    
            document.getElementById('prompt_for_newbowler').style.display='flex'
            document.getElementById('prompt_for_newbowler').style.justifyContent='center'
            document.getElementById('prompt_for_newbowler').style.alignItems='center'
            for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.bowling_team])){
                document.getElementById("newwbowler").innerHTML+=`<option value='${player_of_teamname}'>${player_of_teamname}</option>`
            }
            document.getElementById("prompt_new_bowler").addEventListener('click', ()=>{
                let newbowler = document.getElementById("newwbowler").value
                score_data.current_bowler = {
                    name: newbowler,
                    overs: player_data[match_data.bowling_team][newbowler].overs,
                    maidens: player_data[match_data.bowling_team][newbowler].maidens,
                    runs_conceded: player_data[match_data.bowling_team][newbowler].runs_conceded,
                    wickets: player_data[match_data.bowling_team][newbowler].wickets,
                    er: player_data[match_data.bowling_team][newbowler].er,
                    
                }
                player_data[match_data.bowling_team][newbowler].bowled=true
                localStorage.setItem("score_data", JSON.stringify(score_data));
                localStorage.setItem("player_data", JSON.stringify(player_data));
                update_score(match_data,score_data)
                document.getElementById('prompt_for_newbowler').style.display='none'
    
    
    
            })
            rotatestrike(match_data,score_data);
            }
            
        }

    })
    document.getElementById('live_commentary').innerHTML +=`<p> ${siddhuCommentaries['3']} </p>`
    
        
    
}

function innningsover(match_data, score_data, player_data){
    
    score_data.inning1_score.runs = score_data.runs;
    console.log(score_data.overs)
    score_data.inning1_score.wickets = score_data.wickets;
    score_data.inning1_score.overs = score_data.overs;
    score_data.inning1_score.balls = score_data.balls; //store data for innings1
    score_data.crr = 0;

    document.getElementById('prompt_for_innings1').style.display='flex'; //input for second ininngs data
    document.getElementById('prompt_for_innings1').style.justifyContent='center'
    document.getElementById('prompt_for_innings1').style.alignItems='center'
    let batting_team_players=[]

    for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.bowling_team])){
        batting_team_players.push(player_of_teamname)
        document.getElementById("strikerr").innerHTML+=`<option value='${player_of_teamname}'> ${player_of_teamname}</option>`
    }

    document.getElementById("strikerr").addEventListener('change', ()=> {
        const selected_value = document.getElementById("strikerr").value;
        document.getElementById("nonstrikerr").innerHTML = ""
            for (let i = 0; i < batting_team_players.length; i++) {

            if (batting_team_players[i] != selected_value) {
                console.log(batting_team_players[i] , selected_value)
                
                const option_element=document.createElement("option");
                option_element.value=batting_team_players[i]
                option_element.text=batting_team_players[i]
                document.getElementById("nonstrikerr").appendChild(option_element)
            }
            }
    })


    for (let [player_of_teamname, player_of_team] of Object.entries(player_data[match_data.batting_team])){
        document.getElementById("bowlerr").innerHTML+=`<option value='${player_of_teamname}'>${player_of_teamname}</option>`
    }
    document.getElementById("prompt_for_innings_1").addEventListener('click', ()=>{
        let newbowler = document.getElementById("bowlerr").value
        score_data.current_bowler = {
            name: newbowler,
            overs: player_data[match_data.batting_team][newbowler].overs,
            maidens: player_data[match_data.batting_team][newbowler].maidens,
            runs_conceded: player_data[match_data.batting_team][newbowler].runs_conceded,
            wickets: player_data[match_data.batting_team][newbowler].wickets,
            er: player_data[match_data.batting_team][newbowler].er,
           
    }
    player_data[match_data.batting_team][newbowler].bowled=true
    

        document.getElementById('prompt_for_innings1').style.display='none'
        let currentstriker = document.getElementById("strikerr").value
        score_data.current_striker = {
            name: currentstriker,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            runrate: 0,
            
        }
        player_data[match_data.bowling_team][currentstriker].batted=true
        let currentnstriker = document.getElementById("nonstrikerr").value
        score_data.current_non_striker = {
            name: currentnstriker,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            runrate: 0,

        }
        player_data[match_data.bowling_team][currentnstriker].batted=true
        
        score_data.runs = 0;
        score_data.wickets= 0;
        score_data.overs = 0;
        score_data.balls = 0;
        match_data.innings = 2;
        [match_data.batting_team,match_data.bowling_team] = [match_data.bowling_team, match_data.batting_team];
        localStorage.setItem("data",JSON.stringify(match_data))
        localStorage.setItem("player_data",JSON.stringify(player_data))
        localStorage.setItem("score_data", JSON.stringify(score_data));
        update_score(match_data,score_data)
        })

}

function viewscorecard(){
    window.location.href="scorecard.html";
}



//in SETUP PAGE 
if(document.getElementById("form_for_setup")){ 
        
        const team1=document.getElementById("team1_name")
        const team2=document.getElementById("team2_name")
        
            team1.addEventListener('change', ()=> {
                teamss = ['CSK', 'MI', 'RCB', 'KKR', 'DC']
                const selected_value = team1.value;
                team2.innerHTML = ""
                    for (let i = 0; i < teamss.length; i++) {
                    
                      if (teamss[i] != selected_value) {
                        
                        const option_element=document.createElement("option");
                        option_element.value=teamss[i]
                        option_element.text=teamss[i]
                        team2.appendChild(option_element)
                      }
                    }
            })
        


        document.getElementById("match_start").addEventListener('click',(event)=>{
            event.preventDefault(); //upon clicking setup was reloading this happens because form is getting submitted normally which refreshes the page upon submission but we want it to use js coding hence this
            const team_1=document.getElementById("team1_name").value 
            const team_2=document.getElementById("team2_name").value
  
            data.team1=team_1
            data.team2=team_2

            if(!document.getElementById("number_of_overs")){
                window.alert("Number Of Overs can't be zero")
                location.reload();
                return
            }
            let toss_winner=document.getElementById("toss_winner").value //this gives team 1 or team 2 but we want to store the names 
            if(toss_winner=="team1"){
                data.toss_winner=data.team1
            }
            else if(toss_winner=="team2"){
                data.toss_winner=data.team2

            }

            let toss_decision=document.getElementById("toss_decision").value
            if((toss_decision=="bat" && toss_winner=="team1") || (toss_decision=="bowl" && toss_winner=="team2") ){
                data.batting_team=data.team1
                data.bowling_team=data.team2
                console.log(data.bowling_team)
            }
            else if(toss_decision=="bat" && toss_winner=="team2" || (toss_decision=="bowl" && toss_winner=="team2")){
                data.batting_team=data.team2
                data.bowling_team=data.team1
                console.log(data.batting_team)
            }
            data.overs=document.getElementById("number_of_overs").value


            add_players(data.batting_team)
            add_players(data.bowling_team)
            document.getElementById('prompt_in_start').style.display='flex'
            document.getElementById('prompt_in_start').style.justifyContent='center'
            document.getElementById('prompt_in_start').style.alignItems='center'

            console.log(player_data)

            let batting_team_players=[]

            for (let [player_of_teamname, player_of_team] of Object.entries(player_data[data.batting_team])){
                batting_team_players.push(player_of_teamname)
                document.getElementById("strikerr").innerHTML+=`<option value='${player_of_teamname}'> ${player_of_teamname}</option>`
            }

            document.getElementById("strikerr").addEventListener('change', ()=> {
                const selected_value = document.getElementById("strikerr").value;
                document.getElementById("nonstrikerr").innerHTML = ""
                    for (let i = 0; i < batting_team_players.length; i++) {
                    
                      if (batting_team_players[i] != selected_value) {
                        console.log(batting_team_players[i] , selected_value)
                        
                        const option_element=document.createElement("option");
                        option_element.value=batting_team_players[i]
                        option_element.text=batting_team_players[i]
                        document.getElementById("nonstrikerr").appendChild(option_element)
                      }
                    }
            })


            for (let [player_of_teamname, player_of_team] of Object.entries(player_data[data.bowling_team])){
                document.getElementById("bowlerr").innerHTML+=`<option value='${player_of_teamname}'>${player_of_teamname}</option>`
            }

            document.getElementById("submit_first_prompt").addEventListener('click',()=>{
                score_data.current_striker.name=document.getElementById("strikerr").value   
                score_data.current_non_striker.name=document.getElementById("nonstrikerr").value
                score_data.current_bowler.name=document.getElementById("bowlerr").value

                player_data[data.batting_team][score_data.current_striker.name].batted=true
                player_data[data.batting_team][score_data.current_non_striker.name].batted=true
                player_data[data.bowling_team][score_data.current_bowler.name].bowled=true

                localStorage.setItem("data", JSON.stringify(data));
                localStorage.setItem("score_data", JSON.stringify(score_data));
                localStorage.setItem("player_data",JSON.stringify((player_data)));
                window.open("live.html","_blank") 

            })
            
        })}
            

//in LIVE PAGE
if(document.getElementById("striker")){ 

            match_data = JSON.parse(localStorage.getItem("data")); //extracts data saved in local storage and saves it 
            score_data = JSON.parse(localStorage.getItem("score_data")) //cant decalre a new score_data variable as it overshadows the previous one and creates a new local variable, jo hmein modify krana h vo nhi modify hoga rather ye naya variable modify hoga 
            player_data = JSON.parse(localStorage.getItem("player_data"))
            console.log(player_data)
           
            

            update_score(match_data,score_data)

            document.getElementById("zero_runs").addEventListener('click',()=>{RUN(0,match_data,score_data,player_data)})
            document.getElementById("one_run").addEventListener('click',()=>{RUN(1,match_data,score_data,player_data)})
            document.getElementById("two_runs").addEventListener('click',()=>{RUN(2,match_data,score_data,player_data)})
            document.getElementById("three_runs").addEventListener('click',()=>{RUN(3,match_data,score_data,player_data)})
            document.getElementById("four_runs").addEventListener('click',()=>{RUN(4,match_data,score_data,player_data)})
            document.getElementById("five_runs").addEventListener('click',()=>{RUN(5,match_data,score_data,player_data)})
            document.getElementById("six_runs").addEventListener('click',()=>{RUN(6,match_data,score_data,player_data)})
            document.getElementById("byes").addEventListener('click',()=>{
                const runsss = parseInt(prompt("Enter runs scored:"));
                console.log(typeof(runsss))
                if (runsss === null) return;

                RUN(runsss,match_data,score_data,player_data,'b')})
            document.getElementById("leg_byes").addEventListener('click',()=>{
                const runsss = parseInt(prompt("Enter runs scored:"));
                if (runsss === null) return;

                RUN(runsss,match_data,score_data,player_data,'lb')
            })
            document.getElementById("wicket_button").addEventListener("click", ()=>{
                wicc(match_data,score_data,player_data)
            })
            document.getElementById("run_out").addEventListener("click", () => {
                run_out(match_data, score_data, player_data);
            });
            document.getElementById("wide").addEventListener("click", () => {
                widee(match_data, score_data, player_data);
            });
            document.getElementById("noball").addEventListener("click", () => {
                no_ball(match_data, score_data, player_data);
            });

        }

//SCORECARD PAGE  
if(document.getElementById("batting_scorecard")){ 
            match_data = JSON.parse(localStorage.getItem("data"))
            score_data = JSON.parse(localStorage.getItem("score_data")) 
            player_data = JSON.parse(localStorage.getItem("player_data"))
             function displayInnings(inningsToShow) {
                console.log('yes',inningsToShow)
        // Determine which teams to show based on innings number
        let battingTeam, bowlingTeam, inningsData;
        
        if (inningsToShow === 1 && match_data.innings==1) {
            battingTeam = match_data.batting_team;
            bowlingTeam = match_data.bowling_team;
            inningsData = score_data.inning1_score;
        } 
        else if (inningsToShow === 1 && match_data.innings==2) {
            
            battingTeam = match_data.bowling_team;
            bowlingTeam = match_data.batting_team;
            inningsData = score_data.inning1_score;
        } else {
            
            battingTeam = match_data.batting_team;
            bowlingTeam = match_data.bowling_team;
            inningsData = score_data.inning2_score;
            };
        
        
            console.log(player_data)
        i=0
        j=0
        document.getElementById("batting_order").innerHTML = ""
        document.getElementById("bowling_order").innerHTML = ""
        for (let [player_of_teamname, player_of_team] of Object.entries(player_data[battingTeam])){   
                console.log(player_of_teamname)             
                if(player_of_team.batted == true){
                    i++
                    
                    document.getElementById("batting_order").innerHTML+=`<tr>
                    <td>${i}</td>
                    <td> ${player_of_teamname} </td>
                    <td>${player_of_team.runs}</td>
                    <td>${player_of_team.balls}</td>
                    <td>${player_of_team.fours}</td>
                    <td>${player_of_team.sixes}</td>
                    <td>${parseFloat(player_of_team.runrate).toFixed(2)}</td>
                    
                    </tr>`
                }
            }
        
            for (let [player_of_teamname, player_of_team] of Object.entries(player_data[bowlingTeam])){
                console.log(player_of_team)
                if(player_of_team.bowled == true){
                    j++
                    document.getElementById("bowling_order").innerHTML+=`<tr>
                    <td>${j}</td>
                    <td> ${player_of_teamname} </td>
                    <td>${player_of_team.overs.toFixed(1)}</td>
                    <td>${player_of_team.maidens}</td>
                    <td>${player_of_team.runs_conceded}</td>
                    <td>${player_of_team.wickets}</td>
                    <td>${player_of_team.er.toFixed(2)}</td>
                    </tr>`
                }
            }
        }
            if (match_data.innings == 1) { //by default this will show
                displayInnings(1);
            } else {
                displayInnings(2);
            }

            document.getElementById("innings1").addEventListener("click", () => {
                if (!score_data.inning1_score) {
                    alert("First innings data not available yet");
                } else {
                    displayInnings(1);
                }
            });

            document.getElementById("innings2").addEventListener("click", () => {
                if (match_data.innings === 1) {
                    alert("Second innings not completed yet");
                } else {
                    displayInnings(2);
                }
            });
            }        


//MATCH_RESULT
if(document.getElementById("match_result")) {
                const winner = localStorage.getItem('winner');
                const match_data = JSON.parse(localStorage.getItem("data"));
                const score_data = JSON.parse(localStorage.getItem("score_data"));
                
                let resultText = "";
                
                if (winner) {
                    if (match_data.innings == 2) {
                        if (winner == match_data.batting_team) {
                            const ballsLeft = (match_data.overs * 6) - score_data.balls;
                            const wicketsLeft = 10 - score_data.wickets;
                            resultText = `${winner} wins by ${wicketsLeft} wicket${wicketsLeft !== 1 ? 's' : ''} (${ballsLeft} balls left)!`;
                        } else {
                            const runsDifference = score_data.inning1_score.runs - score_data.runs;
                            resultText = `${winner} wins by ${runsDifference} run${runsDifference !== 1 ? 's' : ''}!`;
                        }
                    } else {
                        const runsDifference = score_data.runs - score_data.inning1_score.runs;
                        resultText = `${winner} wins by ${runsDifference} run${runsDifference !== 1 ? 's' : ''}!`;
                    }
                } else {
                    resultText = "Match result not available";
                }
                
                document.getElementById("match_result").textContent = resultText;
                
                document.getElementById("reset_button").addEventListener("click", () => {
                    // Clears all local storage
                    localStorage.removeItem("data");
                    localStorage.removeItem("score_data");
                    localStorage.removeItem("player_data");
                    localStorage.removeItem("winner");
                    
                    window.location.href = "setup.html";
                });
            }
        


        






