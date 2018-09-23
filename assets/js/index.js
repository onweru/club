// AOS.init({
//   duration: 1200
// });
// Grayscale jQuery to collapse the navbar on scroll
$(window).scroll(function() {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});


jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
  //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
  offset_opacity = 1200,
  //duration of the top scrolling animation (in ms)
  scroll_top_duration = 700,
  //grab the "back to top" link
  $back_to_top = $('.cd-top');
  
	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
  
	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
    }, scroll_top_duration
		);
	});
  
});

/*
* jQuery picPlay plugin
* @name jquery-picEyes-1.0.js
* @author xiaoyan - frbao
* @version 1.0
* @date Jan 14, 2016
* @category jQuery plugin
* @github https://github.com/xiaoyan0552/jquery.picEyes
*/
(function($){
	$.fn.picEyes = function(){
		var $obj = this;
		var num,zg = $obj.length - 1;
		var win_w = $(window).width();
		var win_h = $(window).height();
		var eyeHtml = '<div class="picshade"></div>'
    +'<a class="pictures_eyes_close" href="javascript:;"></a>'
    +'<div class="pictures_eyes">'
    +'<div class="pictures_eyes_in">'
    +'<img src="" />'
    +'<div class="next"></div>'
    +'<div class="prev"></div>'
    +'</div>'
    +'</div>'
    +'<div class="pictures_eyes_indicators"></div>';
		$('body').append(eyeHtml);
		$obj.click(function() {
			$(".picshade").css("height", win_h);
			var n = $(this).find("img").attr('src');
			$(".pictures_eyes img").attr("src", n);
			num = $obj.index(this);
			popwin($('.pictures_eyes'));
		});
		$(".pictures_eyes_close,.picshade,.pictures_eyes").click(function() {
			$(".picshade,.pictures_eyes,.pictures_eyes_close,.pictures_eyes_indicators").fadeOut();
			$('body').css({'overflow':'auto'});
		});
		$('.pictures_eyes img').click(function(e){
			stopPropagation(e);
		});
		$(".next").click(function(e){
			if(num < zg){
				num++;
			}else{
				num = 0;
			}
			var xx = $obj.eq(num).find('img').attr("src");
			$(".pictures_eyes img").attr("src", xx);
			stopPropagation(e);
			popwin($('.pictures_eyes'));
		});
		$(".prev").click(function(e){
			if(num > 0){
				num--;
			}else{
				num = zg;
			}
			var xx = $obj.eq(num).find('img').attr("src");
			$(".pictures_eyes img").attr("src", xx);
			stopPropagation(e);
			popwin($('.pictures_eyes'));
		});
		function popwin(obj){
			$('body').css({'overflow':'hidden'});
			var Pwidth = obj.width();
			var Pheight = obj.height();
			obj.css({left:(win_w - Pwidth)/2,top:(win_h - Pheight)/2}).show();
			$('.picshade,.pictures_eyes_close').fadeIn();
			indicatorsList();
		}
		function updatePlace(obj){
			var Pwidth = obj.width();
			var Pheight = obj.height();
			obj.css({left:(win_w - Pwidth)/2,top:(win_h - Pheight)/2});
		}
		function indicatorsList(){
			var indHtml = '';
			$obj.each(function(){
				var img = $(this).find('img').attr('src');
				indHtml +='<a href="javascript:;"><img src="'+img+'"/></a>';
			});
			$('.pictures_eyes_indicators').html(indHtml).fadeIn();
			$('.pictures_eyes_indicators a').eq(num).addClass('current').siblings().removeClass('current');
			$('.pictures_eyes_indicators a').click(function(){
				$(this).addClass('current').siblings().removeClass('current');
				var xx = $(this).find('img').attr("src");
				$(".pictures_eyes img").attr("src", xx);
				updatePlace($('.pictures_eyes'));
			});
		}
		function stopPropagation(e) {
			e = e || window.event;  
			if(e.stopPropagation) {
				e.stopPropagation();  
			} else {  
				e.cancelBubble = true;
			}  
		}
	}
})(jQuery);

