"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Image from "next/image";
function textOpacityScroll() {
  const items = document.querySelectorAll(".text-section"); // Получаем все элементы с классом text-section

  if (items.length) {
    items.forEach((item) => {
      const itemValues = item.querySelectorAll<HTMLSpanElement>(
        ".text-section__value"
      ); // Получаем все элементы с классом text-section__value
      const itemMask = item.querySelector<HTMLDivElement>(
        ".text-section__mask"
      ); // Маска для прокрутки
      const itemSpeed = parseInt(itemValues[0]?.dataset.textSpeed || "500", 10); // Скорость анимации
      const itemOpacity = parseFloat(
        itemValues[0]?.dataset.textOpacity || "0.2"
      ); // Начальная прозрачность

      // Оборачиваем каждое слово в <span> для анимации
      itemValues.forEach((itemValue) => {
        itemValue.innerHTML = itemValue.innerText.replace(
          /([A-Za-z0-9'-,.&!?+<>/а-яА-ЯёЁіІїЇєЄґҐäöüõé–—]+)/g,
          `<span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity}">$1</span>`
        );
      });

      // Обработчик прокрутки с requestAnimationFrame
      const handleScroll = () => {
        if (itemMask) {
          const maskPosition =
            itemMask.getBoundingClientRect().top - window.innerHeight; // Получаем позицию маски относительно окна

          const itemWay =
            (Math.abs(maskPosition) /
              (window.innerHeight / 3 + itemMask.offsetHeight)) *
            100; // Расстояние прокрутки

          const itemWords = item.querySelectorAll<HTMLSpanElement>(
            ".text-section__value span"
          ); // Получаем все слова внутри текста

          const currentWord =
            maskPosition <= 0
              ? Math.floor((itemWords.length / 100) * itemWay)
              : -1; // Индекс текущего слова для анимации

          addOpacity(itemWords, currentWord); // Применяем анимацию прозрачности
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Функция анимации с requestAnimationFrame
      function addOpacity(
        itemWords: NodeListOf<HTMLSpanElement>,
        currentWord: number
      ) {
        let index = 0;

        function animate() {
          if (index >= itemWords.length) return; // Если все слова анимированы, выходим

          const word = itemWords[index];
          if (index <= currentWord) {
            word.style.opacity = "1"; // Если слово должно быть видно
          } else {
            word.style.opacity = `${itemOpacity}`; // Если слово скрыто
          }

          index++;
          requestAnimationFrame(animate); // Запускаем следующий кадр анимации
        }

        animate(); // Запускаем анимацию
      }
    });
  }
}

export default function Metodology() {
  const t = useTranslations("Metodology");

  useEffect(() => {
    textOpacityScroll(); // Инициализация анимации при монтировании компонента
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-white via-white to-[#f7c44b] pb-28 pt-28 sm:pt-0">
      <div className="md:hidden absolute left-32 -top-6 w-44 aspect-[1/1]">
        <div className="relative w-full h-full">
          <Image
            src="/hero/decor.webp"
            alt="Decor"
            fill
            className="object-contain"
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </div>
      {/* <img
        src="/hero/decor.webp"
        alt="Decor"
        className="md:hidden block absolute left-32 -top-6 w-44"
        loading="lazy"
      /> */}

      <div className="px-6 lg:px-10 max-w-7xl mx-auto ">
        <div className="flex flex-row max-w-2xl lg:max-w-4xl mx-auto lg:ml-0 ">
          <div className="text-section">
            <div className="text-base/7 text-gray-900 ">
              <p className="text-lg/7 font-normal text-text-gray-600 uppercase pb-3 lg:pb-6 text-section__mask text-section__value">
                {t("subtitle")}
              </p>
              <h2 className="mt-2 font-bold tracking-tight text-gray-900 text-3xl sm:text-6xl text-section__value">
                {t("title_1")}
              </h2>
              <h2 className="font-bold tracking-tight text-gray-900 text-3xl sm:text-6xl text-section__value pb-3 lg:pb-8">
                {t("title_2")}
              </h2>

              <div className="text-left ">
                <p
                  className="mt-6 text-xl/8 font-semibold text-section__mask text-section__value "
                  data-text-speed="300"
                  data-text-opacity="0.5"
                >
                  {t("description")}
                </p>
                <p
                  className="mt-6 text-xl/8 font-semibold text-section__mask text-section__value "
                  data-text-speed="300"
                  data-text-opacity="0.5"
                >
                  {t("description_2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
