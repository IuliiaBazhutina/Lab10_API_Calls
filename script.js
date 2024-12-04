
// Task 1 API Interaction GET Request fetch()

document.getElementById('load-fetch-btn').addEventListener('click', function () {

    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {

            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data);
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorElement = document.getElementById('error');
            errorElement.innerHTML = `${error}`;
        });
});



function displayData(data) {

    const section = document.getElementById('section');
    section.innerHTML = ''; // Clear previous data

    const title = document.createElement('h3');
    const body = document.createElement('p');

    title.innerHTML = data.title;
    body.innerHTML = data.body;

    section.appendChild(title);
    section.appendChild(body);

}



// Task 2 API Interaction GET Request XMLHttpRequest

document.getElementById('load-xhr-btn').addEventListener('click', function () {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 4 means the request is complete
            if (xhr.status === 200) { // 200 means the request was successful
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                displayData(data);
            }
            else {
                const errorText = handleResponse(xhr.status);
                console.error(`Error fetching data: ${errorText} (${xhr.status})`);
                const errorElement = document.getElementById('error');
                errorElement.innerHTML = `Error fetching data: ${errorText} (${xhr.status})`;
            }
        }
    };

    xhr.send();
});



function handleResponse(responseStatus) {
    const statusType = Math.floor(responseStatus / 100);

    let statusMessage;

    switch (statusType) {
        case 1: statusMessage = 'Informational response'
            break;

        case 2: statusMessage = 'Successful response'
            break;

        case 3: statusMessage = 'Redirection message'
            break;

        case 4: statusMessage = 'Client error'
            break;

        case 5: statusMessage = 'Server error'
            break;
    }

    return statusMessage;
}



// Task 3 Send Data Using POST fetch()

document.getElementById('post-btn').addEventListener('click', function (event) {
    event.preventDefault();

    const messageElement = document.getElementById('message');
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    const post = {
        "title": `${title}`,
        "body": `${body}`
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
        .then(response => {

            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data);
            messageElement.innerHTML = `The data is posted. Response: ${JSON.stringify(data)}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const messageElement = document.getElementById('message');
            messageElement.innerHTML = `${error}`;
        });

    const form = document.getElementById('form');
    form.reset();
})



// Task 4 Update Data Using PUT XMLHttpRequest

document.getElementById('put-btn').addEventListener('click', function (event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    const post = {
        "id": `${id}`,
        "title": `${title}`,
        "body": `${body}`
    };
    const postJSON = JSON.stringify(post);

    url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 4 means the request is complete
            if (xhr.status === 200) { // 200 means the request was successful

                const data = JSON.parse(xhr.responseText);
                console.log(data);
                const messageElement = document.getElementById('message');
                messageElement.innerHTML = `The data is updated. Response: ${JSON.stringify(data)}`;

            } else {

                const errorText = handleResponse(xhr.status);

                console.error(`Error fetching data: ${errorText} (${xhr.status})`);
                const messageElement = document.getElementById('message');
                messageElement.innerHTML = `Error fetching data: ${errorText} (${xhr.status})`;
            }
        }
    };

    xhr.send(postJSON);

    const form = document.getElementById('form');
    form.reset();
})