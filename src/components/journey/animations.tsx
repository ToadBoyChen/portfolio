import type { SpriteSheetData } from './JourneyTypes';
import me from '../../animation/quests/me-5frame.png';

import gcseScroll from '../../animation/specialItems/gcseScroll-17frame.png';
import schoolTeacher from '../../animation/encounters/schoolTeacher-24frame.png'; 

import guitar from '../../animation/specialItems/guitar-7frame.png';
import musicMan from '../../animation/encounters/musicMan-4frame.png'; 

import basketballTrophy from '../../animation/specialItems/bbtrophy-21frame.png';
import basketballMan from '../../animation/encounters/basketballMan-3frame.png'; 

import raspPi from '../../animation/specialItems/pi-33frame.png';
import  linuxite from '../../animation/encounters/linuxite-2frame.png'; 

import pyTome from '../../animation/specialItems/pyTome-21frame.png';
import  snake from '../../animation/encounters/snake-5frame.png'; 

import advancedSpellTome from '../../animation/specialItems/advancedSpellTome-2frame.png';
import  ALevelWizard from '../../animation/encounters/ALevelWizard-3frame.png'; 

import oopSpellBook from '../../animation/specialItems/oopSpellBook-2frame.png';
import  imperialWizard from '../../animation/encounters/imperialWizard-2frame.png'; 

import RSADagger from '../../animation/specialItems/RSADagger-2frame.png';
import  wizardAssassin from '../../animation/encounters/wizardAssassin-20frame.png'; 

const meAnimation: SpriteSheetData = {
  spriteSheet: me,
  frameCount: 5,
  frameWidth: 96,
  frameHeight: 96,
  fps: 5,
};

const gcseScrollAnimation: SpriteSheetData = {
  spriteSheet: gcseScroll,
  frameCount: 17,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};
const schoolTeacherAnimation: SpriteSheetData = {
  spriteSheet: schoolTeacher,
  frameCount: 24,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};

const guitarAnimation: SpriteSheetData = {
  spriteSheet: guitar,
  frameCount: 7,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};
const musicManAnimation: SpriteSheetData = {
  spriteSheet: musicMan,
  frameCount: 4,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};

const bbTrophyAnimation: SpriteSheetData = {
  spriteSheet: basketballTrophy,
  frameCount: 21,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};
const bbManAnimation: SpriteSheetData = {
  spriteSheet: basketballMan,
  frameCount: 3,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};

const raspPiAnimation: SpriteSheetData = {
  spriteSheet: raspPi,
  frameCount: 33,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};
const linuxiteAnimation: SpriteSheetData = {
  spriteSheet: linuxite,
  frameCount: 2,
  frameWidth: 96,
  frameHeight: 96,
  fps: 2,
};

const snakeAnimation: SpriteSheetData = {
  spriteSheet: snake,
  frameCount: 5,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};
const pyTomeAnimation: SpriteSheetData = {
  spriteSheet: pyTome,
  frameCount: 21,
  frameWidth: 96,
  frameHeight: 96,
  fps: 2,
};

const wizzardAssassinAnimation: SpriteSheetData = {
  spriteSheet: wizardAssassin,
  frameCount: 20,
  frameWidth: 96,
  frameHeight: 96,
  fps: 4,
};
const RSADaggerAnimation: SpriteSheetData = {
  spriteSheet: RSADagger,
  frameCount: 2,
  frameWidth: 96,
  frameHeight: 96,
  fps: 2,
};

const ALevelWizardAnimation: SpriteSheetData = {
  spriteSheet: ALevelWizard,
  frameCount: 3,
  frameWidth: 96,
  frameHeight: 96,
  fps: 3,
};
const advancedSpellTomeAnimation: SpriteSheetData = {
  spriteSheet: advancedSpellTome,
  frameCount: 2,
  frameWidth: 96,
  frameHeight: 96,
  fps: 2,
};
const imperialWizardAnimation: SpriteSheetData = {
  spriteSheet: imperialWizard,
  frameCount: 2,
  frameWidth: 96,
  frameHeight: 96,
  fps: 2,
};

const oopSpellBookAnimation: SpriteSheetData = {
  spriteSheet: oopSpellBook,
  frameCount: 2,
  frameWidth: 96,
  frameHeight: 96,
  fps: 2,
};

export const animations = {
    me: meAnimation,
    gcseScroll: gcseScrollAnimation,
    schoolTeacher: schoolTeacherAnimation,
    guitar: guitarAnimation,
    musicMan: musicManAnimation,
    bbTrophy: bbTrophyAnimation,
    bbMan: bbManAnimation,
    raspPi: raspPiAnimation,
    linuxite: linuxiteAnimation,
    snake: snakeAnimation,
    pyTome: pyTomeAnimation,
    wizardAssassin: wizzardAssassinAnimation,
    RSADagger: RSADaggerAnimation,
    advancedSpellTome: advancedSpellTomeAnimation,
    oopSpellBook: oopSpellBookAnimation,
    ALevelWizard: ALevelWizardAnimation,
    imperialWizard: imperialWizardAnimation,
};