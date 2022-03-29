import './styles/base.scss';
import { handleSubmit } from './js/app.js';

const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);