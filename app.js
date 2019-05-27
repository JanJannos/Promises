
const btn = document.createElement('button');
btn.textContent = 'Press Me';
document.body.appendChild(btn);
btn.addEventListener('click' , function(){
    fetchData('https://swapi.co/api/planets');
});
const output = document.createElement('div');
document.body.appendChild(output);


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
        console.log(data);
    })
}

