// код для раскрывающегося списка
let show;

function viewdiv(id) {
    param = document.getElementById(id);
    if (param.style.display == "none" || param.style.display == "") {
        if (show) show.style.display = "none";
        param.style.display = "block";
        show = param;
    } else param.style.display = "none";
    show = null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Элементы DOM
const triggers = document.querySelectorAll('.trigger');
const overlay = document.querySelector('.overlay');
const popup = document.getElementById('employeePopup');
const closeButton = popup.querySelector('.close');

let employees = []; // Массив для хранения данных о сотрудниках

// Загружаем данные из JSON-файла
async function loadEmployees() {
    try {
        const response = await fetch('employees.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        employees = await response.json();
    } catch (error) {
        console.error('Не удалось загрузить данные:', error);
        alert('Не удалось загрузить данные о сотрудниках. Пожалуйста, попробуйте позже.');
    }
}

// Функция для открытия попапа
function openPopup(employeeId) {
    // Находим данные о сотруднике по ID
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
        console.error('Сотрудник не найден');
        return;
    }

    // Заполняем попап данными
    const photoElement = popup.querySelector('.employee-photo');
    const departmentElement = popup.querySelector('.employee-department');
    /*const managerElement = popup.querySelector('.employee-manager');*/
    const positionElement = popup.querySelector('.employee-position');
    const nameElement = popup.querySelector('.employee-name');
    const birthdayElement = popup.querySelector('.employee-birthday');
    const telElement = popup.querySelector('.employee-tel');
    const tel1Element = popup.querySelector('.employee-tel1');
    const emailElement = popup.querySelector('.employee-email');
    const commentsElement = popup.querySelector('.employee-comments');

    // Обработка изображения
    if (photoElement) {
        if (employee.photo) {
            photoElement.src = employee.photo; // Устанавливаем путь к изображению
            photoElement.style.display = ''; // Показываем изображение
        } else {
            photoElement.style.display = 'none'; // Скрываем изображение, если его нет
        }
    }


    if (photoElement) photoElement.src = employee.photo;
    if (departmentElement) departmentElement.textContent = employee.department;
    /*if (managerElement) managerElement.innerHTML = employee.manager;*/
    if (positionElement) positionElement.textContent = employee.position;
    if (nameElement) nameElement.textContent = employee.name;
    if (birthdayElement) birthdayElement.textContent = employee.birthday;
    if (telElement) telElement.innerHTML = employee.tel;
    if (tel1Element) tel1Element.innerHTML = employee.tel1;
    if (emailElement) emailElement.innerHTML = employee.email;
    if (commentsElement) commentsElement.textContent = employee.comments;

    // Показываем попап и затемнение
    overlay.classList.add('active');
    popup.classList.add('active');
}

// Функция для закрытия попапа
function closePopup() {
    overlay.classList.remove('active');
    popup.classList.remove('active');
}

// Навешиваем обработчики на кнопки открытия попапов
triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const employeeId = trigger.getAttribute('data-popup-id'); // Оставляем строкой
        openPopup(employeeId);
    });
});

// Навешиваем обработчики на кнопку закрытия попапа
closeButton.addEventListener('click', closePopup);

// Закрытие попапа по клику на затемнение
overlay.addEventListener('click', closePopup);

// Закрытие попапа по нажатию клавиши Esc
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closePopup();
    }
});

/*// Назначаем обработчики на ссылки руководителей
document.addEventListener('DOMContentLoaded', () => {
    const managerLinks = document.querySelectorAll('.manager-link');
    managerLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Отменяем стандартное поведение ссылки
            const employeeId = parseInt(link.getAttribute('data-popup-id'));
            closePopup(); // Закрываем все попапы
            openPopup(employeeId); // Открываем новый попап
        });
    });
});*/

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', loadEmployees);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*// Флаг авторизации
let isAuthenticated = false;

// Функция для проверки авторизации
function checkAuth(username, password) {
    // Пример проверки логина и пароля
    return username === "admin" && password === "12345";
}

// Функция для входа
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (checkAuth(username, password)) {
        isAuthenticated = true;
        document.body.classList.add('authenticated'); // Добавляем класс для показа контента
        document.getElementById('login-form').style.display = 'none'; // Скрываем форму авторизации
    } else {
        alert('Неверный логин или пароль');
    }
}

// Функция для выхода
function logout() {
    isAuthenticated = false;
    document.body.classList.remove('authenticated'); // Убираем класс для скрытия контента
    document.getElementById('login-form').style.display = 'block'; // Показываем форму авторизации
}

// Назначаем обработчик на кнопку входа
document.getElementById('submit-login').addEventListener('click', login);

// Функция для открытия попапа
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
        document.querySelector('.overlay').classList.add('active');
    }
}

// Функция для закрытия всех попапов
function closePopups() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.style.display = 'none';
    });
    document.querySelector('.overlay').classList.remove('active');
}

// Назначаем обработчики на кнопки закрытия
document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', closePopups);
});

// Закрытие попапов по клику на затемнение
document.querySelector('.overlay').addEventListener('click', closePopups);

// Закрытие попапов по нажатию клавиши Esc
window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closePopups();
    }
});*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////