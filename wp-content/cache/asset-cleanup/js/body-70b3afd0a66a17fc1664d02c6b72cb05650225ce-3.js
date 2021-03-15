/*!/wp-includes/js/jquery/ui/position.min.js*/
/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(I){return function(){I.ui=I.ui||{};var n,H,x=Math.max,T=Math.abs,L=Math.round,o=/left|center|right/,l=/top|center|bottom/,f=/[\+\-]\d+(\.[\d]+)?%?/,s=/^\w+/,h=/%$/,i=I.fn.position;function P(t,i,e){return[parseFloat(t[0])*(h.test(t[0])?i/100:1),parseFloat(t[1])*(h.test(t[1])?e/100:1)]}function D(t,i){return parseInt(I.css(t,i),10)||0}I.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,e=I("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=e.children()[0];return I("body").append(e),t=o.offsetWidth,e.css("overflow","scroll"),t===(i=o.offsetWidth)&&(i=e[0].clientWidth),e.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),e=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),o="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth;return{width:"scroll"===e||"auto"===e&&t.height<t.element[0].scrollHeight?I.position.scrollbarWidth():0,height:o?I.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=I(t||window),e=I.isWindow(i[0]),o=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:e,isDocument:o,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:e||o?i.width():i.outerWidth(),height:e||o?i.height():i.outerHeight()}}},I.fn.position=function(c){if(!c||!c.of)return i.apply(this,arguments);c=I.extend({},c);var d,a,g,u,m,t,w=I(c.of),W=I.position.getWithinInfo(c.within),v=I.position.getScrollInfo(W),y=(c.collision||"flip").split(" "),b={};return t=function(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:I.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}(w),w[0].preventDefault&&(c.at="left top"),a=t.width,g=t.height,u=t.offset,m=I.extend({},u),I.each(["my","at"],function(){var t,i,e=(c[this]||"").split(" ");1===e.length&&(e=o.test(e[0])?e.concat(["center"]):l.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=l.test(e[1])?e[1]:"center",t=f.exec(e[0]),i=f.exec(e[1]),b[this]=[t?t[0]:0,i?i[0]:0],c[this]=[s.exec(e[0])[0],s.exec(e[1])[0]]}),1===y.length&&(y[1]=y[0]),"right"===c.at[0]?m.left+=a:"center"===c.at[0]&&(m.left+=a/2),"bottom"===c.at[1]?m.top+=g:"center"===c.at[1]&&(m.top+=g/2),d=P(b.at,a,g),m.left+=d[0],m.top+=d[1],this.each(function(){var e,t,f=I(this),s=f.outerWidth(),h=f.outerHeight(),i=D(this,"marginLeft"),o=D(this,"marginTop"),n=s+i+D(this,"marginRight")+v.width,l=h+o+D(this,"marginBottom")+v.height,r=I.extend({},m),p=P(b.my,f.outerWidth(),f.outerHeight());"right"===c.my[0]?r.left-=s:"center"===c.my[0]&&(r.left-=s/2),"bottom"===c.my[1]?r.top-=h:"center"===c.my[1]&&(r.top-=h/2),r.left+=p[0],r.top+=p[1],H||(r.left=L(r.left),r.top=L(r.top)),e={marginLeft:i,marginTop:o},I.each(["left","top"],function(t,i){I.ui.position[y[t]]&&I.ui.position[y[t]][i](r,{targetWidth:a,targetHeight:g,elemWidth:s,elemHeight:h,collisionPosition:e,collisionWidth:n,collisionHeight:l,offset:[d[0]+p[0],d[1]+p[1]],my:c.my,at:c.at,within:W,elem:f})}),c.using&&(t=function(t){var i=u.left-r.left,e=i+a-s,o=u.top-r.top,n=o+g-h,l={target:{element:w,left:u.left,top:u.top,width:a,height:g},element:{element:f,left:r.left,top:r.top,width:s,height:h},horizontal:e<0?"left":0<i?"right":"center",vertical:n<0?"top":0<o?"bottom":"middle"};a<s&&T(i+e)<a&&(l.horizontal="center"),g<h&&T(o+n)<g&&(l.vertical="middle"),x(T(i),T(e))>x(T(o),T(n))?l.important="horizontal":l.important="vertical",c.using.call(this,t,l)}),f.offset(I.extend(r,{using:t}))})},I.ui.position={fit:{left:function(t,i){var e,o=i.within,n=o.isWindow?o.scrollLeft:o.offset.left,l=o.width,f=t.left-i.collisionPosition.marginLeft,s=n-f,h=f+i.collisionWidth-l-n;i.collisionWidth>l?0<s&&h<=0?(e=t.left+s+i.collisionWidth-l-n,t.left+=s-e):t.left=0<h&&s<=0?n:h<s?n+l-i.collisionWidth:n:0<s?t.left+=s:0<h?t.left-=h:t.left=x(t.left-f,t.left)},top:function(t,i){var e,o=i.within,n=o.isWindow?o.scrollTop:o.offset.top,l=i.within.height,f=t.top-i.collisionPosition.marginTop,s=n-f,h=f+i.collisionHeight-l-n;i.collisionHeight>l?0<s&&h<=0?(e=t.top+s+i.collisionHeight-l-n,t.top+=s-e):t.top=0<h&&s<=0?n:h<s?n+l-i.collisionHeight:n:0<s?t.top+=s:0<h?t.top-=h:t.top=x(t.top-f,t.top)}},flip:{left:function(t,i){var e,o,n=i.within,l=n.offset.left+n.scrollLeft,f=n.width,s=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-i.collisionPosition.marginLeft,r=h-s,p=h+i.collisionWidth-f-s,c="left"===i.my[0]?-i.elemWidth:"right"===i.my[0]?i.elemWidth:0,d="left"===i.at[0]?i.targetWidth:"right"===i.at[0]?-i.targetWidth:0,a=-2*i.offset[0];r<0?((e=t.left+c+d+a+i.collisionWidth-f-l)<0||e<T(r))&&(t.left+=c+d+a):0<p&&(0<(o=t.left-i.collisionPosition.marginLeft+c+d+a-s)||T(o)<p)&&(t.left+=c+d+a)},top:function(t,i){var e,o,n=i.within,l=n.offset.top+n.scrollTop,f=n.height,s=n.isWindow?n.scrollTop:n.offset.top,h=t.top-i.collisionPosition.marginTop,r=h-s,p=h+i.collisionHeight-f-s,c="top"===i.my[1]?-i.elemHeight:"bottom"===i.my[1]?i.elemHeight:0,d="top"===i.at[1]?i.targetHeight:"bottom"===i.at[1]?-i.targetHeight:0,a=-2*i.offset[1];r<0?((o=t.top+c+d+a+i.collisionHeight-f-l)<0||o<T(r))&&(t.top+=c+d+a):0<p&&(0<(e=t.top-i.collisionPosition.marginTop+c+d+a-s)||T(e)<p)&&(t.top+=c+d+a)}},flipfit:{left:function(){I.ui.position.flip.left.apply(this,arguments),I.ui.position.fit.left.apply(this,arguments)},top:function(){I.ui.position.flip.top.apply(this,arguments),I.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,e,o,n,l=document.getElementsByTagName("body")[0],f=document.createElement("div");for(n in t=document.createElement(l?"div":"body"),e={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},l&&I.extend(e,{position:"absolute",left:"-1000px",top:"-1000px"}),e)t.style[n]=e[n];t.appendChild(f),(i=l||document.documentElement).insertBefore(t,i.firstChild),f.style.cssText="position: absolute; left: 10.7432222px;",o=I(f).offset().left,H=10<o&&o<11,t.innerHTML="",i.removeChild(t)}()}(),I.ui.position});
/*!/wp-content/plugins/elementor/assets/lib/dialog/dialog.min.js*/
/*! dialogs-manager v4.7.6 | (c) Kobi Zaltzberg | https://github.com/kobizz/dialogs-manager/blob/master/LICENSE.txt 
 2020-02-11 15:22 */
!function(a,b){"use strict";var c={widgetsTypes:{},createWidgetType:function(b,d,e){e||(e=this.Widget);var f=function(){e.apply(this,arguments)},g=f.prototype=new e(b);return g.types=g.types.concat([b]),a.extend(g,d),g.constructor=f,f.extend=function(a,b){return c.createWidgetType(a,b,f)},f},addWidgetType:function(a,b,c){return b&&b.prototype instanceof this.Widget?this.widgetsTypes[a]=b:this.widgetsTypes[a]=this.createWidgetType(a,b,c)},getWidgetType:function(a){return this.widgetsTypes[a]}};c.Instance=function(){var b=this,d={},e={},f=function(){d.body=a("body")},g=function(b){var c={classPrefix:"dialog",effects:{show:"fadeIn",hide:"fadeOut"}};a.extend(e,c,b)};this.createWidget=function(a,d){var e=c.getWidgetType(a),f=new e(a);return d=d||{},f.init(b,d),f},this.getSettings=function(a){return a?e[a]:Object.create(e)},this.init=function(a){return g(a),f(),b},b.init()},c.Widget=function(b){var d=this,e={},f={},g={},h=0,i=["refreshPosition"],j=function(){var a=[g.window];g.iframe&&a.push(jQuery(g.iframe[0].contentWindow)),a.forEach(function(a){e.hide.onEscKeyPress&&a.on("keyup",v),e.hide.onOutsideClick&&a[0].addEventListener("click",p,!0),e.hide.onOutsideContextMenu&&a[0].addEventListener("contextmenu",p,!0),e.position.autoRefresh&&a.on("resize",d.refreshPosition)}),(e.hide.onClick||e.hide.onBackgroundClick)&&g.widget.on("click",n)},k=function(b,c){var d=e.effects[b],f=g.widget;if(a.isFunction(d))d.apply(f,c);else{if(!f[d])throw"Reference Error: The effect "+d+" not found";f[d].apply(f,c)}},l=function(){var b=i.concat(d.getClosureMethods());a.each(b,function(){var a=this,b=d[a];d[a]=function(){b.apply(d,arguments)}})},m=function(a){if(a.my){var b=/left|right/,c=/([+-]\d+)?$/,d=g.iframe.offset(),e=g.iframe[0].contentWindow,f=a.my.split(" "),h=[];1===f.length&&(b.test(f[0])?f.push("center"):f.unshift("center")),f.forEach(function(a,b){var f=a.replace(c,function(a){return a=+a||0,a+=b?d.top-e.scrollY:d.left-e.scrollX,a>=0&&(a="+"+a),a});h.push(f)}),a.my=h.join(" ")}},n=function(b){if(!t(b)){if(e.hide.onClick){if(a(b.target).closest(e.selectors.preventClose).length)return}else if(b.target!==this)return;d.hide()}},o=function(b){return!!e.hide.ignore&&!!a(b.target).closest(e.hide.ignore).length},p=function(b){t(b)||a(b.target).closest(g.widget).length||o(b)||d.hide()},q=function(){d.addElement("widget"),d.addElement("header"),d.addElement("message"),d.addElement("window",window),d.addElement("body",document.body),d.addElement("container",e.container),e.iframe&&d.addElement("iframe",e.iframe),e.closeButton&&d.addElement("closeButton",'<div><i class="'+e.closeButtonClass+'"></i></div>');var b=d.getSettings("id");b&&d.setID(b);var c=[];a.each(d.types,function(){c.push(e.classes.globalPrefix+"-type-"+this)}),c.push(d.getSettings("className")),g.widget.addClass(c.join(" "))},r=function(c,f){var g=a.extend(!0,{},c.getSettings());e={headerMessage:"",message:"",effects:g.effects,classes:{globalPrefix:g.classPrefix,prefix:g.classPrefix+"-"+b,preventScroll:g.classPrefix+"-prevent-scroll"},selectors:{preventClose:"."+g.classPrefix+"-prevent-close"},container:"body",preventScroll:!1,iframe:null,closeButton:!1,closeButtonClass:g.classPrefix+"-close-button-icon",position:{element:"widget",my:"center",at:"center",enable:!0,autoRefresh:!1},hide:{auto:!1,autoDelay:5e3,onClick:!1,onOutsideClick:!0,onOutsideContextMenu:!1,onBackgroundClick:!0,onEscKeyPress:!0,ignore:""}},a.extend(!0,e,d.getDefaultSettings(),f),s()},s=function(){a.each(e,function(a){var b=a.match(/^on([A-Z].*)/);b&&(b=b[1].charAt(0).toLowerCase()+b[1].slice(1),d.on(b,this))})},t=function(a){return"click"===a.type&&2===a.button},u=function(a){return a.replace(/([a-z])([A-Z])/g,function(){return arguments[1]+"-"+arguments[2].toLowerCase()})},v=function(a){var b=27,c=a.which;b===c&&d.hide()},w=function(){var a=[g.window];g.iframe&&a.push(jQuery(g.iframe[0].contentWindow)),a.forEach(function(a){e.hide.onEscKeyPress&&a.off("keyup",v),e.hide.onOutsideClick&&a[0].removeEventListener("click",p,!0),e.hide.onOutsideContextMenu&&a[0].removeEventListener("contextmenu",p,!0),e.position.autoRefresh&&a.off("resize",d.refreshPosition)}),(e.hide.onClick||e.hide.onBackgroundClick)&&g.widget.off("click",n)};this.addElement=function(b,c,d){var f=g[b]=a(c||"<div>"),h=u(b);return d=d?d+" ":"",d+=e.classes.globalPrefix+"-"+h,d+=" "+e.classes.prefix+"-"+h,f.addClass(d),f},this.destroy=function(){return w(),g.widget.remove(),d.trigger("destroy"),d},this.getElements=function(a){return a?g[a]:g},this.getSettings=function(a){var b=Object.create(e);return a?b[a]:b},this.hide=function(){if(d.isVisible())return clearTimeout(h),k("hide",arguments),w(),e.preventScroll&&d.getElements("body").removeClass(e.classes.preventScroll),d.trigger("hide"),d},this.init=function(a,b){if(!(a instanceof c.Instance))throw"The "+d.widgetName+" must to be initialized from an instance of DialogsManager.Instance";return l(),d.trigger("init",b),r(a,b),q(),d.buildWidget(),d.attachEvents(),d.trigger("ready"),d},this.isVisible=function(){return g.widget.is(":visible")},this.on=function(b,c){if("object"==typeof b)return a.each(b,function(a){d.on(a,this)}),d;var e=b.split(" ");return e.forEach(function(a){f[a]||(f[a]=[]),f[a].push(c)}),d},this.off=function(a,b){if(!f[a])return d;if(!b)return delete f[a],d;var c=f[a].indexOf(b);return-1!==c&&f[a].splice(c,1),d},this.refreshPosition=function(){if(e.position.enable){var b=a.extend({},e.position);g[b.of]&&(b.of=g[b.of]),b.of||(b.of=window),e.iframe&&m(b),g[b.element].position(b)}},this.setID=function(a){return g.widget.attr("id",a),d},this.setHeaderMessage=function(a){return d.getElements("header").html(a),d},this.setMessage=function(a){return g.message.html(a),d},this.setSettings=function(b,c){return jQuery.isPlainObject(c)?a.extend(!0,e[b],c):e[b]=c,d},this.show=function(){return clearTimeout(h),g.widget.appendTo(g.container).hide(),k("show",arguments),d.refreshPosition(),e.hide.auto&&(h=setTimeout(d.hide,e.hide.autoDelay)),j(),e.preventScroll&&d.getElements("body").addClass(e.classes.preventScroll),d.trigger("show"),d},this.trigger=function(b,c){var e="on"+b[0].toUpperCase()+b.slice(1);d[e]&&d[e](c);var g=f[b];if(g)return a.each(g,function(a,b){b.call(d,c)}),d}},c.Widget.prototype.types=[],c.Widget.prototype.buildWidget=function(){var a=this.getElements(),b=this.getSettings();a.widget.append(a.header,a.message),this.setHeaderMessage(b.headerMessage),this.setMessage(b.message),this.getSettings("closeButton")&&a.widget.prepend(a.closeButton)},c.Widget.prototype.attachEvents=function(){var a=this;a.getSettings("closeButton")&&a.getElements("closeButton").on("click",function(){a.hide()})},c.Widget.prototype.getDefaultSettings=function(){return{}},c.Widget.prototype.getClosureMethods=function(){return[]},c.Widget.prototype.onHide=function(){},c.Widget.prototype.onShow=function(){},c.Widget.prototype.onInit=function(){},c.Widget.prototype.onReady=function(){},c.widgetsTypes.simple=c.Widget,c.addWidgetType("buttons",{activeKeyUp:function(a){var b=9;a.which===b&&a.preventDefault(),this.hotKeys[a.which]&&this.hotKeys[a.which](this)},activeKeyDown:function(a){if(this.focusedButton){var b=9;if(a.which===b){a.preventDefault();var c,d=this.focusedButton.index();a.shiftKey?(c=d-1,c<0&&(c=this.buttons.length-1)):(c=d+1,c>=this.buttons.length&&(c=0)),this.focusedButton=this.buttons[c].focus()}}},addButton:function(b){var c=this,d=c.getSettings(),e=jQuery.extend(d.button,b),f=b.classes?b.classes+" ":"";f+=d.classes.globalPrefix+"-button";var g=c.addElement(b.name,a("<"+e.tag+">").text(b.text),f);c.buttons.push(g);var h=function(){d.hide.onButtonClick&&c.hide(),a.isFunction(b.callback)&&b.callback.call(this,c)};return g.on("click",h),b.hotKey&&(this.hotKeys[b.hotKey]=h),this.getElements("buttonsWrapper").append(g),b.focus&&(this.focusedButton=g),c},bindHotKeys:function(){this.getElements("window").on({keyup:this.activeKeyUp,keydown:this.activeKeyDown})},buildWidget:function(){c.Widget.prototype.buildWidget.apply(this,arguments);var a=this.addElement("buttonsWrapper");this.getElements("widget").append(a)},getClosureMethods:function(){return["activeKeyUp","activeKeyDown"]},getDefaultSettings:function(){return{hide:{onButtonClick:!0},button:{tag:"button"}}},onHide:function(){this.unbindHotKeys()},onInit:function(){this.buttons=[],this.hotKeys={},this.focusedButton=null},onShow:function(){this.bindHotKeys(),this.focusedButton||(this.focusedButton=this.buttons[0]),this.focusedButton&&this.focusedButton.focus()},unbindHotKeys:function(){this.getElements("window").off({keyup:this.activeKeyUp,keydown:this.activeKeyDown})}}),c.addWidgetType("lightbox",c.getWidgetType("buttons").extend("lightbox",{getDefaultSettings:function(){var b=c.getWidgetType("buttons").prototype.getDefaultSettings.apply(this,arguments);return a.extend(!0,b,{contentWidth:"auto",contentHeight:"auto",position:{element:"widgetContent",of:"widget",autoRefresh:!0}})},buildWidget:function(){c.getWidgetType("buttons").prototype.buildWidget.apply(this,arguments);var a=this.addElement("widgetContent"),b=this.getElements();a.append(b.header,b.message,b.buttonsWrapper),b.widget.html(a),b.closeButton&&a.prepend(b.closeButton)},onReady:function(){var a=this.getElements(),b=this.getSettings();"auto"!==b.contentWidth&&a.message.width(b.contentWidth),"auto"!==b.contentHeight&&a.message.height(b.contentHeight)}})),c.addWidgetType("confirm",c.getWidgetType("lightbox").extend("confirm",{onReady:function(){c.getWidgetType("lightbox").prototype.onReady.apply(this,arguments);var a=this.getSettings("strings"),b="cancel"===this.getSettings("defaultOption");this.addButton({name:"cancel",text:a.cancel,callback:function(a){a.trigger("cancel")},focus:b}),this.addButton({name:"ok",text:a.confirm,callback:function(a){a.trigger("confirm")},focus:!b})},getDefaultSettings:function(){var a=c.getWidgetType("lightbox").prototype.getDefaultSettings.apply(this,arguments);return a.strings={confirm:"OK",cancel:"Cancel"},a.defaultOption="cancel",a}})),c.addWidgetType("alert",c.getWidgetType("lightbox").extend("alert",{onReady:function(){c.getWidgetType("lightbox").prototype.onReady.apply(this,arguments);var a=this.getSettings("strings");this.addButton({name:"ok",text:a.confirm,callback:function(a){a.trigger("confirm")}})},getDefaultSettings:function(){var a=c.getWidgetType("lightbox").prototype.getDefaultSettings.apply(this,arguments);return a.strings={confirm:"OK"},a}})),b.DialogsManager=c}("undefined"!=typeof jQuery?jQuery:"function"==typeof require&&require("jquery"),"undefined"!=typeof module?module.exports:window);
/*!/wp-content/plugins/elementor/assets/lib/waypoints/waypoints.min.js*/
!function(){"use strict";function Waypoint(options){if(!options)throw new Error("No options passed to Waypoint constructor");if(!options.element)throw new Error("No element option passed to Waypoint constructor");if(!options.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+keyCounter,this.options=Waypoint.Adapter.extend({},Waypoint.defaults,options),this.element=this.options.element,this.adapter=new Waypoint.Adapter(this.element),this.callback=options.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=Waypoint.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=Waypoint.Context.findOrCreateByElement(this.options.context),Waypoint.offsetAliases[this.options.offset]&&(this.options.offset=Waypoint.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),allWaypoints[this.key]=this,keyCounter+=1}var keyCounter=0,allWaypoints={};Waypoint.prototype.queueTrigger=function(direction){this.group.queueTrigger(this,direction)},Waypoint.prototype.trigger=function(args){this.enabled&&this.callback&&this.callback.apply(this,args)},Waypoint.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete allWaypoints[this.key]},Waypoint.prototype.disable=function(){return this.enabled=!1,this},Waypoint.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},Waypoint.prototype.next=function(){return this.group.next(this)},Waypoint.prototype.previous=function(){return this.group.previous(this)},Waypoint.invokeAll=function(method){var allWaypointsArray=[];for(var waypointKey in allWaypoints)allWaypointsArray.push(allWaypoints[waypointKey]);for(var i=0,end=allWaypointsArray.length;i<end;i++)allWaypointsArray[i][method]()},Waypoint.destroyAll=function(){Waypoint.invokeAll("destroy")},Waypoint.disableAll=function(){Waypoint.invokeAll("disable")},Waypoint.enableAll=function(){Waypoint.Context.refreshAll();for(var waypointKey in allWaypoints)allWaypoints[waypointKey].enabled=!0;return this},Waypoint.refreshAll=function(){Waypoint.Context.refreshAll()},Waypoint.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},Waypoint.viewportWidth=function(){return document.documentElement.clientWidth},Waypoint.adapters=[],Waypoint.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},Waypoint.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=Waypoint}(),function(){"use strict";function requestAnimationFrameShim(callback){window.setTimeout(callback,1e3/60)}function Context(element){this.element=element,this.Adapter=Waypoint.Adapter,this.adapter=new this.Adapter(element),this.key="waypoint-context-"+keyCounter,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},element.waypointContextKey=this.key,contexts[element.waypointContextKey]=this,keyCounter+=1,Waypoint.windowContext||(Waypoint.windowContext=!0,Waypoint.windowContext=new Context(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var keyCounter=0,contexts={},Waypoint=window.Waypoint,oldWindowLoad=window.onload;Context.prototype.add=function(waypoint){var axis=waypoint.options.horizontal?"horizontal":"vertical";this.waypoints[axis][waypoint.key]=waypoint,this.refresh()},Context.prototype.checkEmpty=function(){var horizontalEmpty=this.Adapter.isEmptyObject(this.waypoints.horizontal),verticalEmpty=this.Adapter.isEmptyObject(this.waypoints.vertical),isWindow=this.element==this.element.window;horizontalEmpty&&verticalEmpty&&!isWindow&&(this.adapter.off(".waypoints"),delete contexts[this.key])},Context.prototype.createThrottledResizeHandler=function(){function resizeHandler(){self.handleResize(),self.didResize=!1}var self=this;this.adapter.on("resize.waypoints",function(){self.didResize||(self.didResize=!0,Waypoint.requestAnimationFrame(resizeHandler))})},Context.prototype.createThrottledScrollHandler=function(){function scrollHandler(){self.handleScroll(),self.didScroll=!1}var self=this;this.adapter.on("scroll.waypoints",function(){self.didScroll&&!Waypoint.isTouch||(self.didScroll=!0,Waypoint.requestAnimationFrame(scrollHandler))})},Context.prototype.handleResize=function(){Waypoint.Context.refreshAll()},Context.prototype.handleScroll=function(){var triggeredGroups={},axes={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var axisKey in axes){var axis=axes[axisKey],isForward=axis.newScroll>axis.oldScroll,direction=isForward?axis.forward:axis.backward;for(var waypointKey in this.waypoints[axisKey]){var waypoint=this.waypoints[axisKey][waypointKey];if(null!==waypoint.triggerPoint){var wasBeforeTriggerPoint=axis.oldScroll<waypoint.triggerPoint,nowAfterTriggerPoint=axis.newScroll>=waypoint.triggerPoint,crossedForward=wasBeforeTriggerPoint&&nowAfterTriggerPoint,crossedBackward=!wasBeforeTriggerPoint&&!nowAfterTriggerPoint;(crossedForward||crossedBackward)&&(waypoint.queueTrigger(direction),triggeredGroups[waypoint.group.id]=waypoint.group)}}}for(var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers();this.oldScroll={x:axes.horizontal.newScroll,y:axes.vertical.newScroll}},Context.prototype.innerHeight=function(){return this.element==this.element.window?Waypoint.viewportHeight():this.adapter.innerHeight()},Context.prototype.remove=function(waypoint){delete this.waypoints[waypoint.axis][waypoint.key],this.checkEmpty()},Context.prototype.innerWidth=function(){return this.element==this.element.window?Waypoint.viewportWidth():this.adapter.innerWidth()},Context.prototype.destroy=function(){var allWaypoints=[];for(var axis in this.waypoints)for(var waypointKey in this.waypoints[axis])allWaypoints.push(this.waypoints[axis][waypointKey]);for(var i=0,end=allWaypoints.length;i<end;i++)allWaypoints[i].destroy()},Context.prototype.refresh=function(){var axes,isWindow=this.element==this.element.window,contextOffset=isWindow?void 0:this.adapter.offset(),triggeredGroups={};this.handleScroll(),axes={horizontal:{contextOffset:isWindow?0:contextOffset.left,contextScroll:isWindow?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:isWindow?0:contextOffset.top,contextScroll:isWindow?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var axisKey in axes){var axis=axes[axisKey];for(var waypointKey in this.waypoints[axisKey]){var contextModifier,wasBeforeScroll,nowAfterScroll,triggeredBackward,triggeredForward,waypoint=this.waypoints[axisKey][waypointKey],adjustment=waypoint.options.offset,oldTriggerPoint=waypoint.triggerPoint,elementOffset=0,freshWaypoint=null==oldTriggerPoint;waypoint.element!==waypoint.element.window&&(elementOffset=waypoint.adapter.offset()[axis.offsetProp]),"function"==typeof adjustment?adjustment=adjustment.apply(waypoint):"string"==typeof adjustment&&(adjustment=parseFloat(adjustment),waypoint.options.offset.indexOf("%")>-1&&(adjustment=Math.ceil(axis.contextDimension*adjustment/100))),contextModifier=axis.contextScroll-axis.contextOffset,waypoint.triggerPoint=Math.floor(elementOffset+contextModifier-adjustment),wasBeforeScroll=oldTriggerPoint<axis.oldScroll,nowAfterScroll=waypoint.triggerPoint>=axis.oldScroll,triggeredBackward=wasBeforeScroll&&nowAfterScroll,triggeredForward=!wasBeforeScroll&&!nowAfterScroll,!freshWaypoint&&triggeredBackward?(waypoint.queueTrigger(axis.backward),triggeredGroups[waypoint.group.id]=waypoint.group):!freshWaypoint&&triggeredForward?(waypoint.queueTrigger(axis.forward),triggeredGroups[waypoint.group.id]=waypoint.group):freshWaypoint&&axis.oldScroll>=waypoint.triggerPoint&&(waypoint.queueTrigger(axis.forward),triggeredGroups[waypoint.group.id]=waypoint.group)}}return Waypoint.requestAnimationFrame(function(){for(var groupKey in triggeredGroups)triggeredGroups[groupKey].flushTriggers()}),this},Context.findOrCreateByElement=function(element){return Context.findByElement(element)||new Context(element)},Context.refreshAll=function(){for(var contextId in contexts)contexts[contextId].refresh()},Context.findByElement=function(element){return contexts[element.waypointContextKey]},window.onload=function(){oldWindowLoad&&oldWindowLoad(),Context.refreshAll()},Waypoint.requestAnimationFrame=function(callback){var requestFn=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||requestAnimationFrameShim;requestFn.call(window,callback)},Waypoint.Context=Context}(),function(){"use strict";function byTriggerPoint(a,b){return a.triggerPoint-b.triggerPoint}function byReverseTriggerPoint(a,b){return b.triggerPoint-a.triggerPoint}function Group(options){this.name=options.name,this.axis=options.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),groups[this.axis][this.name]=this}var groups={vertical:{},horizontal:{}},Waypoint=window.Waypoint;Group.prototype.add=function(waypoint){this.waypoints.push(waypoint)},Group.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},Group.prototype.flushTriggers=function(){for(var direction in this.triggerQueues){var waypoints=this.triggerQueues[direction],reverse="up"===direction||"left"===direction;waypoints.sort(reverse?byReverseTriggerPoint:byTriggerPoint);for(var i=0,end=waypoints.length;i<end;i+=1){var waypoint=waypoints[i];(waypoint.options.continuous||i===waypoints.length-1)&&waypoint.trigger([direction])}}this.clearTriggerQueues()},Group.prototype.next=function(waypoint){this.waypoints.sort(byTriggerPoint);var index=Waypoint.Adapter.inArray(waypoint,this.waypoints),isLast=index===this.waypoints.length-1;return isLast?null:this.waypoints[index+1]},Group.prototype.previous=function(waypoint){this.waypoints.sort(byTriggerPoint);var index=Waypoint.Adapter.inArray(waypoint,this.waypoints);return index?this.waypoints[index-1]:null},Group.prototype.queueTrigger=function(waypoint,direction){this.triggerQueues[direction].push(waypoint)},Group.prototype.remove=function(waypoint){var index=Waypoint.Adapter.inArray(waypoint,this.waypoints);index>-1&&this.waypoints.splice(index,1)},Group.prototype.first=function(){return this.waypoints[0]},Group.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},Group.findOrCreate=function(options){return groups[options.axis][options.name]||new Group(options)},Waypoint.Group=Group}(),function(){"use strict";function JQueryAdapter(element){this.$element=$(element)}var $=window.jQuery,Waypoint=window.Waypoint;$.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(i,method){JQueryAdapter.prototype[method]=function(){var args=Array.prototype.slice.call(arguments);return this.$element[method].apply(this.$element,args)}}),$.each(["extend","inArray","isEmptyObject"],function(i,method){JQueryAdapter[method]=$[method]}),Waypoint.adapters.push({name:"jquery",Adapter:JQueryAdapter}),Waypoint.Adapter=JQueryAdapter}(),function(){"use strict";function createExtension(framework){return function(){var waypoints=[],overrides=arguments[0];return framework.isFunction(arguments[0])&&(overrides=framework.extend({},arguments[1]),overrides.handler=arguments[0]),this.each(function(){var options=framework.extend({},overrides,{element:this});"string"==typeof options.context&&(options.context=framework(this).closest(options.context)[0]),waypoints.push(new Waypoint(options))}),waypoints}}var Waypoint=window.Waypoint;window.jQuery&&(window.jQuery.fn.elementorWaypoint=createExtension(window.jQuery)),window.Zepto&&(window.Zepto.fn.elementorWaypoint=createExtension(window.Zepto))}();
/*!/wp-content/cache/asset-cleanup/js/item/share-link-vb0db9e777a2d744e443e5fdb2183f971641775e2.js*/
/*!/wp-content/plugins/elementor/assets/lib/share-link/share-link.min.js*/
(function(a){window.ShareLink=function(b,c){var d,e={},f=function(a){var b=a.substr(0,e.classPrefixLength);return b===e.classPrefix?a.substr(e.classPrefixLength):null},g=function(a){d.on("click",function(){h(a)})},h=function(a){var b="";if(e.width&&e.height){var c=screen.width/2-e.width/2,d=screen.height/2-e.height/2;b="toolbar=0,status=0,width="+e.width+",height="+e.height+",top="+d+",left="+c}var f=ShareLink.getNetworkLink(a,e),g=/^https?:\/\//.test(f),h=g?"":"_self";open(f,h,b)},i=function(){a.each(b.classList,function(){var a=f(this);if(a)return g(a),!1})},j=function(){a.extend(e,ShareLink.defaultSettings,c),["title","text"].forEach(function(a){e[a]=e[a].replace("#","")}),e.classPrefixLength=e.classPrefix.length},k=function(){d=a(b)};(function(){j(),k(),i()})()},ShareLink.networkTemplates={twitter:"https://twitter.com/intent/tweet?text={text}{url}",pinterest:"https://www.pinterest.com/pin/create/button/?url={url}&media={image}",facebook:"https://www.facebook.com/sharer.php?u={url}",vk:"https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}",linkedin:"https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",odnoklassniki:"https://connect.ok.ru/offer?url={url}&title={title}&imageUrl={image}",tumblr:"https://tumblr.com/share/link?url={url}",delicious:"https://del.icio.us/save?url={url}&title={title}",google:"https://plus.google.com/share?url={url}",digg:"https://digg.com/submit?url={url}",reddit:"https://reddit.com/submit?url={url}&title={title}",stumbleupon:"https://www.stumbleupon.com/submit?url={url}",pocket:"https://getpocket.com/edit?url={url}",whatsapp:"https://api.whatsapp.com/send?text=*{title}*\n{text}\n{url}",xing:"https://www.xing.com/app/user?op=share&url={url}",print:"javascript:print()",email:"mailto:?subject={title}&body={text}\n{url}",telegram:"https://telegram.me/share/url?url={url}&text={text}",skype:"https://web.skype.com/share?url={url}"},ShareLink.defaultSettings={title:"",text:"",image:"",url:location.href,classPrefix:"s_",width:640,height:480},ShareLink.getNetworkLink=function(a,b){var c=ShareLink.networkTemplates[a].replace(/{([^}]+)}/g,function(a,c){return b[c]||""});if("email"===a){if(-1<b.title.indexOf("&")||-1<b.text.indexOf("&")){var d={text:b.text.replace(/&/g,"%26"),title:b.title.replace(/&/g,"%26"),url:b.url};c=ShareLink.networkTemplates[a].replace(/{([^}]+)}/g,function(a,b){return d[b]})}return c.indexOf("?subject=&body")&&(c=c.replace("subject=&","")),c}return c},a.fn.shareLink=function(b){return this.each(function(){a(this).data("shareLink",new ShareLink(this,b))})}})(jQuery);