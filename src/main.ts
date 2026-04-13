import "./style.css";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_DATE_ISO = "2026-07-24T16:00:00+04:00";
const MAP_WIDGET_SRC =
  "https://yandex.ru/map-widget/v1/?um=constructor%3A96eb685c041cf644d62b12a6ea9690f08f4bd3d117365123f13948b235423827&source=constructor";
const ROUTE_LINK =
  "https://yandex.com/maps/-/CPfrfV-t";
const MAP_BREAKPOINT_DESKTOP = 768;
const MAP_HEIGHT_MOBILE = 296;
const MAP_HEIGHT_DESKTOP = 360;
const INVITE_LETTERS = ["L", "O", "V", "E"] as const;
const HORIZONTAL_GAP_MIN = 0;
const HORIZONTAL_GAP_MAX = 15;
const VERTICAL_GAP_MIN = 5;
const VERTICAL_GAP_MAX = 20;
const ROTATION_MIN = 0;
const ROTATION_MAX = 30;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root was not found");
}

app.innerHTML = `
  <main class="page">
    <section class="hero" aria-label="Свадебное приглашение">
      <div class="hero__inner">
        <div class="hero__background" aria-hidden="true">
          <span class="hero__love hero__love--top">LO</span>
          <span class="hero__love hero__love--bottom">VE</span>
        </div>

        <div class="hero__content">
          <div class="hero__date" aria-label="Дата свадьбы">
            <span>24</span>
            <span>07</span>
            <span>2026</span>
          </div>

          <div class="hero__text">
            <p class="hero__invite">Приглашаем на свадьбу</p>
            <h1 class="hero__names">
              <span class="hero__name-line">РОМАН <span class="hero__and">and</span></span>
              <span class="hero__name-line">АНАСТАСИЯ</span>
            </h1>
          </div>
        </div>

        <section class="hero__countdown" aria-label="Обратный отсчет до свадьбы">
          <div class="countdown__item">
            <div id="days" class="countdown__value">00</div>
            <div class="countdown__label">дней</div>
          </div>
          <div class="countdown__item">
            <div id="hours" class="countdown__value">00</div>
            <div class="countdown__label">часов</div>
          </div>
          <div class="countdown__item">
            <div id="minutes" class="countdown__value">00</div>
            <div class="countdown__label">минут</div>
          </div>
          <div class="countdown__item">
            <div id="seconds" class="countdown__value">00</div>
            <div class="countdown__label">секунд</div>
          </div>
        </section>
      </div>
    </section>

    <section class="love-stack" aria-label="Секции приглашения">
      <div class="love-stack__inner">
        <div id="invitePattern" class="love-stack__background" aria-hidden="true"></div>

        <section class="invite">
          <div class="love-card invite__content">
            <h2 class="invite__title">Дорогой<br/>Гость!</h2>

            <p class="invite__paragraph">
              Мы рады сообщить Вам, что 24.07.2026<br/>
              состоится <span class="text-key">самое главное торжество</span> в<br/>
              нашей жизни - <span class="text-key">день нашей свадьбы</span>!<br/>
              Приглашаем Вас <span class="text-key">разделить с нами радость</span><br/>
              этого незабываемого дня.
            </p>

            <p class="invite__paragraph">
              <span class="text-date">24.07.2026</span> в <span class="text-time">16:00</span>
              <span class="text-location">Турбаза "Лесная Гавань"</span>
            </p>

            <img
              class="invite__photo"
              src="/images/invitePhoto.jpg"
              alt="Роман и Анастасия"
              loading="lazy"
            />

            <p class="invite__quote">
              Там, где посеяна любовь,<br/>
              растет радость.
            </p>
          </div>
        </section>

        <section class="people-confirmation" aria-label="Жених и невеста">
          <div class="love-card people-confirmation__content">
            <div class="person__photo-wrap">
              <img class="person__photo" src="/images/husband.png" alt="Жених" loading="lazy" />
            </div>
            <p class="person__label">Жених</p>

            <div class="person__photo-wrap">
              <img class="person__photo" src="/images/wife.png" alt="Невеста" loading="lazy" />
            </div>
            <p class="person__label">Невеста</p>

            <div class="confirmation">
              <h3 class="confirmation__title">ПОДТВЕРЖДЕНИЕ</h3>
              <p class="confirmation__text">Пожалуйста подтвердите свое присутствие</p>
              <p class="confirmation__date">до 01.07.2026</p>
            </div>
          </div>
        </section>

        <section class="palette" aria-label="Дресс-код и палитра">
          <div class="love-card palette__content">
            <h2 class="palette__title">Ждем Вас на<br/>свадьбе!</h2>
            <p class="palette__text">
              Будем благодарны, если при выборе<br/>
              нарядов на наше торжество вы<br/>
              придержитесь следующей палитры
            </p>
            <div class="palette__swatches" aria-label="Цветовая палитра">
              <span class="palette__swatch palette__swatch--1"></span>
              <span class="palette__swatch palette__swatch--2"></span>
              <span class="palette__swatch palette__swatch--3"></span>
              <span class="palette__swatch palette__swatch--4"></span>
              <span class="palette__swatch palette__swatch--5"></span>
            </div>
          </div>
        </section>

        <section class="schedule" aria-label="Свадебное расписание">
          <div class="love-card schedule__content">
            <h2 class="schedule__title">Свадебное расписание</h2>

            <ul class="schedule__list">
              <li class="schedule__item">
                <p class="schedule__time">16:00</p>
                <div class="schedule__details">
                  <p class="schedule__event">Сбор гостей и фуршет</p>
                  <p class="schedule__place">Турбаза "Лесная Гавань"</p>
                </div>
              </li>
              <li class="schedule__item">
                <p class="schedule__time">16:30</p>
                <div class="schedule__details">
                  <p class="schedule__event">Торжественный момент</p>
                  <p class="schedule__place">Турбаза "Лесная Гавань"</p>
                </div>
              </li>
              <li class="schedule__item">
                <p class="schedule__time">17:30</p>
                <div class="schedule__details">
                  <p class="schedule__event">Свадебный банкет</p>
                  <p class="schedule__place">Турбаза "Лесная Гавань"</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section class="location-map" aria-label="Как добраться до турбазы">
          <div class="love-card location-map__content">
            <h2 class="location-map__title">Как добраться до турбазы</h2>
            <div class="location-map__frame-wrap">
              <iframe
                class="location-map__frame"
                src="${MAP_WIDGET_SRC}"
                height="${MAP_HEIGHT_MOBILE}"
                frameborder="0"
                title="Карта места проведения свадьбы"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              class="location-map__route"
              href="${ROUTE_LINK}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Построить маршрут
            </a>
          </div>
        </section>
      </div>
    </section>
  </main>
`;

