// Модуль для создания данных

import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, MIN_AVATAR, MAX_AVATAR, MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT, PHOTOS_COUNT } from './constants.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENT_NAMES = [
  'Иван', 'Мария', 'Александр', 'Анна', 'Дмитрий', 'Елена',
  'Сергей', 'Ольга', 'Андрей', 'Наталья', 'Максим', 'Татьяна',
  'Артём', 'Екатерина', 'Павел'
];

const PHOTO_DESCRIPTIONS = ['Красивый закат над морем',
  'Городской пейзаж в вечернее время',
  'Природа в полном расцвете',
  'Архитектурное наследие',
  'Жизнь в движении',
  'Моменты счастья',
  'Путешествие по миру',
  'Уличная фотография',
  'Портрет в естественном свете',
  'Абстрактная композиция',
  'Животные в их естественной среде',
  'Еда как искусство',
  'Спортивные достижения',
  'Музыка и эмоции',
  'Семейные моменты',
  'Городская жизнь',
  'Природные красоты',
  'Творческий эксперимент',
  'Эмоциональный портрет',
  'Архитектурные детали',
  'Пейзаж в тумане',
  'Яркие цвета жизни',
  'Чёрно-белая эстетика',
  'Макросъёмка',
  'Широкоугольная перспектива'
];

let commentIdCounter = 1;

function generateComment() {
  const commentId = commentIdCounter++;

  const messageCount = getRandomInteger(MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT);
  let message = '';
  if (messageCount === 1) {
    message = getRandomArrayElement(COMMENT_MESSAGES);
  } else {
    const firstMessage = getRandomArrayElement(COMMENT_MESSAGES);
    const secondMessage = getRandomArrayElement(COMMENT_MESSAGES.filter((msg) => msg !== firstMessage));
    message = `${firstMessage} ${secondMessage}`;
  }

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
    message: message,
    name: getRandomArrayElement(COMMENT_NAMES)
  };
}

function generateComments() {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment());
  }
  return comments;
}

function generatePhoto(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTIONS[id - 1] || `Описание фотографии ${id}`,
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: generateComments()
  };
}

function generatePhotos() {
  const photosArray = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photosArray.push(generatePhoto(i));
  }
  return photosArray;
}

export { generatePhotos };

