(function popNotification() {
  const ARRAY = ['If There is no Flashlight on Your Phone, Take a Photo of the Sun and Use It in the Dark',
    'Good Glasses Will Help You to See Well',
    'If You Attempt to Rob a Bank, You Will Have No Trouble with Rent or Bills for the Next Ten Years, Whether You Are Successful or Not.',
    'Love Many, Trust Few, Always Paddle Your Own Canoe',
    'Ladies, if a man says he\'ll fix something, he will. There\'s no point in telling him about it every six months.',
    'Don\'t Let Go of You Wife\'s Hand at the Mall, Because She Will Start Shopping'];
  const UL = document.querySelector('.nav');
  const FIRST_LI = document.querySelector('.li-first');
  const LI = document.querySelectorAll('li');
  const TIP = document.querySelector('.tip-content');
  const PREV = document.querySelector('.prev');
  const NEXT = document.querySelector('.next');
  const CLOSE = document.querySelector('.close');
  const NOTIFICATION = document.querySelector('.notification-wrapper');
  const BODY = document.body;
  const CHECKBOX = document.getElementById('checkbox-id');

  window.onload = function closeNotification() {
    if (localStorage.getItem('tip') === null) {
      setTimeout(() => {
        NOTIFICATION.style.display = 'flex';
      }, 5000);
    }
    CLOSE.addEventListener('click', (e) => {
      if (CHECKBOX.checked) {
        e.preventDefault();
        localStorage.setItem('tip', 'none');
      }
      NOTIFICATION.style.display = 'none';
    });
  };

  FIRST_LI.classList.add('-selected');
  TIP.textContent = `${ARRAY[0]}`;

  UL.addEventListener('click', (e) => {
    if (e.target.childNodes.length === 0) {
      Array.from(LI).forEach(item => item.classList.remove('-selected'));
      e.target.classList.add('-selected');
      const INDEX = Array.from(LI).indexOf(e.target);
      TIP.innerHTML = `${ARRAY[INDEX]}`;
    }
  });

  function swichToPrevious() {
    let i = Array.from(LI).findIndex(item => (item.matches('.-selected')));
    Array.from(LI)[i].classList.remove('-selected');
    if (i === 0) i = 6;
    TIP.innerHTML = `${ARRAY[i - 1]}`;
    Array.from(LI)[i - 1].classList.add('-selected');
  }

  function swichToNext() {
    let i = Array.from(LI).findIndex(item => (item.matches('.-selected')));
    Array.from(UL.children)[i].classList.remove('-selected');
    if (i === 5) i = -1;
    TIP.innerHTML = `${ARRAY[i + 1]}`;
    Array.from(UL.children)[i + 1].classList.add('-selected');
  }

  PREV.addEventListener('click', swichToPrevious);

  NEXT.addEventListener('click', swichToNext);

  BODY.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) {
      swichToPrevious();
    }
    if (e.keyCode === 39) {
      swichToNext();
    }
    if (e.keyCode === 27) {
      if (CHECKBOX.checked) {
        e.preventDefault();
        localStorage.setItem('tip', 'none');
      }
      NOTIFICATION.style.display = 'none';
    }
  });
}());
