'use strict';

class StickyNavigation {
    
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        let self = this;
        $('.nav__tab').click(function() { 
            self.onTabClick(event, $(this)); 
        });
        $(window).scroll(() => { this.onScroll(); });
        $(window).resize(() => { this.onResize(); });
    }
    
    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }
    
    onScroll() {
        this.checkTabContainerPosition();
    this.findCurrentTabSelector();
    }
    
    onResize() {
        if(this.currentId) {
            this.setSliderCss();
        }
    }
    
    checkTabContainerPosition() {
        let offset = $('.nav__tabs').offset().top + $('.nav__tabs').height() - this.tabContainerHeight;
        if($(window).scrollTop() > offset) {
            $('.nav__tabs__container').addClass('nav__tabs__container__top');
        } 
        else {
            $('.nav__tabs__container').removeClass('nav__tabs__container__top');
        }
    }
    
    findCurrentTabSelector(element) {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.nav__tab').each(function() {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if(this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }
    
    setSliderCss() {
        let width = 0;
        let left = 0;
        if(this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.nav__tab__slider').css('width', width);
        $('.nav__tab__slider').css('left', left);
    }
    
}

new StickyNavigation();

//モーダル
$(function () {
  let scrollPosition="";
  $('.openModal1').click(function() {  //openModalをクリックした時に
    var btnIndex = $(this).index(); 
    //何番目のモーダルボタンかを取得
    $('.modalArea1').eq(btnIndex).fadeIn('is-open'); 
    //クリックしたモーダルボタンと同じ番目のモーダルを表示する。addClassでis-openクラスを追加して表示する
    scrollPosition = $(window).scrollTop();
		$('body').addClass('fixed').css({'top': -scrollPosition}); 
    // .fixed+cssの追加で背景のスクロール禁止に
  });
  
  //上記のクラスを2に変更
  $('.openModal2').click(function() { 
    var btnIndex = $(this).index(); 
    $('.modalArea2').eq(btnIndex).fadeIn('is-open'); 
		scrollPosition = $(window).scrollTop();
		$('body').addClass('fixed').css({'top': -scrollPosition}); 
  });
  
  $('.closeModal, .modalBg').click(function() { //closeModalかmodalBgをクリックした時に
    $('.modalArea1, .modalArea2').fadeOut('is-open'); 
    //モーダルを非表示にする。removeClassでis-openクラスを削除して非表示にする
		$('body').removeClass('fixed').css({'top': 0});
		window.scrollTo( 0 , scrollPosition ); 
    //追加した.fixedを削除 
  });
});

// TOPへ戻るボタン
$(document).ready(function () {
    $("#goto_top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 600) {
                $('#goto_top').fadeIn();
            } else {
                $('#goto_top').fadeOut();
            }
        });

        $('#goto_top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});