window.onload = () => {
    let buttonEl = document.getElementById('send');
    console.log('button', buttonEl);
    buttonEl.addEventListener('click', () => {
        console.log('sending beacon to server', JSON.stringify({ id: 'test_1', metrics: 'test metrics' }));
        navigator.sendBeacon('http://localhost:5001/beacon', JSON.stringify({ id: 'test_1', metrics: 'test metrics' }));
    })
};