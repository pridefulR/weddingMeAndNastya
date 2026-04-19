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
const IMG_BASE = `${import.meta.env.BASE_URL}images/`;
const INVITE_LETTERS = ["L", "O", "V", "E"] as const;
const HORIZONTAL_GAP_MIN = 0;
const HORIZONTAL_GAP_MAX = 15;
const VERTICAL_GAP_MIN = 5;
const VERTICAL_GAP_MAX = 20;
const ROTATION_MIN = 0;
const ROTATION_MAX = 30;
const PATTERN_VIEWPORT_DEPTH_MULTIPLIER = 14;

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
            <div id="daysLabel" class="countdown__label">дней</div>
          </div>
          <div class="countdown__item">
            <div id="hours" class="countdown__value">00</div>
            <div id="hoursLabel" class="countdown__label">часов</div>
          </div>
          <div class="countdown__item">
            <div id="minutes" class="countdown__value">00</div>
            <div id="minutesLabel" class="countdown__label">минут</div>
          </div>
          <div class="countdown__item">
            <div id="seconds" class="countdown__value">00</div>
            <div id="secondsLabel" class="countdown__label">секунд</div>
          </div>
        </section>
      </div>
    </section>

    <section class="love-stack" aria-label="Секции приглашения">
      <div class="love-stack__inner">
        <div id="invitePattern" class="love-stack__background" aria-hidden="true"></div>

        <section class="invite reveal-section">
          <div class="love-card invite__content">
            <h2 class="invite__title">Дорогие гости!</h2>

            <p class="invite__paragraph">
              Один из дней этого лета станет самым важным в нашей жизни, и мы хотим провести его с вами. Приглашаем вас на нашу свадьбу, которая состоится:
            </p>

            <p class="invite__date-highlight">24.07.2026</p>

            <img
              class="invite__photo"
              src="${IMG_BASE}invitePhoto.jpg"
              alt="Роман и Анастасия"
              loading="lazy"
            />

          </div>
        </section>

        <section class="venue reveal-section" aria-label="Место проведения">
          <div class="love-card venue__content">
            <h2 class="venue__title">Место</h2>
            <p class="venue__address">
              г. Ульяновск,<br/>
              Турбаза "Лесная Гавань"
            </p>
            <img
              class="venue__photo"
              src="${IMG_BASE}restaurant.jpg"
              alt="Ресторан Турбазы Лесная Гавань"
              loading="lazy"
            />
          </div>
        </section>

        <section class="people-confirmation reveal-section" aria-label="Жених и невеста">
          <div class="love-card people-confirmation__content">
            <div class="person__photo-wrap">
              <img class="person__photo" src="${IMG_BASE}husband.png" alt="Жених" loading="lazy" />
            </div>
            <p class="person__label">Жених</p>

            <div class="person__photo-wrap">
              <img class="person__photo" src="${IMG_BASE}wife.png" alt="Невеста" loading="lazy" />
            </div>
            <p class="person__label">Невеста</p>

            <div class="confirmation">
              <h3 class="confirmation__title">Подтверждение</h3>
              <p class="confirmation__text">Пожалуйста подтвердите свое присутствие</p>
              <p class="confirmation__date">до 01.07.2026</p>
            </div>
          </div>
        </section>

        <section class="palette reveal-section" aria-label="Дресс-код и палитра">
          <div class="love-card palette__content">
            <h2 class="palette__title">Дресс-код</h2>
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
            <img
              class="palette__photo"
              src="${IMG_BASE}dresscode.jpg"
              alt="Примеры нарядов для дресс-кода"
              loading="lazy"
            />
          </div>
        </section>

        <section class="questionnaire reveal-section" aria-label="Анкета гостей">
          <div class="love-card questionnaire__content">
            <h2 class="questionnaire__title">Анкета гостя</h2>
            <p class="questionnaire__text">
              Ваши ответы на вопросы помогут нам при организации торжества. Будем ждать ответ как можно скорее ❤️
            </p>
            <a
              class="questionnaire__link"
              href="https://docs.google.com/forms/d/e/1FAIpQLSc94bnDqOninkexvVFJ7PNPDrxS8t6_C9F5W2aFBsxnwCuBZA/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Заполнить короткую форму
            </a>
          </div>
        </section>

        <section class="schedule reveal-section" aria-label="Свадебное расписание">
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
                  <p class="schedule__event">Регистрация</p>
                  <p class="schedule__place">Турбаза "Лесная Гавань"</p>
                </div>
              </li>
              <li class="schedule__item">
                <p class="schedule__time">17:00</p>
                <div class="schedule__details">
                  <p class="schedule__event">Фотосессия</p>
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

        <section class="location-map reveal-section" aria-label="Как добраться до турбазы">
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

        <section class="page-closing" aria-label="Финальная надпись">
          <p class="page-closing__text reveal-section">Ждем Вас на нашей свадьбе!</p>
        </section>
      </div>
    </section>
  </main>