const daysNode = document.querySelector<HTMLElement>("#days");
const hoursNode = document.querySelector<HTMLElement>("#hours");
const minutesNode = document.querySelector<HTMLElement>("#minutes");
const secondsNode = document.querySelector<HTMLElement>("#seconds");
const invitePatternNode = document.querySelector<HTMLElement>("#invitePattern");
const mapFrameNode = document.querySelector<HTMLIFrameElement>(".location-map__frame");

if (!daysNode || !hoursNode || !minutesNode || !secondsNode) {
  throw new Error("Countdown nodes are missing");
}

const targetTime = new Date(TARGET_DATE_ISO).getTime();

const splitCountdown = (distanceMs: number): CountdownParts => {
  const safeDistance = Math.max(0, distanceMs);

  const days = Math.floor(safeDistance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDistance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDistance / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDistance / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const formatValue = (value: number): string => value.toString().padStart(2, "0");

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMapHeightByViewport = (): number => {
  return window.innerWidth >= MAP_BREAKPOINT_DESKTOP
    ? MAP_HEIGHT_DESKTOP
    : MAP_HEIGHT_MOBILE;
};

const updateMapFrameHeight = (): void => {
  if (!mapFrameNode) {
    return;
  }

  mapFrameNode.setAttribute("height", String(getMapHeightByViewport()));
};

const renderInvitePattern = (): void => {
  if (!invitePatternNode) {
    return;
  }

  const width = invitePatternNode.clientWidth;
  const height = invitePatternNode.clientHeight;

  if (width === 0 || height === 0) {
    return;
  }

  const baseSize = Math.max(56, Math.min(126, Math.round(width * 0.1)));
  invitePatternNode.textContent = "";
  let letterIndex = 0;

  let y = -baseSize;

  while (y < height + baseSize) {
    const rowHeight = randomInt(Math.round(baseSize * 0.78), Math.round(baseSize * 1.08));
    let x = -baseSize;

    while (x < width + baseSize) {
      const glyph = document.createElement("span");
      const fontSize = randomInt(Math.round(baseSize * 0.76), Math.round(baseSize * 1.28));
      const rotateValue = randomInt(ROTATION_MIN, ROTATION_MAX);
      const rotationDirection = Math.random() < 0.5 ? -1 : 1;
      const rotation = rotationDirection * rotateValue;
      const letter = INVITE_LETTERS[letterIndex % INVITE_LETTERS.length];

      glyph.className = "invite__glyph";
      glyph.textContent = letter;
      glyph.style.left = `${x}px`;
      glyph.style.top = `${y}px`;
      glyph.style.fontSize = `${fontSize}px`;
      glyph.style.transform = `rotate(${rotation}deg)`;

      invitePatternNode.append(glyph);
      letterIndex += 1;

      const estimatedWidth = fontSize * 0.68;
      x += estimatedWidth + randomInt(HORIZONTAL_GAP_MIN, HORIZONTAL_GAP_MAX);
    }

    y += rowHeight + randomInt(VERTICAL_GAP_MIN, VERTICAL_GAP_MAX);
  }
};

const renderCountdown = (): void => {
  const now = Date.now();
  const distance = targetTime - now;
  const parts = splitCountdown(distance);

  daysNode.textContent = formatValue(parts.days);
  hoursNode.textContent = formatValue(parts.hours);
  minutesNode.textContent = formatValue(parts.minutes);
  secondsNode.textContent = formatValue(parts.seconds);
};

renderCountdown();
setInterval(renderCountdown, 1000);

renderInvitePattern();
updateMapFrameHeight();

let invitePatternResizeTimer: number | undefined;

window.addEventListener("resize", () => {
  if (invitePatternResizeTimer !== undefined) {
    window.clearTimeout(invitePatternResizeTimer);
  }

  invitePatternResizeTimer = window.setTimeout(() => {
    renderInvitePattern();
    updateMapFrameHeight();
  }, 120);
});
