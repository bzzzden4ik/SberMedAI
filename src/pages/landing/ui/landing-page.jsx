import './landing.css';

import React from "react";

export const LandingPage = () => {
  return (
    <div>
      <header className="header">
        <div className="wrap">
          <div className="hnav">
            <a className="logo" href="#">
              <i>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M5 0h4v5h5v4H9v5H5V9H0V5h5z" fill="#313D46" />
                </svg>
              </i>
              MedAI
            </a>
            <div className="search">
              <input className="input" placeholder="Поиск" aria-label="Поиск" />
            </div>
            <div className="hright">
              <button className="ibtn" aria-label="Найти">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="10" cy="10" r="7" />
                  <path d="m16 16 6 6" />
                </svg>
              </button>
              <button className="ibtn" aria-label="Версия для слабовидящих">
                <svg
                  width="28"
                  height="22"
                  viewBox="0 0 28 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <circle cx="7" cy="11" r="5" />
                  <circle cx="21" cy="11" r="5" />
                  <path d="M12 11h4" />
                </svg>
              </button>
              <button className="ibtn" aria-label="Личный кабинет">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="menu-row">
          <div className="wrap">
            <ul className="menu">
              <li>
                <a href="#services">Направления</a>
              </li>
              <li>
                <a href="#contacts">Контакты</a>
              </li>
              <li>
                <a href="#doctors">Врачи</a>
              </li>
              <li>
                <a href="#about">О нас</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <div className="hero">
          <div className="wrap hero-grid">
            <div>
              <h1>Здоровье без лишних звонков и ожидания</h1>
              <p>
                Опишите, что вас беспокоит, — ИИ-агент подберёт специалиста и
                запишет на удобное время.
              </p>
              <div className="hero-actions">
                <button className="btn lg">Подобрать врача с ИИ</button>
                <button className="btn lg ghost">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z" />
                  </svg>
                  ИИ-ассистент
                </button>
              </div>
            </div>
            <div className="ph" role="img" aria-label="Изображение клиники"></div>
          </div>
        </div>

        <section className="s" id="doctors">
          <div className="wrap">
            <div className="shead">
              <h2>Лучшие врачи</h2>
              <a className="alink" href="#">
                См. всех
              </a>
            </div>
            <div className="grid">
              <article className="card">
                <div className="ph"></div>
                <div className="tx">
                  <h4>Иванов Иван Иванович</h4>
                  <div className="pos">Офтальмолог</div>
                  <div className="deg">Кандидат медицинских наук</div>
                  <div className="clinic">Клиники приёма: 1</div>
                  <button className="btn sm" style={{ alignSelf: "center" }}>
                    Записаться
                  </button>
                </div>
              </article>
              <article className="card">
                <div className="ph"></div>
                <div className="tx">
                  <h4>Петрова Мария Сергеевна</h4>
                  <div className="pos">Кардиолог</div>
                  <div className="deg">Доктор медицинских наук</div>
                  <div className="clinic">Клиники приёма: 2</div>
                  <button className="btn sm" style={{ alignSelf: "center" }}>
                    Записаться
                  </button>
                </div>
              </article>
              <article className="card">
                <div className="ph"></div>
                <div className="tx">
                  <h4>Сидоров Алексей Петрович</h4>
                  <div className="pos">Невролог</div>
                  <div className="deg">Кандидат медицинских наук</div>
                  <div className="clinic">Клиники приёма: 1</div>
                  <button className="btn sm" style={{ alignSelf: "center" }}>
                    Записаться
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
        
      </main>
    </div>
  );
};