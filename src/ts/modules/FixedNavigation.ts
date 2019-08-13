import anime from 'animejs';
import {
  scrollObserve,
  targetBottomViewportTopToggleTrigger,
} from '../util/scrollObserver';

/**
 * 固定ナビを扱うクラス
 */
export default class FixedNavigation {
  $navigation: Element;
  $navigationItems: Array<Element>;
  $contentItems: Array<Element>;
  currentIndex: number;
  navigationCurrentObserver: IntersectionObserver;
  constructor() {
    this.$navigation = document.querySelector('.navigation');
    this.$navigationItems = Array.from(
      this.$navigation.querySelectorAll('.item'),
    );
    this.$contentItems = Array.from(
      document.querySelectorAll('.contents .item'),
    );
    this.currentIndex = 0;
    this.navigationCurrentObserver = scrollObserve(
      this.$contentItems,
      targetBottomViewportTopToggleTrigger,
      {
        root: null,
        rootMargin: '0% 0% 0% 0%',
        threshold: 0,
      },
      false,
      this.next.bind(this),
    );

    this.$navigationItems.forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.currentIndex = index;
        // this.next();
        FixedNavigation.scroll(this.$contentItems[index]);
      });
    });
  }

  // show() {
  //   this.$navigation.classList.add('visible');
  // }

  // hide() {
  //   this.$navigation.classList.remove('visible');
  // }

  next() {
    console.log('next');
    // BOTTOMの位置がプラスに変わるindex(=currentをつけるindex)を取得する
    const index = this.$contentItems.findIndex(($item, index) => {
      const bottom = $item.getBoundingClientRect().bottom;
      return bottom > 0;
    });
    console.log(index);
    this.currentIndex = index;
    this.toggleCurrent(this.currentIndex);
  }

  toggleCurrent(currentIndex) {
    this.$navigationItems.forEach(($item, index) => {
      if (index === currentIndex) {
        $item.classList.add('active');
      } else {
        $item.classList.remove('active');
      }
    });
  }

  static scroll($target) {
    const targetTop = $target.getBoundingClientRect().top;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scroll = {
      y: scrollY,
    };
    anime({
      targets: scroll,
      y: scrollY + targetTop + 5,
      duration: 500,
      easing: 'easeOutSine',
      update: () => window.scroll(0, scroll.y),
    });
  }
}
