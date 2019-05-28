/* Practiciing Promises */
/* Hanoh Jan - 2019     */


// Now adding a catch block to the Promise

//const btn = document.createElement('button');
//btn.textContent = 'Press Me';
//document.body.appendChild(btn);
//btn.addEventListener('click' , function(){
//    fetchAll('https://swapi.co/api/planets' , []).then(function(planets) {
//       outputPlanets(planets);
//    });
//});

const btn = document.createElement('button');
btn.textContent = 'Press Me';
document.body.appendChild(btn);
btn.addEventListener('click' , function(){
    fetchAll('https://swapi.co/api/planets' , []).then(function(planets) {
            outputPlanets(planets);
        }).catch(function(error){       // added a catch
        console.log(error);
    });
});




function fetchAll(url , planets){
     return new Promise(function(resolve, reject) {
          // If you want to catach , uncomment the following line
          // throw 'UH HO !!!';
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
          }).catch(function(error){              
              console.log(error);
          });  // end catch , then , promise
      });
}

const output = document.createElement('div');
document.body.appendChild(output);

function outputPlanets(data) {
    // we will use InnerHTML instead
    // output.textContent = `${data.length} results found`;
    output.innerHTML = `<h1>${data.length} results found</h1>`;
    data.forEach(function(item) {
        console.log(item);
        const div = document.createElement('div');
        div.textContent = item.name;
        let span = document.createElement('span');
        span.textContent = ` ${item.films.length} films found`;
        div.appendChild(span);        
        if (item.films.length > 0) {
            const ul = document.createElement('ul');
            for(let x = 0;x < item.films.length; x++){
                let li = document.createElement('li');
                li.textContent = item.films[x];
                ul.appendChild(li);
            }
            div.appendChild(ul);
        }

        output.appendChild(div); 
    });
    console.log(data);
}



function fetchData(url) {
    fetch(url).then(function(rep){
        // console.log(rep)
        return rep.json();
    }).then(function(data){
        // we lost the next line of the results , so now we move it up to "outputPlanets"
        // output.textContent = `${data.count} results found`;
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
