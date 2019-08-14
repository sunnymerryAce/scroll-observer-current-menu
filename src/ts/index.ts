/**
 * @author Yoichiro Hirano
 * @description Develop Environment Model
 * @created 2019/07/17
 * @link https://
 */

import '../scss/index.scss';
import FixedNavigation from './modules/FixedNavigation';

export default class Index {
  navigation: FixedNavigation;
  /**
   * constructor
   */
  constructor() {
    this.navigation = new FixedNavigation();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.DEV_ENV_MODEL = window.DEV_ENV_MODEL || {};
  window.DEV_ENV_MODEL.INDEX = window.DEV_ENV_MODEL.INDEX || new Index();
});
