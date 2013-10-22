# Animate

* [Website](http://lab.joshuapekera.com/animate)
* [Documentation](https://www.pyrocms.com/documentation)
* [License](http://pyrocms.com/legal/license)
* Version: 1.0

## Developers

* Original CSS version by [@daneden](http://twitter.com/_dte)
* LESS port by [@joshuapekera](http://twitter.com/joshuapekera)

#Animate.less
*CSS animation*

`animate.less` is a bunch of cool, fun, and cross-browser animations for you to use in your projects. Great for emphasis, home pages, sliders, and general just-add-water-awesomeness.

Animate.less is a faithful port of the amazing [animate.css](https://github.com/daneden/animate.css) by @daneden. If LESS isn't your css preprocessor of choice, be sure to check the original library out.

##Usage
To use animate.less in your website, simply drop the stylesheet into your document's `<head>`, and add the class `animated` to an element, along with any of the animation names.

You can do a whole bunch of other stuff with animate.less when you combine it with jQuery or add your own CSS rules. Dynamically add animations using jQuery with ease:

```javascript
$('#yourElement').addClass('animated bounceOutLeft');
```

You can change the duration of your animations, add a delay or change the number of times that it plays!

```css
#yourElement {
	-vendor-animation-duration: 3s;
	-vendor-animation-delay: 2s;
	-vendor-animation-iteration-count: infinite;
}
```

*Note: be sure to replace "vendor" in the CSS with the applicable vendor prefixes (webkit, moz, ms, o)*

*Note: Safari in Mountion Lion (OS 10.8) has a display glitch with the Flippers. They may not appear at all until the animation is completed, or the page may have other artifacting. One fix is to add overflow: hidden to the parent div.*

*Note: Add `overflow-x:hidden` to parent elements if they have a `width:100%` and you are using bounceInLeft or bounceInRight on one or more child elements. This will avoid an appearing and dissappearing horizontal scroll bar in the footer.

##License
Animate.less is licensed under the &#9786; license. (http://licence.visualidiot.com/)

##Learn more
You can learn more about animate.less over at http://lab.joshuapekera.com/animate

##Cheat Sheet

####Attention seekers:
flash
bounce
shake
tada
swing
wobble
wiggle
pulse

####Flippers (currently Webkit, Firefox, &amp; IE10 only):
flip
flipInX
flipOutX
flipInY
flipOutY

####Fading entrances:
fadeIn
fadeInUp
fadeInDown
fadeInLeft
fadeInRight
fadeInUpBig
fadeInDownBig
fadeInLeftBig
fadeInRightBig

####Fading exits:
fadeOut
fadeOutUp
fadeOutDown
fadeOutLeft
fadeOutRight
fadeOutUpBig
fadeOutDownBig
fadeOutLeftBig
fadeOutRightBig

####Bouncing entrances:
bounceIn
bounceInDown
bounceInUp
bounceInLeft
bounceInRight

####Bouncing exits:
bounceOut
bounceOutDown
bounceOutUp
bounceOutLeft
bounceOutRight

####Rotating entrances:
rotateIn
rotateInDownLeft
rotateInDownRight
rotateInUpLeft
rotateInUpRight

####Rotating exits:
rotateOut
rotateOutDownLeft
rotateOutDownRight
rotateOutUpLeft
rotateOutUpRight

####Lightspeed:
lightSpeedIn
lightSpeedOut

####Specials:
hinge
rollIn
rollOut
