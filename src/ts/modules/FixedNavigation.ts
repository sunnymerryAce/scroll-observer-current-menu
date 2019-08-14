import anime from 'animejs';
import { getScrollObserver } from '../util/scrollObserver';

/**
 * 固定ナビを扱うクラス
 */
export default class FixedNavigation {
  $navigation: Element;
  $navigationItems: Array<Element>;
  $contentItems: Array<Element>;
  currentIndex: number;
  sectionObserver: IntersectionObserver;

  constructor() {
    this.$navigation = document.querySelector('.navigation');
    this.$navigationItems = Array.from(
      this.$navigation.querySelectorAll('.item'),
    );
    this.$contentItems = Array.from(
      document.querySelectorAll('.contents .item'),
    );
    this.currentIndex = 0;

    this.addEvent();
  }

  addEvent() {
    // 画像を全読み込み後、スクロール監視を開始
    window.addEventListener('load', () => {
      this.startObserve();
    });
    // ナビゲーションのクリックイベント
    this.$navigationItems.forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.currentIndex = index;
        FixedNavigation.scrollTo(this.$contentItems[index]);
      });
    });
  }

  // スクロール監視を開始する
  startObserve() {
    this.sectionObserver = getScrollObserver(
      {
        onScrollDownIn: null,
        onScrollDownOut: this.toggleCurrent.bind(this),
        onScrollUpIn: this.toggleCurrent.bind(this),
        onScrollUpOut: null,
      },
      false,
    );
    this.$contentItems.forEach($target => {
      this.sectionObserver.observe($target);
    });
  }

  toggleCurrent() {
    // BOTTOMの位置がプラスに変わるindex(=currentクラスをつけるindex)を取得する
    const index = this.$contentItems.findIndex($item => {
      const bottom = $item.getBoundingClientRect().bottom;
      return bottom > 0;
    });
    this.currentIndex = index;
    this.$navigationItems.forEach(($item, index) => {
      if (index === this.currentIndex) {
        $item.classList.add('active');
      } else {
        $item.classList.remove('active');
      }
    });
  }

  static scrollTo($target) {
    const targetTop = $target.getBoundingClientRect().top;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scroll = {
      y: scrollY,
    };
    anime({
      targets: scroll,
      // IntersectionObserverが反応しない場合がある?ため、5pxだけ余分にスクロールする
      y: scrollY + targetTop + 5,
      duration: 500,
      easing: 'easeOutSine',
      update: () => {
        window.scroll(0, scroll.y);
      },
    });
  }
}
