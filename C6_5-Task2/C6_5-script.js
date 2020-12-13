let btn = document.querySelector('.size-btn');

btn.addEventListener('click', () => {
	let screenWidth = window.screen.width;
	let screenHeight = window.screen.height;
	alert(`Длина: ${screenWidth}, Ширина: ${screenHeight}`);
});