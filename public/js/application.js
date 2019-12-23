
document.addEventListener('click', async e => {
    if (e.target.type === 'submit') {
        let allPubs;
        await navigator.geolocation.getCurrentPosition(
            async function (position) {
                console.log(position);
                await fetch(`/map/pubs?lon=37.5923362&lat=55.7089923`).then(async (data) => {
                    allPubs = await data.json();
                    console.log(await allPubs);
                }
                )
                //console.log(allPubs.results);
                let divId = document.getElementById('listOfPubs');
                //console.log(divId);
                //console.log(allPubs.results);
                console.log(divId);

                allPubs.results.forEach(element => {
                    let elemTitle = document.createElement('h3');
                    let elemAdress = document.createElement('p');
                    elemAdress.classList.add('pad-s-1')
                    elemAdress.classList.add('address')
                    let elemPhone = document.createElement('p');
                    elemPhone.classList.add('pad-s-1')
                    let elemRef = document.createElement('a');
                    elemRef.classList.add('pad-s-1')

                    elemTitle.innerText = element.title;
                    elemAdress.innerText = element.address;
                    elemPhone.innerText = element.phone;
                    elemRef.href.innerText = element.site_url;
                    elemRef.setAttribute('href', element.site_url)
                    elemRef.innerText = element.site_url;
                    divId.appendChild(elemTitle)
                    divId.appendChild(elemPhone)
                    divId.appendChild(elemAdress)
                    divId.appendChild(elemRef)
                });
            });

    }
})