`;

const daysNode = document.querySelector<HTMLElement>("#days");
const hoursNode = document.querySelector<HTMLElement>("#hours");
const minutesNode = document.querySelector<HTMLElement>("#minutes");
const secondsNode = document.querySelector<HTMLElement>("#seconds");
const daysLabelNode = document.querySelector<HTMLElement>("#daysLabel");
const hoursLabelNode = document.querySelector<HTMLElement>("#hoursLabel");
const minutesLabelNode = document.querySelector<HTMLElement>("#minutesLabel");
const secondsLabelNode = document.querySelector<HTMLElement>("#secondsLabel");
const invitePatternNode = document.querySelector<HTMLElement>("#invitePattern");
const mapFrameNode = document.querySelector<HTMLIFrameElement>(".location-map__frame");
const revealSections = Array.from(document.querySelectorAll<HTMLElement>(".reveal-section"));
let invitePatternRendered = false;

if (
  !daysNode ||
  !hoursNode ||
  !minutesNode ||
  !secondsNode ||
  !daysLabelNode ||
  !hoursLabelNode ||
  !minutesLabelNode ||
  !secondsLabelNode
) {
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

const formatRuPlural = (value: number, one: string, few: string, many: string): string => {
  const absValue = Math.abs(value);
  const mod10 = absValue % 10;
  const mod100 = absValue % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return many;
  }

  if (mod10 === 1) {
    return one;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return few;
  }

  return many;
};

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

const renderInvitePattern = (): boolean => {
  if (!invitePatternNode) {
    return false;
  }

  const width = invitePatternNode.clientWidth;
  const height = invitePatternNode.clientHeight;

  if (width === 0 || height === 0) {
    return false;
  }

  const baseSize = Math.max(56, Math.min(126, Math.round(width * 0.1)));
  const patternDepth = Math.max(height + baseSize, window.innerHeight * PATTERN_VIEWPORT_DEPTH_MULTIPLIER);
  invitePatternNode.textContent = "";
  let letterIndex = 0;

  let y = -baseSize;

  while (y < patternDepth) {
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

  return true;
};

const tryRenderInvitePatternOnce = (): void => {
  if (invitePatternRendered) {
    return;
  }

  invitePatternRendered = renderInvitePattern();
};

const bindPatternInitialRender = (): void => {
  window.addEventListener("load", () => {
    tryRenderInvitePatternOnce();
  });
};

const renderCountdown = (): void => {
  const now = Date.now();
  const distance = targetTime - now;
  const parts = splitCountdown(distance);

  daysNode.textContent = formatValue(parts.days);
  hoursNode.textContent = formatValue(parts.hours);
  minutesNode.textContent = formatValue(parts.minutes);
  secondsNode.textContent = formatValue(parts.seconds);

  daysLabelNode.textContent = formatRuPlural(parts.days, "день", "дня", "дней");
  hoursLabelNode.textContent = formatRuPlural(parts.hours, "час", "часа", "часов");
  minutesLabelNode.textContent = formatRuPlural(parts.minutes, "минута", "минуты", "минут");
  secondsLabelNode.textContent = formatRuPlural(parts.seconds, "секунда", "секунды", "секунд");
};

const initRevealSections = (): void => {
  if (revealSections.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealSections.forEach((section) => {
      section.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        (entry.target as HTMLElement).classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px",
    },
  );

  revealSections.forEach((section) => {
    observer.observe(section);
  });

  const revealRemainingAtPageEnd = (): void => {
    const reachedBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    if (!reachedBottom) {
      return;
    }

    revealSections.forEach((section) => {
      if (section.classList.contains("is-visible")) {
        return;
      }

      section.classList.add("is-visible");
      observer.unobserve(section);
    });
  };

  window.addEventListener("scroll", revealRemainingAtPageEnd, { passive: true });
  window.addEventListener("resize", revealRemainingAtPageEnd);
  revealRemainingAtPageEnd();
};

renderCountdown();
setInterval(renderCountdown, 1000);

tryRenderInvitePatternOnce();
updateMapFrameHeight();
initRevealSections();
bindPatternInitialRender();

let invitePatternResizeTimer: number | undefined;

window.addEventListener("resize", () => {
  if (invitePatternResizeTimer !== undefined) {
    window.clearTimeout(invitePatternResizeTimer);
  }

  invitePatternResizeTimer = window.setTimeout(() => {
    updateMapFrameHeight();
  }, 120);
});
