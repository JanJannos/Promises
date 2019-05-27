/* Practiciing Promises */
/* Hanoh Jan - 2019     */


const btn = document.createElement('button');
btn.textContent = 'Press Me';
document.body.appendChild(btn);
btn.addEventListener('click' , function(){
    // fetchData('https://swapi.co/api/planets');
    fetchAll('https://swapi.co/api/planets' , []).then(function(planets) {
       // console.log(planets);
        outputPlanets(planets);
    });
});


function fetchAll(url , planets){
     return new Promise(function(resolve, reject) {
          return fetch(url).then(function(rep){
             return rep.json(); 
          }).then(function(data) {
             planets = planets.concat(data.results);
             console.log(planets);
             if (data.next) {
                console.log('Next URL ' + data.next);
                fetchAll(data.next , planets).then(resolve);
             }
             else{
                 // Call it again
                 let arr = planets.map(function(item){
                 return {
                    name: item.name , 
                    films: item.films
                };
                resolve(arr);
             });
           }
       
             resolve(planets);
          });
      });
}

const output = document.createElement('div');
document.body.appendChild(output);

function outputPlanets(data) {
    data.forEach(function(item) {
        console.log(item);
        const div = document.createElement('div');
        div.textContent = item.name;
        const ul = document.createElement('ul');
        for(let x = 0;x < item.films.length; x++){
            let li = document.createElement('li');
            li.textContent = item.films[x];
            ul.appendChild(li);
        }
        div.appendChild(ul);
        output.appendChild(div); 
    });
    console.log(data);
}



function fetchData(url) {
    fetch(url).then(function(rep){
        // console.log(rep)
        return rep.json();
    }).then(function(data){
        output.textContent = `${data.count} results found`;
        if (data.next) {
            const btn2 = document.createElement('button');
            btn2.textContent = 'next';
            output.appendChild(btn2);
            btn2.addEventListener('click' , function(){
                fetchData(data.next);
            });
        }
        
        const planets = data.results.map(function(item) {
            console.log(item);            
            return {
                        name: item.name , 
                        films: item.films                   
                   };
        });
        outputPlanets(planets);
    })
}