!(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(root.jQuery);
  }
})(this, function($) {
  
  'use strict';
  
  /**
  * Name of the plugin
  * @private
  * @const
  * @type {String}
  */
  var PLUGIN_NAME = 'vide';
  
  /**
  * Default settings
  * @private
  * @const
  * @type {Object}
  */
  var DEFAULTS = {
    volume: 1,
    playbackRate: 1,
    muted: true,
    loop: true,
    autoplay: true,
    position: '50% 50%',
    posterType: 'detect',
    resizing: true,
    bgColor: 'transparent',
    className: ''
  };
  
  /**
  * Not implemented error message
  * @private
  * @const
  * @type {String}
  */
  var NOT_IMPLEMENTED_MSG = 'Not implemented';
  
  /**
  * Parse a string with options
  * @private
  * @param {String} str
  * @returns {Object|String}
  */
  function parseOptions(str) {
    var obj = {};
    var delimiterIndex;
    var option;
    var prop;
    var val;
    var arr;
    var len;
    var i;
    
    // Remove spaces around delimiters and split
    arr = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',').split(',');
    
    // Parse a string
    for (i = 0, len = arr.length; i < len; i++) {
      option = arr[i];
      
      // Ignore urls and a string without colon delimiters
      if (
        option.search(/^(http|https|ftp):\/\//) !== -1 ||
        option.search(':') === -1
        ) {
          break;
        }
        
        delimiterIndex = option.indexOf(':');
        prop = option.substring(0, delimiterIndex);
        val = option.substring(delimiterIndex + 1);
        
        // If val is an empty string, make it undefined
        if (!val) {
          val = undefined;
        }
        
        // Convert a string value if it is like a boolean
        if (typeof val === 'string') {
          val = val === 'true' || (val === 'false' ? false : val);
        }
        
        // Convert a string value if it is like a number
        if (typeof val === 'string') {
          val = !isNaN(val) ? +val : val;
        }
        
        obj[prop] = val;
      }
      
      // If nothing is parsed
      if (prop == null && val == null) {
        return str;
      }
      
      return obj;
    }
    
    /**
    * Parse a position option
    * @private
    * @param {String} str
    * @returns {Object}
    */
    function parsePosition(str) {
      str = '' + str;
      
      // Default value is a center
      var args = str.split(/\s+/);
      var x = '50%';
      var y = '50%';
      var len;
      var arg;
      var i;
      
      for (i = 0, len = args.length; i < len; i++) {
        arg = args[i];
        
        // Convert values
        if (arg === 'left') {
          x = '0%';
        } else if (arg === 'right') {
          x = '100%';
        } else if (arg === 'top') {
          y = '0%';
        } else if (arg === 'bottom') {
          y = '100%';
        } else if (arg === 'center') {
          if (i === 0) {
            x = '50%';
          } else {
            y = '50%';
          }
        } else {
          if (i === 0) {
            x = arg;
          } else {
            y = arg;
          }
        }
      }
      
      return { x: x, y: y };
    }
    
    /**
    * Search a poster
    * @private
    * @param {String} path
    * @param {Function} callback
    */
    function findPoster(path, callback) {
      var onLoad = function() {
        callback(this.src);
      };
      
      // $('<img src="' + path + '.gif">').on('load', onLoad);
      $('<img src="' + path + '.jpg">').on('load', onLoad);
    }
    
    /**
    * Vide constructor
    * @param {HTMLElement} element
    * @param {Object|String} path
    * @param {Object|String} options
    * @constructor
    */
    function Vide(element, path, options) {
      this.$element = $(element);
      
      // Parse path
      if (typeof path === 'string') {
        path = parseOptions(path);
      }
      
      // Parse options
      if (!options) {
        options = {};
      } else if (typeof options === 'string') {
        options = parseOptions(options);
      }
      
      // Remove an extension
      if (typeof path === 'string') {
        path = path.replace(/\.\w*$/, '');
      } else if (typeof path === 'object') {
        for (var i in path) {
          if (path.hasOwnProperty(i)) {
            path[i] = path[i].replace(/\.\w*$/, '');
          }
        }
      }
      
      this.settings = $.extend({}, DEFAULTS, options);
      this.path = path;
      
      // https://github.com/VodkaBears/Vide/issues/110
      try {
        this.init();
      } catch (e) {
        if (e.message !== NOT_IMPLEMENTED_MSG) {
          throw e;
        }
      }
    }
    
    /**
    * Initialization
    * @public
    */
    Vide.prototype.init = function() {
      var vide = this;
      var path = vide.path;
      var poster = path;
      var sources = '';
      var $element = vide.$element;
      var settings = vide.settings;
      var position = parsePosition(settings.position);
      var posterType = settings.posterType;
      var $video;
      var $wrapper;
      
      // Set styles of a video wrapper
      $wrapper = vide.$wrapper = $('<div>')
      .addClass(settings.className)
      .css({
        position: 'absolute',
        'z-index': -1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        'background-size': 'cover',
        'background-color': settings.bgColor,
        'background-repeat': 'no-repeat',
        'background-position': position.x + ' ' + position.y
      });
      
      // Get a poster path
      if (typeof path === 'object') {
        if (path.poster) {
          poster = path.poster;
        } else {
          if (path.mp4) {
            poster = path.mp4;
          } else if (path.webm) {
            poster = path.webm;
          } else if (path.ogv) {
            poster = path.ogv;
          }
        }
      }
      
      // Set a video poster
      if (posterType === 'detect') {
        findPoster(poster, function(url) {
          $wrapper.css('background-image', 'url(' + url + ')');
        });
      } else if (posterType !== 'none') {
        $wrapper.css('background-image', 'url(' + poster + '.' + posterType + ')');
      }
      
      // If a parent element has a static position, make it relative
      if ($element.css('position') === 'static') {
        $element.css('position', 'relative');
      }
      
      $element.prepend($wrapper);
      
      if (typeof path === 'object') {
        if (path.mp4) {
          sources += '<source src="' + path.mp4 + '.mp4" type="video/mp4">';
        }
        
        if (path.webm) {
          sources += '<source src="' + path.webm + '.webm" type="video/webm">';
        }
        
        if (path.ogv) {
          sources += '<source src="' + path.ogv + '.ogv" type="video/ogg">';
        }
        
        $video = vide.$video = $('<video>' + sources + '</video>');
      } else {
        $video = vide.$video = $('<video>' +
        '<source src="' + path + '.mp4" type="video/mp4">' +
        '<source src="' + path + '.webm" type="video/webm">' +
        '<source src="' + path + '.ogv" type="video/ogg">' +
        '</video>');
      }
      
      // https://github.com/VodkaBears/Vide/issues/110
      try {
        $video
        
        // Set video properties
        .prop({
          autoplay: settings.autoplay,
          loop: settings.loop,
          volume: settings.volume,
          muted: settings.muted,
          defaultMuted: settings.muted,
          playbackRate: settings.playbackRate,
          defaultPlaybackRate: settings.playbackRate
        });
      } catch (e) {
        throw new Error(NOT_IMPLEMENTED_MSG);
      }
      
      // Video alignment
      $video.css({
        margin: 'auto',
        position: 'absolute',
        'z-index': -1,
        top: position.y,
        left: position.x,
        '-webkit-transform': 'translate(-' + position.x + ', -' + position.y + ')',
        '-ms-transform': 'translate(-' + position.x + ', -' + position.y + ')',
        '-moz-transform': 'translate(-' + position.x + ', -' + position.y + ')',
        transform: 'translate(-' + position.x + ', -' + position.y + ')',
        
        // Disable visibility, while loading
        visibility: 'hidden',
        opacity: 0
      })
      
      // Resize a video, when it's loaded
      .one('canplaythrough.' + PLUGIN_NAME, function() {
        vide.resize();
      })
      
      // Make it visible, when it's already playing
      .one('playing.' + PLUGIN_NAME, function() {
        $video.css({
          visibility: 'visible',
          opacity: 1
        });
        $wrapper.css('background-image', 'none');
      });
      
      // Resize event is available only for 'window'
      // Use another code solutions to detect DOM elements resizing
      $element.on('resize.' + PLUGIN_NAME, function() {
        if (settings.resizing) {
          vide.resize();
        }
      });
      
      // Append a video
      $wrapper.append($video);
    };
    
    /**
    * Get a video element
    * @public
    * @returns {HTMLVideoElement}
    */
    Vide.prototype.getVideoObject = function() {
      return this.$video[0];
    };
    
    /**
    * Resize a video background
    * @public
    */
    Vide.prototype.resize = function() {
      if (!this.$video) {
        return;
      }
      
      var $wrapper = this.$wrapper;
      var $video = this.$video;
      var video = $video[0];
      
      // Get a native video size
      var videoHeight = video.videoHeight;
      var videoWidth = video.videoWidth;
      
      // Get a wrapper size
      var wrapperHeight = $wrapper.height();
      var wrapperWidth = $wrapper.width();
      
      if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
        $video.css({
          
          // +2 pixels to prevent an empty space after transformation
          width: wrapperWidth + 2,
          height: 'auto'
        });
      } else {
        $video.css({
          width: 'auto',
          
          // +2 pixels to prevent an empty space after transformation
          height: wrapperHeight + 2
        });
      }
    };
    
    /**
    * Destroy a video background
    * @public
    */
    Vide.prototype.destroy = function() {
      delete $[PLUGIN_NAME].lookup[this.index];
      this.$video && this.$video.off(PLUGIN_NAME);
      this.$element.off(PLUGIN_NAME).removeData(PLUGIN_NAME);
      this.$wrapper.remove();
    };
    
    /**
    * Special plugin object for instances.
    * @public
    * @type {Object}
    */
    $[PLUGIN_NAME] = {
      lookup: []
    };
    
    /**
    * Plugin constructor
    * @param {Object|String} path
    * @param {Object|String} options
    * @returns {JQuery}
    * @constructor
    */
    $.fn[PLUGIN_NAME] = function(path, options) {
      var instance;
      
      this.each(function() {
        instance = $.data(this, PLUGIN_NAME);
        
        // Destroy the plugin instance if exists
        instance && instance.destroy();
        
        // Create the plugin instance
        instance = new Vide(this, path, options);
        instance.index = $[PLUGIN_NAME].lookup.push(instance) - 1;
        $.data(this, PLUGIN_NAME, instance);
      });
      
      return this;
    };
    
    $(document).ready(function() {
      var $window = $(window);
      
      // Window resize event listener
      $window.on('resize.' + PLUGIN_NAME, function() {
        for (var len = $[PLUGIN_NAME].lookup.length, i = 0, instance; i < len; i++) {
          instance = $[PLUGIN_NAME].lookup[i];
          
          if (instance && instance.settings.resizing) {
            instance.resize();
          }
        }
      });
      
      // https://github.com/VodkaBears/Vide/issues/68
      $window.on('unload.' + PLUGIN_NAME, function() {
        return false;
      });
      
      // Auto initialization
      // Add 'data-vide-bg' attribute with a path to the video without extension
      // Also you can pass options throw the 'data-vide-options' attribute
      // 'data-vide-options' must be like 'muted: false, volume: 0.5'
      $(document).find('[data-' + PLUGIN_NAME + '-bg]').each(function(i, element) {
        var $element = $(element);
        var options = $element.data(PLUGIN_NAME + '-options');
        var path = $element.data(PLUGIN_NAME + '-bg');
        
        $element[PLUGIN_NAME](path, options);
      });
    });
    
  });
  
  // $(".lightninBox").lightninBox();
	$(function(){
    //picturesEyes($('li'));
    $('ul.demo li').picEyes();
	});