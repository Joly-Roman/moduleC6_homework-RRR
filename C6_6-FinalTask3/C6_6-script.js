// Находим кнопки, поле ввода , окно чата
let btnToSendMessage = document.querySelector('.j-send-btn');
let btnToSendGeolocation = document.querySelector('.j-geo-btn');
let chatInput = document.querySelector('.j-input'); 
let chatWindow = document.querySelector('.chat_window');

// Записываем ссылку на сервер
const wsUri = "wss://echo.websocket.org/";
let websocket;
// Функция,которая проверяет,подключено ли соединение с webSocket 
let wsSend = function(data) {
	if(!websocket.readyState){
    setTimeout(function (){
    wsSend(data)},100);
    } 
    else{
        websocket.send(data);
    }
	};

//Вешаем обработчик отправки сообщения
btnToSendMessage.addEventListener('click', () => {
	// Берем содержимое инпута
	let inputValue = chatInput.value;
	chatInput.value = '';
	//Отправка сообщения пользователя
	chatWindow.innerHTML += `<p class="user_message">${inputValue}</p>`;
	chatInput.value = '';

	websocket = new WebSocket(wsUri);
	// Отправка текста сообщения серверу
	wsSend(inputValue);
	websocket.onopen = function(evt) {
    console.log("CONNECTED");
  };
  	websocket.onclose = function(evt) {
    console.log("DISCONNECTED");
  };
	websocket.onmessage = function(event) {
		chatWindow.innerHTML += `<p class="response_message">${inputValue}</p>`;
	};
	websocket.onerror = function(evt) {
    console.log('WebSockerError: ', evt.data)
    };
})

//Вешаем обработчик отправки геолокации
btnToSendGeolocation.addEventListener('click', () => {
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { coords } = position;
    let latitude = coords.latitude;
    let longitude = coords.longitude;
    let geoURL = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    chatWindow.innerHTML += `<p class="geolocation_message"><a target="_blank" href="${geoURL}">Гео-локация</a></p>`

    console.log(coords.latitude, coords.longitude);
  });
} 
else {
	console.log('Geoposition error');
}
})