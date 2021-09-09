

// Step 1 : :Lets Grab the Element from the HTML File :

let confirmed  = document.getElementById("card1");
let active = document.getElementById("card2");
let recovered = document.getElementById("card3");
let death = document.getElementById("card4");

let date = document.getElementById("date");
let time = document.getElementById("time");
let table = document.getElementById("datatablesSimple");
let tbody = document.getElementById("tbody");



/*  The Javascript Fetch API : used to fetch the Data From the Server.... */

const url = 'https://api.rootnet.in/covid19-in/stats/latest';
	
    
fetch(url)
.then((response) => { 
    if (!response.ok){
        throw Error(response.status)
    }
  return response.json();
})
.then((parsedData)=> {

    confirmed.innerText = parsedData.data.summary.total.toLocaleString();
    active.innerText = (parsedData.data.summary.total - (parsedData.data.summary.discharged + parsedData.data.summary.deaths)).toLocaleString();
    recovered.innerText = parsedData.data.summary.discharged.toLocaleString();
    death.innerText = parsedData.data.summary.deaths.toLocaleString();
    date.innerText = "Last Updated Date: " + parsedData.lastRefreshed.slice(0,10);
    time.innerText = "Last Updated Time : " +parsedData.lastRefreshed.slice(11,16);
    

    tbody.innerHTML = '';

        const arr = parsedData.data.regional;
             arr.forEach((state) => {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                let loc = document.createTextNode(state.loc);
                let cnf = document.createTextNode(state.totalConfirmed);
                let act = document.createTextNode(state.totalConfirmed-(state.discharged+state.deaths));
                let rec = document.createTextNode(state.discharged);
                let dth = document.createTextNode(state.deaths);
                   
                let sp = (state.totalConfirmed-(state.discharged+state.deaths));
               

                tr.innerHTML +=  '<td>'+'<b>'+state.loc+'</b>'+'</td>'
                                 +'<td>'+state.totalConfirmed+'</td>'
                                 +'<td>'+sp+'</td>'
                                 +'<td>'+state.discharged+'</td>'
                                 +'<td>'+state.deaths+'</td>'

                tbody.appendChild(tr);
             })
     


})
    .catch((err) =>{
        alert(err + " something went wrong...");
    });

