(
    function() {

        //extend document with getElementByClassName

        if (!document.getElementsByClassName) {
            var indexOf = [].indexOf || function(prop) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === prop) return i;
                }
                return -1;
            };
            getElementsByClassName = function(className,context) {
                var elems = document.querySelectorAll ? context.querySelectorAll("." + className) : (function() {
                    var all = context.getElementsByTagName("*"),
                        elements = [],
                        i = 0;
                    for (; i < all.length; i++) {
                        if (all[i].className && (" " + all[i].className + " ").indexOf(" " + className + " ") > -1 && indexOf.call(elements,all[i]) === -1) elements.push(all[i]);
                    }
                    return elements;
                })();
                return elems;
            };
            document.getElementsByClassName = function(className) {
                return getElementsByClassName(className,document);
            };
            Element.prototype.getElementsByClassName = function(className) {
                return getElementsByClassName(className,this);
            };
        }


        //extend Object with keys

        if (!Object.keys) {
            Object.keys = (
                function () {
                    var hasOwnProperty = Object.prototype.hasOwnProperty,
                        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                        dontEnums = [
                            'toString',
                            'toLocaleString',
                            'valueOf',
                            'hasOwnProperty',
                            'isPrototypeOf',
                            'propertyIsEnumerable',
                            'constructor'
                        ],
                        dontEnumsLength = dontEnums.length;

                    return function (obj) {
                        if (  typeof obj !== 'object' &&
                              typeof obj !== 'function' || 
                              obj === null
                        ) throw new TypeError('Object.keys called on non-object');

                        var result = [];

                        for (var prop in obj) {
                          if (hasOwnProperty.call(obj, prop)) result.push(prop);
                        }

                        if (hasDontEnumBug) {
                            for (var i=0; i < dontEnumsLength; i++) {
                                if (!hasOwnProperty.call(obj, dontEnums[i])) 
                                    result.push(dontEnums[i]);
                            }
                        }
                        return result;
                    }
                }
            )()
        };
        
        //create basic console object if console absent
        if (!window.console) {
            window.console = {};
        }
        
        // union of Chrome, FF, IE, and Safari console methods
        var m = [
            "log", "info", "warn", "error", "debug", "trace", "dir", "group",
            "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
            "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
        ];
        
        // define undefined methods as noops to prevent errors
        for (var i = 0; i < m.length; i++) {
            if (!window.console[m[i]]) {
                window.console[m[i]] = function() {};
            }    
        }
        
		if(!(document.createElement('canvas').getContext)){
        	'article aside footer header nav section time wbr rp rt progress meter mark figcaption figure summary dialog details command main'
			.replace(
				/\w+/g,
				function(n){
					document.createElement(n)
				}
			);
		}
		
        //testing for base head support
        if(!document.head)
            document.head=document.getElementsByTagName('head')[0];
        
    }
)();