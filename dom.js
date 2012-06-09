/**
 * @author tom@0x101.com
 * @class DOM
 *
 * Basic DOM operations
 */
var DOM = {

	/**
	 * @author tom@0x101.com  
	 * @param HTMLElement|string|Array el
	 */
	toggle: function(el) {

		if ( Types.isArray(el) ) {
			var n = el.length;
			for (var i = 0; i < n; i++) {
				this.toggle(el[i]);
			}
		} else {
			var el = (typeof el == 'string' ? this.get(el) : el),
				style = el.style;
			style.display = (style.display == 'none' ? '' : 'none');
		}
	},

	/**
	 * Toggle an element.
	 * @author tom@0x101.com
	 * @param Object|string el
	 */
	show: function(el) {
		var el = (typeof el == 'string' ? this.get(el) : el),
			style = el.style;
		if (style.display == 'none') {
			style.display = '';
		}
	},

	/**
	 * Simple DOM selector.
	 * @author tom@0x101.com
	 * @param Object|string el
	 */
	get: function(id) {
		return document.getElementById(id);
	},

	/**
	 * @param {HTMLElement} el
	 * @param {String} rawHTML
	 * @param {Function} [customFunc] Function that we will apply to the elements.
	 * @author tom@0x101.com
	 */
	inject: function(el, rawHTML, customFunc) {

		if (document.createRange) {
			var el = (typeof el == 'string' ? this.get(el) : el),
				range = document.createRange();

			range.selectNode(el);

			var rawTemplate = range.createContextualFragment(rawHTML),
				template = document.createDocumentFragment(),
				nChilds = rawTemplate.childNodes.length;

			el.innerHTML = '';

			for(var i=0;i<nChilds;i++) {
				var node = rawTemplate.childNodes[i].cloneNode(true);

				if (typeof customFunc === 'undefined') {
					if ( this.isScriptElement(node) ) {
						var script = document.createElement('script');
						script.type = 'text/javascript';
						script.src = node.src;
						template.appendChild(script);
					} else {
						template.appendChild(node);
					}
				} else {
					customFunc(node, el);
				}

			}

			if (typeof customFunc === 'undefined') {
				el.appendChild(template);
			}

		} else {
			el.innerHTML = rawHTML;
		}

	},

	/**
	 * @author tom@0x101.com
	 * @param {NodeElement} node
	 */
	isScriptElement: function(node) {
		return node.nodeType === Node.ELEMENT_NODE &&
				node.toString().indexOf('HTMLScriptElement') > 0
	}
};

/**
 * @author tom@0x101.com
 * @class Types
 */
var Types = {
	/**
	 * @author tom@0x101.com
	 * @param {Mixed} value
	 * @return {Boolean}
	 */
	isArray: function(value) {
		return Object.prototype.toString.apply(value) === '[object Array]';
	}
};
