import { body } from 'express-validator';
import {Main} from '../pages/main';
import {Header} from '../components/header';
import '../css/global.css';

const header = new Header();
const main = new Main();
document.body.append(header.getElement());
document.body.append(main.getElement());