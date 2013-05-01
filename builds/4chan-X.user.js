// ==UserScript==
// @name         4chan X
// @version      1.1.4
// @namespace    4chan-X
// @description  Cross-browser userscript for maximum lurking on 4chan.
// @license      MIT; https://github.com/seaweedchan/4chan-x/blob/master/LICENSE 
// @match        *://api.4chan.org/*
// @match        *://boards.4chan.org/*
// @match        *://images.4chan.org/*
// @match        *://sys.4chan.org/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @run-at       document-start
// @updateURL 	 https://github.com/seaweedchan/4chan-x/raw/stable/builds/4chan_X.meta.js
// @downloadURL  https://github.com/seaweedchan/4chan-x/raw/stable/builds/4chan_X.user.js
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAgMAAAAqbBEUAAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAHFJREFUKFOt0LENACEIBdBv4Qju4wgWanEj3D6OcIVMKaitYHEU/jwTCQj8W75kiVCSBvdQ5/AvfVHBin11BgdRq3ysBgfwBDRrj3MCIA+oAQaku/Q1cNctrAmyDl577tOThYt/Y1RBM4DgOHzM0HFTAyLukH/cmRnqAAAAAElFTkSuQmCC
// ==/UserScript==
/*
* 4chan X - Version 1.1.4 - 2013-04-30
*
* Licensed under the MIT license.
* https://github.com/seaweedchan/4chan-x/blob/master/LICENSE
*
* Appchan X Copyright © 2013-2013 Zixaphir <zixaphirmoxphar@gmail.com>
* http://zixaphir.github.io/appchan-x/ 
* 4chan x Copyright © 2009-2011 James Campos <james.r.campos@gmail.com>
* https://github.com/aeosynth/4chan-x
* 4chan x Copyright © 2012-2013 Nicolas Stepien <stepien.nicolas@gmail.com>
* https://4chan-x.just-believe.in/
* 4chan x Copyright © 2013-2013 Jordan Bates <saudrapsmann@gmail.com>
* http://seaweedchan.github.io/4chan-x/
* 4chan x Copyright © 2012-2013 ihavenoface
* http://ihavenoface.github.io/4chan-x/
* 4chan SS Copyright © 2011-2013 Ahodesuka
* https://github.com/ahodesuka/4chan-Style-Script/ 
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* Contributors:
* aeosynth
* mayhemydg
* noface
* !K.WeEabo0o
* blaise
* that4chanwolf
* desuwa
* seaweed
* e000
* ahodesuka
* Shou
* ferongr
* xat
* Ongpot
* thisisanon
* Anonymous
* Seiba
* herpaderpderp
* WakiMiko
* btmcsweeney
* AppleBloom
*
* All the people who've taken the time to write bug reports.
*
* Thank you.
*/

/*
* Contains data from external sources:
*
* audio/beep.wav from http://freesound.org/people/pierrecartoons1979/sounds/90112/
*   cc-by-nc-3.0
*
* 4chan/4chan-JS (https://github.com/4chan/4chan-JS)
*   Copyright (c) 2012-2013, 4chan LLC
*   All rights reserved.
*
*   license: https://github.com/4chan/4chan-JS/blob/master/LICENSE
*
* Linkify: (http://userscripts.org/scripts/show/1352)
*   Copyright (c) 2011, Anthony Lieuallen
*   All rights reserved.
*   Originally written by Anthony Lieuallen of http://arantius.com/
*   Licensed for unlimited modification and redistribution as long as
*   this notice is kept intact.
*
*   license: http://userscripts.org/scripts/review/1352
*
*/
(function() {
  var $, $$, Anonymize, ArchiveLink, Board, Build, CatalogLinks, Clone, Conf, Config, CustomCSS, DataBoard, DataBoards, DeleteLink, DownloadLink, Emoji, ExpandComment, ExpandThread, FappeTyme, Favicon, FileInfo, Filter, Fourchan, Get, Header, IDColor, ImageExpand, ImageHover, ImageReplace, Keybinds, Linkify, Main, Menu, Nav, Notification, PSAHiding, Polyfill, Post, PostHiding, QR, QuoteBacklink, QuoteCT, QuoteInline, QuoteOP, QuotePreview, QuoteStrikeThrough, QuoteThreading, QuoteYou, Quotify, Recursive, Redirect, RelativeDates, RemoveSpoilers, Report, ReportLink, RevealSpoilers, Sauce, Settings, Thread, ThreadExcerpt, ThreadHiding, ThreadStats, ThreadUpdater, ThreadWatcher, Time, UI, Unread, c, d, doc, g,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Config = {
    main: {
      'Miscellaneous': {
        'Catalog Links': [true, 'Add toggle link in header menu to turn Navigation links into links to each board\'s catalog.'],
        'External Catalog': [false, 'Link to external catalog instead of the internal one.'],
        'QR Shortcut': [false, 'Adds a small [QR] link in the header.'],
        'Announcement Hiding': [true, 'Add button to hide 4chan announcements.'],
        '404 Redirect': [true, 'Redirect dead threads and images.'],
        'Keybinds': [true, 'Bind actions to keyboard shortcuts.'],
        'Time Formatting': [true, 'Localize and format timestamps.'],
        'Relative Post Dates': [false, 'Display dates like "3 minutes ago". Tooltip shows the timestamp.'],
        'File Info Formatting': [true, 'Reformat the file information.'],
        'Comment Expansion': [true, 'Add buttons to expand long comments.'],
        'Thread Expansion': [true, 'Add buttons to expand threads.'],
        'Index Navigation': [false, 'Add buttons to navigate between threads.'],
        'Reply Navigation': [false, 'Add buttons to navigate to top / bottom of thread.'],
        'Check for Updates': [true, 'Check for updated versions of 4chan X.'],
        'Emoji': [false, 'Adds icons next to names for different emails'],
        'Color User IDs': [false, 'Assign unique colors to user IDs on boards that use them'],
        'Remove Spoilers': [false, 'Remove all spoilers in text.'],
        'Indicate Spoilers': [false, 'Indicate spoilers if Remove Spoilers is enabled.']
      },
      'Linkification': {
        'Linkify': [true, 'Convert text into links where applicable.'],
        'Embedding': [true, 'Embed supported services.'],
        'Auto-embed': [false, 'Auto-embed Linkify Embeds.'],
        'Link Title': [true, 'Replace the link of a supported site with its actual title. Currently Supported: YouTube, Vimeo, SoundCloud']
      },
      'Filtering': {
        'Anonymize': [false, 'Make everyone Anonymous.'],
        'Filter': [true, 'Self-moderation placebo.'],
        'Recursive Hiding': [true, 'Hide replies of hidden posts, recursively.'],
        'Thread Hiding Buttons': [true, 'Add buttons to hide entire threads.'],
        'Reply Hiding Buttons': [true, 'Add buttons to hide single replies.'],
        'Stubs': [true, 'Show stubs of hidden threads / replies.']
      },
      'Images': {
        'Image Expansion': [true, 'Expand images.'],
        'Image Hover': [false, 'Show full image on mouseover.'],
        'Sauce': [true, 'Add sauce links to images.'],
        'Reveal Spoilers': [false, 'Reveal spoiler thumbnails.'],
        'Replace GIF': [false, 'Replace thumbnail of gifs with its actual image.'],
        'Replace PNG': [false, 'Replace pngs.'],
        'Replace JPG': [false, 'Replace jpgs.'],
        'Fappe Tyme': [false, 'Hide posts without images. *hint* *hint*']
      },
      'Menu': {
        'Menu': [true, 'Add a drop-down menu to posts.'],
        'Report Link': [true, 'Add a report link to the menu.'],
        'Thread Hiding Link': [true, 'Add a link to hide entire threads.'],
        'Reply Hiding Link': [true, 'Add a link to hide single replies.'],
        'Delete Link': [true, 'Add post and image deletion links to the menu.'],
        'Archive Link': [true, 'Add an archive link to the menu.']
      },
      'Monitoring': {
        'Thread Updater': [true, 'Fetch and insert new replies. Has more options in its own dialog.'],
        'Unread Count': [true, 'Show the unread posts count in the tab title.'],
        'Hide Unread Count at (0)': [false, 'Hide the unread posts count in the tab title when it reaches 0.'],
        'Unread Favicon': [true, 'Show a different favicon when there are unread posts.'],
        'Unread Line': [true, 'Show a line to distinguish read posts from unread ones.'],
        'Scroll to Last Read Post': [true, 'Scroll back to the last read post when reopening a thread.'],
        'Thread Excerpt': [true, 'Show an excerpt of the thread in the tab title.'],
        'Thread Stats': [true, 'Display reply and image count.'],
        'Updater and Stats in Header': [true, 'Places the thread updater and thread stats in the header instead of floating them.'],
        'Thread Watcher': [true, 'Bookmark threads.'],
        'Auto Watch': [true, 'Automatically watch threads you start.'],
        'Auto Watch Reply': [false, 'Automatically watch threads you reply to.']
      },
      'Posting': {
        'Quick Reply': [true, 'All-in-one form to reply, create threads, automate dumping and more.'],
        'Persistent QR': [false, 'The Quick reply won\'t disappear after posting.'],
        'Auto Hide QR': [false, 'Automatically hide the quick reply when posting.'],
        'Open Post in New Tab': [true, 'Open new threads or replies to a thread from the index in a new tab.'],
        'Remember Subject': [false, 'Remember the subject field, instead of resetting after posting.'],
        'Remember QR Size': [false, 'Remember the size of the Quick reply.'],
        'Remember Spoiler': [false, 'Remember the spoiler state, instead of resetting after posting.'],
        'Hide Original Post Form': [true, 'Hide the normal post form.'],
        'Cooldown': [true, 'Indicate the remaining time before posting again.'],
        'Cooldown Prediction': [true, 'Decrease the cooldown time by taking into account upload speed. Disable it if it\'s inaccurate for you.']
      },
      'Quote Links': {
        'Quote Backlinks': [true, 'Add quote backlinks.'],
        'OP Backlinks': [true, 'Add backlinks to the OP.'],
        'Quote Inlining': [true, 'Inline quoted post on click.'],
        'Forward Hiding': [true, 'Hide original posts of inlined backlinks.'],
        'Quote Previewing': [true, 'Show quoted post on hover.'],
        'Quote Highlighting': [true, 'Highlight the previewed post.'],
        'Resurrect Quotes': [true, 'Link dead quotes to the archives.'],
        'Mark Quotes of You': [true, 'Add \'(You)\' to quotes linking to your posts.'],
        'Highlight Own Posts': [false, 'Highlights own posts if Mark Quotes of You is enabled.'],
        'Mark OP Quotes': [true, 'Add \'(OP)\' to OP quotes.'],
        'Mark Cross-thread Quotes': [true, 'Add \'(Cross-thread)\' to cross-threads quotes.'],
        'Quote Threading': [false, 'Thread conversations']
      }
    },
    imageExpansion: {
      'Fit width': [true, ''],
      'Fit height': [false, ''],
      'Expand spoilers': [true, 'Expand all images along with spoilers.'],
      'Expand from here': [true, 'Expand all images only from current position to thread end.']
    },
    filter: {
      name: "# Filter any namefags:\n#/^(?!Anonymous$)/",
      uniqueID: "# Filter a specific ID:\n#/Txhvk1Tl/",
      tripcode: "# Filter any tripfag\n#/^!/",
      capcode: "# Set a custom class for mods:\n#/Mod$/;highlight:mod;op:yes\n# Set a custom class for moot:\n#/Admin$/;highlight:moot;op:yes",
      email: "# Filter any e-mails that are not `sage` on /a/ and /jp/:\n#/^(?!sage$)/;boards:a,jp",
      subject: "# Filter Generals on /v/:\n#/general/i;boards:v;op:only",
      comment: "# Filter Stallman copypasta on /g/:\n#/what you\'re refer+ing to as linux/i;boards:g",
      flag: '',
      filename: '',
      dimensions: "# Highlight potential wallpapers:\n#/1920x1080/;op:yes;highlight;top:no;boards:w,wg",
      filesize: '',
      MD5: ''
    },
    sauces: "https://www.google.com/searchbyimage?image_url=%TURL\nhttp://iqdb.org/?url=%TURL\n#//tineye.com/search?url=%TURL\n#http://saucenao.com/search.php?url=%TURL\n#http://3d.iqdb.org/?url=%TURL\n#http://regex.info/exif.cgi?imgurl=%URL\n# uploaders:\n#http://imgur.com/upload?url=%URL;text:Upload to imgur\n#http://ompldr.org/upload?url1=%URL;text:Upload to ompldr\n# \"View Same\" in archives:\n#//archive.foolz.us/_/search/image/%MD5/;text:View same on foolz\n#//archive.foolz.us/%board/search/image/%MD5/;text:View same on foolz /%board/\n#//archive.installgentoo.net/%board/image/%MD5;text:View same on installgentoo /%board/",
    'sageEmoji': '4chan SS',
    'emojiPos': 'before',
    'Custom CSS': false,
    Header: {
      'Fixed Header': true,
      'Header auto-hide': false,
      'Bottom Header': false,
      'Header catalog links': false,
      'Bottom Board List': true,
      'Custom Board Navigation': true
    },
    boardnav: '[ toggle-all ] [current-title]',
    time: '%m/%d/%y(%a)%H:%M:%S',
    backlink: '>>%id',
    fileInfo: '%L (%p%s, %r)',
    favicon: 'ferongr',
    usercss: '',
    hotkeys: {
      'Toggle board list': ['Ctrl+b', 'Toggle the full board list.'],
      'Toggle header': ['Shift+h', 'Toggle the auto-hide option of the header.'],
      'Open empty QR': ['i', 'Open QR without post number inserted.'],
      'Open QR': ['Shift+i', 'Open QR with post number inserted.'],
      'Open settings': ['Alt+o', 'Open Settings.'],
      'Close': ['Esc', 'Close Settings, Notifications or QR.'],
      'Spoiler tags': ['Ctrl+s', 'Insert spoiler tags.'],
      'Code tags': ['Alt+c', 'Insert code tags.'],
      'Eqn tags': ['Alt+e', 'Insert eqn tags.'],
      'Math tags': ['Alt+m', 'Insert math tags.'],
      'Toggle sage': ['Alt+s', 'Toggle sage in email field'],
      'Submit QR': ['Ctrl+Enter', 'Submit post.'],
      'Watch': ['w', 'Watch thread.'],
      'Update': ['r', 'Update the thread now.'],
      'Expand image': ['Shift+e', 'Expand selected image.'],
      'Expand images': ['e', 'Expand all images.'],
      'fappeTyme': ['f', 'Fappe Tyme.'],
      'Front page': ['0', 'Jump to page 0.'],
      'Open front page': ['Shift+0', 'Open page 0 in a new tab.'],
      'Next page': ['Right', 'Jump to the next page.'],
      'Previous page': ['Left', 'Jump to the previous page.'],
      'Open catalog': ['Shift+c', 'Open the catalog of the current board'],
      'Next thread': ['Down', 'See next thread.'],
      'Previous thread': ['Up', 'See previous thread.'],
      'Expand thread': ['Ctrl+e', 'Expand thread.'],
      'Open thread': ['o', 'Open thread in current tab.'],
      'Open thread tab': ['Shift+o', 'Open thread in new tab.'],
      'Next reply': ['j', 'Select next reply.'],
      'Previous reply': ['k', 'Select previous reply.'],
      'Hide': ['x', 'Hide thread.']
    },
    updater: {
      checkbox: {
        'Beep': [false, 'Beep on new post to completely read thread.'],
        'Auto Scroll': [false, 'Scroll updated posts into view. Only enabled at bottom of page.'],
        'Bottom Scroll': [false, 'Always scroll to the bottom, not the first new post. Useful for event threads.'],
        'Scroll BG': [false, 'Auto-scroll background tabs.'],
        'Auto Update': [true, 'Automatically fetch new posts.'],
        'Optional Increase': [false, 'Increase the intervals between updates on threads without new posts.']
      },
      'Interval': 30
    }
  };

  Conf = {};

  c = console;

  d = document;

  doc = d.documentElement;

  g = {
    VERSION: '1.1.4',
    NAMESPACE: '4chan X.',
    boards: {},
    threads: {},
    posts: {}
  };

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  String.prototype.contains = function(string) {
    return this.indexOf(string) > -1;
  };

  Array.prototype.add = function(object, position) {
    var keep;

    keep = this.slice(position);
    this.length = position;
    this.push(object);
    return this.pushArrays(keep);
  };

  Array.prototype.contains = function(object) {
    return this.indexOf(object) > -1;
  };

  Array.prototype.indexOf = function(object) {
    var i;

    i = this.length;
    while (i--) {
      if (this[i] === object) {
        return i;
      }
    }
    return i;
  };

  Array.prototype.pushArrays = function() {
    var arg, args, _i, _len;

    args = arguments;
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      this.push.apply(this, arg);
    }
    return this;
  };

  Array.prototype.remove = function(object) {
    var index;

    if ((index = this.indexOf(object)) > -1) {
      return this.splice(index, 1);
    } else {
      return false;
    }
  };

  $ = function(selector, root) {
    if (root == null) {
      root = d.body;
    }
    return root.querySelector(selector);
  };

  $.extend = function(object, properties) {
    var key, val;

    for (key in properties) {
      val = properties[key];
      if (!properties.hasOwnProperty(key)) {
        continue;
      }
      object[key] = val;
    }
  };

  $.DAY = 24 * ($.HOUR = 60 * ($.MINUTE = 60 * ($.SECOND = 1000)));

  $.id = function(id) {
    return d.getElementById(id);
  };

  $.ready = function(fc) {
    var cb, _ref;

    if ((_ref = d.readyState) === 'interactive' || _ref === 'complete') {
      $.queueTask(fc);
      return;
    }
    cb = function() {
      $.off(d, 'DOMContentLoaded', cb);
      return fc();
    };
    return $.on(d, 'DOMContentLoaded', cb);
  };

  $.formData = function(form) {
    var fd, key, val;

    if (form instanceof HTMLFormElement) {
      return new FormData(form);
    }
    fd = new FormData();
    for (key in form) {
      val = form[key];
      if (!val) {
        continue;
      }
      if (val.size && val.name) {
        fd.append(key, val, val.name);
      } else {
        fd.append(key, val);
      }
    }
    return fd;
  };

  $.ajax = function(url, callbacks, opts) {
    var cred, form, headers, key, r, sync, type, upCallbacks, val;

    if (opts == null) {
      opts = {};
    }
    type = opts.type, cred = opts.cred, headers = opts.headers, upCallbacks = opts.upCallbacks, form = opts.form, sync = opts.sync;
    r = new XMLHttpRequest();
    r.overrideMimeType('text/html');
    type || (type = form && 'post' || 'get');
    r.open(type, url, !sync);
    for (key in headers) {
      val = headers[key];
      r.setRequestHeader(key, val);
    }
    $.extend(r, callbacks);
    $.extend(r.upload, upCallbacks);
    r.withCredentials = cred;
    r.send(form);
    return r;
  };

  $.cache = (function() {
    var reqs;

    reqs = {};
    return function(url, cb) {
      var req, rm;

      if (req = reqs[url]) {
        if (req.readyState === 4) {
          cb.call(req);
        } else {
          req.callbacks.push(cb);
        }
        return;
      }
      rm = function() {
        return delete reqs[url];
      };
      req = $.ajax(url, {
        onload: function(e) {
          var _i, _len, _ref;

          _ref = this.callbacks;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cb = _ref[_i];
            cb.call(this, e);
          }
          return delete this.callbacks;
        },
        onabort: rm,
        onerror: rm
      });
      req.callbacks = [cb];
      return reqs[url] = req;
    };
  })();

  $.cb = {
    checked: function() {
      $.set(this.name, this.checked);
      return Conf[this.name] = this.checked;
    },
    value: function() {
      $.set(this.name, this.value.trim());
      return Conf[this.name] = this.value;
    }
  };

  $.asap = function(test, cb) {
    if (test()) {
      return cb();
    } else {
      return setTimeout($.asap, 25, test, cb);
    }
  };

  $.addStyle = function(css, id) {
    var style;

    style = $.el('style', {
      id: id,
      textContent: css
    });
    $.asap((function() {
      return d.head;
    }), function() {
      return $.add(d.head, style);
    });
    return style;
  };

  $.x = function(path, root) {
    root || (root = d.body);
    return d.evaluate(path, root, null, 8, null).singleNodeValue;
  };

  $.X = function(path, root) {
    root || (root = d.body);
    return d.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  };

  $.addClass = function(el, className) {
    return el.classList.add(className);
  };

  $.rmClass = function(el, className) {
    return el.classList.remove(className);
  };

  $.toggleClass = function(el, className) {
    return el.classList.toggle(className);
  };

  $.hasClass = function(el, className) {
    return el.classList.contains(className);
  };

  $.rm = (function() {
    if ('remove' in Element.prototype) {
      return function(el) {
        return el.remove();
      };
    } else {
      return function(el) {
        var _ref;

        return (_ref = el.parentNode) != null ? _ref.removeChild(el) : void 0;
      };
    }
  })();

  $.rmAll = function(root) {
    var node;

    while (node = root.firstChild) {
      root.removeChild(node);
    }
  };

  $.tn = function(s) {
    return d.createTextNode(s);
  };

  $.frag = function() {
    return d.createDocumentFragment();
  };

  $.nodes = function(nodes) {
    var frag, node, _i, _len;

    if (!(nodes instanceof Array)) {
      return nodes;
    }
    frag = $.frag();
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
      frag.appendChild(node);
    }
    return frag;
  };

  $.add = function(parent, el) {
    return parent.appendChild($.nodes(el));
  };

  $.prepend = function(parent, el) {
    return parent.insertBefore($.nodes(el), parent.firstChild);
  };

  $.after = function(root, el) {
    return root.parentNode.insertBefore($.nodes(el), root.nextSibling);
  };

  $.before = function(root, el) {
    return root.parentNode.insertBefore($.nodes(el), root);
  };

  $.replace = function(root, el) {
    return root.parentNode.replaceChild($.nodes(el), root);
  };

  $.el = function(tag, properties) {
    var el;

    el = d.createElement(tag);
    if (properties) {
      $.extend(el, properties);
    }
    return el;
  };

  $.on = function(el, events, handler) {
    var event, _i, _len, _ref;

    _ref = events.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      el.addEventListener(event, handler, false);
    }
  };

  $.off = function(el, events, handler) {
    var event, _i, _len, _ref;

    _ref = events.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      el.removeEventListener(event, handler, false);
    }
  };

  $.event = function(event, detail, root) {
    if (root == null) {
      root = d;
    }
    return root.dispatchEvent(new CustomEvent(event, {
      bubbles: true,
      detail: detail
    }));
  };

  $.open = function(URL) {
    return GM_openInTab(($.el('a', {
      href: URL
    })).href);
  };

  $.debounce = function(wait, fn) {
    var args, exec, lastCall, that, timeout;

    lastCall = 0;
    timeout = null;
    that = null;
    args = null;
    exec = function() {
      lastCall = Date.now();
      return fn.apply(that, args);
    };
    return function() {
      args = arguments;
      that = this;
      if (lastCall < Date.now() - wait) {
        return exec();
      }
      clearTimeout(timeout);
      return timeout = setTimeout(exec, wait);
    };
  };

  $.queueTask = (function() {
    var execTask, taskChannel, taskQueue;

    taskQueue = [];
    execTask = function() {
      var args, func, task;

      task = taskQueue.shift();
      func = task[0];
      args = Array.prototype.slice.call(task, 1);
      return func.apply(func, args);
    };
    if (window.MessageChannel) {
      taskChannel = new MessageChannel();
      taskChannel.port1.onmessage = execTask;
      return function() {
        taskQueue.push(arguments);
        return taskChannel.port2.postMessage(null);
      };
    } else {
      return function() {
        taskQueue.push(arguments);
        return setTimeout(execTask, 0);
      };
    }
  })();

  $.globalEval = function(code) {
    var script;

    script = $.el('script', {
      textContent: code
    });
    $.add(d.head || doc, script);
    return $.rm(script);
  };

  $.bytesToString = function(size) {
    var unit;

    unit = 0;
    while (size >= 1024) {
      size /= 1024;
      unit++;
    }
    size = unit > 1 ? Math.round(size * 100) / 100 : Math.round(size);
    return "" + size + " " + ['B', 'KB', 'MB', 'GB'][unit];
  };

  $.minmax = function(value, min, max) {
    return (value < min ? min : value > max ? max : value);
  };

  $.syncing = {};

  $.sync = (function() {
    window.addEventListener('storage', function(e) {
      var cb;

      if (cb = $.syncing[e.key]) {
        return cb(JSON.parse(e.newValue));
      }
    }, false);
    return function(key, cb) {
      return $.syncing[g.NAMESPACE + key] = cb;
    };
  })();

  $.item = function(key, val) {
    var item;

    item = {};
    item[key] = val;
    return item;
  };

  $["delete"] = function(keys) {
    var key, _i, _len;

    if (!(keys instanceof Array)) {
      keys = [keys];
    }
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      key = g.NAMESPACE + key;
      localStorage.removeItem(key);
      GM_deleteValue(key);
    }
  };

  $.get = function(key, val, cb) {
    var items;

    if (typeof cb === 'function') {
      items = $.item(key, val);
    } else {
      items = key;
      cb = val;
    }
    return $.queueTask(function() {
      for (key in items) {
        if (val = GM_getValue(g.NAMESPACE + key)) {
          items[key] = JSON.parse(val);
        }
      }
      return cb(items);
    });
  };

  $.set = (function() {
    var set;

    set = function(key, val) {
      key = g.NAMESPACE + key;
      val = JSON.stringify(val);
      if (key in $.syncing) {
        localStorage.setItem(key, val);
      }
      return GM_setValue(key, val);
    };
    return function(keys, val) {
      var key;

      if (typeof keys === 'string') {
        set(keys, val);
        return;
      }
      for (key in keys) {
        val = keys[key];
        set(key, val);
      }
    };
  })();

  $$ = function(selector, root) {
    if (root == null) {
      root = d.body;
    }
    return __slice.call(root.querySelectorAll(selector));
  };

  Board = (function() {
    Board.prototype.toString = function() {
      return this.ID;
    };

    function Board(ID) {
      this.ID = ID;
      this.threads = {};
      this.posts = {};
      g.boards[this] = this;
    }

    return Board;

  })();

  Thread = (function() {
    Thread.prototype.callbacks = [];

    Thread.prototype.toString = function() {
      return this.ID;
    };

    function Thread(ID, board) {
      this.board = board;
      this.ID = +ID;
      this.fullID = "" + this.board + "." + this.ID;
      this.posts = {};
      g.threads[this.fullID] = board.threads[this] = this;
    }

    Thread.prototype.kill = function() {
      this.isDead = true;
      return this.timeOfDeath = Date.now();
    };

    return Thread;

  })();

  Post = (function() {
    Post.prototype.callbacks = [];

    Post.prototype.toString = function() {
      return this.ID;
    };

    function Post(root, thread, board, that) {
      var alt, anchor, capcode, date, email, file, fileInfo, flag, info, name, post, size, subject, thumb, tripcode, uniqueID, unit;

      this.thread = thread;
      this.board = board;
      if (that == null) {
        that = {};
      }
      this.ID = +root.id.slice(2);
      this.fullID = "" + this.board + "." + this.ID;
      post = $('.post', root);
      info = $('.postInfo', post);
      this.nodes = {
        root: root,
        post: post,
        info: info,
        comment: $('.postMessage', post),
        quotelinks: [],
        backlinks: info.getElementsByClassName('backlink')
      };
      this.info = {};
      if (subject = $('.subject', info)) {
        this.nodes.subject = subject;
        this.info.subject = subject.textContent;
      }
      if (name = $('.name', info)) {
        this.nodes.name = name;
        this.info.name = name.textContent;
      }
      if (email = $('.useremail', info)) {
        this.nodes.email = email;
        this.info.email = decodeURIComponent(email.href.slice(7));
      }
      if (tripcode = $('.postertrip', info)) {
        this.nodes.tripcode = tripcode;
        this.info.tripcode = tripcode.textContent;
      }
      if (uniqueID = $('.posteruid', info)) {
        this.nodes.uniqueID = uniqueID;
        this.info.uniqueID = uniqueID.firstElementChild.textContent;
      }
      if (capcode = $('.capcode.hand', info)) {
        this.nodes.capcode = capcode;
        this.info.capcode = capcode.textContent.replace('## ', '');
      }
      if (flag = $('.countryFlag', info)) {
        this.nodes.flag = flag;
        this.info.flag = flag.title;
      }
      if (date = $('.dateTime', info)) {
        this.nodes.date = date;
        this.info.date = new Date(date.dataset.utc * 1000);
      }
      if (Conf['Quick Reply']) {
        this.info.yours = QR.db.get({
          boardID: this.board,
          threadID: this.thread,
          postID: this.ID
        });
      }
      this.parseComment();
      this.parseQuotes();
      if ((file = $('.file', post)) && (thumb = $('img[data-md5]', file))) {
        alt = thumb.alt;
        anchor = thumb.parentNode;
        fileInfo = file.firstElementChild;
        this.file = {
          info: fileInfo,
          text: fileInfo.firstElementChild,
          thumb: thumb,
          URL: anchor.href,
          size: alt.match(/[\d.]+\s\w+/)[0],
          MD5: thumb.dataset.md5,
          isSpoiler: $.hasClass(anchor, 'imgspoiler')
        };
        size = +this.file.size.match(/[\d.]+/)[0];
        unit = ['B', 'KB', 'MB', 'GB'].indexOf(this.file.size.match(/\w+$/)[0]);
        while (unit-- > 0) {
          size *= 1024;
        }
        this.file.sizeInBytes = size;
        this.file.thumbURL = that.isArchived ? thumb.src : "" + location.protocol + "//thumbs.4chan.org/" + board + "/thumb/" + (this.file.URL.match(/(\d+)\./)[1]) + "s.jpg";
        this.file.name = $('span[title]', fileInfo).title.replace(/%22/g, '"');
        if (this.file.isImage = /(jpg|png|gif)$/i.test(this.file.name)) {
          this.file.dimensions = this.file.text.textContent.match(/\d+x\d+/)[0];
        }
      }
      if (!(this.isReply = $.hasClass(post, 'reply'))) {
        this.thread.OP = this;
        this.thread.isSticky = !!$('.stickyIcon', this.nodes.info);
        this.thread.isClosed = !!$('.closedIcon', this.nodes.info);
      }
      this.clones = [];
      g.posts[this.fullID] = thread.posts[this] = board.posts[this] = this;
      if (that.isArchived) {
        this.kill();
      }
    }

    Post.prototype.parseComment = function() {
      var bq, data, i, node, nodes, text, _i, _j, _len, _ref, _ref1;

      bq = this.nodes.comment.cloneNode(true);
      _ref = $$('.abbr, .capcodeReplies, .exif, b', bq);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        $.rm(node);
      }
      text = [];
      nodes = d.evaluate('.//br|.//text()', bq, null, 7, null);
      for (i = _j = 0, _ref1 = nodes.snapshotLength; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        text.push((data = nodes.snapshotItem(i).data) ? data : '\n');
      }
      return this.info.comment = text.join('').trim().replace(/\s+$/gm, '');
    };

    Post.prototype.parseQuotes = function() {
      var hash, pathname, quotelink, quotes, _i, _len, _ref;

      quotes = {};
      _ref = $$('.quotelink', this.nodes.comment);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        hash = quotelink.hash;
        if (!hash) {
          continue;
        }
        pathname = quotelink.pathname;
        if (/catalog$/.test(pathname)) {
          continue;
        }
        if (quotelink.hostname !== 'boards.4chan.org') {
          continue;
        }
        this.nodes.quotelinks.push(quotelink);
        if (quotelink.parentNode.parentNode.className === 'capcodeReplies') {
          continue;
        }
        quotes["" + (pathname.split('/')[1]) + "." + hash.slice(2)] = true;
      }
      if (this.isClone) {
        return;
      }
      return this.quotes = Object.keys(quotes);
    };

    Post.prototype.kill = function(file, now) {
      var clone, quotelink, strong, _i, _j, _len, _len1, _ref, _ref1;

      now || (now = new Date());
      if (file) {
        if (this.file.isDead) {
          return;
        }
        this.file.isDead = true;
        this.file.timeOfDeath = now;
        $.addClass(this.nodes.root, 'deleted-file');
      } else {
        if (this.isDead) {
          return;
        }
        this.isDead = true;
        this.timeOfDeath = now;
        $.addClass(this.nodes.root, 'deleted-post');
      }
      if (!(strong = $('strong.warning', this.nodes.info))) {
        strong = $.el('strong', {
          className: 'warning',
          textContent: this.isReply ? '[Deleted]' : '[Dead]'
        });
        $.after($('input', this.nodes.info), strong);
      }
      strong.textContent = file ? '[File deleted]' : '[Deleted]';
      if (this.isClone) {
        return;
      }
      _ref = this.clones;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        clone = _ref[_i];
        clone.kill(file, now);
      }
      if (file) {
        return;
      }
      _ref1 = Get.allQuotelinksLinkingTo(this);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        quotelink = _ref1[_j];
        if ($.hasClass(quotelink, 'deadlink')) {
          continue;
        }
        $.add(quotelink, $.tn('\u00A0(Dead)'));
        $.addClass(quotelink, 'deadlink');
      }
    };

    Post.prototype.resurrect = function() {
      var clone, quotelink, strong, _i, _j, _len, _len1, _ref, _ref1;

      delete this.isDead;
      delete this.timeOfDeath;
      $.rmClass(this.nodes.root, 'deleted-post');
      strong = $('strong.warning', this.nodes.info);
      if (this.file && this.file.isDead) {
        strong.textContent = '[File deleted]';
      } else {
        $.rm(strong);
      }
      if (this.isClone) {
        return;
      }
      _ref = this.clones;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        clone = _ref[_i];
        clone.resurrect();
      }
      _ref1 = Get.allQuotelinksLinkingTo(this);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        quotelink = _ref1[_j];
        if ($.hasClass(quotelink, 'deadlink')) {
          quotelink.textContent = quotelink.textContent.replace('\u00A0(Dead)', '');
          $.rmClass(quotelink, 'deadlink');
        }
      }
    };

    Post.prototype.addClone = function(context) {
      return new Clone(this, context);
    };

    Post.prototype.rmClone = function(index) {
      var clone, _i, _len, _ref;

      this.clones.splice(index, 1);
      _ref = this.clones.slice(index);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        clone = _ref[_i];
        clone.nodes.root.setAttribute('data-clone', index++);
      }
    };

    return Post;

  })();

  Clone = (function(_super) {
    __extends(Clone, _super);

    function Clone(origin, context) {
      var file, index, info, inline, inlined, key, nodes, post, root, val, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;

      this.origin = origin;
      this.context = context;
      _ref = ['ID', 'fullID', 'board', 'thread', 'info', 'quotes', 'isReply'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this[key] = origin[key];
      }
      nodes = origin.nodes;
      root = nodes.root.cloneNode(true);
      post = $('.post', root);
      info = $('.postInfo', post);
      this.nodes = {
        root: root,
        post: post,
        info: info,
        comment: $('.postMessage', post),
        quotelinks: [],
        backlinks: info.getElementsByClassName('backlink')
      };
      _ref1 = $$('.inline', post);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        inline = _ref1[_j];
        $.rm(inline);
      }
      _ref2 = $$('.inlined', post);
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        inlined = _ref2[_k];
        $.rmClass(inlined, 'inlined');
      }
      root.hidden = false;
      $.rmClass(root, 'forwarded');
      $.rmClass(post, 'highlight');
      if (nodes.subject) {
        this.nodes.subject = $('.subject', info);
      }
      if (nodes.name) {
        this.nodes.name = $('.name', info);
      }
      if (nodes.email) {
        this.nodes.email = $('.useremail', info);
      }
      if (nodes.tripcode) {
        this.nodes.tripcode = $('.postertrip', info);
      }
      if (nodes.uniqueID) {
        this.nodes.uniqueID = $('.posteruid', info);
      }
      if (nodes.capcode) {
        this.nodes.capcode = $('.capcode', info);
      }
      if (nodes.flag) {
        this.nodes.flag = $('.countryFlag', info);
      }
      if (nodes.date) {
        this.nodes.date = $('.dateTime', info);
      }
      this.parseQuotes();
      if (origin.file) {
        this.file = {};
        _ref3 = origin.file;
        for (key in _ref3) {
          val = _ref3[key];
          this.file[key] = val;
        }
        file = $('.file', post);
        this.file.info = file.firstElementChild;
        this.file.text = this.file.info.firstElementChild;
        this.file.thumb = $('img[data-md5]', file);
        this.file.fullImage = $('.full-image', file);
      }
      if (origin.isDead) {
        this.isDead = true;
      }
      this.isClone = true;
      index = origin.clones.push(this) - 1;
      root.setAttribute('data-clone', index);
    }

    return Clone;

  })(Post);

  DataBoards = ['hiddenThreads', 'hiddenPosts', 'lastReadPosts', 'yourPosts'];

  DataBoard = (function() {
    function DataBoard(key, sync) {
      var init,
        _this = this;

      this.key = key;
      this.data = Conf[key];
      $.sync(key, this.onSync.bind(this));
      this.clean();
      if (!sync) {
        return;
      }
      init = function() {
        $.off(d, '4chanXInitFinished', init);
        return _this.sync = sync;
      };
      $.on(d, '4chanXInitFinished', init);
    }

    DataBoard.prototype["delete"] = function(_arg) {
      var boardID, postID, threadID;

      boardID = _arg.boardID, threadID = _arg.threadID, postID = _arg.postID;
      if (postID) {
        delete this.data.boards[boardID][threadID][postID];
        this.deleteIfEmpty({
          boardID: boardID,
          threadID: threadID
        });
      } else if (threadID) {
        delete this.data.boards[boardID][threadID];
        this.deleteIfEmpty({
          boardID: boardID
        });
      } else {
        delete this.data.boards[boardID];
      }
      return $.set(this.key, this.data);
    };

    DataBoard.prototype.deleteIfEmpty = function(_arg) {
      var boardID, threadID;

      boardID = _arg.boardID, threadID = _arg.threadID;
      if (threadID) {
        if (!Object.keys(this.data.boards[boardID][threadID]).length) {
          delete this.data.boards[boardID][threadID];
          return this.deleteIfEmpty({
            boardID: boardID
          });
        }
      } else if (!Object.keys(this.data.boards[boardID]).length) {
        return delete this.data.boards[boardID];
      }
    };

    DataBoard.prototype.set = function(_arg) {
      var boardID, postID, threadID, val, _base, _base1, _base2;

      boardID = _arg.boardID, threadID = _arg.threadID, postID = _arg.postID, val = _arg.val;
      if (postID) {
        ((_base = ((_base1 = this.data.boards)[boardID] || (_base1[boardID] = {})))[threadID] || (_base[threadID] = {}))[postID] = val;
      } else if (threadID) {
        ((_base2 = this.data.boards)[boardID] || (_base2[boardID] = {}))[threadID] = val;
      } else {
        this.data.boards[boardID] = val;
      }
      return $.set(this.key, this.data);
    };

    DataBoard.prototype.get = function(_arg) {
      var ID, board, boardID, defaultValue, postID, thread, threadID, val, _i, _len;

      boardID = _arg.boardID, threadID = _arg.threadID, postID = _arg.postID, defaultValue = _arg.defaultValue;
      if (board = this.data.boards[boardID]) {
        if (!threadID) {
          if (postID) {
            for (thread = _i = 0, _len = board.length; _i < _len; thread = ++_i) {
              ID = board[thread];
              if (postID in thread) {
                val = thread[postID];
                break;
              }
            }
          } else {
            val = board;
          }
        } else if (thread = board[threadID]) {
          val = postID ? thread[postID] : thread;
        }
      }
      return val || defaultValue;
    };

    DataBoard.prototype.clean = function() {
      var boardID, now;

      for (boardID in this.data.boards) {
        this.deleteIfEmpty({
          boardID: boardID
        });
      }
      now = Date.now();
      if ((this.data.lastChecked || 0) < now - 2 * $.HOUR) {
        this.data.lastChecked = now;
        for (boardID in this.data.boards) {
          this.ajaxClean(boardID);
        }
      }
      return $.set(this.key, this.data);
    };

    DataBoard.prototype.ajaxClean = function(boardID) {
      var _this = this;

      return $.cache("//api.4chan.org/" + boardID + "/threads.json", function(e) {
        var board, page, thread, threads, _i, _j, _len, _len1, _ref, _ref1;

        if (e.target.status === 404) {
          _this["delete"](boardID);
        } else if (e.target.status === 200) {
          board = _this.data.boards[boardID];
          threads = {};
          _ref = JSON.parse(e.target.response);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            page = _ref[_i];
            _ref1 = page.threads;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              thread = _ref1[_j];
              if (thread.no in board) {
                threads[thread.no] = board[thread.no];
              }
            }
          }
          _this.data.boards[boardID] = threads;
          _this.deleteIfEmpty({
            boardID: boardID
          });
        }
        return $.set(_this.key, _this.data);
      });
    };

    DataBoard.prototype.onSync = function(data) {
      this.data = data || {
        boards: {}
      };
      return typeof this.sync === "function" ? this.sync() : void 0;
    };

    return DataBoard;

  })();

  Notification = (function() {
    var add, close;

    function Notification(type, content, timeout) {
      this.timeout = timeout;
      this.add = add.bind(this);
      this.close = close.bind(this);
      this.el = $.el('div', {
        innerHTML: '<a href=javascript:; class=close title=Close>×</a><div class=message></div>'
      });
      this.el.style.opacity = 0;
      this.setType(type);
      $.on(this.el.firstElementChild, 'click', this.close);
      if (typeof content === 'string') {
        content = $.tn(content);
      }
      $.add(this.el.lastElementChild, content);
      $.ready(this.add);
    }

    Notification.prototype.setType = function(type) {
      return this.el.className = "notification " + type;
    };

    add = function() {
      if (d.hidden) {
        $.on(d, 'visibilitychange', this.add);
        return;
      }
      $.off(d, 'visibilitychange', this.add);
      $.add($.id('notifications'), this.el);
      this.el.clientHeight;
      this.el.style.opacity = 1;
      if (this.timeout) {
        return setTimeout(this.close, this.timeout * $.SECOND);
      }
    };

    close = function() {
      return $.rm(this.el);
    };

    return Notification;

  })();

  Polyfill = {
    init: function() {
      return Polyfill.visibility();
    },
    visibility: function() {
      var event, prefix, property;

      if ('visibilityState' in document || !(prefix = ('webkitVisibilityState' in document ? 'webkit' : 'mozVisibilityState' in document ? 'moz' : void 0))) {
        return;
      }
      property = prefix + 'VisibilityState';
      event = prefix + 'visibilitychange';
      d.visibilityState = d[property];
      d.hidden = d.visibilityState === 'hidden';
      return $.on(d, event, function() {
        d.visibilityState = d[property];
        d.hidden = d.visibilityState === 'hidden';
        return $.event('visibilitychange');
      });
    }
  };

  Header = {
    init: function() {
      var barFixedToggler, barPositionToggler, customNavToggler, editCustomNav, footerToggler, headerToggler,
        _this = this;

      this.menu = new UI.Menu('header');
      this.menuButton = $.el('span', {
        className: 'menu-button',
        innerHTML: '<i></i>'
      });
      barFixedToggler = $.el('label', {
        innerHTML: '<input type=checkbox name="Fixed Header"> Fixed Header'
      });
      headerToggler = $.el('label', {
        innerHTML: '<input type=checkbox name="Header auto-hide"> Auto-hide header'
      });
      barPositionToggler = $.el('label', {
        innerHTML: '<input type=checkbox name="Bottom header"> Bottom header'
      });
      customNavToggler = $.el('label', {
        innerHTML: '<input type=checkbox name="Custom Board Navigation"> Custom board navigation'
      });
      footerToggler = $.el('label', {
        innerHTML: "<input type=checkbox " + (!Conf['Bottom Board List'] ? 'checked' : '') + "> Hide bottom board list"
      });
      editCustomNav = $.el('a', {
        textContent: 'Edit custom board navigation',
        href: 'javascript:;'
      });
      this.barFixedToggler = barFixedToggler.firstElementChild;
      this.barPositionToggler = barPositionToggler.firstElementChild;
      this.headerToggler = headerToggler.firstElementChild;
      this.footerToggler = footerToggler.firstElementChild;
      this.customNavToggler = customNavToggler.firstElementChild;
      $.on(this.menuButton, 'click', this.menuToggle);
      $.on(this.barFixedToggler, 'change', this.toggleBarFixed);
      $.on(this.barPositionToggler, 'change', this.toggleBarPosition);
      $.on(this.headerToggler, 'change', this.toggleBarVisibility);
      $.on(this.footerToggler, 'change', this.toggleFooterVisibility);
      $.on(this.customNavToggler, 'change', this.toggleCustomNav);
      $.on(editCustomNav, 'click', this.editCustomNav);
      this.setBarFixed(Conf['Fixed Header']);
      this.setBarVisibility(Conf['Header auto-hide']);
      $.sync('Fixed Header', Header.setBarFixed);
      $.sync('Bottom Header', Header.setBarPosition);
      $.sync('Header auto-hide', Header.setBarVisibility);
      this.addShortcut(Header.menuButton);
      $.event('AddMenuEntry', {
        type: 'header',
        el: $.el('span', {
          textContent: 'Header'
        }),
        order: 107,
        subEntries: [
          {
            el: barFixedToggler
          }, {
            el: headerToggler
          }, {
            el: barPositionToggler
          }, {
            el: footerToggler
          }, {
            el: customNavToggler
          }, {
            el: editCustomNav
          }
        ]
      });
      $.on(window, 'load hashchange', Header.hashScroll);
      $.on(d, 'CreateNotification', this.createNotification);
      $.asap((function() {
        return d.body;
      }), function() {
        if (!Main.isThisPageLegit()) {
          return;
        }
        $.asap((function() {
          return $.id('boardNavMobile') || d.readyState === 'complete';
        }), Header.setBoardList);
        $.prepend(d.body, _this.bar);
        $.add(d.body, Header.hover);
        return _this.setBarPosition(Conf['Bottom Header']);
      });
      return $.ready(function() {
        var a, cs;

        _this.footer = $.id('boardNavDesktopFoot');
        if (a = $("a[href*='/" + g.BOARD + "/']", $.id('boardNavDesktopFoot'))) {
          a.className = 'current';
        }
        cs = $.id('settingsWindowLink');
        cs.textContent = 'Catalog Settings';
        if (g.VIEW === 'catalog') {
          _this.addShortcut(cs);
        }
        Header.setFooterVisibility(Conf['Bottom Board List']);
        return $.sync('Bottom Board List', Header.setFooterVisibility);
      });
    },
    bar: $.el('div', {
      id: 'header-bar'
    }),
    notify: $.el('div', {
      id: 'notifications'
    }),
    shortcuts: $.el('span', {
      id: 'shortcuts'
    }),
    hover: $.el('div', {
      id: 'hoverUI'
    }),
    toggle: $.el('div', {
      id: 'scroll-marker'
    }),
    setBoardList: function() {
      var a, boardList, btn, fourchannav, fullBoardList;

      fourchannav = $.id('boardNavDesktop');
      if (a = $("a[href*='/" + g.BOARD + "/']", fourchannav)) {
        a.className = 'current';
      }
      boardList = $.el('span', {
        id: 'board-list',
        innerHTML: "<span id=custom-board-list></span><span id=full-board-list hidden>[<a href=javascript:; class='hide-board-list-button'> - </a>] " + fourchannav.innerHTML + "</span>"
      });
      fullBoardList = $('#full-board-list', boardList);
      btn = $('.hide-board-list-button', fullBoardList);
      $.on(btn, 'click', Header.toggleBoardList);
      $.rm($('#navtopright', fullBoardList));
      $.add(boardList, fullBoardList);
      $.add(Header.bar, [boardList, Header.shortcuts, Header.notify, Header.toggle]);
      Header.setCustomNav(Conf['Custom Board Navigation']);
      Header.generateBoardList(Conf['boardnav']);
      $.sync('Custom Board Navigation', Header.setCustomNav);
      return $.sync('boardnav', Header.generateBoardList);
    },
    generateBoardList: function(text) {
      var as, list, nodes;

      list = $('#custom-board-list', Header.bar);
      $.rmAll(list);
      if (!text) {
        return;
      }
      as = $$('#full-board-list a', Header.bar);
      nodes = text.match(/[\w@]+(-(all|title|replace|full|index|catalog|text:"[^"]+"))*|[^\w@]+/g).map(function(t) {
        var a, board, m, _i, _len;

        if (/^[^\w@]/.test(t)) {
          return $.tn(t);
        }
        if (/^toggle-all/.test(t)) {
          a = $.el('a', {
            className: 'show-board-list-button',
            textContent: (t.match(/-text:"(.+)"/) || [null, '+'])[1],
            href: 'javascript:;'
          });
          $.on(a, 'click', Header.toggleBoardList);
          return a;
        }
        board = /^current/.test(t) ? g.BOARD.ID : t.match(/^[^-]+/)[0];
        for (_i = 0, _len = as.length; _i < _len; _i++) {
          a = as[_i];
          if (a.textContent === board) {
            a = a.cloneNode(true);
            a.textContent = /-title/.test(t) || /-replace/.test(t) && $.hasClass(a, 'current') ? a.title : /-full/.test(t) ? "/" + board + "/ - " + a.title : (m = t.match(/-text:"(.+)"/)) ? m[1] : a.textContent;
            if (m = t.match(/-(index|catalog)/)) {
              a.setAttribute('data-only', m[1]);
              a.href = "//boards.4chan.org/" + board + "/";
              if (m[1] === 'catalog') {
                a.href += 'catalog';
              }
            }
            if (board === '@') {
              $.addClass(a, 'navSmall');
            }
            return a;
          }
        }
        return $.tn(t);
      });
      return $.add(list, nodes);
    },
    toggleBoardList: function() {
      var bar, custom, full, showBoardList;

      bar = Header.bar;
      custom = $('#custom-board-list', bar);
      full = $('#full-board-list', bar);
      showBoardList = !full.hidden;
      custom.hidden = !showBoardList;
      return full.hidden = showBoardList;
    },
    setBarPosition: function(bottom) {
      Header.barPositionToggler.checked = bottom;
      if (bottom) {
        $.rmClass(doc, 'top');
        $.addClass(doc, 'bottom');
        return $.after(Header.bar, Header.notify);
      } else {
        $.rmClass(doc, 'bottom');
        $.addClass(doc, 'top');
        return $.add(Header.bar, Header.notify);
      }
    },
    toggleBarPosition: function() {
      $.event('CloseMenu');
      Header.setBarPosition(this.checked);
      Conf['Bottom Header'] = this.checked;
      return $.set('Bottom Header', this.checked);
    },
    setBarFixed: function(fixed) {
      Header.barFixedToggler.checked = fixed;
      if (fixed) {
        $.addClass(doc, 'fixed');
        return $.addClass(Header.bar, 'dialog');
      } else {
        $.rmClass(doc, 'fixed');
        return $.rmClass(Header.bar, 'dialog');
      }
    },
    toggleBarFixed: function() {
      $.event('CloseMenu');
      Header.setBarFixed(this.checked);
      Conf['Fixed Header'] = this.checked;
      return $.set('Fixed Header', this.checked);
    },
    setBarVisibility: function(hide) {
      Header.headerToggler.checked = hide;
      $.event('CloseMenu');
      (hide ? $.addClass : $.rmClass)(Header.bar, 'autohide');
      return (hide ? $.addClass : $.rmClass)(doc, 'autohide');
    },
    toggleBarVisibility: function(e) {
      var hide, message;

      if (e.type === 'mousedown' && e.button !== 0) {
        return;
      }
      hide = this.nodeName === 'INPUT' ? this.checked : !$.hasClass(Header.bar, 'autohide');
      Conf['Header auto-hide'] = hide;
      $.set('Header auto-hide', hide);
      Header.setBarVisibility(hide);
      message = hide ? 'The header bar will automatically hide itself.' : 'The header bar will remain visible.';
      return new Notification('info', message, 2);
    },
    setFooterVisibility: function(hide) {
      Header.footerToggler.checked = hide;
      return Header.footer.hidden = hide;
    },
    toggleFooterVisibility: function() {
      var hide, message;

      $.event('CloseMenu');
      hide = this.nodeName === 'INPUT' ? this.checked : !!Header.footer.hidden;
      Header.setFooterVisibility(hide);
      $.set('Bottom Board List', hide);
      message = hide ? 'The bottom navigation will now be hidden.' : 'The bottom navigation will remain visible.';
      return new Notification('info', message, 2);
    },
    setCustomNav: function(show) {
      var btn, cust, full, _ref;

      Header.customNavToggler.checked = show;
      cust = $('#custom-board-list', Header.bar);
      full = $('#full-board-list', Header.bar);
      btn = $('.hide-board-list-button', full);
      return _ref = show ? [false, true] : [true, false], cust.hidden = _ref[0], full.hidden = _ref[1], _ref;
    },
    toggleCustomNav: function() {
      $.cb.checked.call(this);
      return Header.setCustomNav(this.checked);
    },
    editCustomNav: function() {
      var settings;

      Settings.open('Advanced');
      settings = $.id('fourchanx-settings');
      return $('input[name=boardnav]', settings).focus();
    },
    hashScroll: function() {
      var hash, post;

      if (!((hash = this.location.hash) && (post = $.id(hash.slice(1))))) {
        return;
      }
      if ((Get.postFromRoot(post)).isHidden) {
        return;
      }
      return Header.scrollToPost(post);
    },
    scrollToPost: function(post) {
      var headRect, top;

      top = post.getBoundingClientRect().top;
      if (Conf['Fixed Header'] && !Conf['Bottom Header']) {
        headRect = Header.bar.getBoundingClientRect();
        top += -headRect.top - headRect.height;
      }
      return ($.engine === 'webkit' ? d.body : doc).scrollTop += top;
    },
    addShortcut: function(el) {
      var shortcut;

      shortcut = $.el('span', {
        className: 'shortcut'
      });
      $.add(shortcut, [$.tn(' ['), el, $.tn(']')]);
      return $.prepend(Header.shortcuts, shortcut);
    },
    menuToggle: function(e) {
      return Header.menu.toggle(e, this, g);
    },
    createNotification: function(e) {
      var cb, content, lifetime, notif, type, _ref;

      _ref = e.detail, type = _ref.type, content = _ref.content, lifetime = _ref.lifetime, cb = _ref.cb;
      notif = new Notification(type, content, lifetime);
      if (cb) {
        return cb(notif);
      }
    }
  };

  Build = {
    spoilerRange: {},
    shortFilename: function(filename, isReply) {
      var threshold;

      threshold = isReply ? 30 : 40;
      if (filename.length - 4 > threshold) {
        return "" + filename.slice(0, threshold - 5) + "(...)." + filename.slice(-3);
      } else {
        return filename;
      }
    },
    postFromObject: function(data, boardID) {
      var o;

      o = {
        postID: data.no,
        threadID: data.resto || data.no,
        boardID: boardID,
        name: data.name,
        capcode: data.capcode,
        tripcode: data.trip,
        uniqueID: data.id,
        email: data.email ? encodeURI(data.email.replace(/&quot;/g, '"')) : '',
        subject: data.sub,
        flagCode: data.country,
        flagName: data.country_name,
        date: data.now,
        dateUTC: data.time,
        comment: data.com,
        isSticky: !!data.sticky,
        isClosed: !!data.closed
      };
      if (data.ext || data.filedeleted) {
        o.file = {
          name: data.filename + data.ext,
          timestamp: "" + data.tim + data.ext,
          url: "//images.4chan.org/" + boardID + "/src/" + data.tim + data.ext,
          height: data.h,
          width: data.w,
          MD5: data.md5,
          size: data.fsize,
          turl: "//thumbs.4chan.org/" + boardID + "/thumb/" + data.tim + "s.jpg",
          theight: data.tn_h,
          twidth: data.tn_w,
          isSpoiler: !!data.spoiler,
          isDeleted: !!data.filedeleted
        };
      }
      return Build.post(o);
    },
    post: function(o, isArchived) {
      /*
      This function contains code from 4chan-JS (https://github.com/4chan/4chan-JS).
      @license: https://github.com/4chan/4chan-JS/blob/master/LICENSE
      */

      var a, boardID, capcode, capcodeClass, capcodeStart, closed, comment, container, date, dateUTC, email, emailEnd, emailStart, ext, file, fileDims, fileHTML, fileInfo, fileSize, fileThumb, filename, flag, flagCode, flagName, href, imgSrc, isClosed, isOP, isSticky, name, postID, quote, shortFilename, spoilerRange, staticPath, sticky, subject, threadID, tripcode, uniqueID, userID, _i, _len, _ref;

      postID = o.postID, threadID = o.threadID, boardID = o.boardID, name = o.name, capcode = o.capcode, tripcode = o.tripcode, uniqueID = o.uniqueID, email = o.email, subject = o.subject, flagCode = o.flagCode, flagName = o.flagName, date = o.date, dateUTC = o.dateUTC, isSticky = o.isSticky, isClosed = o.isClosed, comment = o.comment, file = o.file;
      isOP = postID === threadID;
      staticPath = '//static.4chan.org';
      if (email) {
        emailStart = '<a href="mailto:' + email + '" class="useremail">';
        emailEnd = '</a>';
      } else {
        emailStart = '';
        emailEnd = '';
      }
      subject = "<span class=subject>" + (subject || '') + "</span>";
      userID = !capcode && uniqueID ? (" <span class='posteruid id_" + uniqueID + "'>(ID: ") + ("<span class=hand title='Highlight posts by this ID'>" + uniqueID + "</span>)</span> ") : '';
      switch (capcode) {
        case 'admin':
        case 'admin_highlight':
          capcodeClass = " capcodeAdmin";
          capcodeStart = " <strong class='capcode hand id_admin'" + "title='Highlight posts by the Administrator'>## Admin</strong>";
          capcode = (" <img src='" + staticPath + "/image/adminicon.gif' ") + "alt='This user is the 4chan Administrator.' " + "title='This user is the 4chan Administrator.' class=identityIcon>";
          break;
        case 'mod':
          capcodeClass = " capcodeMod";
          capcodeStart = " <strong class='capcode hand id_mod' " + "title='Highlight posts by Moderators'>## Mod</strong>";
          capcode = (" <img src='" + staticPath + "/image/modicon.gif' ") + "alt='This user is a 4chan Moderator.' " + "title='This user is a 4chan Moderator.' class=identityIcon>";
          break;
        case 'developer':
          capcodeClass = " capcodeDeveloper";
          capcodeStart = " <strong class='capcode hand id_developer' " + "title='Highlight posts by Developers'>## Developer</strong>";
          capcode = (" <img src='" + staticPath + "/image/developericon.gif' ") + "alt='This user is a 4chan Developer.' " + "title='This user is a 4chan Developer.' class=identityIcon>";
          break;
        default:
          capcodeClass = '';
          capcodeStart = '';
          capcode = '';
      }
      flag = flagCode ? (" <img src='" + staticPath + "/image/country/" + (boardID === 'pol' ? 'troll/' : '')) + flagCode.toLowerCase() + (".gif' alt=" + flagCode + " title='" + flagName + "' class=countryFlag>") : '';
      if (file != null ? file.isDeleted : void 0) {
        fileHTML = isOP ? ("<div id=f" + postID + " class=file><div class=fileInfo></div><span class=fileThumb>") + ("<img src='" + staticPath + "/image/filedeleted.gif' alt='File deleted.' class='fileDeleted retina'>") + "</span></div>" : ("<div id=f" + postID + " class=file><span class=fileThumb>") + ("<img src='" + staticPath + "/image/filedeleted-res.gif' alt='File deleted.' class='fileDeletedRes retina'>") + "</span></div>";
      } else if (file) {
        ext = file.name.slice(-3);
        if (!file.twidth && !file.theight && ext === 'gif') {
          file.twidth = file.width;
          file.theight = file.height;
        }
        fileSize = $.bytesToString(file.size);
        fileThumb = file.turl;
        if (file.isSpoiler) {
          fileSize = "Spoiler Image, " + fileSize;
          if (!isArchived) {
            fileThumb = '//static.4chan.org/image/spoiler';
            if (spoilerRange = Build.spoilerRange[boardID]) {
              fileThumb += ("-" + boardID) + Math.floor(1 + spoilerRange * Math.random());
            }
            fileThumb += '.png';
            file.twidth = file.theight = 100;
          }
        }
        if (boardID.ID !== 'f') {
          imgSrc = ("<a class='fileThumb" + (file.isSpoiler ? ' imgspoiler' : '') + "' href='" + file.url + "' target=_blank>") + ("<img src='" + fileThumb + "' alt='" + fileSize + "' data-md5=" + file.MD5 + " style='height: " + file.theight + "px; width: " + file.twidth + "px;'></a>");
        }
        a = $.el('a', {
          innerHTML: file.name
        });
        filename = a.textContent.replace(/%22/g, '"');
        a.textContent = Build.shortFilename(filename);
        shortFilename = a.innerHTML;
        a.textContent = filename;
        filename = a.innerHTML.replace(/'/g, '&apos;');
        fileDims = ext === 'pdf' ? 'PDF' : "" + file.width + "x" + file.height;
        fileInfo = ("<span class=fileText id=fT" + postID + (file.isSpoiler ? " title='" + filename + "'" : '') + ">File: <a href='" + file.url + "' target=_blank>" + file.timestamp + "</a>") + ("-(" + fileSize + ", " + fileDims + (file.isSpoiler ? '' : ", <span title='" + filename + "'>" + shortFilename + "</span>")) + ")</span>";
        fileHTML = "<div id=f" + postID + " class=file><div class=fileInfo>" + fileInfo + "</div>" + imgSrc + "</div>";
      } else {
        fileHTML = '';
      }
      tripcode = tripcode ? " <span class=postertrip>" + tripcode + "</span>" : '';
      sticky = isSticky ? ' <img src=//static.4chan.org/image/sticky.gif alt=Sticky title=Sticky class=stickyIcon>' : '';
      closed = isClosed ? ' <img src=//static.4chan.org/image/closed.gif alt=Closed title=Closed class=closedIcon>' : '';
      container = $.el('div', {
        id: "pc" + postID,
        className: "postContainer " + (isOP ? 'op' : 'reply') + "Container",
        innerHTML: (isOP ? '' : "<div class=sideArrows id=sa" + postID + ">&gt;&gt;</div>") + ("<div id=p" + postID + " class='post " + (isOP ? 'op' : 'reply') + (capcode === 'admin_highlight' ? ' highlightPost' : '') + "'>") + ("<div class='postInfoM mobile' id=pim" + postID + ">") + ("<span class='nameBlock" + capcodeClass + "'>") + ("<span class=name>" + (name || '') + "</span>") + tripcode + capcodeStart + capcode + userID + flag + sticky + closed + ("<br>" + subject) + ("</span><span class='dateTime postNum' data-utc=" + dateUTC + ">" + date) + ("<a href=" + ("/" + boardID + "/res/" + threadID + "#p" + postID) + ">No.</a>") + ("<a href='" + (g.VIEW === 'thread' && g.THREADID === +threadID ? "javascript:quote(" + postID + ")" : "/" + boardID + "/res/" + threadID + "#q" + postID) + "'>" + postID + "</a>") + '</span>' + '</div>' + (isOP ? fileHTML : '') + ("<div class='postInfo desktop' id=pi" + postID + ">") + ("<input type=checkbox name=" + postID + " value=delete> ") + ("" + subject + " ") + ("<span class='nameBlock" + capcodeClass + "'>") + emailStart + ("<span class=name>" + (name || '') + "</span>") + tripcode + capcodeStart + emailEnd + capcode + userID + flag + sticky + closed + ' </span> ' + ("<span class=dateTime data-utc=" + dateUTC + ">" + date + "</span> ") + "<span class='postNum desktop'>" + ("<a href=" + ("/" + boardID + "/res/" + threadID + "#p" + postID) + " title='Highlight this post'>No.</a>") + ("<a href='" + (g.VIEW === 'thread' && g.THREADID === +threadID ? "javascript:quote(" + postID + ")" : "/" + boardID + "/res/" + threadID + "#q" + postID) + "' title='Quote this post'>" + postID + "</a>") + '</span>' + '</div>' + (isOP ? '' : fileHTML) + ("<blockquote class=postMessage id=m" + postID + ">" + (comment || '') + "</blockquote> ") + '</div>'
      });
      _ref = $$('.quotelink', container);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quote = _ref[_i];
        href = quote.getAttribute('href');
        if (href[0] === '/') {
          continue;
        }
        quote.href = "/" + boardID + "/res/" + href;
      }
      return container;
    }
  };

  Get = {
    threadExcerpt: function(thread) {
      var OP, excerpt, _ref;

      OP = thread.OP;
      excerpt = ((_ref = OP.info.subject) != null ? _ref.trim() : void 0) || OP.info.comment.replace(/\n+/g, ' // ') || Conf['Anonymize'] && 'Anonymous' || $('.nameBlock', OP.nodes.info).textContent.trim();
      if (excerpt.length > 70) {
        excerpt = "" + excerpt.slice(0, 67) + "...";
      }
      return "/" + thread.board + "/ - " + excerpt;
    },
    postFromRoot: function(root) {
      var boardID, index, link, post, postID;

      link = $('a[title="Highlight this post"]', root);
      boardID = link.pathname.split('/')[1];
      postID = link.hash.slice(2);
      index = root.dataset.clone;
      post = g.posts["" + boardID + "." + postID];
      if (index) {
        return post.clones[index];
      } else {
        return post;
      }
    },
    postFromNode: function(root) {
      return Get.postFromRoot($.x('ancestor::div[contains(@class,"postContainer")][1]', root));
    },
    contextFromLink: function(quotelink) {
      return Get.postFromRoot($.x('ancestor::div[parent::div[@class="thread"]][1]', quotelink));
    },
    postDataFromLink: function(link) {
      var boardID, path, postID, threadID;

      if (link.hostname === 'boards.4chan.org') {
        path = link.pathname.split('/');
        boardID = path[1];
        threadID = path[3];
        postID = link.hash.slice(2);
      } else {
        boardID = link.dataset.boardid;
        threadID = link.dataset.threadid || 0;
        postID = link.dataset.postid;
      }
      return {
        boardID: boardID,
        threadID: +threadID,
        postID: +postID
      };
    },
    allQuotelinksLinkingTo: function(post) {
      var ID, quote, quotedPost, quotelinks, quoterPost, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;

      quotelinks = [];
      _ref = g.posts;
      for (ID in _ref) {
        quoterPost = _ref[ID];
        if (quoterPost.quotes.contains(post.fullID)) {
          _ref1 = [quoterPost].concat(quoterPost.clones);
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            quoterPost = _ref1[_i];
            quotelinks.push.apply(quotelinks, quoterPost.nodes.quotelinks);
          }
        }
      }
      if (Conf['Quote Backlinks']) {
        _ref2 = post.quotes;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          quote = _ref2[_j];
          if (!(quotedPost = g.posts[quote])) {
            continue;
          }
          _ref3 = [quotedPost].concat(quotedPost.clones);
          for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
            quotedPost = _ref3[_k];
            quotelinks.push.apply(quotelinks, __slice.call(quotedPost.nodes.backlinks));
          }
        }
      }
      return quotelinks.filter(function(quotelink) {
        var boardID, postID, _ref4;

        _ref4 = Get.postDataFromLink(quotelink), boardID = _ref4.boardID, postID = _ref4.postID;
        return boardID === post.board.ID && postID === post.ID;
      });
    },
    postClone: function(boardID, threadID, postID, root, context) {
      var post, url;

      if (post = g.posts["" + boardID + "." + postID]) {
        Get.insert(post, root, context);
        return;
      }
      root.textContent = "Loading post No." + postID + "...";
      if (threadID) {
        return $.cache("//api.4chan.org/" + boardID + "/res/" + threadID + ".json", function() {
          return Get.fetchedPost(this, boardID, threadID, postID, root, context);
        });
      } else if (url = Redirect.post(boardID, postID)) {
        return $.cache(url, function() {
          return Get.archivedPost(this, boardID, postID, root, context);
        });
      }
    },
    insert: function(post, root, context) {
      var clone, nodes;

      if (!root.parentNode) {
        return;
      }
      clone = post.addClone(context);
      Main.callbackNodes(Post, [clone]);
      nodes = clone.nodes;
      $.rmAll(nodes.root);
      $.add(nodes.root, nodes.post);
      $.rmAll(root);
      return $.add(root, nodes.root);
    },
    fetchedPost: function(req, boardID, threadID, postID, root, context) {
      var board, post, posts, status, thread, url, _i, _len;

      if (post = g.posts["" + boardID + "." + postID]) {
        Get.insert(post, root, context);
        return;
      }
      status = req.status;
      if (![200, 304].contains(status)) {
        if (url = Redirect.post(boardID, postID)) {
          $.cache(url, function() {
            return Get.archivedPost(this, boardID, postID, root, context);
          });
        } else {
          $.addClass(root, 'warning');
          root.textContent = status === 404 ? "Thread No." + threadID + " 404'd." : "Error " + req.statusText + " (" + req.status + ").";
        }
        return;
      }
      posts = JSON.parse(req.response).posts;
      Build.spoilerRange[boardID] = posts[0].custom_spoiler;
      for (_i = 0, _len = posts.length; _i < _len; _i++) {
        post = posts[_i];
        if (post.no === postID) {
          break;
        }
        if (post.no > postID) {
          if (url = Redirect.post(boardID, postID)) {
            $.cache(url, function() {
              return Get.archivedPost(this, boardID, postID, root, context);
            });
          } else {
            $.addClass(root, 'warning');
            root.textContent = "Post No." + postID + " was not found.";
          }
          return;
        }
      }
      board = g.boards[boardID] || new Board(boardID);
      thread = g.threads["" + boardID + "." + threadID] || new Thread(threadID, board);
      post = new Post(Build.postFromObject(post, boardID), thread, board);
      Main.callbackNodes(Post, [post]);
      return Get.insert(post, root, context);
    },
    archivedPost: function(req, boardID, postID, root, context) {
      var board, bq, comment, data, o, post, thread, threadID, _ref;

      if (post = g.posts["" + boardID + "." + postID]) {
        Get.insert(post, root, context);
        return;
      }
      data = JSON.parse(req.response);
      if (data.error) {
        $.addClass(root, 'warning');
        root.textContent = data.error;
        return;
      }
      bq = $.el('blockquote', {
        textContent: data.comment
      });
      bq.innerHTML = bq.innerHTML.replace(/\n|\[\/?b\]|\[\/?spoiler\]|\[\/?code\]|\[\/?moot\]|\[\/?banned\]/g, function(text) {
        switch (text) {
          case '\n':
            return '<br>';
          case '[b]':
            return '<b>';
          case '[/b]':
            return '</b>';
          case '[spoiler]':
            return '<span class=spoiler>';
          case '[/spoiler]':
            return '</span>';
          case '[code]':
            return '<pre class=prettyprint>';
          case '[/code]':
            return '</pre>';
          case '[moot]':
            return '<div style="padding:5px;margin-left:.5em;border-color:#faa;border:2px dashed rgba(255,0,0,.1);border-radius:2px">';
          case '[/moot]':
            return '</div>';
          case '[banned]':
            return '<b style="color: red;">';
          case '[/banned]':
            return '</b>';
        }
      });
      comment = bq.innerHTML.replace(/(^|>)(&gt;[^<$]*)(<|$)/g, '$1<span class=quote>$2</span>$3').replace(/((&gt;){2}(&gt;\/[a-z\d]+\/)?\d+)/g, '<span class=deadlink>$1</span>');
      threadID = data.thread_num;
      o = {
        postID: "" + postID,
        threadID: "" + threadID,
        boardID: boardID,
        name: data.name_processed,
        capcode: (function() {
          switch (data.capcode) {
            case 'M':
              return 'mod';
            case 'A':
              return 'admin';
            case 'D':
              return 'developer';
          }
        })(),
        tripcode: data.trip,
        uniqueID: data.poster_hash,
        email: data.email ? encodeURI(data.email) : '',
        subject: data.title_processed,
        flagCode: data.poster_country,
        flagName: data.poster_country_name_processed,
        date: data.fourchan_date,
        dateUTC: data.timestamp,
        comment: comment
      };
      if ((_ref = data.media) != null ? _ref.media_filename : void 0) {
        o.file = {
          name: data.media.media_filename_processed,
          timestamp: data.media.media_orig,
          url: data.media.media_link || data.media.remote_media_link,
          height: data.media.media_h,
          width: data.media.media_w,
          MD5: data.media.media_hash,
          size: data.media.media_size,
          turl: data.media.thumb_link || ("//thumbs.4chan.org/" + boardID + "/thumb/" + data.media.preview_orig),
          theight: data.media.preview_h,
          twidth: data.media.preview_w,
          isSpoiler: data.media.spoiler === '1'
        };
      }
      board = g.boards[boardID] || new Board(boardID);
      thread = g.threads["" + boardID + "." + threadID] || new Thread(threadID, board);
      post = new Post(Build.post(o, true), thread, board, {
        isArchived: true
      });
      Main.callbackNodes(Post, [post]);
      return Get.insert(post, root, context);
    }
  };

  UI = (function() {
    var Menu, dialog, drag, dragend, dragstart, hover, hoverend, hoverstart, touchend, touchmove;

    dialog = function(id, position, html) {
      var child, el, move, _i, _len, _ref;

      el = $.el('div', {
        className: 'dialog',
        innerHTML: html,
        id: id
      });
      el.style.cssText = position;
      $.get("" + id + ".position", position, function(item) {
        return el.style.cssText = item["" + id + ".position"];
      });
      move = $('.move', el);
      $.on(move, 'touchstart mousedown', dragstart);
      _ref = move.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (!child.tagName) {
          continue;
        }
        $.on(child, 'touchstart mousedown', function(e) {
          return e.stopPropagation();
        });
      }
      return el;
    };
    Menu = (function() {
      var close, currentMenu, lastToggledButton;

      currentMenu = null;

      lastToggledButton = null;

      function Menu(type) {
        this.type = type;
        $.on(d, 'AddMenuEntry', this.addEntry.bind(this));
        this.close = close.bind(this);
        this.entries = [];
      }

      Menu.prototype.makeMenu = function() {
        var menu;

        menu = $.el('div', {
          className: 'dialog',
          id: 'menu',
          tabIndex: 0
        });
        $.on(menu, 'click', function(e) {
          return e.stopPropagation();
        });
        $.on(menu, 'keydown', this.keybinds.bind(this));
        return menu;
      };

      Menu.prototype.toggle = function(e, button, data) {
        var previousButton;

        e.preventDefault();
        e.stopPropagation();
        if (currentMenu) {
          previousButton = lastToggledButton;
          this.close();
          if (previousButton === button) {
            return;
          }
        }
        if (!this.entries.length) {
          return;
        }
        return this.open(button, data);
      };

      Menu.prototype.open = function(button, data) {
        var bLeft, bRect, bTop, bottom, cHeight, cWidth, entry, left, mRect, menu, right, style, top, _i, _len, _ref, _ref1, _ref2;

        menu = this.makeMenu();
        currentMenu = menu;
        lastToggledButton = button;
        this.entries.sort(function(first, second) {
          return first.order - second.order;
        });
        _ref = this.entries;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entry = _ref[_i];
          this.insertEntry(entry, menu, data);
        }
        $.on(d, 'click', this.close);
        $.on(d, 'CloseMenu', this.close);
        $.add(Header.hover, menu);
        mRect = menu.getBoundingClientRect();
        bRect = button.getBoundingClientRect();
        bTop = doc.scrollTop + d.body.scrollTop + bRect.top;
        bLeft = doc.scrollLeft + d.body.scrollLeft + bRect.left;
        cHeight = doc.clientHeight;
        cWidth = doc.clientWidth;
        _ref1 = bRect.top + bRect.height + mRect.height < cHeight ? [bRect.bottom, null] : [null, cHeight - bRect.top], top = _ref1[0], bottom = _ref1[1];
        _ref2 = bRect.left + mRect.width < cWidth ? [bRect.left, null] : [null, cWidth - bRect.right], left = _ref2[0], right = _ref2[1];
        style = menu.style;
        style.top = "" + top + "px";
        style.right = "" + right + "px";
        style.bottom = "" + bottom + "px";
        style.left = "" + left + "px";
        if (right) {
          $.addClass(menu, 'left');
        }
        entry = $('.entry', menu);
        this.focus(entry);
        return menu.focus();
      };

      Menu.prototype.insertEntry = function(entry, parent, data) {
        var subEntry, submenu, _i, _len, _ref;

        if (typeof entry.open === 'function') {
          if (!entry.open(data)) {
            return;
          }
        }
        $.add(parent, entry.el);
        if (!entry.subEntries) {
          return;
        }
        if (submenu = $('.submenu', entry.el)) {
          $.rm(submenu);
        }
        submenu = $.el('div', {
          className: 'dialog submenu'
        });
        _ref = entry.subEntries;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subEntry = _ref[_i];
          this.insertEntry(subEntry, submenu, data);
        }
        $.add(entry.el, submenu);
      };

      close = function() {
        $.rm(currentMenu);
        currentMenu = null;
        lastToggledButton = null;
        return $.off(d, 'click CloseMenu', this.close);
      };

      Menu.prototype.findNextEntry = function(entry, direction) {
        var entries;

        entries = __slice.call(entry.parentNode.children);
        entries.sort(function(first, second) {
          return +(first.style.order || first.style.webkitOrder) - +(second.style.order || second.style.webkitOrder);
        });
        return entries[entries.indexOf(entry) + direction];
      };

      Menu.prototype.keybinds = function(e) {
        var entry, next, nextPrev, subEntry, submenu;

        entry = $('.focused', currentMenu);
        while (subEntry = $('.focused', entry)) {
          entry = subEntry;
        }
        switch (e.keyCode) {
          case 27:
            lastToggledButton.focus();
            this.close();
            break;
          case 13:
          case 32:
            entry.click();
            break;
          case 38:
            if (next = this.findNextEntry(entry, -1)) {
              this.focus(next);
            }
            break;
          case 40:
            if (next = this.findNextEntry(entry, +1)) {
              this.focus(next);
            }
            break;
          case 39:
            if ((submenu = $('.submenu', entry)) && (next = submenu.firstElementChild)) {
              while (nextPrev = this.findNextEntry(next, -1)) {
                next = nextPrev;
              }
              this.focus(next);
            }
            break;
          case 37:
            if (next = $.x('parent::*[contains(@class,"submenu")]/parent::*', entry)) {
              this.focus(next);
            }
            break;
          default:
            return;
        }
        e.preventDefault();
        return e.stopPropagation();
      };

      Menu.prototype.focus = function(entry) {
        var bottom, cHeight, cWidth, eRect, focused, left, right, sRect, style, submenu, top, _i, _len, _ref, _ref1, _ref2;

        while (focused = $.x('parent::*/child::*[contains(@class,"focused")]', entry)) {
          $.rmClass(focused, 'focused');
        }
        _ref = $$('.focused', entry);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          focused = _ref[_i];
          $.rmClass(focused, 'focused');
        }
        $.addClass(entry, 'focused');
        if (!(submenu = $('.submenu', entry))) {
          return;
        }
        sRect = submenu.getBoundingClientRect();
        eRect = entry.getBoundingClientRect();
        cHeight = doc.clientHeight;
        cWidth = doc.clientWidth;
        _ref1 = eRect.top + sRect.height < cHeight ? ['0px', 'auto'] : ['auto', '0px'], top = _ref1[0], bottom = _ref1[1];
        _ref2 = eRect.right + sRect.width < cWidth ? ['100%', 'auto'] : ['auto', '100%'], left = _ref2[0], right = _ref2[1];
        style = submenu.style;
        style.top = top;
        style.bottom = bottom;
        style.left = left;
        return style.right = right;
      };

      Menu.prototype.addEntry = function(e) {
        var entry;

        entry = e.detail;
        if (entry.type !== this.type) {
          return;
        }
        this.parseEntry(entry);
        return this.entries.push(entry);
      };

      Menu.prototype.parseEntry = function(entry) {
        var el, style, subEntries, subEntry, _i, _len;

        el = entry.el, subEntries = entry.subEntries;
        $.addClass(el, 'entry');
        $.on(el, 'focus mouseover', (function(e) {
          e.stopPropagation();
          return this.focus(el);
        }).bind(this));
        style = el.style;
        style.webkitOrder = style.order = entry.order || 100;
        if (!subEntries) {
          return;
        }
        $.addClass(el, 'has-submenu');
        for (_i = 0, _len = subEntries.length; _i < _len; _i++) {
          subEntry = subEntries[_i];
          this.parseEntry(subEntry);
        }
      };

      return Menu;

    })();
    dragstart = function(e) {
      var el, isTouching, o, rect, screenHeight, screenWidth, _ref;

      if (e.type === 'mousedown' && e.button !== 0) {
        return;
      }
      e.preventDefault();
      if (isTouching = e.type === 'touchstart') {
        e = e.changedTouches[e.changedTouches.length - 1];
      }
      el = $.x('ancestor::div[contains(@class,"dialog")][1]', this);
      rect = el.getBoundingClientRect();
      screenHeight = doc.clientHeight;
      screenWidth = doc.clientWidth;
      o = {
        id: el.id,
        style: el.style,
        dx: e.clientX - rect.left,
        dy: e.clientY - rect.top,
        height: screenHeight - rect.height,
        width: screenWidth - rect.width,
        screenHeight: screenHeight,
        screenWidth: screenWidth,
        isTouching: isTouching
      };
      _ref = Conf['Header auto-hide'] ? [0, 0] : Conf['Bottom Header'] ? [0, Header.bar.getBoundingClientRect().height] : [Header.bar.getBoundingClientRect().height, 0], o.topBorder = _ref[0], o.bottomBorder = _ref[1];
      if (isTouching) {
        o.identifier = e.identifier;
        o.move = touchmove.bind(o);
        o.up = touchend.bind(o);
        $.on(d, 'touchmove', o.move);
        return $.on(d, 'touchend touchcancel', o.up);
      } else {
        o.move = drag.bind(o);
        o.up = dragend.bind(o);
        $.on(d, 'mousemove', o.move);
        return $.on(d, 'mouseup', o.up);
      }
    };
    touchmove = function(e) {
      var touch, _i, _len, _ref;

      _ref = e.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
        if (touch.identifier === this.identifier) {
          drag.call(this, touch);
          return;
        }
      }
    };
    drag = function(e) {
      var bottom, clientX, clientY, left, right, style, top;

      clientX = e.clientX, clientY = e.clientY;
      left = clientX - this.dx;
      left = left < 10 ? 0 : this.width - left < 10 ? null : left / this.screenWidth * 100 + '%';
      top = clientY - this.dy;
      top = top < (10 + this.topBorder) ? this.topBorder + 'px' : this.height - top < (10 + this.bottomBorder) ? null : top / this.screenHeight * 100 + '%';
      right = left === null ? 0 : null;
      bottom = top === null ? this.bottomBorder + 'px' : null;
      style = this.style;
      style.left = left;
      style.right = right;
      style.top = top;
      return style.bottom = bottom;
    };
    touchend = function(e) {
      var touch, _i, _len, _ref;

      _ref = e.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
        if (touch.identifier === this.identifier) {
          dragend.call(this);
          return;
        }
      }
    };
    dragend = function() {
      if (this.isTouching) {
        $.off(d, 'touchmove', this.move);
        $.off(d, 'touchend touchcancel', this.up);
      } else {
        $.off(d, 'mousemove', this.move);
        $.off(d, 'mouseup', this.up);
      }
      return $.set("" + this.id + ".position", this.style.cssText);
    };
    hoverstart = function(_arg) {
      var asapTest, cb, el, endEvents, latestEvent, o, root;

      root = _arg.root, el = _arg.el, latestEvent = _arg.latestEvent, endEvents = _arg.endEvents, asapTest = _arg.asapTest, cb = _arg.cb;
      o = {
        root: root,
        el: el,
        style: el.style,
        cb: cb,
        endEvents: endEvents,
        latestEvent: latestEvent,
        clientHeight: doc.clientHeight,
        clientWidth: doc.clientWidth
      };
      o.hover = hover.bind(o);
      o.hoverend = hoverend.bind(o);
      $.asap(function() {
        return !el.parentNode || asapTest();
      }, function() {
        if (el.parentNode) {
          return o.hover(o.latestEvent);
        }
      });
      $.on(root, endEvents, o.hoverend);
      return $.on(root, 'mousemove', o.hover);
    };
    hover = function(e) {
      var clientX, clientY, height, left, right, style, top, _ref;

      this.latestEvent = e;
      height = this.el.offsetHeight;
      clientX = e.clientX, clientY = e.clientY;
      top = clientY - 120;
      top = this.clientHeight <= height || top <= 0 ? 0 : top + height >= this.clientHeight ? this.clientHeight - height : top;
      _ref = clientX <= this.clientWidth - 400 ? [clientX + 45 + 'px', null] : [null, this.clientWidth - clientX + 45 + 'px'], left = _ref[0], right = _ref[1];
      style = this.style;
      style.top = top + 'px';
      style.left = left;
      return style.right = right;
    };
    hoverend = function() {
      $.rm(this.el);
      $.off(this.root, this.endEvents, this.hoverend);
      $.off(this.root, 'mousemove', this.hover);
      if (this.cb) {
        return this.cb.call(this);
      }
    };
    return {
      dialog: dialog,
      Menu: Menu,
      hover: hoverstart
    };
  })();

  Anonymize = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Anonymize']) {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Anonymize',
        cb: this.node
      });
    },
    node: function() {
      var email, name, tripcode, _ref;

      if (this.info.capcode || this.isClone) {
        return;
      }
      _ref = this.nodes, name = _ref.name, tripcode = _ref.tripcode, email = _ref.email;
      if (this.info.name !== 'Anonymous') {
        name.textContent = 'Anonymous';
      }
      if (tripcode) {
        $.rm(tripcode);
        delete this.nodes.tripcode;
      }
      if (this.info.email) {
        if (/sage/i.test(this.info.email)) {
          return email.href = 'mailto:sage';
        } else {
          $.replace(email, name);
          return delete this.nodes.email;
        }
      }
    }
  };

  Filter = {
    filters: {},
    init: function() {
      var boards, err, filter, hl, key, op, regexp, stub, top, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;

      if (g.VIEW === 'catalog' || !Conf['Filter']) {
        return;
      }
      for (key in Config.filter) {
        this.filters[key] = [];
        _ref = Conf[key].split('\n');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          filter = _ref[_i];
          if (filter[0] === '#') {
            continue;
          }
          if (!(regexp = filter.match(/\/(.+)\/(\w*)/))) {
            continue;
          }
          filter = filter.replace(regexp[0], '');
          boards = ((_ref1 = filter.match(/boards:([^;]+)/)) != null ? _ref1[1].toLowerCase() : void 0) || 'global';
          if (boards !== 'global' && !(boards.split(',')).contains(g.BOARD.ID)) {
            continue;
          }
          if (['uniqueID', 'MD5'].contains(key)) {
            regexp = regexp[1];
          } else {
            try {
              regexp = RegExp(regexp[1], regexp[2]);
            } catch (_error) {
              err = _error;
              new Notification('warning', err.message, 60);
              continue;
            }
          }
          op = ((_ref2 = filter.match(/[^t]op:(yes|no|only)/)) != null ? _ref2[1] : void 0) || 'yes';
          stub = (function() {
            var _ref3;

            switch ((_ref3 = filter.match(/stub:(yes|no)/)) != null ? _ref3[1] : void 0) {
              case 'yes':
                return true;
              case 'no':
                return false;
              default:
                return Conf['Stubs'];
            }
          })();
          if (hl = /highlight/.test(filter)) {
            hl = ((_ref3 = filter.match(/highlight:(\w+)/)) != null ? _ref3[1] : void 0) || 'filter-highlight';
            top = ((_ref4 = filter.match(/top:(yes|no)/)) != null ? _ref4[1] : void 0) || 'yes';
            top = top === 'yes';
          }
          this.filters[key].push(this.createFilter(regexp, op, stub, hl, top));
        }
        if (!this.filters[key].length) {
          delete this.filters[key];
        }
      }
      if (!Object.keys(this.filters).length) {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Filter',
        cb: this.node
      });
    },
    createFilter: function(regexp, op, stub, hl, top) {
      var settings, test;

      test = typeof regexp === 'string' ? function(value) {
        return regexp === value;
      } : function(value) {
        return regexp.test(value);
      };
      settings = {
        hide: !hl,
        stub: stub,
        "class": hl,
        top: top
      };
      return function(value, isReply) {
        if (isReply && op === 'only' || !isReply && op === 'no') {
          return false;
        }
        if (!test(value)) {
          return false;
        }
        return settings;
      };
    },
    node: function() {
      var filter, firstThread, key, result, thisThread, value, _i, _len, _ref;

      if (this.isClone) {
        return;
      }
      for (key in Filter.filters) {
        value = Filter[key](this);
        if (value === false) {
          continue;
        }
        _ref = Filter.filters[key];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          filter = _ref[_i];
          if (!(result = filter(value, this.isReply))) {
            continue;
          }
          if (result.hide) {
            if (this.isReply) {
              PostHiding.hide(this, result.stub);
            } else if (g.VIEW === 'index') {
              ThreadHiding.hide(this.thread, result.stub);
            } else {
              continue;
            }
            return;
          }
          $.addClass(this.nodes.root, result["class"]);
          if (!this.isReply && result.top && g.VIEW === 'index') {
            thisThread = this.nodes.root.parentNode;
            if (firstThread = $('div[class="postContainer opContainer"]')) {
              if (firstThread !== this.nodes.root) {
                $.before(firstThread.parentNode, [thisThread, thisThread.nextElementSibling]);
              }
            }
          }
        }
      }
    },
    name: function(post) {
      if ('name' in post.info) {
        return post.info.name;
      }
      return false;
    },
    uniqueID: function(post) {
      if ('uniqueID' in post.info) {
        return post.info.uniqueID;
      }
      return false;
    },
    tripcode: function(post) {
      if ('tripcode' in post.info) {
        return post.info.tripcode;
      }
      return false;
    },
    capcode: function(post) {
      if ('capcode' in post.info) {
        return post.info.capcode;
      }
      return false;
    },
    email: function(post) {
      if ('email' in post.info) {
        return post.info.email;
      }
      return false;
    },
    subject: function(post) {
      if ('subject' in post.info) {
        return post.info.subject || false;
      }
      return false;
    },
    comment: function(post) {
      if ('comment' in post.info) {
        return post.info.comment;
      }
      return false;
    },
    flag: function(post) {
      if ('flag' in post.info) {
        return post.info.flag;
      }
      return false;
    },
    filename: function(post) {
      if (post.file) {
        return post.file.name;
      }
      return false;
    },
    dimensions: function(post) {
      if (post.file && post.file.isImage) {
        return post.file.dimensions;
      }
      return false;
    },
    filesize: function(post) {
      if (post.file) {
        return post.file.size;
      }
      return false;
    },
    MD5: function(post) {
      if (post.file) {
        return post.file.MD5;
      }
      return false;
    },
    menu: {
      init: function() {
        var div, entry, type, _i, _len, _ref;

        if (g.VIEW === 'catalog' || !Conf['Menu'] || !Conf['Filter']) {
          return;
        }
        div = $.el('div', {
          textContent: 'Filter'
        });
        entry = {
          type: 'post',
          el: div,
          order: 50,
          open: function(post) {
            Filter.menu.post = post;
            return true;
          },
          subEntries: []
        };
        _ref = [['Name', 'name'], ['Unique ID', 'uniqueID'], ['Tripcode', 'tripcode'], ['Capcode', 'capcode'], ['E-mail', 'email'], ['Subject', 'subject'], ['Comment', 'comment'], ['Flag', 'flag'], ['Filename', 'filename'], ['Image dimensions', 'dimensions'], ['Filesize', 'filesize'], ['Image MD5', 'MD5']];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          type = _ref[_i];
          entry.subEntries.push(Filter.menu.createSubEntry(type[0], type[1]));
        }
        return $.event('AddMenuEntry', entry);
      },
      createSubEntry: function(text, type) {
        var el;

        el = $.el('a', {
          href: 'javascript:;',
          textContent: text
        });
        el.setAttribute('data-type', type);
        $.on(el, 'click', Filter.menu.makeFilter);
        return {
          el: el,
          open: function(post) {
            var value;

            value = Filter[type](post);
            return value !== false;
          }
        };
      },
      makeFilter: function() {
        var re, type, value;

        type = this.dataset.type;
        value = Filter[type](Filter.menu.post);
        re = ['uniqueID', 'MD5'].contains(type) ? value : value.replace(/\/|\\|\^|\$|\n|\.|\(|\)|\{|\}|\[|\]|\?|\*|\+|\|/g, function(c) {
          if (c === '\n') {
            return '\\n';
          } else if (c === '\\') {
            return '\\\\';
          } else {
            return "\\" + c;
          }
        });
        re = ['uniqueID', 'MD5'].contains(type) ? "/" + re + "/" : "/^" + re + "$/";
        return $.get(type, Conf[type], function(item) {
          var save, section, select, ta, tl;

          save = item[type];
          save = save ? "" + save + "\n" + re : re;
          $.set(type, save);
          Settings.open('Filter');
          section = $('.section-container');
          select = $('select[name=filter]', section);
          select.value = type;
          Settings.selectFilter.call(select);
          ta = $('textarea', section);
          tl = ta.textLength;
          ta.setSelectionRange(tl, tl);
          return ta.focus();
        });
      }
    }
  };

  PostHiding = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Reply Hiding Buttons'] && !Conf['Reply Hiding Link']) {
        return;
      }
      this.db = new DataBoard('hiddenPosts');
      return Post.prototype.callbacks.push({
        name: 'Reply Hiding',
        cb: this.node
      });
    },
    node: function() {
      var data;

      if (!this.isReply || this.isClone) {
        return;
      }
      if (data = PostHiding.db.get({
        boardID: this.board.ID,
        threadID: this.thread.ID,
        postID: this.ID
      })) {
        if (data.thisPost) {
          PostHiding.hide(this, data.makeStub, data.hideRecursively);
        } else {
          Recursive.apply(PostHiding.hide, this, data.makeStub, true);
          Recursive.add(PostHiding.hide, this, data.makeStub, true);
        }
      }
      if (!Conf['Reply Hiding Buttons']) {
        return;
      }
      return $.replace($('.sideArrows', this.nodes.root), PostHiding.makeButton(this, 'hide'));
    },
    menu: {
      init: function() {
        var apply, div, makeStub, replies, thisPost;

        if (g.VIEW === 'catalog' || !Conf['Menu'] || !Conf['Reply Hiding Link']) {
          return;
        }
        div = $.el('div', {
          className: 'hide-reply-link',
          textContent: 'Hide reply'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', PostHiding.menu.hide);
        thisPost = $.el('label', {
          innerHTML: '<input type=checkbox name=thisPost checked> This post'
        });
        replies = $.el('label', {
          innerHTML: "<input type=checkbox name=replies  checked=" + Conf['Recursive Hiding'] + "> Hide replies"
        });
        makeStub = $.el('label', {
          innerHTML: "<input type=checkbox name=makeStub checked=" + Conf['Stubs'] + "> Make stub"
        });
        $.event('AddMenuEntry', {
          type: 'post',
          el: div,
          order: 20,
          open: function(post) {
            if (!post.isReply || post.isClone || post.isHidden) {
              return false;
            }
            PostHiding.menu.post = post;
            return true;
          },
          subEntries: [
            {
              el: apply
            }, {
              el: thisPost
            }, {
              el: replies
            }, {
              el: makeStub
            }
          ]
        });
        div = $.el('div', {
          className: 'show-reply-link',
          textContent: 'Show reply'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', PostHiding.menu.show);
        thisPost = $.el('label', {
          innerHTML: '<input type=checkbox name=thisPost> This post'
        });
        replies = $.el('label', {
          innerHTML: "<input type=checkbox name=replies> Show replies"
        });
        return $.event('AddMenuEntry', {
          type: 'post',
          el: div,
          order: 20,
          open: function(post) {
            var data;

            if (!post.isReply || post.isClone || !post.isHidden) {
              return false;
            }
            if (!(data = PostHiding.db.get({
              boardID: post.board.ID,
              threadID: post.thread.ID,
              postID: post.ID
            }))) {
              return false;
            }
            PostHiding.menu.post = post;
            thisPost.firstChild.checked = post.isHidden;
            replies.firstChild.checked = (data != null ? data.hideRecursively : void 0) != null ? data.hideRecursively : Conf['Recursive Hiding'];
            return true;
          },
          subEntries: [
            {
              el: apply
            }, {
              el: thisPost
            }, {
              el: replies
            }
          ]
        });
      },
      hide: function() {
        var makeStub, parent, post, replies, thisPost;

        parent = this.parentNode;
        thisPost = $('input[name=thisPost]', parent).checked;
        replies = $('input[name=replies]', parent).checked;
        makeStub = $('input[name=makeStub]', parent).checked;
        post = PostHiding.menu.post;
        if (thisPost) {
          PostHiding.hide(post, makeStub, replies);
        } else if (replies) {
          Recursive.apply(PostHiding.hide, post, makeStub, true);
          Recursive.add(PostHiding.hide, post, makeStub, true);
        } else {
          return;
        }
        PostHiding.saveHiddenState(post, true, thisPost, makeStub, replies);
        return $.event('CloseMenu');
      },
      show: function() {
        var data, parent, post, replies, thisPost;

        parent = this.parentNode;
        thisPost = $('input[name=thisPost]', parent).checked;
        replies = $('input[name=replies]', parent).checked;
        post = PostHiding.menu.post;
        if (thisPost) {
          PostHiding.show(post, replies);
        } else if (replies) {
          Recursive.apply(PostHiding.show, post, true);
          Recursive.rm(PostHiding.hide, post, true);
        } else {
          return;
        }
        if (data = PostHiding.db.get({
          boardID: post.board.ID,
          threadID: post.thread.ID,
          postID: post.ID
        })) {
          PostHiding.saveHiddenState(post, !(thisPost && replies), !thisPost, data.makeStub, !replies);
        }
        return $.event('CloseMenu');
      }
    },
    makeButton: function(post, type) {
      var a;

      a = $.el('a', {
        className: "" + type + "-reply-button",
        innerHTML: "<span>[&nbsp;" + (type === 'hide' ? '-' : '+') + "&nbsp;]</span>",
        href: 'javascript:;'
      });
      $.on(a, 'click', PostHiding.toggle);
      return a;
    },
    saveHiddenState: function(post, isHiding, thisPost, makeStub, hideRecursively) {
      var data;

      data = {
        boardID: post.board.ID,
        threadID: post.thread.ID,
        postID: post.ID
      };
      if (isHiding) {
        data.val = {
          thisPost: thisPost !== false,
          makeStub: makeStub,
          hideRecursively: hideRecursively
        };
        return PostHiding.db.set(data);
      } else {
        return PostHiding.db["delete"](data);
      }
    },
    toggle: function() {
      var post;

      post = Get.postFromNode(this);
      if (post.isHidden) {
        PostHiding.show(post);
      } else {
        PostHiding.hide(post);
      }
      return PostHiding.saveHiddenState(post, post.isHidden);
    },
    hide: function(post, makeStub, hideRecursively) {
      var a, postInfo, quotelink, _i, _len, _ref;

      if (makeStub == null) {
        makeStub = Conf['Stubs'];
      }
      if (hideRecursively == null) {
        hideRecursively = Conf['Recursive Hiding'];
      }
      if (post.isHidden) {
        return;
      }
      post.isHidden = true;
      if (hideRecursively) {
        Recursive.apply(PostHiding.hide, post, makeStub, true);
        Recursive.add(PostHiding.hide, post, makeStub, true);
      }
      _ref = Get.allQuotelinksLinkingTo(post);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        $.addClass(quotelink, 'filtered');
      }
      if (!makeStub) {
        post.nodes.root.hidden = true;
        return;
      }
      a = PostHiding.makeButton(post, 'show');
      postInfo = Conf['Anonymize'] ? 'Anonymous' : $('.nameBlock', post.nodes.info).textContent;
      $.add(a, $.tn(" " + postInfo));
      post.nodes.stub = $.el('div', {
        className: 'stub'
      });
      $.add(post.nodes.stub, a);
      if (Conf['Menu']) {
        $.add(post.nodes.stub, [$.tn(' '), Menu.makeButton(post)]);
      }
      return $.prepend(post.nodes.root, post.nodes.stub);
    },
    show: function(post, showRecursively) {
      var quotelink, _i, _len, _ref;

      if (showRecursively == null) {
        showRecursively = Conf['Recursive Hiding'];
      }
      if (post.nodes.stub) {
        $.rm(post.nodes.stub);
        delete post.nodes.stub;
      } else {
        post.nodes.root.hidden = false;
      }
      post.isHidden = false;
      if (showRecursively) {
        Recursive.apply(PostHiding.show, post, true);
        Recursive.rm(PostHiding.hide, post);
      }
      _ref = Get.allQuotelinksLinkingTo(post);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        $.rmClass(quotelink, 'filtered');
      }
    }
  };

  Recursive = {
    recursives: {},
    init: function() {
      if (g.VIEW === 'catalog') {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Recursive',
        cb: this.node
      });
    },
    node: function() {
      var i, obj, quote, recursive, _i, _j, _len, _len1, _ref, _ref1;

      if (this.isClone) {
        return;
      }
      _ref = this.quotes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quote = _ref[_i];
        if (obj = Recursive.recursives[quote]) {
          _ref1 = obj.recursives;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            recursive = _ref1[i];
            recursive.apply(null, [this].concat(__slice.call(obj.args[i])));
          }
        }
      }
    },
    add: function() {
      var args, obj, post, recursive, _base, _name;

      recursive = arguments[0], post = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      obj = (_base = Recursive.recursives)[_name = post.fullID] || (_base[_name] = {
        recursives: [],
        args: []
      });
      obj.recursives.push(recursive);
      return obj.args.push(args);
    },
    rm: function(recursive, post) {
      var i, obj, rec, _i, _len, _ref;

      if (!(obj = Recursive.recursives[post.fullID])) {
        return;
      }
      _ref = obj.recursives;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        rec = _ref[i];
        if (rec === recursive) {
          obj.recursives.splice(i, 1);
          obj.args.splice(i, 1);
        }
      }
    },
    apply: function() {
      var ID, args, fullID, post, recursive, _ref;

      recursive = arguments[0], post = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      fullID = post.fullID;
      _ref = g.posts;
      for (ID in _ref) {
        post = _ref[ID];
        if (post.quotes.contains(fullID)) {
          recursive.apply(null, [post].concat(__slice.call(args)));
        }
      }
    }
  };

  ThreadHiding = {
    init: function() {
      if (g.VIEW !== 'index' || !Conf['Thread Hiding Buttons'] && !Conf['Thread Hiding Link']) {
        return;
      }
      this.db = new DataBoard('hiddenThreads');
      this.syncCatalog();
      return Thread.prototype.callbacks.push({
        name: 'Thread Hiding',
        cb: this.node
      });
    },
    node: function() {
      var data;

      if (data = ThreadHiding.db.get({
        boardID: this.board.ID,
        threadID: this.ID
      })) {
        ThreadHiding.hide(this, data.makeStub);
      }
      if (!Conf['Thread Hiding Buttons']) {
        return;
      }
      return $.prepend(this.OP.nodes.root, ThreadHiding.makeButton(this, 'hide'));
    },
    syncCatalog: function() {
      var e, hiddenThreads, hiddenThreadsOnCatalog, threadID;

      hiddenThreads = ThreadHiding.db.get({
        boardID: g.BOARD.ID,
        defaultValue: {}
      });
      try {
        hiddenThreadsOnCatalog = JSON.parse(localStorage.getItem("4chan-hide-t-" + g.BOARD)) || {};
      } catch (_error) {
        e = _error;
        localStorage.setItem("4chan-hide-t-" + g.BOARD, JSON.stringify({}));
        return ThreadHiding.syncCatalog();
      }
      for (threadID in hiddenThreadsOnCatalog) {
        if (!(threadID in hiddenThreads)) {
          hiddenThreads[threadID] = {};
        }
      }
      for (threadID in hiddenThreads) {
        if (!(threadID in hiddenThreadsOnCatalog)) {
          delete hiddenThreads[threadID];
        }
      }
      if ((ThreadHiding.db.data.lastChecked || 0) > Date.now() - $.MINUTE) {
        ThreadHiding.cleanCatalog(hiddenThreadsOnCatalog);
      }
      return ThreadHiding.db.set({
        boardID: g.BOARD.ID,
        val: hiddenThreads
      });
    },
    cleanCatalog: function(hiddenThreadsOnCatalog) {
      return $.cache("//api.4chan.org/" + g.BOARD + "/threads.json", function() {
        var page, thread, threads, _i, _j, _len, _len1, _ref, _ref1;

        if (this.status !== 200) {
          return;
        }
        threads = {};
        _ref = JSON.parse(this.response);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          page = _ref[_i];
          _ref1 = page.threads;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            thread = _ref1[_j];
            if (thread.no in hiddenThreadsOnCatalog) {
              threads[thread.no] = hiddenThreadsOnCatalog[thread.no];
            }
          }
        }
        if (Object.keys(threads).length) {
          return localStorage.setItem("4chan-hide-t-" + g.BOARD, JSON.stringify(threads));
        } else {
          return localStorage.removeItem("4chan-hide-t-" + g.BOARD);
        }
      });
    },
    menu: {
      init: function() {
        var apply, div, makeStub;

        if (g.VIEW !== 'index' || !Conf['Menu'] || !Conf['Thread Hiding Link']) {
          return;
        }
        div = $.el('div', {
          className: 'hide-thread-link',
          textContent: 'Hide thread'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', ThreadHiding.menu.hide);
        makeStub = $.el('label', {
          innerHTML: "<input type=checkbox checked=" + Conf['Stubs'] + "> Make stub"
        });
        return $.event('AddMenuEntry', {
          type: 'post',
          el: div,
          order: 20,
          open: function(_arg) {
            var isReply, thread;

            thread = _arg.thread, isReply = _arg.isReply;
            if (isReply || thread.isHidden) {
              return false;
            }
            ThreadHiding.menu.thread = thread;
            return true;
          },
          subEntries: [
            {
              el: apply
            }, {
              el: makeStub
            }
          ]
        });
      },
      hide: function() {
        var makeStub, thread;

        makeStub = $('input', this.parentNode).checked;
        thread = ThreadHiding.menu.thread;
        ThreadHiding.hide(thread, makeStub);
        ThreadHiding.saveHiddenState(thread, makeStub);
        return $.event('CloseMenu');
      }
    },
    makeButton: function(thread, type) {
      var a;

      a = $.el('a', {
        className: "" + type + "-thread-button",
        innerHTML: "<span>[&nbsp;" + (type === 'hide' ? '-' : '+') + "&nbsp;]</span>",
        href: 'javascript:;'
      });
      a.setAttribute('data-fullid', thread.fullID);
      $.on(a, 'click', ThreadHiding.toggle);
      return a;
    },
    saveHiddenState: function(thread, makeStub) {
      var hiddenThreadsOnCatalog;

      hiddenThreadsOnCatalog = JSON.parse(localStorage.getItem("4chan-hide-t-" + g.BOARD)) || {};
      if (thread.isHidden) {
        ThreadHiding.db.set({
          boardID: thread.board.ID,
          threadID: thread.ID,
          val: {
            makeStub: makeStub
          }
        });
        hiddenThreadsOnCatalog[thread] = true;
      } else {
        ThreadHiding.db["delete"]({
          boardID: thread.board.ID,
          threadID: thread.ID
        });
        delete hiddenThreadsOnCatalog[thread];
      }
      return localStorage.setItem("4chan-hide-t-" + g.BOARD, JSON.stringify(hiddenThreadsOnCatalog));
    },
    toggle: function(thread) {
      if (!(thread instanceof Thread)) {
        thread = g.threads[this.dataset.fullid];
      }
      if (thread.isHidden) {
        ThreadHiding.show(thread);
      } else {
        ThreadHiding.hide(thread);
      }
      return ThreadHiding.saveHiddenState(thread);
    },
    hide: function(thread, makeStub) {
      var OP, a, numReplies, opInfo, span, threadRoot;

      if (makeStub == null) {
        makeStub = Conf['Stubs'];
      }
      if (thread.isHidden) {
        return;
      }
      OP = thread.OP;
      threadRoot = OP.nodes.root.parentNode;
      threadRoot.hidden = thread.isHidden = true;
      if (!makeStub) {
        threadRoot.nextElementSibling.hidden = true;
        return;
      }
      numReplies = 0;
      if (span = $('.summary', threadRoot)) {
        numReplies = +span.textContent.match(/\d+/);
      }
      numReplies += $$('.opContainer ~ .replyContainer', threadRoot).length;
      numReplies = numReplies === 1 ? '1 reply' : "" + numReplies + " replies";
      opInfo = Conf['Anonymize'] ? 'Anonymous' : $('.nameBlock', OP.nodes.info).textContent;
      a = ThreadHiding.makeButton(thread, 'show');
      $.add(a, $.tn(" " + opInfo + " (" + numReplies + ")"));
      thread.stub = $.el('div', {
        className: 'stub'
      });
      $.add(thread.stub, a);
      if (Conf['Menu']) {
        $.add(thread.stub, [$.tn(' '), Menu.makeButton(OP)]);
      }
      return $.before(threadRoot, thread.stub);
    },
    show: function(thread) {
      var threadRoot;

      if (thread.stub) {
        $.rm(thread.stub);
        delete thread.stub;
      }
      threadRoot = thread.OP.nodes.root.parentNode;
      return threadRoot.nextElementSibling.hidden = threadRoot.hidden = thread.isHidden = false;
    }
  };

  QuoteBacklink = {
    init: function() {
      var format;

      if (g.VIEW === 'catalog' || !Conf['Quote Backlinks']) {
        return;
      }
      format = Conf['backlink'].replace(/%id/g, "' + id + '");
      this.funk = Function('id', "return '" + format + "'");
      this.containers = {};
      Post.prototype.callbacks.push({
        name: 'Quote Backlinking Part 1',
        cb: this.firstNode
      });
      return Post.prototype.callbacks.push({
        name: 'Quote Backlinking Part 2',
        cb: this.secondNode
      });
    },
    firstNode: function() {
      var a, clone, container, containers, link, post, quote, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;

      if (this.isClone || !this.quotes.length) {
        return;
      }
      a = $.el('a', {
        href: "/" + this.board + "/res/" + this.thread + "#p" + this,
        className: this.isHidden ? 'filtered backlink' : 'backlink',
        textContent: (QuoteBacklink.funk(this.ID)) + (Conf['Mark Quotes of You'] && this.info.yours ? QuoteYou.text : '')
      });
      _ref = this.quotes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quote = _ref[_i];
        containers = [QuoteBacklink.getContainer(quote)];
        if ((post = g.posts[quote]) && post.nodes.backlinkContainer) {
          _ref1 = post.clones;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            clone = _ref1[_j];
            containers.push(clone.nodes.backlinkContainer);
          }
        }
        for (_k = 0, _len2 = containers.length; _k < _len2; _k++) {
          container = containers[_k];
          link = a.cloneNode(true);
          if (Conf['Quote Previewing']) {
            $.on(link, 'mouseover', QuotePreview.mouseover);
          }
          if (Conf['Quote Inlining']) {
            $.on(link, 'click', QuoteInline.toggle);
          }
          $.add(container, [$.tn(' '), link]);
        }
      }
    },
    secondNode: function() {
      var container;

      if (this.isClone && (this.origin.isReply || Conf['OP Backlinks'])) {
        this.nodes.backlinkContainer = $('.container', this.nodes.info);
        return;
      }
      if (!(this.isReply || Conf['OP Backlinks'])) {
        return;
      }
      container = QuoteBacklink.getContainer(this.fullID);
      this.nodes.backlinkContainer = container;
      return $.add(this.nodes.info, container);
    },
    getContainer: function(id) {
      var _base;

      return (_base = this.containers)[id] || (_base[id] = $.el('span', {
        className: 'container'
      }));
    }
  };

  QuoteCT = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Mark Cross-thread Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      this.text = '\u00A0(Cross-thread)';
      return Post.prototype.callbacks.push({
        name: 'Mark Cross-thread Quotes',
        cb: this.node
      });
    },
    node: function() {
      var board, boardID, quotelink, quotelinks, quotes, thread, threadID, _i, _len, _ref, _ref1;

      if (this.isClone && this.thread === this.context.thread) {
        return;
      }
      if (!(quotes = this.quotes).length) {
        return;
      }
      quotelinks = this.nodes.quotelinks;
      _ref = this.isClone ? this.context : this, board = _ref.board, thread = _ref.thread;
      for (_i = 0, _len = quotelinks.length; _i < _len; _i++) {
        quotelink = quotelinks[_i];
        _ref1 = Get.postDataFromLink(quotelink), boardID = _ref1.boardID, threadID = _ref1.threadID;
        if (!threadID) {
          continue;
        }
        if (this.isClone) {
          quotelink.textContent = quotelink.textContent.replace(QuoteCT.text, '');
        }
        if (boardID === this.board.ID && threadID !== thread.ID) {
          $.add(quotelink, $.tn(QuoteCT.text));
        }
      }
    }
  };

  QuoteInline = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Quote Inlining']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Post.prototype.callbacks.push({
        name: 'Quote Inlining',
        cb: this.node
      });
    },
    node: function() {
      var link, _i, _len, _ref;

      _ref = this.nodes.quotelinks.concat(__slice.call(this.nodes.backlinks));
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        $.on(link, 'click', QuoteInline.toggle);
      }
    },
    toggle: function(e) {
      var boardID, context, postID, threadID, _ref;

      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
        return;
      }
      e.preventDefault();
      _ref = Get.postDataFromLink(this), boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
      context = Get.contextFromLink(this);
      if ($.hasClass(this, 'inlined')) {
        QuoteInline.rm(this, boardID, threadID, postID, context);
      } else {
        if ($.x("ancestor::div[@id='p" + postID + "']", this)) {
          return;
        }
        QuoteInline.add(this, boardID, threadID, postID, context);
      }
      return this.classList.toggle('inlined');
    },
    findRoot: function(quotelink, isBacklink) {
      if (isBacklink) {
        return quotelink.parentNode.parentNode;
      } else {
        return $.x('ancestor-or-self::*[parent::blockquote][1]', quotelink);
      }
    },
    add: function(quotelink, boardID, threadID, postID, context) {
      var inline, isBacklink, post;

      isBacklink = $.hasClass(quotelink, 'backlink');
      inline = $.el('div', {
        id: "i" + postID,
        className: 'inline'
      });
      $.after(QuoteInline.findRoot(quotelink, isBacklink), inline);
      Get.postClone(boardID, threadID, postID, inline, context);
      if (!((post = g.posts["" + boardID + "." + postID]) && context.thread === post.thread)) {
        return;
      }
      if (isBacklink && Conf['Forward Hiding']) {
        $.addClass(post.nodes.root, 'forwarded');
        post.forwarded++ || (post.forwarded = 1);
      }
      if (!Unread.posts) {
        return;
      }
      return Unread.readSinglePost(post);
    },
    rm: function(quotelink, boardID, threadID, postID, context) {
      var el, inlined, isBacklink, post, root, _ref;

      isBacklink = $.hasClass(quotelink, 'backlink');
      root = QuoteInline.findRoot(quotelink, isBacklink);
      root = $.x("following-sibling::div[@id='i" + postID + "'][1]", root);
      $.rm(root);
      if (!(el = root.firstElementChild)) {
        return;
      }
      post = g.posts["" + boardID + "." + postID];
      post.rmClone(el.dataset.clone);
      if (Conf['Forward Hiding'] && isBacklink && context.thread === g.threads["" + boardID + "." + threadID] && !--post.forwarded) {
        delete post.forwarded;
        $.rmClass(post.nodes.root, 'forwarded');
      }
      while (inlined = $('.inlined', el)) {
        _ref = Get.postDataFromLink(inlined), boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
        QuoteInline.rm(inlined, boardID, threadID, postID, context);
        $.rmClass(inlined, 'inlined');
      }
    }
  };

  QuoteOP = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Mark OP Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      this.text = '\u00A0(OP)';
      return Post.prototype.callbacks.push({
        name: 'Mark OP Quotes',
        cb: this.node
      });
    },
    node: function() {
      var boardID, op, postID, quotelink, quotelinks, quotes, _i, _j, _len, _len1, _ref;

      if (this.isClone && this.thread === this.context.thread) {
        return;
      }
      if (!(quotes = this.quotes).length) {
        return;
      }
      quotelinks = this.nodes.quotelinks;
      if (this.isClone && quotes.contains(this.thread.fullID)) {
        for (_i = 0, _len = quotelinks.length; _i < _len; _i++) {
          quotelink = quotelinks[_i];
          quotelink.textContent = quotelink.textContent.replace(QuoteOP.text, '');
        }
      }
      op = (this.isClone ? this.context : this).thread.fullID;
      if (!quotes.contains(op)) {
        return;
      }
      for (_j = 0, _len1 = quotelinks.length; _j < _len1; _j++) {
        quotelink = quotelinks[_j];
        _ref = Get.postDataFromLink(quotelink), boardID = _ref.boardID, postID = _ref.postID;
        if (("" + boardID + "." + postID) === op) {
          $.add(quotelink, $.tn(QuoteOP.text));
        }
      }
    }
  };

  QuotePreview = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Quote Previewing']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Post.prototype.callbacks.push({
        name: 'Quote Previewing',
        cb: this.node
      });
    },
    node: function() {
      var link, _i, _len, _ref;

      _ref = this.nodes.quotelinks.concat(__slice.call(this.nodes.backlinks));
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        $.on(link, 'mouseover', QuotePreview.mouseover);
      }
    },
    mouseover: function(e) {
      var boardID, clone, origin, post, postID, posts, qp, quote, quoterID, threadID, _i, _j, _len, _len1, _ref, _ref1;

      if ($.hasClass(this, 'inlined')) {
        return;
      }
      _ref = Get.postDataFromLink(this), boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
      qp = $.el('div', {
        id: 'qp',
        className: 'dialog'
      });
      $.add(Header.hover, qp);
      Get.postClone(boardID, threadID, postID, qp, Get.contextFromLink(this));
      UI.hover({
        root: this,
        el: qp,
        latestEvent: e,
        endEvents: 'mouseout click',
        cb: QuotePreview.mouseout,
        asapTest: function() {
          return qp.firstElementChild;
        }
      });
      if (!(origin = g.posts["" + boardID + "." + postID])) {
        return;
      }
      if (Conf['Quote Highlighting']) {
        posts = [origin].concat(origin.clones);
        posts.pop();
        for (_i = 0, _len = posts.length; _i < _len; _i++) {
          post = posts[_i];
          $.addClass(post.nodes.post, 'qphl');
        }
      }
      quoterID = $.x('ancestor::*[@id][1]', this).id.match(/\d+$/)[0];
      clone = Get.postFromRoot(qp.firstChild);
      _ref1 = clone.nodes.quotelinks.concat(__slice.call(clone.nodes.backlinks));
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        quote = _ref1[_j];
        if (quote.hash.slice(2) === quoterID) {
          $.addClass(quote, 'forwardlink');
        }
      }
    },
    mouseout: function() {
      var clone, post, root, _i, _len, _ref;

      if (!(root = this.el.firstElementChild)) {
        return;
      }
      clone = Get.postFromRoot(root);
      post = clone.origin;
      post.rmClone(root.dataset.clone);
      if (!Conf['Quote Highlighting']) {
        return;
      }
      _ref = [post].concat(post.clones);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        post = _ref[_i];
        $.rmClass(post.nodes.post, 'qphl');
      }
    }
  };

  QuoteStrikeThrough = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Reply Hiding Buttons'] && !Conf['Reply Hiding Link'] && !Conf['Filter']) {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Strike-through Quotes',
        cb: this.node
      });
    },
    node: function() {
      var boardID, postID, quotelink, _i, _len, _ref, _ref1, _ref2;

      if (this.isClone) {
        return;
      }
      _ref = this.nodes.quotelinks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        _ref1 = Get.postDataFromLink(quotelink), boardID = _ref1.boardID, postID = _ref1.postID;
        if ((_ref2 = g.posts["" + boardID + "." + postID]) != null ? _ref2.isHidden : void 0) {
          $.addClass(quotelink, 'filtered');
        }
      }
    }
  };

  /*
    <3 aeosynth
  */


  QuoteThreading = {
    init: function() {
      var input;

      if (!(Conf['Quote Threading'] && g.VIEW === 'thread')) {
        return;
      }
      this.enabled = true;
      this.controls = $.el('span', {
        innerHTML: '<label><input id=threadingControl type=checkbox checked> Threading</label>'
      });
      input = $('input', this.controls);
      $.on(input, 'change', QuoteThreading.toggle);
      $.event('AddMenuEntry', {
        type: 'header',
        el: this.controls,
        order: 98
      });
      $.on(d, '4chanXInitFinished', this.setup);
      return Post.prototype.callbacks.push({
        name: 'Quote Threading',
        cb: this.node
      });
    },
    setup: function() {
      var ID, post, posts;

      $.off(d, '4chanXInitFinished', QuoteThreading.setup);
      posts = g.posts;
      for (ID in posts) {
        post = posts[ID];
        if (post.cb) {
          post.cb.call(post);
        }
      }
      return QuoteThreading.hasRun = true;
    },
    node: function() {
      var ID, fullID, keys, len, post, posts, qid, quote, quotes, uniq, _i, _len;

      if (this.isClone || !QuoteThreading.enabled || this.thread.OP === this) {
        return;
      }
      quotes = this.quotes, ID = this.ID, fullID = this.fullID;
      posts = g.posts;
      if (!(post = posts[fullID]) || post.isHidden) {
        return;
      }
      uniq = {};
      len = ("" + g.BOARD).length + 1;
      for (_i = 0, _len = quotes.length; _i < _len; _i++) {
        quote = quotes[_i];
        qid = quote;
        if (!(qid.slice(len) < ID)) {
          continue;
        }
        if (qid in posts) {
          uniq[qid.slice(len)] = true;
        }
      }
      keys = Object.keys(uniq);
      if (keys.length !== 1) {
        return;
      }
      this.threaded = "" + g.BOARD + "." + keys[0];
      return this.cb = QuoteThreading.nodeinsert;
    },
    nodeinsert: function() {
      var bottom, height, posts, qpost, qroot, threadContainer, top, _ref;

      posts = g.posts;
      qpost = posts[this.threaded];
      delete this.threaded;
      delete this.cb;
      if (this.thread.OP === qpost) {
        return false;
      }
      if (QuoteThreading.hasRun) {
        height = doc.clientHeight;
        _ref = qpost.nodes.root.getBoundingClientRect(), bottom = _ref.bottom, top = _ref.top;
        if (!(Unread.posts.contains(qpost) || ((bottom < height) && (top > 0)))) {
          return false;
        }
      }
      qroot = qpost.nodes.root;
      if (!$.hasClass(qroot, 'threadOP')) {
        $.addClass(qroot, 'threadOP');
        threadContainer = $.el('div', {
          className: 'threadContainer'
        });
        $.after(qroot, threadContainer);
      } else {
        threadContainer = qroot.nextSibling;
      }
      $.add(threadContainer, this.nodes.root);
      return true;
    },
    toggle: function() {
      var container, containers, node, nodes, replies, reply, thread, _i, _j, _len, _len1;

      thread = $('.thread');
      replies = $$('.thread > .replyContainer, .threadContainer > .replyContainer', thread);
      QuoteThreading.enabled = this.checked;
      if (this.checked) {
        nodes = (function() {
          var _i, _len, _results;

          _results = [];
          for (_i = 0, _len = replies.length; _i < _len; _i++) {
            reply = replies[_i];
            _results.push(Get.postFromNode(reply));
          }
          return _results;
        })();
        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
          node = nodes[_i];
          QuoteThreading.node(node);
        }
      } else {
        replies.sort(function(a, b) {
          var aID, bID;

          aID = Number(a.id.slice(2));
          bID = Number(b.id.slice(2));
          return aID - bID;
        });
        $.add(thread, replies);
        containers = $$('.threadContainer', thread);
        for (_j = 0, _len1 = containers.length; _j < _len1; _j++) {
          container = containers[_j];
          $.rm(container);
        }
        Unread.update(true);
      }
    },
    kb: function() {
      var control;

      control = $.id('threadingControl');
      return control.click();
    }
  };

  QuoteYou = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Mark Quotes of You'] || !Conf['Quick Reply']) {
        return;
      }
      this.text = '\u00A0(You)';
      return Post.prototype.callbacks.push({
        name: 'Mark Quotes of You',
        cb: this.node
      });
    },
    node: function() {
      var quotelink, quotelinks, quotes, _i, _len;

      if (this.isClone) {
        return;
      }
      if (this.info.yours) {
        $.addClass(this.nodes.root, 'yourPost');
      }
      if (Conf['Highlight Own Posts']) {
        $.addClass(doc, 'highlight-own');
      }
      if (!(quotes = this.quotes).length) {
        return;
      }
      quotelinks = this.nodes.quotelinks;
      for (_i = 0, _len = quotelinks.length; _i < _len; _i++) {
        quotelink = quotelinks[_i];
        if (QR.db.get(Get.postDataFromLink(quotelink))) {
          $.add(quotelink, $.tn(QuoteYou.text));
        }
      }
    }
  };

  Quotify = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Resurrect Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Post.prototype.callbacks.push({
        name: 'Resurrect Quotes',
        cb: this.node
      });
    },
    node: function() {
      var deadlink, _i, _len, _ref;

      _ref = $$('.deadlink', this.nodes.comment);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        deadlink = _ref[_i];
        if (this.isClone) {
          if ($.hasClass(deadlink, 'quotelink')) {
            this.nodes.quotelinks.push(deadlink);
          }
        } else {
          Quotify.parseDeadlink.call(this, deadlink);
        }
      }
    },
    parseDeadlink: function(deadlink) {
      var a, boardID, m, post, postID, quote, quoteID, redirect, _ref;

      if (deadlink.parentNode.className === 'prettyprint') {
        $.replace(deadlink, __slice.call(deadlink.childNodes));
        return;
      }
      quote = deadlink.textContent;
      if (!(postID = (_ref = quote.match(/\d+$/)) != null ? _ref[0] : void 0)) {
        return;
      }
      boardID = (m = quote.match(/^>>>\/([a-z\d]+)/)) ? m[1] : this.board.ID;
      quoteID = "" + boardID + "." + postID;
      if (post = g.posts[quoteID]) {
        if (!post.isDead) {
          a = $.el('a', {
            href: "/" + boardID + "/" + post.thread + "/res/#p" + postID,
            className: 'quotelink',
            textContent: quote
          });
        } else {
          a = $.el('a', {
            href: "/" + boardID + "/" + post.thread + "/res/#p" + postID,
            className: 'quotelink deadlink',
            target: '_blank',
            textContent: "" + quote + "\u00A0(Dead)"
          });
          a.setAttribute('data-boardid', boardID);
          a.setAttribute('data-threadid', post.thread.ID);
          a.setAttribute('data-postid', postID);
        }
      } else if (redirect = Redirect.to({
        boardID: boardID,
        threadID: 0,
        postID: postID
      })) {
        a = $.el('a', {
          href: redirect,
          className: 'deadlink',
          target: '_blank',
          textContent: "" + quote + "\u00A0(Dead)"
        });
        if (Redirect.post(boardID, postID)) {
          $.addClass(a, 'quotelink');
          a.setAttribute('data-boardid', boardID);
          a.setAttribute('data-postid', postID);
        }
      }
      if (!this.quotes.contains(quoteID)) {
        this.quotes.push(quoteID);
      }
      if (!a) {
        deadlink.textContent = "" + quote + "\u00A0(Dead)";
        return;
      }
      $.replace(deadlink, a);
      if ($.hasClass(a, 'quotelink')) {
        return this.nodes.quotelinks.push(a);
      }
    }
  };

  Linkify = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Linkify']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Post.prototype.callbacks.push({
        name: 'Linkify',
        cb: this.node
      });
    },
    regString: /(\b([a-z]+:\/\/|[a-z]{3,}\.[-a-z0-9]+\.[a-z]+|[-a-z0-9]+\.[a-z]|[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+|[a-z]{3,}:[a-z0-9?]|[a-z0-9._%+-:]+@[a-z0-9.-]+\.[a-z0-9])[^\s'"]+)/gi,
    cypher: $.el('div'),
    node: function() {
      var a, child, cypher, cypherText, data, embed, embedder, embeds, i, index, len, link, links, lookahead, name, next, node, nodes, snapshot, spoiler, text, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;

      if (this.isClone && Conf['Embedding']) {
        _ref = $$('.embedder', this.nodes.comment);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          embedder = _ref[_i];
          $.on(embedder, "click", Linkify.toggle);
        }
        return;
      }
      snapshot = $.X('.//text()', this.nodes.comment);
      cypher = Linkify.cypher;
      i = -1;
      len = snapshot.snapshotLength;
      while (++i < len) {
        nodes = $.frag();
        node = snapshot.snapshotItem(i);
        data = node.data;
        if (!(node.parentNode && Linkify.regString.test(data))) {
          continue;
        }
        Linkify.regString.lastIndex = 0;
        cypherText = [];
        if (next = node.nextSibling) {
          cypher.textContent = node.textContent;
          cypherText[0] = cypher.innerHTML;
          while ((next.nodeName.toLowerCase() === 'wbr' || next.nodeName.toLowerCase() === 's') && (lookahead = next.nextSibling) && ((name = lookahead.nodeName) === "#text" || name.toLowerCase() === 'br')) {
            cypher.textContent = lookahead.textContent;
            cypherText.push((spoiler = next.innerHTML) ? "<s>" + (spoiler.replace(/</g, ' <')) + "</s>" : '<wbr>');
            cypherText.push(cypher.innerHTML);
            $.rm(next);
            next = lookahead.nextSibling;
            if (lookahead.nodeName === "#text") {
              $.rm(lookahead);
            }
            if (!next) {
              break;
            }
          }
        }
        if (cypherText.length) {
          data = cypherText.join('');
        }
        links = data.match(Linkify.regString);
        for (_j = 0, _len1 = links.length; _j < _len1; _j++) {
          link = links[_j];
          index = data.indexOf(link);
          if (text = data.slice(0, index)) {
            cypher.innerHTML = text;
            _ref1 = __slice.call(cypher.childNodes);
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              child = _ref1[_k];
              $.add(nodes, child);
            }
          }
          cypher.innerHTML = (link.indexOf(':') < 0 ? (link.indexOf('@') > 0 ? 'mailto:' + link : 'http://' + link) : link).replace(/<(wbr|s|\/s)>/g, '');
          a = $.el('a', {
            innerHTML: link,
            className: 'linkify',
            rel: 'nofollow noreferrer',
            target: '_blank',
            href: cypher.textContent
          });
          $.add(nodes, Linkify.embedder(a));
          data = data.slice(index + link.length);
        }
        if (data) {
          cypher.innerHTML = data;
          _ref2 = __slice.call(cypher.childNodes);
          for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
            child = _ref2[_l];
            $.add(nodes, child);
          }
        }
        $.replace(node, nodes);
      }
      if (Conf['Auto-embed']) {
        embeds = $$('.embedder', this.nodes.comment);
        for (_m = 0, _len4 = embeds.length; _m < _len4; _m++) {
          embed = embeds[_m];
          embed.click();
        }
      }
    },
    toggle: function() {
      var el, embed, style, type, url;

      embed = this.previousElementSibling;
      if (this.className.contains("embedded")) {
        el = $.el('a', {
          rel: 'nofollow noreferrer',
          target: 'blank',
          className: 'linkify',
          href: url = this.getAttribute("data-originalURL"),
          textContent: this.getAttribute("data-title") || url
        });
        this.textContent = '(embed)';
        $.addClass(el, "" + (this.getAttribute('data-service')));
      } else {
        el = (type = Linkify.types[this.getAttribute("data-service")]).el.call(this);
        el.style.cssText = (style = type.style) ? style : "border: 0; width: 640px; height: 390px";
        this.textContent = '(unembed)';
      }
      $.replace(embed, el);
      return $.toggleClass(this, 'embedded');
    },
    types: {
      YouTube: {
        regExp: /.*(?:youtu.be\/|youtube.*v=|youtube.*\/embed\/|youtube.*\/v\/|youtube.*videos\/)([^#\&\?]*).*/,
        el: function() {
          return $.el('iframe', {
            src: "//www.youtube.com/embed/" + this.name
          });
        },
        title: {
          api: function() {
            return "https://gdata.youtube.com/feeds/api/videos/" + this.name + "?alt=json&fields=title/text(),yt:noembed,app:control/yt:state/@reasonCode";
          },
          text: function() {
            return JSON.parse(this.responseText).entry.title.$t;
          }
        }
      },
      Vocaroo: {
        regExp: /.*(?:vocaroo.com\/)([^#\&\?]*).*/,
        style: 'border: 0; width: 150px; height: 45px;',
        el: function() {
          return $.el('object', {
            innerHTML: "<embed src='http://vocaroo.com/player.swf?playMediaID=" + (this.name.replace(/^i\//, '')) + "&autoplay=0' width='150' height='45' pluginspage='http://get.adobe.com/flashplayer/' type='application/x-shockwave-flash'></embed>"
          });
        }
      },
      Vimeo: {
        regExp: /.*(?:vimeo.com\/)([^#\&\?]*).*/,
        el: function() {
          return $.el('iframe', {
            src: "//player.vimeo.com/video/" + this.name
          });
        },
        title: {
          api: function() {
            return "https://vimeo.com/api/oembed.json?url=http://vimeo.com/" + this.name;
          },
          text: function() {
            return JSON.parse(this.responseText).title;
          }
        }
      },
      LiveLeak: {
        regExp: /.*(?:liveleak.com\/view.+i=)([0-9a-z_]+)/,
        el: function() {
          return $.el('iframe', {
            src: "http://www.liveleak.com/e/" + this.name + "?autostart=true"
          });
        }
      },
      audio: {
        regExp: /(.*\.(mp3|ogg|wav))$/,
        el: function() {
          return $.el('audio', {
            controls: 'controls',
            preload: 'auto',
            src: this.name
          });
        }
      },
      SoundCloud: {
        regExp: /.*(?:soundcloud.com\/|snd.sc\/)([^#\&\?]*).*/,
        style: 'height: auto; width: 500px; display: inline-block;',
        el: function() {
          var div;

          div = $.el('div', {
            className: "soundcloud",
            name: "soundcloud"
          });
          $.ajax("//soundcloud.com/oembed?show_artwork=false&&maxwidth=500px&show_comments=false&format=json&url=https://www.soundcloud.com/" + this.name, {
            div: div,
            onloadend: function() {
              return this.div.innerHTML = JSON.parse(this.responseText).html;
            }
          }, false);
          return div;
        },
        title: {
          api: function() {
            return "//soundcloud.com/oembed?show_artwork=false&&maxwidth=500px&show_comments=false&format=json&url=https://www.soundcloud.com/" + this.name;
          },
          text: function() {
            return JSON.parse(this.responseText).title;
          }
        }
      },
      pastebin: {
        regExp: /.*(?:pastebin.com\/(?!u\/))([^#\&\?]*).*/,
        el: function() {
          var div;

          return div = $.el('iframe', {
            src: "http://pastebin.com/embed_iframe.php?i=" + this.name
          });
        }
      },
      gist: {
        regExp: /.*(?:gist.github.com\/.*\/)([^#\&\?]*).*/,
        el: function() {
          var div;

          return div = $.el('iframe', {
            src: "http://www.purplegene.com/script?url=https://gist.github.com/" + this.name + ".js"
          });
        }
      }
    },
    embedder: function(a) {
      var callbacks, embed, key, match, service, titles, type, _ref;

      if (!Conf['Link Title']) {
        return [a];
      }
      titles = {};
      callbacks = function() {
        var title;

        return a.textContent = (function() {
          switch (this.status) {
            case 200:
            case 304:
              title = "" + (service.text.call(this));
              embed.setAttribute('data-title', title);
              titles[embed.name] = [title, Date.now()];
              $.set('CachedTitles', titles);
              return title;
            case 404:
              return "[" + key + "] Not Found";
            case 403:
              return "[" + key + "] Forbidden or Private";
            default:
              return "[" + key + "] " + this.status + "'d";
          }
        }).call(this);
      };
      _ref = Linkify.types;
      for (key in _ref) {
        type = _ref[key];
        if (!(match = a.href.match(type.regExp))) {
          continue;
        }
        embed = $.el('a', {
          name: (a.name = match[1]),
          className: 'embedder',
          href: 'javascript:;',
          textContent: '(embed)'
        });
        embed.setAttribute('data-service', key);
        embed.setAttribute('data-originalURL', a.href);
        $.addClass(a, "" + (embed.getAttribute('data-service')));
        $.on(embed, 'click', Linkify.toggle);
        if (!Conf['Embedding']) {
          embed.hidden = true;
        }
        if (Conf['Link Title'] && (service = type.title)) {
          $.get('CachedTitles', {}, function(item) {
            var err, title;

            titles = item['CachedTitles'];
            if (title = titles[match[1]]) {
              a.textContent = title[0];
              return embed.setAttribute('data-title', title[0]);
            } else {
              try {
                return $.cache(service.api.call(a), callbacks);
              } catch (_error) {
                err = _error;
                return a.innerHTML = "[" + key + "] <span class=warning>Title Link Blocked</span> (are you using NoScript?)</a>";
              }
            }
          });
        }
        return [a, $.tn(' '), embed];
      }
      return [a];
    }
  };

  QR = {
    init: function() {
      var sc;

      if (!Conf['Quick Reply']) {
        return;
      }
      this.db = new DataBoard('yourPosts');
      if (Conf['QR Shortcut']) {
        sc = $.el('a', {
          className: "qr-shortcut " + (!Conf['Persistent QR'] ? 'disabled' : ''),
          textContent: 'QR',
          title: 'Quick Reply',
          href: 'javascript:;'
        });
        $.on(sc, 'click', function() {
          if (!QR.nodes || QR.nodes.el.hidden) {
            $.event('CloseMenu');
            QR.open();
            QR.nodes.com.focus();
          } else {
            QR.close();
          }
          return $.toggleClass(this, 'disabled');
        });
        Header.addShortcut(sc);
      }
      if (Conf['Hide Original Post Form']) {
        $.asap((function() {
          return doc;
        }), function() {
          return $.addClass(doc, 'hide-original-post-form');
        });
      }
      $.ready(this.initReady);
      if (Conf['Persistent QR']) {
        $.on(d, '4chanXInitFinished', this.persist);
      }
      return Post.prototype.callbacks.push({
        name: 'Quick Reply',
        cb: this.node
      });
    },
    initReady: function() {
      var link, title;

      QR.postingIsEnabled = !!$.id('postForm');
      if (!QR.postingIsEnabled) {
        return;
      }
      link = $.el('h1', {
        innerHTML: "<a href=javascript:;>" + (title = g.VIEW === 'thread' ? 'Reply to Thread' : 'Start a Thread') + "</a>",
        title: title,
        className: "qr-link"
      });
      $.on(link, 'click', function() {
        if (!QR.nodes || QR.nodes.el.hidden) {
          $.event('CloseMenu');
          QR.open();
          QR.nodes.com.focus();
          if (Conf['QR Shortcut']) {
            return $.rmClass($('.qr-shortcut'), 'disabled');
          }
        } else {
          return QR.close();
        }
      });
      $.before($.id('postForm'), link);
      $.on(d, 'QRGetSelectedPost', function(_arg) {
        var cb;

        cb = _arg.detail;
        return cb(QR.selected);
      });
      $.on(d, 'QRAddPreSubmitHook', function(_arg) {
        var cb;

        cb = _arg.detail;
        return QR.preSubmitHooks.push(cb);
      });
      $.on(d, 'dragover', QR.dragOver);
      $.on(d, 'drop', QR.dropFile);
      $.on(d, 'dragstart dragend', QR.drag);
      return $.on(d, 'ThreadUpdate', function() {
        if (g.DEAD) {
          return QR.abort();
        } else {
          return QR.status();
        }
      });
    },
    node: function() {
      return $.on($('a[title="Quote this post"]', this.nodes.info), 'click', QR.quote);
    },
    persist: function() {
      QR.open();
      if (Conf['Auto Hide QR']) {
        return QR.hide();
      }
    },
    open: function() {
      var err;

      if (QR.nodes) {
        QR.nodes.el.hidden = false;
        QR.unhide();
        return;
      }
      try {
        return QR.dialog();
      } catch (_error) {
        err = _error;
        delete QR.nodes;
        return Main.handleErrors({
          message: 'Quick Reply dialog creation crashed.',
          error: err
        });
      }
    },
    close: function() {
      var i, _i, _len, _ref;

      if (QR.req) {
        QR.abort();
        return;
      }
      QR.nodes.el.hidden = true;
      QR.cleanNotifications();
      d.activeElement.blur();
      $.rmClass(QR.nodes.el, 'dump');
      if (Conf['QR Shortcut']) {
        $.toggleClass($('.qr-shortcut'), 'disabled');
      }
      _ref = QR.posts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        QR.posts[0].rm();
      }
      QR.cooldown.auto = false;
      return QR.status();
    },
    focusin: function() {
      return $.addClass(QR.nodes.el, 'has-focus');
    },
    focusout: function() {
      return $.rmClass(QR.nodes.el, 'has-focus');
    },
    hide: function() {
      d.activeElement.blur();
      $.addClass(QR.nodes.el, 'autohide');
      return QR.nodes.autohide.checked = true;
    },
    unhide: function() {
      $.rmClass(QR.nodes.el, 'autohide');
      return QR.nodes.autohide.checked = false;
    },
    toggleHide: function() {
      if (this.checked) {
        return QR.hide();
      } else {
        return QR.unhide();
      }
    },
    error: function(err) {
      var el;

      QR.open();
      if (typeof err === 'string') {
        el = $.tn(err);
      } else {
        el = err;
        el.removeAttribute('style');
      }
      if (QR.captcha.isEnabled && /captcha|verification/i.test(el.textContent)) {
        QR.captcha.nodes.input.focus();
      }
      if (d.hidden) {
        alert(el.textContent);
      }
      return QR.notifications.push(new Notification('warning', el));
    },
    notifications: [],
    cleanNotifications: function() {
      var notification, _i, _len, _ref;

      _ref = QR.notifications;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        notification = _ref[_i];
        notification.close();
      }
      return QR.notifications = [];
    },
    status: function() {
      var disabled, status, value;

      if (!QR.nodes) {
        return;
      }
      if (g.DEAD) {
        value = 404;
        disabled = true;
        QR.cooldown.auto = false;
      }
      value = QR.req ? QR.req.progress : QR.cooldown.seconds || value;
      status = QR.nodes.status;
      status.value = !value ? 'Submit' : QR.cooldown.auto ? "Auto " + value : value;
      return status.disabled = disabled || false;
    },
    cooldown: {
      init: function() {
        var board;

        if (!Conf['Cooldown']) {
          return;
        }
        board = g.BOARD.ID;
        QR.cooldown.types = {
          thread: (function() {
            switch (board) {
              case 'q':
                return 86400;
              case 'b':
              case 'soc':
              case 'r9k':
                return 600;
              default:
                return 300;
            }
          })(),
          sage: board === 'q' ? 600 : 60,
          file: board === 'q' ? 300 : 30,
          post: board === 'q' ? 60 : 30
        };
        QR.cooldown.upSpd = 0;
        QR.cooldown.upSpdAccuracy = .5;
        $.get("cooldown." + board, {}, function(item) {
          QR.cooldown.cooldowns = item["cooldown." + board];
          return QR.cooldown.start();
        });
        return $.sync("cooldown." + board, QR.cooldown.sync);
      },
      start: function() {
        if (!Conf['Cooldown']) {
          return;
        }
        if (QR.cooldown.isCounting) {
          return;
        }
        QR.cooldown.isCounting = true;
        return QR.cooldown.count();
      },
      sync: function(cooldowns) {
        var id;

        for (id in cooldowns) {
          QR.cooldown.cooldowns[id] = cooldowns[id];
        }
        return QR.cooldown.start();
      },
      set: function(data) {
        var cooldown, delay, hasFile, isReply, isSage, post, req, start, type, upSpd;

        if (!Conf['Cooldown']) {
          return;
        }
        req = data.req, post = data.post, isReply = data.isReply, delay = data.delay;
        start = req ? req.uploadEndTime : Date.now();
        if (delay) {
          cooldown = {
            delay: delay
          };
        } else {
          if (post.file) {
            upSpd = post.file.size / ((req.uploadEndTime - req.uploadStartTime) / $.SECOND);
            QR.cooldown.upSpdAccuracy = ((upSpd > QR.cooldown.upSpd * .9) + QR.cooldown.upSpdAccuracy) / 2;
            QR.cooldown.upSpd = upSpd;
          }
          isSage = /sage/i.test(post.email);
          hasFile = !!post.file;
          type = !isReply ? 'thread' : isSage ? 'sage' : hasFile ? 'file' : 'post';
          cooldown = {
            isReply: isReply,
            isSage: isSage,
            hasFile: hasFile,
            timeout: start + QR.cooldown.types[type] * $.SECOND
          };
        }
        QR.cooldown.cooldowns[start] = cooldown;
        $.set("cooldown." + g.BOARD, QR.cooldown.cooldowns);
        return QR.cooldown.start();
      },
      unset: function(id) {
        delete QR.cooldown.cooldowns[id];
        if (Object.keys(QR.cooldown.cooldowns).length) {
          return $.set("cooldown." + g.BOARD, QR.cooldown.cooldowns);
        } else {
          return $["delete"]("cooldown." + g.BOARD);
        }
      },
      count: function() {
        var cooldown, cooldowns, elapsed, hasFile, isReply, isSage, now, post, seconds, start, type, types, upSpd, upSpdAccuracy, update, _ref;

        if (!Object.keys(QR.cooldown.cooldowns).length) {
          $["delete"]("" + g.BOARD + ".cooldown");
          delete QR.cooldown.isCounting;
          delete QR.cooldown.seconds;
          QR.status();
          return;
        }
        setTimeout(QR.cooldown.count, $.SECOND);
        now = Date.now();
        post = QR.posts[0];
        isReply = post.thread !== 'new';
        isSage = /sage/i.test(post.email);
        hasFile = !!post.file;
        seconds = null;
        _ref = QR.cooldown, types = _ref.types, cooldowns = _ref.cooldowns, upSpd = _ref.upSpd, upSpdAccuracy = _ref.upSpdAccuracy;
        for (start in cooldowns) {
          cooldown = cooldowns[start];
          if ('delay' in cooldown) {
            if (cooldown.delay) {
              seconds = Math.max(seconds, cooldown.delay--);
            } else {
              seconds = Math.max(seconds, 0);
              QR.cooldown.unset(start);
            }
            continue;
          }
          if (isReply === cooldown.isReply) {
            type = !isReply ? 'thread' : isSage && cooldown.isSage ? 'sage' : hasFile && cooldown.hasFile ? 'file' : 'post';
            elapsed = Math.floor((now - start) / $.SECOND);
            if (elapsed >= 0) {
              seconds = Math.max(seconds, types[type] - elapsed);
              if (Conf['Cooldown Prediction'] && hasFile && upSpd) {
                seconds -= Math.floor(post.file.size / upSpd * upSpdAccuracy);
                seconds = Math.max(seconds, 0);
              }
            }
          }
          if (!((start <= now && now <= cooldown.timeout))) {
            QR.cooldown.unset(start);
          }
        }
        update = seconds !== null || !!QR.cooldown.seconds;
        QR.cooldown.seconds = seconds;
        if (update) {
          QR.status();
        }
        if (seconds === 0 && QR.cooldown.auto && !QR.req) {
          return QR.submit();
        }
      }
    },
    quote: function(e) {
      var OP, caretPos, com, index, post, range, s, sel, selectionRoot, text, thread, _ref;

      if (e != null) {
        e.preventDefault();
      }
      if (!QR.postingIsEnabled) {
        return;
      }
      sel = d.getSelection();
      selectionRoot = $.x('ancestor::div[contains(@class,"postContainer")][1]', sel.anchorNode);
      post = Get.postFromNode(this);
      OP = Get.contextFromLink(this).thread.OP;
      text = ">>" + post + "\n";
      if ((s = sel.toString().trim()) && post.nodes.root === selectionRoot) {
        s = s.replace(/\n/g, '\n>');
        text += ">" + s + "\n";
      }
      QR.open();
      if (QR.selected.isLocked) {
        index = QR.posts.indexOf(QR.selected);
        (QR.posts[index + 1] || new QR.post()).select();
        $.addClass(QR.nodes.el, 'dump');
        QR.cooldown.auto = true;
      }
      _ref = QR.nodes, com = _ref.com, thread = _ref.thread;
      if (!com.value) {
        thread.value = OP.ID;
      }
      caretPos = com.selectionStart;
      com.value = com.value.slice(0, caretPos) + text + com.value.slice(com.selectionEnd);
      range = caretPos + text.length;
      com.setSelectionRange(range, range);
      com.focus();
      QR.selected.save(com);
      QR.selected.save(thread);
      if (Conf['QR Shortcut']) {
        return $.rmClass($('.qr-shortcut'), 'disabled');
      }
    },
    characterCount: function() {
      var count, counter;

      counter = QR.nodes.charCount;
      count = QR.nodes.com.textLength;
      counter.textContent = count;
      counter.hidden = count < 1000;
      return (count > 1500 ? $.addClass : $.rmClass)(counter, 'warning');
    },
    drag: function(e) {
      var toggle;

      toggle = e.type === 'dragstart' ? $.off : $.on;
      toggle(d, 'dragover', QR.dragOver);
      return toggle(d, 'drop', QR.dropFile);
    },
    dragOver: function(e) {
      e.preventDefault();
      return e.dataTransfer.dropEffect = 'copy';
    },
    dropFile: function(e) {
      if (!e.dataTransfer.files.length) {
        return;
      }
      e.preventDefault();
      QR.open();
      QR.fileInput(e.dataTransfer.files);
      return $.addClass(QR.nodes.el, 'dump');
    },
    paste: function(e) {
      var blob, files, item, _i, _len, _ref;

      files = [];
      _ref = e.clipboardData.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.kind === 'file') {
          blob = item.getAsFile();
          blob.name = 'file';
          if (blob.type) {
            blob.name += '.' + blob.type.split('/')[1];
          }
          files.push(blob);
        }
      }
      if (!files.length) {
        return;
      }
      QR.open();
      return QR.fileInput(files);
    },
    openFileInput: function(e) {
      if (e.keyCode && e.keyCode !== 32) {
        return;
      }
      return QR.nodes.fileInput.click();
    },
    fileInput: function(files) {
      var file, length, max, post, _i, _len;

      if (this instanceof Element) {
        files = __slice.call(this.files);
        QR.nodes.fileInput.value = null;
      }
      length = files.length;
      if (!length) {
        return;
      }
      max = QR.nodes.fileInput.max;
      QR.cleanNotifications();
      if (length === 1) {
        file = files[0];
        if (/^text/.test(file.type)) {
          QR.selected.pasteText(file);
        } else if (file.size > max) {
          QR.error("File too large (file: " + ($.bytesToString(file.size)) + ", max: " + ($.bytesToString(max)) + ").");
        } else if (!QR.mimeTypes.contains(file.type)) {
          QR.error('Unsupported file type.');
        } else {
          QR.selected.setFile(file);
        }
        return;
      }
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        if (/^text/.test(file.type)) {
          if ((post = QR.posts[QR.posts.length - 1]).com) {
            post = new QR.post();
          }
          post.pasteText(file);
        } else if (file.size > max) {
          QR.error("" + file.name + ": File too large (file: " + ($.bytesToString(file.size)) + ", max: " + ($.bytesToString(max)) + ").");
        } else if (!QR.mimeTypes.contains(file.type)) {
          QR.error("" + file.name + ": Unsupported file type.");
        } else {
          if ((post = QR.posts[QR.posts.length - 1]).file) {
            post = new QR.post();
          }
          post.setFile(file);
        }
      }
      return $.addClass(QR.nodes.el, 'dump');
    },
    posts: [],
    post: (function() {
      function _Class(select) {
        var el, elm, event, prev, _i, _j, _len, _len1, _ref, _ref1,
          _this = this;

        el = $.el('a', {
          className: 'qr-preview',
          draggable: true,
          href: 'javascript:;',
          innerHTML: '<a class=remove>×</a><label hidden><input type=checkbox> Spoiler</label><span></span>'
        });
        this.nodes = {
          el: el,
          rm: el.firstChild,
          label: $('label', el),
          spoiler: $('input', el),
          span: el.lastChild
        };
        _ref = $$('*', el);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elm = _ref[_i];
          $.on(elm, 'blur', QR.focusout);
          $.on(elm, 'focus', QR.focusin);
        }
        $.on(el, 'click', this.select.bind(this));
        $.on(this.nodes.rm, 'click', function(e) {
          e.stopPropagation();
          return _this.rm();
        });
        $.on(this.nodes.label, 'click', function(e) {
          return e.stopPropagation();
        });
        $.on(this.nodes.spoiler, 'change', function(e) {
          _this.spoiler = e.target.checked;
          if (_this === QR.selected) {
            return QR.nodes.spoiler.checked = _this.spoiler;
          }
        });
        $.add(QR.nodes.dumpList, el);
        _ref1 = ['dragStart', 'dragEnter', 'dragLeave', 'dragOver', 'dragEnd', 'drop'];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          event = _ref1[_j];
          $.on(el, event.toLowerCase(), this[event]);
        }
        this.thread = g.VIEW === 'thread' ? g.THREADID : 'new';
        prev = QR.posts[QR.posts.length - 1];
        QR.posts.push(this);
        this.nodes.spoiler.checked = this.spoiler = prev && Conf['Remember Spoiler'] ? prev.spoiler : false;
        $.get('QR.persona', {}, function(item) {
          var persona;

          persona = item['QR.persona'];
          _this.name = prev ? prev.name : persona.name;
          _this.email = prev && !/^sage$/.test(prev.email) ? prev.email : persona.email;
          if (Conf['Remember Subject']) {
            _this.sub = prev ? prev.sub : persona.sub;
          }
          if (QR.selected === _this) {
            return _this.load();
          }
        });
        if (select) {
          this.select();
        }
        this.unlock();
      }

      _Class.prototype.rm = function() {
        var index;

        $.rm(this.nodes.el);
        index = QR.posts.indexOf(this);
        if (QR.posts.length === 1) {
          new QR.post(true);
        } else if (this === QR.selected) {
          (QR.posts[index - 1] || QR.posts[index + 1]).select();
        }
        QR.posts.splice(index, 1);
        if (!window.URL) {
          return;
        }
        return URL.revokeObjectURL(this.URL);
      };

      _Class.prototype.lock = function(lock) {
        var name, _i, _len, _ref;

        if (lock == null) {
          lock = true;
        }
        this.isLocked = lock;
        if (this !== QR.selected) {
          return;
        }
        _ref = ['thread', 'name', 'email', 'sub', 'com', 'spoiler'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          QR.nodes[name].disabled = lock;
        }
        this.nodes.rm.style.visibility = QR.nodes.fileRM.style.visibility = lock ? 'hidden' : '';
        (lock ? $.off : $.on)(QR.nodes.filename.parentNode, 'click', QR.openFileInput);
        this.nodes.spoiler.disabled = lock;
        return this.nodes.el.draggable = !lock;
      };

      _Class.prototype.unlock = function() {
        return this.lock(false);
      };

      _Class.prototype.select = function() {
        var rectEl, rectList;

        if (QR.selected) {
          QR.selected.nodes.el.id = null;
          QR.selected.forceSave();
        }
        QR.selected = this;
        this.lock(this.isLocked);
        this.nodes.el.id = 'selected';
        rectEl = this.nodes.el.getBoundingClientRect();
        rectList = this.nodes.el.parentNode.getBoundingClientRect();
        this.nodes.el.parentNode.scrollLeft += rectEl.left + rectEl.width / 2 - rectList.left - rectList.width / 2;
        this.load();
        return $.event('QRPostSelection', this);
      };

      _Class.prototype.load = function() {
        var name, _i, _len, _ref;

        _ref = ['thread', 'name', 'email', 'sub', 'com'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          QR.nodes[name].value = this[name] || null;
        }
        this.showFileData();
        return QR.characterCount();
      };

      _Class.prototype.save = function(input) {
        var value, _ref;

        if (input.type === 'checkbox') {
          this.spoiler = input.checked;
          return;
        }
        value = input.value;
        this[input.dataset.name] = value;
        if (input.nodeName !== 'TEXTAREA') {
          return;
        }
        this.nodes.span.textContent = value;
        QR.characterCount();
        if (QR.cooldown.auto && this === QR.posts[0] && (0 < (_ref = QR.cooldown.seconds) && _ref <= 5)) {
          return QR.cooldown.auto = false;
        }
      };

      _Class.prototype.forceSave = function() {
        var name, _i, _len, _ref;

        if (this !== QR.selected) {
          return;
        }
        _ref = ['thread', 'name', 'email', 'sub', 'com', 'spoiler'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          this.save(QR.nodes[name]);
        }
      };

      _Class.prototype.setFile = function(file) {
        this.file = file;
        this.filename = "" + file.name + " (" + ($.bytesToString(file.size)) + ")";
        this.nodes.el.title = this.filename;
        if (QR.spoiler) {
          this.nodes.label.hidden = false;
        }
        if (window.URL) {
          URL.revokeObjectURL(this.URL);
        }
        this.showFileData();
        if (!/^image/.test(file.type)) {
          this.nodes.el.style.backgroundImage = null;
          return;
        }
        return this.setThumbnail();
      };

      _Class.prototype.setThumbnail = function(fileURL) {
        var img, reader,
          _this = this;

        if (!window.URL) {
          if (!fileURL) {
            reader = new FileReader();
            reader.onload = function(e) {
              return _this.setThumbnail(e.target.result);
            };
            reader.readAsDataURL(this.file);
            return;
          }
        } else {
          fileURL = URL.createObjectURL(this.file);
        }
        img = $.el('img');
        img.onload = function() {
          var applyBlob, cv, data, height, i, l, s, ui8a, width, _i;

          s = 90 * 2;
          if (_this.file.type === 'image/gif') {
            s *= 3;
          }
          height = img.height, width = img.width;
          if (height < s || width < s) {
            if (window.URL) {
              _this.URL = fileURL;
            }
            _this.nodes.el.style.backgroundImage = "url(" + _this.URL + ")";
            return;
          }
          if (height <= width) {
            width = s / height * width;
            height = s;
          } else {
            height = s / width * height;
            width = s;
          }
          cv = $.el('canvas');
          cv.height = img.height = height;
          cv.width = img.width = width;
          cv.getContext('2d').drawImage(img, 0, 0, width, height);
          if (!window.URL) {
            _this.nodes.el.style.backgroundImage = "url(" + (cv.toDataURL()) + ")";
            delete _this.URL;
            return;
          }
          URL.revokeObjectURL(fileURL);
          applyBlob = function(blob) {
            _this.URL = URL.createObjectURL(blob);
            return _this.nodes.el.style.backgroundImage = "url(" + _this.URL + ")";
          };
          if (cv.toBlob) {
            cv.toBlob(applyBlob);
            return;
          }
          data = atob(cv.toDataURL().split(',')[1]);
          l = data.length;
          ui8a = new Uint8Array(l);
          for (i = _i = 0; 0 <= l ? _i < l : _i > l; i = 0 <= l ? ++_i : --_i) {
            ui8a[i] = data.charCodeAt(i);
          }
          return applyBlob(new Blob([ui8a], {
            type: 'image/png'
          }));
        };
        return img.src = fileURL;
      };

      _Class.prototype.rmFile = function() {
        delete this.file;
        delete this.filename;
        this.nodes.el.title = null;
        this.nodes.el.style.backgroundImage = null;
        if (QR.spoiler) {
          this.nodes.label.hidden = true;
        }
        this.showFileData();
        if (!window.URL) {
          return;
        }
        return URL.revokeObjectURL(this.URL);
      };

      _Class.prototype.showFileData = function() {
        if (this.file) {
          QR.nodes.filename.textContent = this.filename;
          QR.nodes.filename.title = this.filename;
          QR.nodes.spoiler.checked = this.spoiler;
          return $.addClass(QR.nodes.fileSubmit, 'has-file');
        } else {
          return $.rmClass(QR.nodes.fileSubmit, 'has-file');
        }
      };

      _Class.prototype.pasteText = function(file) {
        var reader,
          _this = this;

        reader = new FileReader();
        reader.onload = function(e) {
          var text;

          text = e.target.result;
          if (_this.com) {
            _this.com += "\n" + text;
          } else {
            _this.com = text;
          }
          if (QR.selected === _this) {
            QR.nodes.com.value = _this.com;
          }
          return _this.nodes.span.textContent = _this.com;
        };
        return reader.readAsText(file);
      };

      _Class.prototype.dragStart = function() {
        return $.addClass(this, 'drag');
      };

      _Class.prototype.dragEnd = function() {
        return $.rmClass(this, 'drag');
      };

      _Class.prototype.dragEnter = function() {
        return $.addClass(this, 'over');
      };

      _Class.prototype.dragLeave = function() {
        return $.rmClass(this, 'over');
      };

      _Class.prototype.dragOver = function(e) {
        e.preventDefault();
        return e.dataTransfer.dropEffect = 'move';
      };

      _Class.prototype.drop = function() {
        var el, index, newIndex, oldIndex, post;

        el = $('.drag', this.parentNode);
        $.rmClass(el, 'drag');
        $.rmClass(this, 'over');
        if (!this.draggable) {
          return;
        }
        index = function(el) {
          return __slice.call(el.parentNode.children).indexOf(el);
        };
        oldIndex = index(el);
        newIndex = index(this);
        (oldIndex < newIndex ? $.after : $.before)(this, el);
        post = QR.posts.splice(oldIndex, 1)[0];
        return QR.posts.splice(newIndex, 0, post);
      };

      return _Class;

    })(),
    captcha: {
      init: function() {
        if (d.cookie.indexOf('pass_enabled=1') >= 0) {
          return;
        }
        if (!(this.isEnabled = !!$.id('captchaFormPart'))) {
          return;
        }
        return $.asap((function() {
          return $.id('recaptcha_challenge_field_holder');
        }), this.ready.bind(this));
      },
      ready: function() {
        var MutationObserver, imgContainer, input, observer, setLifetime,
          _this = this;

        setLifetime = function(e) {
          return _this.lifetime = e.detail;
        };
        $.on(window, 'captcha:timeout', setLifetime);
        $.globalEval('window.dispatchEvent(new CustomEvent("captcha:timeout", {detail: RecaptchaState.timeout}))');
        $.off(window, 'captcha:timeout', setLifetime);
        imgContainer = $.el('div', {
          className: 'captcha-img',
          title: 'Reload',
          innerHTML: '<img>'
        });
        input = $.el('input', {
          className: 'captcha-input field',
          title: 'Verification',
          autocomplete: 'off',
          spellcheck: false,
          tabIndex: 55
        });
        this.nodes = {
          challenge: $.id('recaptcha_challenge_field_holder'),
          img: imgContainer.firstChild,
          input: input
        };
        if (MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.OMutationObserver) {
          observer = new MutationObserver(this.load.bind(this));
          observer.observe(this.nodes.challenge, {
            childList: true
          });
        } else {
          $.on(this.nodes.challenge, 'DOMNodeInserted', this.load.bind(this));
        }
        $.on(imgContainer, 'click', this.reload.bind(this));
        $.on(input, 'keydown', this.keydown.bind(this));
        $.on(input, 'focus', function() {
          return $.addClass(QR.nodes.el, 'focus');
        });
        $.on(input, 'blur', function() {
          return $.rmClass(QR.nodes.el, 'focus');
        });
        $.get('captchas', [], function(item) {
          return _this.sync(item['captchas']);
        });
        $.sync('captchas', this.sync);
        this.reload();
        $.on(input, 'blur', QR.focusout);
        $.on(input, 'focus', QR.focusin);
        $.addClass(QR.nodes.el, 'has-captcha');
        return $.after(QR.nodes.com.parentNode, [imgContainer, input]);
      },
      sync: function(captchas) {
        this.captchas = captchas;
        return QR.captcha.count();
      },
      getOne: function() {
        var captcha, challenge, response;

        this.clear();
        if (captcha = this.captchas.shift()) {
          challenge = captcha.challenge, response = captcha.response;
          this.count();
          $.set('captchas', this.captchas);
        } else {
          challenge = this.nodes.img.alt;
          if (response = this.nodes.input.value) {
            this.reload();
          }
        }
        if (response) {
          response = response.trim();
          if (!/\s/.test(response)) {
            response = "" + response + " " + response;
          }
        }
        return {
          challenge: challenge,
          response: response
        };
      },
      save: function() {
        var response;

        if (!(response = this.nodes.input.value.trim())) {
          return;
        }
        this.captchas.push({
          challenge: this.nodes.img.alt,
          response: response,
          timeout: this.timeout
        });
        this.count();
        this.reload();
        return $.set('captchas', this.captchas);
      },
      clear: function() {
        var captcha, i, now, _i, _len, _ref;

        now = Date.now();
        _ref = this.captchas;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          captcha = _ref[i];
          if (captcha.timeout > now) {
            break;
          }
        }
        if (!i) {
          return;
        }
        this.captchas = this.captchas.slice(i);
        this.count();
        return $.set('captchas', this.captchas);
      },
      load: function() {
        var challenge;

        if (!this.nodes.challenge.firstChild) {
          return;
        }
        this.timeout = Date.now() + this.lifetime * $.SECOND - $.MINUTE;
        challenge = this.nodes.challenge.firstChild.value;
        this.nodes.img.alt = challenge;
        this.nodes.img.src = "//www.google.com/recaptcha/api/image?c=" + challenge;
        this.nodes.input.value = null;
        return this.clear();
      },
      count: function() {
        var count;

        count = this.captchas.length;
        this.nodes.input.placeholder = (function() {
          switch (count) {
            case 0:
              return 'Verification (Shift + Enter to cache)';
            case 1:
              return 'Verification (1 cached captcha)';
            default:
              return "Verification (" + count + " cached captchas)";
          }
        })();
        return this.nodes.input.alt = count;
      },
      reload: function(focus) {
        $.globalEval('Recaptcha.reload("t")');
        if (focus) {
          return this.nodes.input.focus();
        }
      },
      keydown: function(e) {
        if (e.keyCode === 8 && !this.nodes.input.value) {
          this.reload();
        } else if (e.keyCode === 13 && e.shiftKey) {
          this.save();
        } else {
          return;
        }
        return e.preventDefault();
      }
    },
    dialog: function() {
      var dialog, elm, mimeTypes, name, nodes, thread, _i, _j, _len, _len1, _ref, _ref1;

      dialog = UI.dialog('qr', 'top:0;right:0;', "  <div class=move><label><input type=checkbox id=autohide title=Auto-hide>\n  Quick Reply\n</label><a href=javascript:; class=close title=Close>×</a><select data-name=thread title='Create a new thread / Reply'><option value=new>New thread</option></select></div><form><div class=persona><input id=dump-button type=button title='Dump list' value=+ tabindex=0><input name=name  data-name=name  title=Name    placeholder=Name    class=field size=1 tabindex=10><input name=email data-name=email title=E-mail  placeholder=E-mail  class=field size=1 tabindex=20><input name=sub   data-name=sub   title=Subject placeholder=Subject class=field size=1 tabindex=30></div><div class=textarea><textarea data-name=com title=Comment placeholder=Comment class=field tabindex=40></textarea><span id=char-count></span></div><div id=dump-list-container><div id=dump-list></div><a id=add-post href=javascript:; title=\"Add a post\" tabindex=50>+</a></div><div id=file-n-submit><span id=qr-filename-container class=field tabindex=60><span id=qr-no-file>No selected file</span><span id=qr-filename></span></span><a id=qr-filerm href=javascript:; title='Remove file' tabindex=80>×</a><input type=submit tabindex=70></div><input type=file multiple><label id=qr-spoiler-label><input type=checkbox id=qr-file-spoiler title='Spoiler image' tabindex=90>Spoiler?\n</label></form>");
      QR.nodes = nodes = {
        el: dialog,
        move: $('.move', dialog),
        autohide: $('#autohide', dialog),
        thread: $('select', dialog),
        close: $('.close', dialog),
        form: $('form', dialog),
        dumpButton: $('#dump-button', dialog),
        name: $('[data-name=name]', dialog),
        email: $('[data-name=email]', dialog),
        sub: $('[data-name=sub]', dialog),
        com: $('[data-name=com]', dialog),
        dumpList: $('#dump-list', dialog),
        addPost: $('#add-post', dialog),
        charCount: $('#char-count', dialog),
        fileSubmit: $('#file-n-submit', dialog),
        filename: $('#qr-filename', dialog),
        fileRM: $('#qr-filerm', dialog),
        spoiler: $('#qr-file-spoiler', dialog),
        status: $('[type=submit]', dialog),
        fileInput: $('[type=file]', dialog)
      };
      mimeTypes = $('ul.rules > li').textContent.trim().match(/: (.+)/)[1].toLowerCase().replace(/\w+/g, function(type) {
        switch (type) {
          case 'jpg':
            return 'image/jpeg';
          case 'pdf':
            return 'application/pdf';
          case 'swf':
            return 'application/x-shockwave-flash';
          default:
            return "image/" + type;
        }
      });
      QR.mimeTypes = mimeTypes.split(', ');
      QR.mimeTypes.push('');
      nodes.fileInput.max = $('input[name=MAX_FILE_SIZE]').value;
      nodes.fileInput.accept = "text/*, " + mimeTypes;
      QR.spoiler = !!$('input[name=spoiler]');
      nodes.spoiler.parentElement.hidden = !QR.spoiler;
      if (g.BOARD.ID === 'f') {
        nodes.flashTag = $.el('select', {
          name: 'filetag',
          innerHTML: "<option value=0>Hentai</option>\n<option value=6>Porn</option>\n<option value=1>Japanese</option>\n<option value=2>Anime</option>\n<option value=3>Game</option>\n<option value=5>Loop</option>\n<option value=4 selected>Other</option>"
        });
        $.add(nodes.form, nodes.flashTag);
      }
      for (thread in g.BOARD.threads) {
        $.add(nodes.thread, $.el('option', {
          value: thread,
          textContent: "Thread No." + thread
        }));
      }
      $.on(nodes.filename.parentNode, 'click keyup', QR.openFileInput);
      _ref = $$('*', QR.nodes.el);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elm = _ref[_i];
        $.on(elm, 'blur', QR.focusout);
        $.on(elm, 'focus', QR.focusin);
      }
      $.on(dialog, 'focusin', QR.focusin);
      $.on(dialog, 'focusout', QR.focusout);
      $.on(nodes.autohide, 'change', QR.toggleHide);
      $.on(nodes.close, 'click', QR.close);
      $.on(nodes.dumpButton, 'click', function() {
        return nodes.el.classList.toggle('dump');
      });
      $.on(nodes.addPost, 'click', function() {
        return new QR.post(true);
      });
      $.on(nodes.form, 'submit', QR.submit);
      $.on(nodes.fileRM, 'click', function() {
        return QR.selected.rmFile();
      });
      $.on(nodes.spoiler, 'change', function() {
        return QR.selected.nodes.spoiler.click();
      });
      $.on(nodes.fileInput, 'change', QR.fileInput);
      _ref1 = ['name', 'email', 'sub', 'com'];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        name = _ref1[_j];
        $.on(nodes[name], 'input', function() {
          return QR.selected.save(this);
        });
      }
      $.on(nodes.thread, 'change', function() {
        return QR.selected.save(this);
      });
      if (Conf['Remember QR Size']) {
        $.get('QR Size', '', function(item) {
          return nodes.com.style.cssText = item['QR Size'];
        });
        $.on(nodes.com, 'mouseup', function(e) {
          if (e.button !== 0) {
            return;
          }
          return $.set('QR Size', this.style.cssText);
        });
      }
      new QR.post(true);
      QR.status();
      QR.cooldown.init();
      QR.captcha.init();
      $.add(d.body, dialog);
      return $.event('QRDialogCreation', null, dialog);
    },
    preSubmitHooks: [],
    submit: function(e) {
      var callbacks, challenge, err, filetag, hook, m, opts, post, postData, response, textOnly, thread, threadID, _i, _len, _ref, _ref1;

      if (e != null) {
        e.preventDefault();
      }
      if (QR.req) {
        QR.abort();
        return;
      }
      if (QR.cooldown.seconds) {
        QR.cooldown.auto = !QR.cooldown.auto;
        QR.status();
        return;
      }
      post = QR.posts[0];
      post.forceSave();
      if (g.BOARD.ID === 'f') {
        filetag = QR.nodes.flashTag.value;
      }
      threadID = post.thread;
      thread = g.BOARD.threads[threadID];
      if (threadID === 'new') {
        threadID = null;
        if (['vg', 'q'].contains(g.BOARD.ID) && !post.sub) {
          err = 'New threads require a subject.';
        } else if (!(post.file || (textOnly = !!$('input[name=textonly]', $.id('postForm'))))) {
          err = 'No file selected.';
        }
      } else if (g.BOARD.threads[threadID].isClosed) {
        err = 'You can\'t reply to this thread anymore.';
      } else if (!(post.com || post.file)) {
        err = 'No file selected.';
      } else if (post.file && thread.fileLimit) {
        err = 'Max limit of image replies has been reached.';
      } else {
        _ref = QR.preSubmitHooks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          hook = _ref[_i];
          if (err = hook(post, thread)) {
            break;
          }
        }
      }
      if (QR.captcha.isEnabled && !err) {
        _ref1 = QR.captcha.getOne(), challenge = _ref1.challenge, response = _ref1.response;
        if (!response) {
          err = 'No valid captcha.';
        }
      }
      if (err) {
        QR.cooldown.auto = false;
        QR.status();
        QR.error(err);
        return;
      }
      QR.cleanNotifications();
      QR.cooldown.auto = QR.posts.length > 1;
      if (Conf['Auto Hide QR'] && !QR.cooldown.auto) {
        QR.hide();
      }
      if (!QR.cooldown.auto && $.x('ancestor::div[@id="qr"]', d.activeElement)) {
        d.activeElement.blur();
      }
      post.lock();
      postData = {
        resto: threadID,
        name: post.name,
        email: post.email,
        sub: post.sub,
        com: post.com,
        upfile: post.file,
        filetag: filetag,
        spoiler: post.spoiler,
        textonly: textOnly,
        mode: 'regist',
        pwd: (m = d.cookie.match(/4chan_pass=([^;]+)/)) ? decodeURIComponent(m[1]) : $.id('postPassword').value,
        recaptcha_challenge_field: challenge,
        recaptcha_response_field: response
      };
      callbacks = {
        onload: QR.response,
        onerror: function() {
          delete QR.req;
          post.unlock();
          QR.cooldown.auto = false;
          QR.status();
          return QR.error($.el('span', {
            innerHTML: "Connection error. You may have been <a href=//www.4chan.org/banned target=_blank>banned</a>.\n[<a href=\"https://github.com/MayhemYDG/4chan-x/wiki/FAQ#what-does-connection-error-you-may-have-been-banned-mean\" target=_blank>FAQ</a>]"
          }));
        }
      };
      opts = {
        cred: true,
        form: $.formData(postData),
        upCallbacks: {
          onload: function() {
            QR.req.isUploadFinished = true;
            QR.req.uploadEndTime = Date.now();
            QR.req.progress = '...';
            return QR.status();
          },
          onprogress: function(e) {
            QR.req.progress = "" + (Math.round(e.loaded / e.total * 100)) + "%";
            return QR.status();
          }
        }
      };
      QR.req = $.ajax($.id('postForm').parentNode.action, callbacks, opts);
      QR.req.uploadStartTime = Date.now();
      QR.req.progress = '...';
      return QR.status();
    },
    response: function() {
      var URL, ban, board, err, h1, isReply, m, post, postID, req, threadID, tmpDoc, _, _ref, _ref1;

      req = QR.req;
      delete QR.req;
      post = QR.posts[0];
      post.unlock();
      tmpDoc = d.implementation.createHTMLDocument('');
      tmpDoc.documentElement.innerHTML = req.response;
      if (ban = $('.banType', tmpDoc)) {
        board = $('.board', tmpDoc).innerHTML;
        err = $.el('span', {
          innerHTML: ban.textContent.toLowerCase() === 'banned' ? ("You are banned on " + board + "! ;_;<br>") + "Click <a href=//www.4chan.org/banned target=_blank>here</a> to see the reason." : ("You were issued a warning on " + board + " as " + ($('.nameBlock', tmpDoc).innerHTML) + ".<br>") + ("Reason: " + ($('.reason', tmpDoc).innerHTML))
        });
      } else if (err = tmpDoc.getElementById('errmsg')) {
        if ((_ref = $('a', err)) != null) {
          _ref.target = '_blank';
        }
      } else if (tmpDoc.title !== 'Post successful!') {
        err = 'Connection error with sys.4chan.org.';
      } else if (req.status !== 200) {
        err = "Error " + req.statusText + " (" + req.status + ")";
      }
      if (err) {
        if (/captcha|verification/i.test(err.textContent) || err === 'Connection error with sys.4chan.org.') {
          if (/mistyped/i.test(err.textContent)) {
            err = 'You seem to have mistyped the CAPTCHA.';
          }
          QR.cooldown.auto = QR.captcha.isEnabled ? !!QR.captcha.captchas.length : err === 'Connection error with sys.4chan.org.' ? true : false;
          QR.cooldown.set({
            delay: 2
          });
        } else if (err.textContent && (m = err.textContent.match(/wait\s(\d+)\ssecond/i))) {
          QR.cooldown.auto = QR.captcha.isEnabled ? !!QR.captcha.captchas.length : true;
          QR.cooldown.set({
            delay: m[1]
          });
        } else {
          QR.cooldown.auto = false;
        }
        QR.status();
        QR.error(err);
        return;
      }
      h1 = $('h1', tmpDoc);
      QR.cleanNotifications();
      QR.notifications.push(new Notification('success', h1.textContent, 5));
      $.get('QR.persona', {}, function(item) {
        var persona;

        persona = item['QR.persona'];
        persona = {
          name: post.name,
          email: /^sage$/.test(post.email) ? persona.email : post.email,
          sub: Conf['Remember Subject'] ? post.sub : null
        };
        return $.set('QR.persona', persona);
      });
      _ref1 = h1.nextSibling.textContent.match(/thread:(\d+),no:(\d+)/), _ = _ref1[0], threadID = _ref1[1], postID = _ref1[2];
      postID = +postID;
      threadID = +threadID || postID;
      isReply = threadID !== postID;
      QR.db.set({
        boardID: g.BOARD.ID,
        threadID: threadID,
        postID: postID,
        val: true
      });
      ThreadUpdater.postID = postID;
      $.event('QRPostSuccessful', {
        board: g.BOARD,
        threadID: threadID,
        postID: postID
      });
      QR.cooldown.auto = QR.posts.length > 1 && isReply;
      if (!(Conf['Persistent QR'] || QR.cooldown.auto)) {
        QR.close();
      } else {
        post.rm();
      }
      QR.cooldown.set({
        req: req,
        post: post,
        isReply: isReply
      });
      if (threadID === postID) {
        URL = "/" + g.BOARD + "/res/" + threadID;
      } else if (g.VIEW === 'index' && !QR.cooldown.auto && Conf['Open Post in New Tab']) {
        URL = "/" + g.BOARD + "/res/" + threadID + "#p" + postID;
      }
      if (URL) {
        if (Conf['Open Post in New Tab']) {
          $.open("/" + g.BOARD + "/res/" + threadID);
        } else {
          window.location = "/" + g.BOARD + "/res/" + threadID;
        }
      }
      return QR.status();
    },
    abort: function() {
      if (QR.req && !QR.req.isUploadFinished) {
        QR.req.abort();
        delete QR.req;
        QR.posts[0].unlock();
        QR.notifications.push(new Notification('info', 'QR upload aborted.', 5));
      }
      return QR.status();
    }
  };

  FappeTyme = {
    init: function() {
      var el, input;

      if (!Conf['Fappe Tyme'] || g.VIEW === 'catalog' || g.BOARD === 'f') {
        return;
      }
      el = $.el('label', {
        innerHTML: "<input type=checkbox name=fappe-tyme> Fappe Tyme",
        title: 'Fappe Tyme'
      });
      FappeTyme.input = input = el.firstElementChild;
      $.on(input, 'change', FappeTyme.toggle);
      $.event('AddMenuEntry', {
        type: 'header',
        el: el,
        order: 97
      });
      return Post.prototype.callbacks.push({
        name: 'Fappe Tyme',
        cb: this.node
      });
    },
    node: function() {
      if (this.file) {
        return;
      }
      return $.addClass(this.nodes.root, "noFile");
    },
    toggle: function() {
      $.event('CloseMenu');
      return (this.checked ? $.addClass : $.rmClass)(doc, 'fappeTyme');
    }
  };

  ImageExpand = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Image Expansion']) {
        return;
      }
      this.EAI = $.el('a', {
        className: 'expand-all-shortcut',
        textContent: 'EAI',
        title: 'Expand All Images',
        href: 'javascript:;'
      });
      $.on(this.EAI, 'click', ImageExpand.cb.toggleAll);
      Header.addShortcut(this.EAI);
      return Post.prototype.callbacks.push({
        name: 'Image Expansion',
        cb: this.node
      });
    },
    node: function() {
      var thumb, _ref;

      if (!((_ref = this.file) != null ? _ref.isImage : void 0)) {
        return;
      }
      thumb = this.file.thumb;
      $.on(thumb.parentNode, 'click', ImageExpand.cb.toggle);
      if (this.isClone && $.hasClass(thumb, 'expanding')) {
        ImageExpand.contract(this);
        ImageExpand.expand(this);
        return;
      }
      if (ImageExpand.on && !this.isHidden) {
        return ImageExpand.expand(this);
      }
    },
    cb: {
      toggle: function(e) {
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
          return;
        }
        e.preventDefault();
        return ImageExpand.toggle(Get.postFromNode(this));
      },
      toggleAll: function() {
        var ID, file, func, post, _i, _len, _ref, _ref1;

        $.event('CloseMenu');
        if (ImageExpand.on = $.hasClass(ImageExpand.EAI, 'expand-all-shortcut')) {
          ImageExpand.EAI.className = 'contract-all-shortcut';
          ImageExpand.EAI.title = 'Contract All Images';
          func = ImageExpand.expand;
        } else {
          ImageExpand.EAI.className = 'expand-all-shortcut';
          ImageExpand.EAI.title = 'Expand All Images';
          func = ImageExpand.contract;
        }
        _ref = g.posts;
        for (ID in _ref) {
          post = _ref[ID];
          _ref1 = [post].concat(post.clones);
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            post = _ref1[_i];
            file = post.file;
            if (!(file && file.isImage && doc.contains(post.nodes.root))) {
              continue;
            }
            if (ImageExpand.on && (!Conf['Expand spoilers'] && file.isSpoiler || Conf['Expand from here'] && file.thumb.getBoundingClientRect().top < 0)) {
              continue;
            }
            $.queueTask(func, post);
          }
        }
      },
      setFitness: function() {
        var checked;

        checked = this.checked;
        (checked ? $.addClass : $.rmClass)(doc, this.name.toLowerCase().replace(/\s+/g, '-'));
        if (this.name !== 'Fit height') {
          return;
        }
        if (checked) {
          $.on(window, 'resize', ImageExpand.resize);
          if (!ImageExpand.style) {
            ImageExpand.style = $.addStyle(null);
          }
          return ImageExpand.resize();
        } else {
          return $.off(window, 'resize', ImageExpand.resize);
        }
      }
    },
    toggle: function(post) {
      var headRect, rect, root, thumb, top;

      thumb = post.file.thumb;
      if (!(post.file.isExpanded || $.hasClass(thumb, 'expanding'))) {
        ImageExpand.expand(post);
        return;
      }
      ImageExpand.contract(post);
      rect = post.nodes.root.getBoundingClientRect();
      if (!(rect.top <= 0 || rect.left <= 0)) {
        return;
      }
      top = rect.top;
      if (Conf['Fixed Header'] && !Conf['Bottom Header']) {
        headRect = Header.bar.getBoundingClientRect();
        top += -headRect.top - headRect.height;
      }
      root = doc;
      if (rect.top < 0) {
        root.scrollTop += top;
      }
      if (rect.left < 0) {
        return root.scrollLeft = 0;
      }
    },
    contract: function(post) {
      $.rmClass(post.nodes.root, 'expanded-image');
      $.rmClass(post.file.thumb, 'expanding');
      return post.file.isExpanded = false;
    },
    expand: function(post, src) {
      var img, thumb;

      thumb = post.file.thumb;
      if (post.isHidden || post.file.isExpanded || $.hasClass(thumb, 'expanding')) {
        return;
      }
      $.addClass(thumb, 'expanding');
      if (post.file.fullImage) {
        $.asap((function() {
          return post.file.fullImage.naturalHeight;
        }), function() {
          return ImageExpand.completeExpand(post);
        });
        return;
      }
      post.file.fullImage = img = $.el('img', {
        className: 'full-image',
        src: src || post.file.URL
      });
      $.on(img, 'error', ImageExpand.error);
      $.asap((function() {
        return post.file.fullImage.naturalHeight;
      }), function() {
        return ImageExpand.completeExpand(post);
      });
      return $.after(thumb, img);
    },
    completeExpand: function(post) {
      var prev, thumb;

      thumb = post.file.thumb;
      if (!$.hasClass(thumb, 'expanding')) {
        return;
      }
      post.file.isExpanded = true;
      if (!post.nodes.root.parentNode) {
        $.addClass(post.nodes.root, 'expanded-image');
        $.rmClass(post.file.thumb, 'expanding');
        return;
      }
      prev = post.nodes.root.getBoundingClientRect();
      return $.queueTask(function() {
        var curr, root;

        $.addClass(post.nodes.root, 'expanded-image');
        $.rmClass(post.file.thumb, 'expanding');
        if (!(prev.top + prev.height <= 0)) {
          return;
        }
        root = doc;
        curr = post.nodes.root.getBoundingClientRect();
        return root.scrollTop += curr.height - prev.height + curr.top - prev.top;
      });
    },
    error: function() {
      var URL, post, src, timeoutID;

      post = Get.postFromNode(this);
      $.rm(this);
      delete post.file.fullImage;
      if (!($.hasClass(post.file.thumb, 'expanding') || $.hasClass(post.nodes.root, 'expanded-image'))) {
        return;
      }
      ImageExpand.contract(post);
      src = this.src.split('/');
      if (src[2] === 'images.4chan.org') {
        if (URL = Redirect.image(src[3], src[5])) {
          setTimeout(ImageExpand.expand, 10000, post, URL);
          return;
        }
        if (g.DEAD || post.isDead || post.file.isDead) {
          return;
        }
      }
      timeoutID = setTimeout(ImageExpand.expand, 10000, post);
      return $.ajax("//api.4chan.org/" + post.board + "/res/" + post.thread + ".json", {
        onload: function() {
          var postObj, _i, _len, _ref;

          if (this.status !== 200) {
            return;
          }
          _ref = JSON.parse(this.response).posts;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            postObj = _ref[_i];
            if (postObj.no === post.ID) {
              break;
            }
          }
          if (postObj.no !== post.ID) {
            clearTimeout(timeoutID);
            return post.kill();
          } else if (postObj.filedeleted) {
            clearTimeout(timeoutID);
            return post.kill(true);
          }
        }
      });
    },
    menu: {
      init: function() {
        var conf, createSubEntry, el, key, subEntries, _ref;

        if (g.VIEW === 'catalog' || !Conf['Image Expansion']) {
          return;
        }
        el = $.el('span', {
          textContent: 'Image Expansion',
          className: 'image-expansion-link'
        });
        createSubEntry = ImageExpand.menu.createSubEntry;
        subEntries = [];
        _ref = Config.imageExpansion;
        for (key in _ref) {
          conf = _ref[key];
          subEntries.push(createSubEntry(key, conf));
        }
        return $.event('AddMenuEntry', {
          type: 'header',
          el: el,
          order: 105,
          subEntries: subEntries
        });
      },
      createSubEntry: function(type, config) {
        var input, label;

        label = $.el('label', {
          innerHTML: "<input type=checkbox name='" + type + "'> " + type
        });
        input = label.firstElementChild;
        if (type === 'Fit width' || type === 'Fit height') {
          $.on(input, 'change', ImageExpand.cb.setFitness);
        }
        if (config) {
          label.title = config[1];
          input.checked = Conf[type];
          $.event('change', null, input);
          $.on(input, 'change', $.cb.checked);
        }
        return {
          el: label
        };
      }
    },
    resize: function() {
      return ImageExpand.style.textContent = ":root.fit-height .full-image {max-height:" + doc.clientHeight + "px}";
    },
    menuToggle: function(e) {
      return ImageExpand.opmenu.toggle(e, this, g);
    }
  };

  ImageHover = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Image Hover']) {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Image Hover',
        cb: this.node
      });
    },
    node: function() {
      var _ref;

      if (!((_ref = this.file) != null ? _ref.isImage : void 0)) {
        return;
      }
      return $.on(this.file.thumb, 'mouseover', ImageHover.mouseover);
    },
    mouseover: function(e) {
      var el, post;

      post = Get.postFromNode(this);
      el = $.el('img', {
        id: 'ihover',
        src: post.file.URL
      });
      el.setAttribute('data-fullid', post.fullID);
      $.add(Header.hover, el);
      UI.hover({
        root: this,
        el: el,
        latestEvent: e,
        endEvents: 'mouseout click',
        asapTest: function() {
          return el.naturalHeight;
        }
      });
      return $.on(el, 'error', ImageHover.error);
    },
    error: function() {
      var URL, post, src, timeoutID,
        _this = this;

      if (!doc.contains(this)) {
        return;
      }
      post = g.posts[this.dataset.fullid];
      src = this.src.split('/');
      if (src[2] === 'images.4chan.org') {
        if (URL = Redirect.image(src[3], src[5].replace(/\?.+$/, ''))) {
          this.src = URL;
          return;
        }
        if (g.DEAD || post.isDead || post.file.isDead) {
          return;
        }
      }
      timeoutID = setTimeout((function() {
        return _this.src = post.file.URL + '?' + Date.now();
      }), 3000);
      return $.ajax("//api.4chan.org/" + post.board + "/res/" + post.thread + ".json", {
        onload: function() {
          var postObj, _i, _len, _ref;

          if (this.status !== 200) {
            return;
          }
          _ref = JSON.parse(this.response).posts;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            postObj = _ref[_i];
            if (postObj.no === post.ID) {
              break;
            }
          }
          if (postObj.no !== post.ID) {
            clearTimeout(timeoutID);
            return post.kill();
          } else if (postObj.filedeleted) {
            clearTimeout(timeoutID);
            return post.kill(true);
          }
        }
      });
    }
  };

  ImageReplace = {
    init: function() {
      if (g.VIEW === 'catalog') {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Image Replace',
        cb: this.node
      });
    },
    node: function() {
      var URL, img, style, thumb, type, _ref, _ref1;

      if (this.isClone || this.isHidden || this.thread.isHidden || !((_ref = this.file) != null ? _ref.isImage : void 0)) {
        return;
      }
      _ref1 = this.file, thumb = _ref1.thumb, URL = _ref1.URL;
      if (!(Conf["Replace " + ((type = (URL.match(/\w{3}$/))[0].toUpperCase()) === 'PEG' ? 'JPG' : type)] && !/spoiler/.test(thumb.src))) {
        return;
      }
      if (this.file.isSpoiler) {
        style = thumb.style;
        style.maxHeight = style.maxWidth = this.isReply ? '125px' : '250px';
      }
      img = $.el('img');
      $.on(img, 'load', function() {
        return thumb.src = URL;
      });
      return img.src = URL;
    }
  };

  RevealSpoilers = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Reveal Spoilers']) {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Reveal Spoilers',
        cb: this.node
      });
    },
    node: function() {
      var thumb, _ref;

      if (this.isClone || !((_ref = this.file) != null ? _ref.isSpoiler : void 0)) {
        return;
      }
      thumb = this.file.thumb;
      thumb.removeAttribute('style');
      return thumb.src = this.file.thumbURL;
    }
  };

  ArchiveLink = {
    init: function() {
      var div, entry, type, _i, _len, _ref;

      if (g.VIEW === 'catalog' || !Conf['Menu'] || !Conf['Archive Link']) {
        return;
      }
      div = $.el('div', {
        textContent: 'Archive'
      });
      entry = {
        type: 'post',
        el: div,
        order: 90,
        open: function(_arg) {
          var ID, board, redirect, thread;

          ID = _arg.ID, thread = _arg.thread, board = _arg.board;
          redirect = Redirect.to({
            postID: ID,
            threadID: thread.ID,
            boardID: board.ID
          });
          return redirect !== ("//boards.4chan.org/" + board + "/");
        },
        subEntries: []
      };
      _ref = [['Post', 'post'], ['Name', 'name'], ['Tripcode', 'tripcode'], ['E-mail', 'email'], ['Subject', 'subject'], ['Filename', 'filename'], ['Image MD5', 'MD5']];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        entry.subEntries.push(this.createSubEntry(type[0], type[1]));
      }
      return $.event('AddMenuEntry', entry);
    },
    createSubEntry: function(text, type) {
      var el, open;

      el = $.el('a', {
        textContent: text,
        target: '_blank'
      });
      open = type === 'post' ? function(_arg) {
        var ID, board, thread;

        ID = _arg.ID, thread = _arg.thread, board = _arg.board;
        el.href = Redirect.to({
          postID: ID,
          threadID: thread.ID,
          boardID: board.ID
        });
        return true;
      } : function(post) {
        var value;

        value = Filter[type](post);
        if (!value) {
          return false;
        }
        el.href = Redirect.to({
          boardID: post.board.ID,
          type: type,
          value: value,
          isSearch: true
        });
        return true;
      };
      return {
        el: el,
        open: open
      };
    }
  };

  DeleteLink = {
    init: function() {
      var div, fileEl, fileEntry, postEl, postEntry;

      if (g.VIEW === 'catalog' || !Conf['Menu'] || !Conf['Delete Link']) {
        return;
      }
      div = $.el('div', {
        className: 'delete-link',
        textContent: 'Delete'
      });
      postEl = $.el('a', {
        className: 'delete-post',
        href: 'javascript:;'
      });
      fileEl = $.el('a', {
        className: 'delete-file',
        href: 'javascript:;'
      });
      postEntry = {
        el: postEl,
        open: function() {
          postEl.textContent = 'Post';
          $.on(postEl, 'click', DeleteLink["delete"]);
          return true;
        }
      };
      fileEntry = {
        el: fileEl,
        open: function(_arg) {
          var file;

          file = _arg.file;
          if (!file || file.isDead) {
            return false;
          }
          fileEl.textContent = 'File';
          $.on(fileEl, 'click', DeleteLink["delete"]);
          return true;
        }
      };
      return $.event('AddMenuEntry', {
        type: 'post',
        el: div,
        order: 40,
        open: function(post) {
          var node;

          if (post.isDead) {
            return false;
          }
          DeleteLink.post = post;
          node = div.firstChild;
          node.textContent = 'Delete';
          DeleteLink.cooldown.start(post, node);
          return true;
        },
        subEntries: [postEntry, fileEntry]
      });
    },
    "delete": function() {
      var fileOnly, form, link, m, post, pwd;

      post = DeleteLink.post;
      if (DeleteLink.cooldown.counting === post) {
        return;
      }
      $.off(this, 'click', DeleteLink["delete"]);
      this.textContent = "Deleting " + this.textContent + "...";
      pwd = (m = d.cookie.match(/4chan_pass=([^;]+)/)) ? decodeURIComponent(m[1]) : $.id('delPassword').value;
      fileOnly = $.hasClass(this, 'delete-file');
      form = {
        mode: 'usrdel',
        onlyimgdel: fileOnly,
        pwd: pwd
      };
      form[post.ID] = 'delete';
      link = this;
      return $.ajax($.id('delform').action.replace("/" + g.BOARD + "/", "/" + post.board + "/"), {
        onload: function() {
          return DeleteLink.load(link, post, fileOnly, this.response);
        },
        onerror: function() {
          return DeleteLink.error(link);
        }
      }, {
        cred: true,
        form: $.formData(form)
      });
    },
    load: function(link, post, fileOnly, html) {
      var msg, s, tmpDoc;

      tmpDoc = d.implementation.createHTMLDocument('');
      tmpDoc.documentElement.innerHTML = html;
      if (tmpDoc.title === '4chan - Banned') {
        s = 'Banned!';
      } else if (msg = tmpDoc.getElementById('errmsg')) {
        s = msg.textContent;
        $.on(link, 'click', DeleteLink["delete"]);
      } else {
        if (tmpDoc.title === 'Updating index...') {
          (post.origin || post).kill(fileOnly);
        }
        s = 'Deleted';
      }
      return link.textContent = s;
    },
    error: function(link) {
      link.textContent = 'Connection error, please retry.';
      return $.on(link, 'click', DeleteLink["delete"]);
    },
    cooldown: {
      start: function(post, node) {
        var length, seconds, _ref;

        if (!((_ref = QR.db) != null ? _ref.get({
          boardID: post.board.ID,
          threadID: post.thread.ID,
          postID: post.ID
        }) : void 0)) {
          delete DeleteLink.cooldown.counting;
          return;
        }
        DeleteLink.cooldown.counting = post;
        length = post.board.ID === 'q' ? 600 : 30;
        seconds = Math.ceil((length * $.SECOND - (Date.now() - post.info.date)) / $.SECOND);
        return DeleteLink.cooldown.count(post, seconds, length, node);
      },
      count: function(post, seconds, length, node) {
        if (DeleteLink.cooldown.counting !== post) {
          return;
        }
        if (!((0 <= seconds && seconds <= length))) {
          if (DeleteLink.cooldown.counting === post) {
            node.textContent = 'Delete';
            delete DeleteLink.cooldown.counting;
          }
          return;
        }
        setTimeout(DeleteLink.cooldown.count, 1000, post, seconds - 1, length, node);
        return node.textContent = "Delete (" + seconds + ")";
      }
    }
  };

  DownloadLink = {
    init: function() {
      var a;

      if (g.VIEW === 'catalog' || !Conf['Menu'] || !Conf['Download Link']) {
        return;
      }
      a = $.el('a', {
        className: 'download-link',
        textContent: 'Download file'
      });
      return $.event('AddMenuEntry', {
        type: 'post',
        el: a,
        order: 70,
        open: function(_arg) {
          var file;

          file = _arg.file;
          if (!file) {
            return false;
          }
          a.href = file.URL;
          a.download = file.name;
          return true;
        }
      });
    }
  };

  Menu = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Menu']) {
        return;
      }
      this.menu = new UI.Menu('post');
      return Post.prototype.callbacks.push({
        name: 'Menu',
        cb: this.node
      });
    },
    node: function() {
      var button;

      button = Menu.makeButton(this);
      if (this.isClone) {
        $.replace($('.menu-button', this.nodes.info), button);
        return;
      }
      return $.add(this.nodes.info, [$.tn('\u00A0'), button]);
    },
    makeButton: (function() {
      var a;

      a = null;
      return function(post) {
        var clone;

        a || (a = $.el('a', {
          className: 'menu-button',
          innerHTML: '[<i></i>]',
          href: 'javascript:;'
        }));
        clone = a.cloneNode(true);
        clone.setAttribute('data-postid', post.fullID);
        if (post.isClone) {
          clone.setAttribute('data-clone', true);
        }
        $.on(clone, 'click', Menu.toggle);
        return clone;
      };
    })(),
    toggle: function(e) {
      var post;

      post = this.dataset.clone ? Get.postFromNode(this) : g.posts[this.dataset.postid];
      return Menu.menu.toggle(e, this, post);
    }
  };

  ReportLink = {
    init: function() {
      var a;

      if (g.VIEW === 'catalog' || !Conf['Menu'] || !Conf['Report Link']) {
        return;
      }
      a = $.el('a', {
        className: 'report-link',
        href: 'javascript:;',
        textContent: 'Report this post'
      });
      $.on(a, 'click', ReportLink.report);
      return $.event('AddMenuEntry', {
        type: 'post',
        el: a,
        order: 10,
        open: function(post) {
          ReportLink.post = post;
          return !post.isDead;
        }
      });
    },
    report: function() {
      var id, post, set, url;

      post = ReportLink.post;
      url = "//sys.4chan.org/" + post.board + "/imgboard.php?mode=report&no=" + post;
      id = Date.now();
      set = "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=685,height=200";
      return window.open(url, id, set);
    }
  };

  Favicon = {
    init: function() {
      return $.ready(function() {
        var href;

        Favicon.el = $('link[rel="shortcut icon"]', d.head);
        Favicon.el.type = 'image/x-icon';
        href = Favicon.el.href;
        Favicon.SFW = /ws\.ico$/.test(href);
        Favicon["default"] = href;
        return Favicon["switch"]();
      });
    },
    "switch": function() {
      switch (Conf['favicon']) {
        case 'ferongr':
          Favicon.unreadDead = 'data:image/gif;base64,R0lGODlhEAAQAOMHAOgLAnMFAL8AAOgLAukMA/+AgP+rq////////////////////////////////////yH5BAEKAAcALAAAAAAQABAAAARZ8MhJ6xwDWIBv+AM1fEEIBIVRlNKYrtpIECuGzuwpCLg974EYiXUYkUItjGbC6VQ4omXFiKROA6qSy0A8nAo9GS3YCswIWnOvLAi0be23Z1QtdSUaqXcviQAAOw==';
          Favicon.unreadDeadY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAAAAAAAAAAAJAAASAAAZAQAaAQAiAQAkAQAoFBQyAgAzAgA1AgA4AABBAgBXAwBzBQCEBgGvCAG/AADoCwLpDAP/gID/q6v///9zILr8AAAAA3RSTlMAx9dmesIgAAAAc0lEQVQY02WPgQ6DIBBDmTqnbE70Cvb/v3TAnW5OSKB9ybXg3HUBOAmEEH4FQtrSn4gxi+xjVC9SVOEiSvbZI8zSV+/Xo7icnryZ15GObMxvtWUkB/VJW57kHU7fUcHStm8FkncGE/mwP6CGzq/eauHwvT7sWQt3gZLW+AAAAABJRU5ErkJggg==';
          Favicon.unreadSFW = 'data:image/gif;base64,R0lGODlhEAAQAOMHAADX8QBwfgC2zADX8QDY8nnl8qLp8v///////////////////////////////////yH5BAEKAAcALAAAAAAQABAAAARZ8MhJ6xwDWIBv+AM1fEEIBIVRlNKYrtpIECuGzuwpCLg974EYiXUYkUItjGbC6VQ4omXFiKROA6qSy0A8nAo9GS3YCswIWnOvLAi0be23Z1QtdSUaqXcviQAAOw==';
          Favicon.unreadSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAAAAAAAAAAAACAkAERMAGBsAGR0AISUALzQALzUAMTcANjwAP0cAVF8AcH4AeokAorYAtswA1/EA2PISIyV55fKi6fL////l+pZqAAAAA3RSTlMAx9dmesIgAAAAcklEQVQY02VPARLCIAxjsjnUWdcg6/9/ukIr00nvIMldEhrC/wHwA0BE3wBUtnICOStQnrNx5oqqzmzKx9vDPH1Nae3F9U4ig3OzjCIX51treYvMxou13EQmBPtHE14xLiawjgoPtfgOaKHP+9VrEXA8O1v7CmSPE3u0AAAAAElFTkSuQmCC';
          Favicon.unreadNSFW = 'data:image/gif;base64,R0lGODlhEAAQAOMHAFT+ACh5AEncAFT+AFX/Acz/su7/5v///////////////////////////////////yH5BAEKAAcALAAAAAAQABAAAARZ8MhJ6xwDWIBv+AM1fEEIBIVRlNKYrtpIECuGzuwpCLg974EYiXUYkUItjGbC6VQ4omXFiKROA6qSy0A8nAo9GS3YCswIWnOvLAi0be23Z1QtdSUaqXcviQAAOw==';
          Favicon.unreadNSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAS1BMVEUAAAAAAAAAAAADCgAGEgAIGgAJGwALJAANJwASNwASOAATOgAVQQAWRAAeWwAgKBsoeQAwkQA/wABJ3ABU/gBV/wHM/7Lu/+b////r+K2AAAAAA3RSTlMAx9dmesIgAAAAc0lEQVQY02WPgQ6DIBBDmTonbk70Cvb/v3TAnW5OSKB9ybXg3HUBOAmEEH4FQtrSn4gxi+xjVC9SVOEiSvbZI8zSV+/Xo7icnryZ15GObMxvtWUmB/VJW0byDqfvqGBp20mB5J3Bi3zYH1BD38/eauHwvT7sEAt1Fb320QAAAABJRU5ErkJggg==';
          break;
        case 'xat-':
          Favicon.unreadDead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4y61TQQrCMBDMQ8WDIEV6LbT2A4og2Hq0veo7fIAH04dY9N4xmyYlpGmI2MCQTWYy3Wy2DAD7B2wWAzWgcTgVeZKlZRxHNYFi2jM18oBh0IcKtC6ixf22WT4IFLs0owxswXu9egm0Ls6bwfCFfNsJYJKfqoEkd3vgUgFVLWObtzNgVKyruC+ljSzr5OEnBzjvjcQecaQhbZgBb4CmGQw+PoMkTUtdbd8VSEPakcGxPOcsoIgUKy0LecY29BmdBrqRfjIwZ93KLs5loHvBnL3cLH/jF+C/+z5dgUysAAAAAElFTkSuQmCC';
          Favicon.unreadDeadY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAAAAACKkJGNkpN0d3d0eHdra2dGRkORZ1wAAACmaV6naV4PDw8LCwsLCwvyZWLyZWIeExEyFBTAWlr/eHj/enkAAAAKAAAoAAA4AAA4GhpMAACRAAD/AAD/enn/h4j/m5z/nJ3/0dL/0tL/0tP/09P///9VK8WFAAAAFnRSTlMAPnp6kpKdtcHEzc3p6u7v8PT7/v7++jx7+QAAAIFJREFUGNONj90OgjAMhStKmU5k/h1UmAzUvv8jSrYBIeGC9qLtl/a0JVphAJKUOU36xNfWWiitlU9GUphZbXF/hxg10Li2QdQgPhQ3133c9XLOJvD9uZfI0YOdiiMiJw+2CKIPkZzGtcbgKYIJaI26LAfQOzOqoYNA4Z49Nguv/gEEhw2/C5BUZgAAAABJRU5ErkJggg==';
          Favicon.unreadSFW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA30lEQVQ4y2P4//8/AyWYgSoGQMF/GJ7Y11VVUVoyKTM9ey4Ig9ggMWQ1YA1IBvzXm34YjkH8mPyJB+Nqlp8FYRAbmxoMF6ArSNrw6T0Qf8Amh9cFMEWVR/7/A+L/uORxhgEIt5/+/3/2lf//5wAxiI0uj+4CBlBgxVUvOwtydgXQZpDmi2/+/7/0GmIQSAwkB1IDUkuUAZeABlx+g2zAZ9wGlAOjChba+LwAUgNSi2HA5Am9VciBhSsQQWyoWgZiovEDsdGI1QBYQiLJAGQalpSxyWEzAJYWkGm8clTJjQCZ1hkoVG0CygAAAABJRU5ErkJggg==';
          Favicon.unreadSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAAAAACRjoqTkI13dXR4dXRpZ2tFQ0Zcb5EAAABee6ZefKcPDw8LCwsLCwtisPJisPIRFh4UJDJalMB4xP95xP8AAAABBQcHFx4KISoNLToaKzgaVW4ul8N5xP+Hy/+b1P+c1P/R7P/S6//S7P/T7P////9P0rk0AAAAFnRSTlMAPnp6kpKdtcHEzc3p6u7v8PT7/v7++jx7+QAAAIFJREFUGNONj90OgjAMhStKmU5k/h1UmAzUvv8jSrYBIeGC9qLtl/a0JVphAJKUOU36xNfWWiitlU9GUphZbXF/hxg10Li2QdQgPhQ3133c9XLOJvD9uUrk6MFOxRGRkwdbBNGHSE7jWmPwFMEEtEZdlgPonRmvoYNA4Z49Nguv/gEE3A2/sQ7iRgAAAABJRU5ErkJggg==';
          Favicon.unreadNSFW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4ElEQVQ4y2P4//8/AyWYgSoGQMF/GJ7YNbGqrKRiUnp21lwQBrFBYshqwBqQDPifdsYYjkH8mInxB+OWx58FYRAbmxoMF6ArKPmU9B6IP2CTw+sCmKKe/5X/gPg/LnmcYQDCs/63/1/9fzYQzwGz0eXRXcAACqy4ZfFnQc7u+V/xD6T55v+LQHwJbBBIDCQHUgNSS5QBt4Cab/2/jDDgMx4DykrKJ8FCG58XQGpAajEMmNw7uQo5sHAFIogNVctATDR+IDYasRoAS0gkGYBMw5IyNjlsBsDSAjKNV44quREAx58Mr9vt5wQAAAAASUVORK5CYII=';
          Favicon.unreadNSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAAAAAACRipGTjZN2dHd2dHhna2pDRkVckV8AAABepl9ep18PDw8LCwsLCwt08mJ08mIRHhEYMhRpwFqM/3iM/3kAAAAECAIQIAgWLAseOBoePA86dB1mzDOM/3ma/4er/5ur/5zZ/9HZ/9La/9La/9P///85Jx7jAAAAFnRSTlMAPnp6kpKdtcHEzc3p6u7v8PT7/v7++jx7+QAAAIFJREFUGNONj90OgjAMhStKmU5k/h1UmAzUvv8jSrYBIeGC9qLtl/a0JVphAJKUOU36xNfWWiitlU9GUphZbXF/hxg10Li2QdQgPhQ3133c9XLOJvD9uZfI0YOdiiMiJw+2CKIPkZzGtcbgKYIJaI26LAfQOzOqoYNA4Z49Nguv/gEEhw2/C5BUZgAAAABJRU5ErkJggg==';
          break;
        case 'Mayhem':
          Favicon.unreadDead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABIUlEQVQ4jZ2ScWuDMBDFgw4pIkU0WsoQkWAYIkXZH4N9/+/V3dmfXSrKYIFHwt17j8vdGWNMIkgFuaDgzgQnwRs4EQs5KdolUQtagRN0givEDBTEOjgtGs0Zq8F7cKqqusVxrMQLaDUWcjBSrXkn8gs51tpJSWLk9b3HUa0aNIL5gPBR1/V4kJvR7lTwl8GmAm1Gf9+c3S+89qBHa8502AsmSrtBaEBPbIbj0ah2madlNAPEccdgJDfAtWifBjqWKShRBT6KoiH8QlEUn/qt0CCjnNdmPUwmFWzj9Oe6LpKuZXcwqq88z78Pch3aZU3dPwwc2sWlfZKCW5tWluV8kGvXClLm6dYN4/aUqfCbnEOzNDGhGZbNargvxCzvMGfRJD8UaDVvgkzo6QAAAABJRU5ErkJggg==';
          Favicon.unreadDeadY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABj0lEQVQ4y42TQUorQRCGv+oekpj43pOhOyIiKoHBxTMkuAnEtWcwx/AY3sUbBIRcwCw8gCfIMkaTOOUiNdgGRRuKoav+v2qq/i4BakBmXweUwDoxLF5ZhVkC64rYBHYMUAIvwKuBMEwdaFiCNbAAngEC0NHkxBi73vsOsG92HGPsphigY1wOzfNhqhpC6AEd730RQuh9hQEOAY6A/jeAs3a7/f+bWB84ckCpqg+I8Osjgqo+AKUDViJS8LkGMcY+sJrNZssYY387LiIFsBLgL9AC/pgaArzZlF+sZgO4BG7sfgvcA3MxUtOStBIpX7cS3Klqd9OBTIEr4DlLOsuAmqpODXQOiHMuy/O8FkLoJth/6Uh2gQPg87Q3k+7leX6hqnpmPvM/GWfXWeWGqj5+oUS9LMs6wF7iHAwGJ9ZW5uxpup+UGwEtEVoijEYjKl66PJujmvIW3vsFwBiYqzJXZTweY5wSU6Bd7UP1KoECODUrJpOJAtPhcKjAtXGaYptWs57qWyv9Zn/it1a5knj5Dm3v4q8APeACAAAAAElFTkSuQmCC';
          Favicon.unreadSFW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4jZ2S4crCMAxF+0OGDJEPKYrIGKOsiJSx/fJRfSAfTJNyKqXfiuDg0C25N2RJjTGmEVrhTzhw7oStsIEtsVzT4o2Jo9ALThiEM8IdHIgNaHo8mjNWg6/ske8bohPo+63QOLzmooHp8fyAICBSQkVz0QKdsFQEV6WSW/D+7+BbgbIDHcb4Kp61XyjyI16zZ8JemGltQtDBSGxB4/GoN+7TpkkjDCsFArm0IYv3U0BbnYtf8BCy+JytsE0X6VyuKhPPK/GAJ14kvZZDZVV3pZIb8MZr6n4o4PDGKn0S5SdDmyq5PnXQsk+Xbhinp03FFzmHJw6xYRiWm9VxnohZ3vOcxdO8ARmXRvbWdtzQAAAAAElFTkSuQmCC';
          Favicon.unreadSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBQcHFx4KISoNLToaVW4oKCgul8M4ODg7OztMTEyRkZHBwcH///9dzWZ0AAAAI3RSTlMEBggKDA4QEhQWFxkbHR8hIyUmKCosLjAxN1hbYc7P0dLc3mzWzBUAAAC+SURBVBjTNY3pcsIwEIM3ePERx/bG5IIe0NIrhVbv/3Y4Ydj9Ic030ogqpY3mDdGGi1EVsYuSvGE2Pkl0TFYAdLGuY1eMWGowzzN6kX41DYVpNbvdKlO4Jx5gSbi2VO+Vcq2jrc/jNLQhtM+n05PfkrKxG/oFHIEXqwqQsVRy7n+AtwLYL3sYR3wA755Jp3Vvv8cn8Js0GXmA7/P5TwzpiLn8MOALuEZNygkm5JTy/+vl4BRVbJvQ1NbWRSxXN64PGOBlhG0qAAAAAElFTkSuQmCC';
          Favicon.unreadNSFW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCklEQVQ4jZ2S0WrDMAxF/TBCCKWMYhZKCSGYmFJMSNjD/mhf239qJXNcjBdTWODgRLpXKJKNMaYROuFTOHEehFb4gJZYrunwxsSXMApOmIQzwgOciE1oRjyaM1aDj+yR7xuiHvT9VmgcXnPRwO/9+wWCgEgJFc1FCwzCVhFclUpuw/u3g3cFyg50GPOjePZ+ocjPeM2RCXthpbUFwQAzsQ2Nx6PeuE+bJo0w7BQI5NKGLN5XAW11LX7BQ8jia7bCLl2kc7mqTLzuxAOeeJH0Wk6VVf0oldyEN15T948CDm+sMiZRfjK0pZIbUwcd+3TphnF62lR8kXN44hAbhmG5WQNnT8zynucsnuYJhFpBfkMzqD4AAAAASUVORK5CYII=';
          Favicon.unreadNSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECAIQIAgWLAsePA8oKCg4ODg6dB07OztMTExmzDORkZHBwcH///92I3mvAAAAI3RSTlMEBggKDA4QEhQWFxkbHR8hIyUmKCosLjAxN1hbYc7P0dLc3mzWzBUAAAC+SURBVBjTNY3pcsIwEIM3ePERx/bG5IIe0NIT0ur93w4nDLs/pPlGGlGltNG8IdpwMaoidlGSN8zGJ4mOyQqALtZ17IoRSw3meUYv0q+moTCtZrdbZQr3xAMsCdeW6r1SrnW09XmchjaE9vl0evJbUjZ2Q7+AI/BiVQEylkrO/TfwVgD7ZQ/jiA/g3TPptO7t9/gEfpImIw/wez7/iSEdMZcfBnwB16hJOcGEnFL+f70cnKKKbROa2tq6iOXqBuMXGTe4CAUbAAAAAElFTkSuQmCC';
          break;
        case 'Original':
          Favicon.unreadDead = 'data:image/gif;base64,R0lGODlhEAAQAKECAAAAAP8AAP///////yH5BAEKAAMALAAAAAAQABAAAAI/nI95wsqygIRxDgGCBhTrwF3Zxowg5H1cSopS6FrGQ82PU1951ckRmYKJVCXizLRC9kAnT0aIiR6lCFT1cigAADs=';
          Favicon.unreadDeadY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAAAAAAAAAAAAAAAKAAAoAAAoKCg4AAA4ODg7OztMAACRAADBwcH/AAD///+WCcPSAAAAA3RSTlMAx9dmesIgAAAAZ0lEQVQI1z2LsQmAUAxEb4Isk0rwp3EPR3ECcRQrh7C3/nAasPwzmCgYuPBy5AH/NALSImqAK+H1oJRqyJVHNAnZqDITVhj7/PrAciJ9il0BHs/jjU+fnB9sQ0IxX6OBO6Xr0xKAxANLZzUanCWzZQAAAABJRU5ErkJggg==';
          Favicon.unreadSFW = 'data:image/gif;base64,R0lGODlhEAAQAKECAAAAAC6Xw////////yH5BAEKAAMALAAAAAAQABAAAAI/nI95wsqygIRxDgGCBhTrwF3Zxowg5H1cSopS6FrGQ82PU1951ckRmYKJVCXizLRC9kAnT0aIiR6lCFT1cigAADs=';
          Favicon.unreadSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAAAAAAAAAAAAAAABBQcHFx4KISoNLToaVW4oKCgul8M4ODg7OzvBwcH///8uS/CdAAAAA3RSTlMAx9dmesIgAAAAZ0lEQVQI1z2LsQ2AUAhEbwKWoftRGvdwBEewchM7d9BFbE6pbP4Mgj+R5MjjwgP+qQSkRtQAV8K3lVI2Q648oknIRpWZsMI4988HjgvpU+wO8HgeHzR9cjZYhoRiPkcDd0rXpyUAiRd5YjKC7MvNRgAAAABJRU5ErkJggg==';
          Favicon.unreadNSFW = 'data:image/gif;base64,R0lGODlhEAAQAKECAAAAAGbMM////////yH5BAEKAAMALAAAAAAQABAAAAI/nI95wsqygIRxDgGCBhTrwF3Zxowg5H1cSopS6FrGQ82PU1951ckRmYKJVCXizLRC9kAnT0aIiR6lCFT1cigAADs=';
          Favicon.unreadNSFWY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAAAAAAAAAAAAAAAECAIQIAgWLAsePA8oKCg4ODg6dB07OztmzDPBwcH///+rsf3XAAAAA3RSTlMAx9dmesIgAAAAZ0lEQVQI1z2LsQ2AUAhEbwKWofRL4x6O4AhuopWb2P4F7E5prP4MgiaSHHlceMA/jYC0iBrgSnjdKaUacuURTUI2qsyEFcaxvD6wnkifYleAx/N449Mn5wfbkFDM52jgTun6tAQg8QAEvjQg42KY2AAAAABJRU5ErkJggg==';
      }
      if (Favicon.SFW) {
        Favicon.unread = Favicon.unreadSFW;
        return Favicon.unreadY = Favicon.unreadSFWY;
      } else {
        Favicon.unread = Favicon.unreadNSFW;
        return Favicon.unreadY = Favicon.unreadNSFWY;
      }
    },
    empty: 'data:image/gif;base64,R0lGODlhEAAQAJEAAAAAAP///9vb2////yH5BAEAAAMALAAAAAAQABAAAAIvnI+pq+D9DBAUoFkPFnbs7lFZKIJOJJ3MyraoB14jFpOcVMpzrnF3OKlZYsMWowAAOw==',
    dead: 'data:image/gif;base64,R0lGODlhEAAQAKECAAAAAP8AAP///////yH5BAEKAAIALAAAAAAQABAAAAIvlI+pq+D9DAgUoFkPDlbs7lFZKIJOJJ3MyraoB14jFpOcVMpzrnF3OKlZYsMWowAAOw=='
  };

  ThreadExcerpt = {
    init: function() {
      if (g.VIEW !== 'thread' || !Conf['Thread Excerpt']) {
        return;
      }
      return Thread.prototype.callbacks.push({
        name: 'Thread Excerpt',
        cb: this.node
      });
    },
    node: function() {
      return d.title = Get.threadExcerpt(this);
    }
  };

  ThreadStats = {
    init: function() {
      var sc,
        _this = this;

      if (g.VIEW !== 'thread' || !Conf['Thread Stats']) {
        return;
      }
      if (Conf['Updater and Stats in Header']) {
        this.dialog = sc = $.el('span', {
          innerHTML: "<span id=post-count>0</span> / <span id=file-count>0</span>",
          id: 'thread-stats'
        });
        Header.addShortcut(sc);
      } else {
        this.dialog = sc = UI.dialog('thread-stats', 'bottom: 0px; right: 0px;', "<div class=move><span id=post-count>0</span> / <span id=file-count>0</span></div>");
        $.ready(function() {
          return $.add(d.body, sc);
        });
      }
      this.postCountEl = $('#post-count', sc);
      this.fileCountEl = $('#file-count', sc);
      return Thread.prototype.callbacks.push({
        name: 'Thread Stats',
        cb: this.node
      });
    },
    node: function() {
      var ID, fileCount, post, postCount, _ref;

      postCount = 0;
      fileCount = 0;
      _ref = this.posts;
      for (ID in _ref) {
        post = _ref[ID];
        postCount++;
        if (post.file) {
          fileCount++;
        }
      }
      ThreadStats.thread = this;
      ThreadStats.update(postCount, fileCount);
      return $.on(d, 'ThreadUpdate', ThreadStats.onUpdate);
    },
    onUpdate: function(e) {
      var fileCount, postCount, _ref;

      if (e.detail[404]) {
        return;
      }
      _ref = e.detail, postCount = _ref.postCount, fileCount = _ref.fileCount;
      return ThreadStats.update(postCount, fileCount);
    },
    update: function(postCount, fileCount) {
      var fileCountEl, postCountEl, thread;

      thread = ThreadStats.thread, postCountEl = ThreadStats.postCountEl, fileCountEl = ThreadStats.fileCountEl;
      postCountEl.textContent = postCount;
      fileCountEl.textContent = fileCount;
      (thread.postLimit && !thread.isSticky ? $.addClass : $.rmClass)(postCountEl, 'warning');
      return (thread.fileLimit && !thread.isSticky ? $.addClass : $.rmClass)(fileCountEl, 'warning');
    }
  };

  ThreadUpdater = {
    init: function() {
      var checked, conf, el, input, name, sc, settings, subEntries, _ref,
        _this = this;

      if (g.VIEW !== 'thread' || !Conf['Thread Updater']) {
        return;
      }
      checked = Conf['Auto Update'] ? 'checked' : '';
      if (Conf['Updater and Stats in Header']) {
        this.dialog = sc = $.el('span', {
          innerHTML: "<span id=update-status></span><span id=update-timer title='Update now'></span>",
          id: 'updater'
        });
        Header.addShortcut(sc);
      } else {
        this.dialog = sc = UI.dialog('updater', 'bottom: 0px; left: 0px;', "<div class=move></div><span id=update-status></span><span id=update-timer title='Update now'></span>");
        $.addClass(doc, 'float');
        $.ready(function() {
          $.addClass(doc, 'float');
          return $.add(d.body, sc);
        });
      }
      this.checkPostCount = 0;
      this.timer = $('#update-timer', sc);
      this.status = $('#update-status', sc);
      $.on(this.timer, 'click', ThreadUpdater.update);
      $.on(this.status, 'click', ThreadUpdater.update);
      subEntries = [];
      _ref = Config.updater.checkbox;
      for (name in _ref) {
        conf = _ref[name];
        checked = Conf[name] ? 'checked' : '';
        el = $.el('label', {
          title: "" + conf[1],
          innerHTML: "<input name='" + name + "' type=checkbox " + checked + "> " + name
        });
        input = el.firstElementChild;
        $.on(input, 'change', $.cb.checked);
        if (input.name === 'Scroll BG') {
          $.on(input, 'change', ThreadUpdater.cb.scrollBG);
          ThreadUpdater.cb.scrollBG();
        } else if (input.name === 'Auto Update') {
          $.on(input, 'change', ThreadUpdater.update);
        }
        subEntries.push({
          el: el
        });
      }
      settings = $.el('span', {
        innerHTML: '<a href=javascript:;>Interval</a>'
      });
      $.on(settings, 'click', this.intervalShortcut);
      subEntries.push({
        el: settings
      });
      $.event('AddMenuEntry', {
        type: 'header',
        el: $.el('span', {
          textContent: 'Updater'
        }),
        order: 110,
        subEntries: subEntries
      });
      return Thread.prototype.callbacks.push({
        name: 'Thread Updater',
        cb: this.node
      });
    },
    node: function() {
      ThreadUpdater.thread = this;
      ThreadUpdater.root = this.OP.nodes.root.parentNode;
      ThreadUpdater.lastPost = +ThreadUpdater.root.lastElementChild.id.match(/\d+/)[0];
      ThreadUpdater.outdateCount = 0;
      ThreadUpdater.lastModified = '0';
      ThreadUpdater.cb.interval.call($.el('input', {
        value: Conf['Interval']
      }));
      $.on(window, 'online offline', ThreadUpdater.cb.online);
      $.on(d, 'QRPostSuccessful', ThreadUpdater.cb.post);
      $.on(d, 'visibilitychange', ThreadUpdater.cb.visibility);
      return ThreadUpdater.cb.online();
    },
    /*
    http://freesound.org/people/pierrecartoons1979/sounds/90112/
    cc-by-nc-3.0
    */

    beep: 'data:audio/wav;base64,UklGRjQDAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAc21wbDwAAABBAAADAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkYXRhzAIAAGMms8em0tleMV4zIpLVo8nhfSlcPR102Ki+5JspVEkdVtKzs+K1NEhUIT7DwKrcy0g6WygsrM2k1NpiLl0zIY/WpMrjgCdbPhxw2Kq+5Z4qUkkdU9K1s+K5NkVTITzBwqnczko3WikrqM+l1NxlLF0zIIvXpsnjgydZPhxs2ay95aIrUEkdUdC3suK8N0NUIjq+xKrcz002WioppdGm091pK1w0IIjYp8jkhydXPxxq2K295aUrTkoeTs65suK+OUFUIzi7xqrb0VA0WSoootKm0t5tKlo1H4TYqMfkiydWQBxm16+85actTEseS8y7seHAPD9TIza5yKra01QyWSson9On0d5wKVk2H4DYqcfkjidUQB1j1rG75KsvSkseScu8seDCPz1TJDW2yara1FYxWSwnm9Sn0N9zKVg2H33ZqsXkkihSQR1g1bK65K0wSEsfR8i+seDEQTxUJTOzy6rY1VowWC0mmNWoz993KVc3H3rYq8TklSlRQh1d1LS647AyR0wgRMbAsN/GRDpTJTKwzKrX1l4vVy4lldWpzt97KVY4IXbUr8LZljVPRCxhw7W3z6ZISkw1VK+4sMWvXEhSPk6buay9sm5JVkZNiLWqtrJ+TldNTnquqbCwilZXU1BwpKirrpNgWFhTaZmnpquZbFlbVmWOpaOonHZcXlljhaGhpZ1+YWBdYn2cn6GdhmdhYGN3lp2enIttY2Jjco+bnJuOdGZlZXCImJqakHpoZ2Zug5WYmZJ/bGlobX6RlpeSg3BqaW16jZSVkoZ0bGtteImSk5KIeG5tbnaFkJKRinxxbm91gY2QkIt/c3BwdH6Kj4+LgnZxcXR8iI2OjIR5c3J0e4WLjYuFe3VzdHmCioyLhn52dHR5gIiKioeAeHV1eH+GiYqHgXp2dnh9hIiJh4J8eHd4fIKHiIeDfXl4eHyBhoeHhH96eHmA',
    cb: {
      online: function() {
        if (ThreadUpdater.online = navigator.onLine) {
          ThreadUpdater.outdateCount = 0;
          ThreadUpdater.set('timer', ThreadUpdater.getInterval());
          ThreadUpdater.update();
          ThreadUpdater.set('status', null, null);
        } else {
          ThreadUpdater.set('timer', null);
          ThreadUpdater.set('status', 'Offline', 'warning');
        }
        return ThreadUpdater.cb.autoUpdate();
      },
      post: function(e) {
        if (e.detail.threadID !== ThreadUpdater.thread.ID) {
          return;
        }
        ThreadUpdater.outdateCount = 0;
        if (ThreadUpdater.seconds > 2) {
          return setTimeout(ThreadUpdater.update, 1000);
        }
      },
      checkpost: function() {
        if (!(g.DEAD || ThreadUpdater.foundPost || ThreadUpdater.checkPostCount >= 10)) {
          return setTimeout(ThreadUpdater.update, ++ThreadUpdater.checkPostCount * 500);
        }
        ThreadUpdater.checkPostCount = 0;
        delete ThreadUpdater.foundPost;
        return delete ThreadUpdater.postID;
      },
      visibility: function() {
        if (d.hidden) {
          return;
        }
        ThreadUpdater.outdateCount = 0;
        if (ThreadUpdater.seconds > ThreadUpdater.interval) {
          return ThreadUpdater.set('timer', ThreadUpdater.getInterval());
        }
      },
      scrollBG: function() {
        return ThreadUpdater.scrollBG = Conf['Scroll BG'] ? function() {
          return true;
        } : function() {
          return !d.hidden;
        };
      },
      autoUpdate: function() {
        if (ThreadUpdater.online) {
          return ThreadUpdater.timeoutID = setTimeout(ThreadUpdater.timeout, 1000);
        } else {
          return clearTimeout(ThreadUpdater.timeoutID);
        }
      },
      interval: function() {
        var val;

        val = +this.value;
        if (val < 1) {
          val = 1;
        }
        ThreadUpdater.interval = this.value = val;
        return $.cb.value.call(this);
      },
      load: function() {
        var klass, req, text, _ref;

        req = ThreadUpdater.req;
        switch (req.status) {
          case 200:
            g.DEAD = false;
            ThreadUpdater.parse(JSON.parse(req.response).posts);
            ThreadUpdater.lastModified = req.getResponseHeader('Last-Modified');
            if (Conf['Auto Update']) {
              ThreadUpdater.set('timer', ThreadUpdater.getInterval());
            }
            break;
          case 404:
            g.DEAD = true;
            ThreadUpdater.set('timer', null);
            ThreadUpdater.set('status', '404', 'warning');
            clearTimeout(ThreadUpdater.timeoutID);
            ThreadUpdater.thread.kill();
            $.event('ThreadUpdate', {
              404: true,
              thread: ThreadUpdater.thread
            });
            break;
          default:
            if (Conf['Auto Update']) {
              ThreadUpdater.outdateCount++;
              ThreadUpdater.set('timer', ThreadUpdater.getInterval());
            }
            /*
            Status Code 304: Not modified
            By sending the `If-Modified-Since` header we get a proper status code, and no response.
            This saves bandwidth for both the user and the servers and avoid unnecessary computation.
            */

            _ref = [0, 304].contains(req.status) ? [null, null] : ["" + req.statusText + " (" + req.status + ")", 'warning'], text = _ref[0], klass = _ref[1];
            ThreadUpdater.set('status', text, klass);
        }
        if (ThreadUpdater.postID) {
          ThreadUpdater.cb.checkpost(this.status);
        }
        return delete ThreadUpdater.req;
      }
    },
    getInterval: function() {
      var i, j;

      i = ThreadUpdater.interval;
      j = Math.min(ThreadUpdater.outdateCount, 10);
      if (!d.hidden) {
        j = Math.min(j, 7);
      }
      return ThreadUpdater.seconds = Conf['Optional Increase'] ? Math.max(i, [0, 5, 10, 15, 20, 30, 60, 90, 120, 240, 300][j]) : i;
    },
    intervalShortcut: function() {
      var settings;

      Settings.open('Advanced');
      settings = $.id('fourchanx-settings');
      return $('input[name=Interval]', settings).focus();
    },
    set: function(name, text, klass) {
      var el, node;

      el = ThreadUpdater[name];
      if (node = el.firstChild) {
        node.data = text;
      } else {
        el.textContent = text;
      }
      if (klass !== void 0) {
        return el.className = klass;
      }
    },
    timeout: function() {
      var n;

      ThreadUpdater.timeoutID = setTimeout(ThreadUpdater.timeout, 1000);
      if (!(n = --ThreadUpdater.seconds)) {
        return ThreadUpdater.update();
      } else if (n <= -60) {
        ThreadUpdater.set('status', 'Retrying', null);
        return ThreadUpdater.update();
      } else if (n > 0) {
        return ThreadUpdater.set('timer', n);
      }
    },
    update: function() {
      var url;

      if (!ThreadUpdater.online) {
        return;
      }
      ThreadUpdater.seconds = 0;
      if (Conf['Auto Update']) {
        ThreadUpdater.set('timer', '...');
      } else {
        ThreadUpdater.set('timer', 'Update');
      }
      if (ThreadUpdater.req) {
        ThreadUpdater.req.onloadend = null;
        ThreadUpdater.req.abort();
      }
      url = "//api.4chan.org/" + ThreadUpdater.thread.board + "/res/" + ThreadUpdater.thread + ".json";
      return ThreadUpdater.req = $.ajax(url, {
        onloadend: ThreadUpdater.cb.load
      }, {
        headers: {
          'If-Modified-Since': ThreadUpdater.lastModified
        }
      });
    },
    updateThreadStatus: function(title, OP) {
      var icon, message, root, titleLC;

      titleLC = title.toLowerCase();
      if (ThreadUpdater.thread["is" + title] === !!OP[titleLC]) {
        return;
      }
      if (!(ThreadUpdater.thread["is" + title] = !!OP[titleLC])) {
        message = title === 'Sticky' ? 'The thread is not a sticky anymore.' : 'The thread is not closed anymore.';
        new Notification('info', message, 30);
        $.rm($("." + titleLC + "Icon", ThreadUpdater.thread.OP.nodes.info));
        return;
      }
      message = title === 'Sticky' ? 'The thread is now a sticky.' : 'The thread is now closed.';
      new Notification('info', message, 30);
      icon = $.el('img', {
        src: "//static.4chan.org/image/" + titleLC + ".gif",
        alt: title,
        title: title,
        className: "" + titleLC + "Icon"
      });
      root = $('[title="Quote this post"]', ThreadUpdater.thread.OP.nodes.info);
      if (title === 'Closed') {
        root = $('.stickyIcon', ThreadUpdater.thread.OP.nodes.info) || root;
      }
      return $.after(root, [$.tn(' '), icon]);
    },
    parse: function(postObjects) {
      var ID, OP, count, deletedFiles, deletedPosts, files, index, key, node, num, post, postObject, posts, scroll, _i, _len, _ref;

      OP = postObjects[0];
      Build.spoilerRange[ThreadUpdater.thread.board] = OP.custom_spoiler;
      ThreadUpdater.updateThreadStatus('Sticky', OP);
      ThreadUpdater.updateThreadStatus('Closed', OP);
      ThreadUpdater.thread.postLimit = !!OP.bumplimit;
      ThreadUpdater.thread.fileLimit = !!OP.imagelimit;
      posts = [];
      index = [];
      files = [];
      count = 0;
      for (_i = 0, _len = postObjects.length; _i < _len; _i++) {
        postObject = postObjects[_i];
        num = postObject.no;
        index.push(num);
        if (postObject.fsize) {
          files.push(num);
        }
        if (num <= ThreadUpdater.lastPost) {
          continue;
        }
        count++;
        node = Build.postFromObject(postObject, ThreadUpdater.thread.board);
        posts.push(new Post(node, ThreadUpdater.thread, ThreadUpdater.thread.board));
      }
      deletedPosts = [];
      deletedFiles = [];
      _ref = ThreadUpdater.thread.posts;
      for (ID in _ref) {
        post = _ref[ID];
        ID = +ID;
        if (post.isDead && index.contains(ID)) {
          post.resurrect();
        } else if (!index.contains(ID)) {
          post.kill();
          deletedPosts.push(post);
        } else if (post.file && !post.file.isDead && !files.contains(ID)) {
          post.kill(true);
          deletedFiles.push(post);
        }
        if (ThreadUpdater.postID) {
          if (ID === ThreadUpdater.postID) {
            ThreadUpdater.foundPost = true;
          }
        }
      }
      if (!count) {
        ThreadUpdater.set('status', null, null);
        ThreadUpdater.outdateCount++;
      } else {
        ThreadUpdater.set('status', "+" + count, 'new');
        ThreadUpdater.outdateCount = 0;
        if (Conf['Beep'] && d.hidden && Unread.posts && !Unread.posts.length) {
          if (!ThreadUpdater.audio) {
            ThreadUpdater.audio = $.el('audio', {
              src: ThreadUpdater.beep
            });
          }
          ThreadUpdater.audio.play();
        }
        ThreadUpdater.lastPost = posts[count - 1].ID;
        Main.callbackNodes(Post, posts);
        scroll = Conf['Auto Scroll'] && ThreadUpdater.scrollBG() && ThreadUpdater.root.getBoundingClientRect().bottom - doc.clientHeight < 25;
        for (key in posts) {
          post = posts[key];
          if (!posts.hasOwnProperty(key)) {
            continue;
          }
          if (post.cb) {
            if (!post.cb.call(post)) {
              $.add(ThreadUpdater.root, post.nodes.root);
            }
          } else {
            $.add(ThreadUpdater.root, post.nodes.root);
          }
        }
        if (scroll) {
          if (Conf['Bottom Scroll']) {
            doc.scrollTop = d.body.clientHeight;
          } else {
            Header.scrollToPost(nodes[0]);
          }
        }
        $.queueTask(function() {
          var length, threadID;

          threadID = ThreadUpdater.thread.ID;
          length = $$('.thread > .postContainer', ThreadUpdater.root).length;
          return Fourchan.parseThread(threadID, length - count, length);
        });
      }
      return $.event('ThreadUpdate', {
        404: false,
        thread: ThreadUpdater.thread,
        newPosts: posts,
        deletedPosts: deletedPosts,
        deletedFiles: deletedFiles,
        postCount: OP.replies + 1,
        fileCount: OP.images + (!!ThreadUpdater.thread.OP.file && !ThreadUpdater.thread.OP.file.isDead)
      });
    }
  };

  ThreadWatcher = {
    init: function() {
      if (!Conf['Thread Watcher']) {
        return;
      }
      this.dialog = UI.dialog('watcher', 'top: 50px; left: 0px;', '<div class=move>Thread Watcher</div>');
      $.on(d, 'QRPostSuccessful', this.cb.post);
      $.on(d, '4chanXInitFinished', this.ready);
      $.sync('WatchedThreads', this.refresh);
      return Thread.prototype.callbacks.push({
        name: 'Thread Watcher',
        cb: this.node
      });
    },
    node: function() {
      var favicon,
        _this = this;

      favicon = $.el('img', {
        className: 'favicon'
      });
      $.on(favicon, 'click', ThreadWatcher.cb.toggle);
      $.before($('input', this.OP.nodes.post), favicon);
      if (g.VIEW !== 'thread') {
        return;
      }
      return $.get('AutoWatch', 0, function(item) {
        if (item['AutoWatch'] !== _this.ID) {
          return;
        }
        ThreadWatcher.watch(_this);
        return $["delete"]('AutoWatch');
      });
    },
    ready: function() {
      $.off(d, '4chanXInitFinished', ThreadWatcher.ready);
      if (!Main.isThisPageLegit()) {
        return;
      }
      ThreadWatcher.refresh();
      return $.add(d.body, ThreadWatcher.dialog);
    },
    refresh: function(watched) {
      var ID, board, div, favicon, id, link, nodes, props, thread, x, _ref, _ref1;

      if (!watched) {
        $.get('WatchedThreads', {}, function(item) {
          return ThreadWatcher.refresh(item['WatchedThreads']);
        });
        return;
      }
      nodes = [$('.move', ThreadWatcher.dialog)];
      for (board in watched) {
        _ref = watched[board];
        for (id in _ref) {
          props = _ref[id];
          x = $.el('a', {
            textContent: '×',
            className: 'close',
            href: 'javascript:;'
          });
          $.on(x, 'click', ThreadWatcher.cb.x);
          link = $.el('a', props);
          link.title = link.textContent;
          div = $.el('div');
          $.add(div, [x, $.tn(' '), link]);
          nodes.push(div);
        }
      }
      $.rmAll(ThreadWatcher.dialog);
      $.add(ThreadWatcher.dialog, nodes);
      watched = watched[g.BOARD] || {};
      _ref1 = g.BOARD.threads;
      for (ID in _ref1) {
        thread = _ref1[ID];
        favicon = $('.favicon', thread.OP.nodes.post);
        favicon.src = ID in watched ? Favicon["default"] : Favicon.empty;
      }
    },
    cb: {
      toggle: function() {
        return ThreadWatcher.toggle(Get.postFromNode(this).thread);
      },
      x: function() {
        var thread;

        thread = this.nextElementSibling.pathname.split('/');
        return ThreadWatcher.unwatch(thread[1], thread[3]);
      },
      post: function(e) {
        var board, postID, threadID, _ref;

        _ref = e.detail, board = _ref.board, postID = _ref.postID, threadID = _ref.threadID;
        if (postID === threadID) {
          if (Conf['Auto Watch']) {
            return $.set('AutoWatch', threadID);
          }
        } else if (Conf['Auto Watch Reply']) {
          return ThreadWatcher.watch(board.threads[threadID]);
        }
      }
    },
    toggle: function(thread) {
      if ($('.favicon', thread.OP.nodes.post).src === Favicon.empty) {
        return ThreadWatcher.watch(thread);
      } else {
        return ThreadWatcher.unwatch(thread.board, thread.ID);
      }
    },
    unwatch: function(board, threadID) {
      return $.get('WatchedThreads', {}, function(item) {
        var watched;

        watched = item['WatchedThreads'];
        delete watched[board][threadID];
        if (!Object.keys(watched[board]).length) {
          delete watched[board];
        }
        ThreadWatcher.refresh(watched);
        return $.set('WatchedThreads', watched);
      });
    },
    watch: function(thread) {
      return $.get('WatchedThreads', {}, function(item) {
        var watched, _name;

        watched = item['WatchedThreads'];
        watched[_name = thread.board] || (watched[_name] = {});
        watched[thread.board][thread] = {
          href: "/" + thread.board + "/res/" + thread,
          textContent: Get.threadExcerpt(thread)
        };
        ThreadWatcher.refresh(watched);
        return $.set('WatchedThreads', watched);
      });
    }
  };

  Unread = {
    init: function() {
      if (g.VIEW !== 'thread' || !Conf['Unread Count'] && !Conf['Unread Favicon']) {
        return;
      }
      this.db = new DataBoard('lastReadPosts', this.sync);
      this.hr = $.el('hr', {
        id: 'unread-line'
      });
      this.posts = [];
      this.postsQuotingYou = [];
      return Thread.prototype.callbacks.push({
        name: 'Unread',
        cb: this.node
      });
    },
    node: function() {
      Unread.thread = this;
      Unread.title = d.title;
      Unread.lastReadPost = Unread.db.get({
        boardID: this.board.ID,
        threadID: this.ID,
        defaultValue: 0
      });
      $.on(d, '4chanXInitFinished', Unread.ready);
      $.on(d, 'ThreadUpdate', Unread.onUpdate);
      return $.on(d, 'scroll visibilitychange', Unread.read);
    },
    ready: function() {
      var ID, post, posts, _ref;

      $.off(d, '4chanXInitFinished', Unread.ready);
      posts = [];
      _ref = Unread.thread.posts;
      for (ID in _ref) {
        post = _ref[ID];
        if (post.isReply) {
          posts.push(post);
        }
      }
      Unread.addPosts(posts);
      if (Conf['Unread Line']) {
        Unread.setLine();
      }
      if (Conf['Scroll to Last Read Post']) {
        return Unread.scroll();
      }
    },
    scroll: function() {
      var hash, post, posts, prevID, root;

      if ((hash = location.hash.match(/\d+/)) && hash[0] in Unread.thread.posts) {
        return;
      }
      if (Unread.posts.length) {
        prevID = 0;
        while (root = $.x('preceding-sibling::div[contains(@class,"postContainer")][1]', Unread.posts[0].nodes.root)) {
          post = Get.postFromRoot(root);
          if (prevID === post.ID) {
            break;
          }
          prevID = post.ID;
          if (!post.isHidden) {
            break;
          }
        }
        root.scrollIntoView(false);
        return;
      }
      posts = Object.keys(Unread.thread.posts);
      return Header.scrollToPost(Unread.thread.posts[posts[posts.length - 1]].nodes.root);
    },
    sync: function() {
      var lastReadPost;

      lastReadPost = Unread.db.get({
        boardID: Unread.thread.board.ID,
        threadID: Unread.thread.ID,
        defaultValue: 0
      });
      if (!(Unread.lastReadPost < lastReadPost)) {
        return;
      }
      Unread.lastReadPost = lastReadPost;
      Unread.readArray(Unread.posts);
      Unread.readArray(Unread.postsQuotingYou);
      Unread.setLine();
      return Unread.update();
    },
    addPosts: function(newPosts) {
      var ID, data, post, _i, _len;

      for (_i = 0, _len = newPosts.length; _i < _len; _i++) {
        post = newPosts[_i];
        ID = post.ID;
        if (ID <= Unread.lastReadPost || post.isHidden) {
          continue;
        }
        if (QR.db) {
          data = {
            boardID: post.board.ID,
            threadID: post.thread.ID,
            postID: post.ID
          };
          if (QR.db.get(data)) {
            continue;
          }
        }
        Unread.posts.push(post);
        Unread.addPostQuotingYou(post);
      }
      if (Conf['Unread Line']) {
        Unread.setLine(newPosts.contains(Unread.posts[0]));
      }
      Unread.read();
      return Unread.update();
    },
    addPostQuotingYou: function(post) {
      var quotelink, _i, _len, _ref;

      if (!QR.db) {
        return;
      }
      _ref = post.nodes.quotelinks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        if (QR.db.get(Get.postDataFromLink(quotelink))) {
          Unread.postsQuotingYou.push(post);
        }
      }
    },
    onUpdate: function(e) {
      if (e.detail[404]) {
        return Unread.update();
      } else {
        return Unread.addPosts(e.detail.newPosts);
      }
    },
    readSinglePost: function(post) {
      var i;

      if ((i = Unread.posts.indexOf(post)) === -1) {
        return;
      }
      Unread.posts.splice(i, 1);
      if (i === 0) {
        Unread.lastReadPost = post.ID;
        Unread.saveLastReadPost();
      }
      if ((i = Unread.postsQuotingYou.indexOf(post)) !== -1) {
        Unread.postsQuotingYou.splice(i, 1);
      }
      return Unread.update();
    },
    readArray: function(arr) {
      var i, post, _i, _len;

      for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
        post = arr[i];
        if (post.ID > Unread.lastReadPost) {
          break;
        }
      }
      return arr.splice(0, i);
    },
    read: $.debounce(50, function(e) {
      var ID, bottom, height, i, post, posts, read;

      if (d.hidden || !Unread.posts.length) {
        return;
      }
      height = doc.clientHeight;
      posts = Unread.posts;
      read = [];
      i = posts.length;
      while (post = posts[--i]) {
        bottom = post.nodes.root.getBoundingClientRect().bottom;
        if (bottom < height) {
          ID = post.ID;
          posts.remove(post);
        }
      }
      if (!ID) {
        return;
      }
      Unread.lastReadPost = ID;
      Unread.saveLastReadPost();
      Unread.readArray(Unread.postsQuotingYou);
      if (e) {
        return Unread.update();
      }
    }),
    saveLastReadPost: $.debounce(2 * $.SECOND, function() {
      return Unread.db.set({
        boardID: Unread.thread.board.ID,
        threadID: Unread.thread.ID,
        val: Unread.lastReadPost
      });
    }),
    setLine: function(force) {
      var post, root;

      if (!(d.hidden || force === true)) {
        return;
      }
      if (post = Unread.posts[0]) {
        root = post.nodes.root;
        if (root !== $('.thread > .replyContainer', root.parentNode)) {
          return $.before(root, Unread.hr);
        }
      } else {
        return $.rm(Unread.hr);
      }
    },
    update: function() {
      var count;

      count = Unread.posts.length;
      if (Conf['Unread Count']) {
        d.title = "" + (count || !Conf['Hide Unread Count at (0)'] ? "(" + count + ") " : '') + (g.DEAD ? "/" + g.BOARD + "/ - 404" : "" + Unread.title);
      }
      if (!Conf['Unread Favicon']) {
        return;
      }
      Favicon.el.href = g.DEAD ? Unread.postsQuotingYou.length ? Favicon.unreadDeadY : count ? Favicon.unreadDead : Favicon.dead : count ? Unread.postsQuotingYou.length ? Favicon.unreadY : Favicon.unread : Favicon["default"];
      return $.add(d.head, Favicon.el);
    }
  };

  Redirect = {
    init: function() {
      return $.sync('archs', this.updateArchives);
    },
    updateArchives: function() {
      return $.get('archivers', {}, function(_arg) {
        var archivers;

        archivers = _arg.archivers;
        return Conf['archivers'] = archivers;
      });
    },
    image: function(boardID, filename) {
      switch (boardID) {
        case 'a':
        case 'gd':
        case 'jp':
        case 'm':
        case 'q':
        case 'tg':
        case 'vp':
        case 'vr':
        case 'wsg':
          return "//archive.foolz.us/" + boardID + "/full_image/" + filename;
        case 'u':
          return "//nsfw.foolz.us/" + boardID + "/full_image/" + filename;
        case 'v':
        case 'vg':
          return "//archive.nihil-ad-rem.net/" + boardID + "/full_image/" + filename;
        case 'po':
          return "//archive.thedarkcave.org/" + boardID + "/full_image/" + filename;
        case 'hr':
        case 'tv':
          return "http://archive.4plebs.org/" + boardID + "/full_image/" + filename;
        case 'c':
        case 'w':
        case 'wg':
          return "//archive.nyafuu.org/" + boardID + "/full_image/" + filename;
        case 'd':
          return "//loveisover.me/" + boardID + "/full_image/" + filename;
        case 'ck':
        case 'fa':
        case 'lit':
        case 's4s':
          return "//fuuka.warosu.org/" + boardID + "/full_image/" + filename;
        case 'cgl':
        case 'g':
        case 'mu':
          return "//rbt.asia/" + boardID + "/full_image/" + filename;
        case 'an':
        case 'k':
        case 'toy':
        case 'x':
          return "http://archive.heinessen.com/" + boardID + "/full_image/" + filename;
        case 'c':
          return "//archive.nyafuu.org/" + boardID + "/full_image/" + filename;
      }
    },
    post: function(boardID, postID) {
      var archive, name, _base, _ref;

      if (Redirect.post[boardID] == null) {
        _ref = this.archiver;
        for (name in _ref) {
          archive = _ref[name];
          if (archive.type === 'foolfuuka' && archive.boards.contains(boardID)) {
            Redirect.post[boardID] = archive.base;
            break;
          }
        }
        (_base = Redirect.post)[boardID] || (_base[boardID] = false);
      }
      if (Redirect.post[boardID]) {
        return "" + Redirect.post[boardID] + "/_/api/chan/post/?board=" + boardID + "&num=" + postID;
      } else {
        return null;
      }
    },
    select: function(board) {
      var archive, name, _ref, _results;

      _ref = this.archiver;
      _results = [];
      for (name in _ref) {
        archive = _ref[name];
        if (!archive.boards.contains(board)) {
          continue;
        }
        _results.push(name);
      }
      return _results;
    },
    to: function(data) {
      var arch, archive, boardID;

      boardID = data.boardID;
      if ((arch = Conf.archivers[boardID]) == null) {
        Conf.archivers[boardID] = arch = this.select(boardID)[0];
        $.set('archivers', Conf.archivers);
      }
      return (arch && (archive = this.archiver[arch]) ? Redirect.path(archive.base, archive.type, data) : data.threadID ? "//boards.4chan.org/" + boardID + "/" : null);
      if (!archive.boards.contains(g.BOARD.ID)) {
        return Conf['archivers'] = archive;
      }
    },
    archiver: {
      'Foolz': {
        base: 'https://archive.foolz.us',
        boards: ['a', 'co', 'gd', 'jp', 'm', 'q', 'sp', 'tg', 'tv', 'vp', 'vr', 'wsg'],
        type: 'foolfuuka'
      },
      'NihilAdRem': {
        base: '//archive.nihil-ad-rem.net',
        boards: ['v', 'vg'],
        type: 'foolfuuka'
      },
      'NSFWFoolz': {
        base: 'https://nsfw.foolz.us',
        boards: ['u'],
        type: 'foolfuuka'
      },
      'TheDarkCave': {
        base: 'http://archive.thedarkcave.org',
        boards: ['c', 'int', 'out', 'po'],
        type: 'foolfuuka'
      },
      '4plebs': {
        base: 'http://archive.4plebs.org',
        boards: ['hr', 'tg', 'tv', 'x'],
        base: 'foolfuuka'
      },
      'NyaFuu': {
        base: '//archive.nyafuu.org',
        boards: ['c', 'w', 'wg'],
        type: 'foolfuuka'
      },
      'LoveIsOver': {
        base: '//loveisover.me',
        boards: ['d'],
        type: 'foolfuuka'
      },
      'Warosu': {
        base: '//fuuka.warosu.org',
        boards: ['cgl', 'ck', 'fa', 'jp', 'lit', 's4s', 'q', 'tg'],
        type: 'fuuka'
      },
      'InstallGentoo': {
        base: '//archive.installgentoo.net',
        boards: ['diy', 'g', 'sci'],
        type: 'fuuka'
      },
      'RebeccaBlackTech': {
        base: '//rbt.asia',
        boards: ['an', 'cgl', 'g', 'mu', 'w'],
        type: 'fuuka_mail'
      },
      'Heinessen': {
        base: 'http://archive.heinessen.com',
        boards: ['an', 'fit', 'k', 'mlp', 'r9k', 'toy', 'x'],
        type: 'fuuka'
      },
      'Cliche': {
        base: '//www.cliché.net/4chan/cgi-board.pl',
        boards: ['e'],
        type: 'fuuka'
      }
    },
    path: function(base, archiver, data) {
      var boardID, path, postID, threadID, type, value;

      if (data.isSearch) {
        boardID = data.boardID, type = data.type, value = data.value;
        type = type === 'name' ? 'username' : type === 'MD5' ? 'image' : type;
        value = encodeURIComponent(value);
        if (archiver === 'foolfuuka') {
          return "" + base + "/" + boardID + "/search/" + type + "/" + value;
        } else if (type === 'image') {
          return "" + base + "/" + boardID + "/?task=search2&search_media_hash=" + value;
        } else {
          return "" + base + "/" + boardID + "/?task=search2&search_" + type + "=" + value;
        }
      }
      boardID = data.boardID, threadID = data.threadID, postID = data.postID;
      path = threadID ? "" + boardID + "/thread/" + threadID : "" + boardID + "/post/" + postID;
      if (archiver === 'foolfuuka') {
        path += '/';
      }
      if (threadID && postID) {
        path += archiver === 'foolfuuka' ? "#" + postID : "#p" + postID;
      }
      return "" + base + "/" + path;
    }
  };

  PSAHiding = {
    init: function() {
      var entry;

      if (!Conf['Announcement Hiding']) {
        return;
      }
      entry = {
        type: 'header',
        el: $.el('a', {
          textContent: 'Show announcement',
          className: 'show-announcement',
          href: 'javascript:;'
        }),
        order: 50,
        open: function() {
          var _ref;

          if ((_ref = $.id('globalMessage')) != null ? _ref.hidden : void 0) {
            return true;
          }
          return false;
        }
      };
      $.event('AddMenuEntry', entry);
      $.on(entry.el, 'click', PSAHiding.toggle);
      $.addClass(doc, 'hide-announcement');
      return $.on(d, '4chanXInitFinished', this.setup);
    },
    setup: function() {
      var btn, psa;

      $.off(d, '4chanXInitFinished', PSAHiding.setup);
      if (!(psa = $.id('globalMessage'))) {
        $.rmClass(doc, 'hide-announcement');
        return;
      }
      PSAHiding.btn = btn = $.el('a', {
        innerHTML: '<span>[&nbsp;-&nbsp;]</span>',
        title: 'Hide announcement.',
        className: 'hide-announcement',
        href: 'javascript:;'
      });
      $.on(btn, 'click', PSAHiding.toggle);
      $.get('hiddenPSAs', [], function(item) {
        PSAHiding.sync(item['hiddenPSAs']);
        $.before(psa, btn);
        return $.rmClass(doc, 'hide-announcement');
      });
      return $.sync('hiddenPSAs', PSAHiding.sync);
    },
    toggle: function(e) {
      var hide, text;

      hide = $.hasClass(this, 'hide-announcement');
      text = PSAHiding.trim($.id('globalMessage'));
      return $.get('hiddenPSAs', [], function(_arg) {
        var hiddenPSAs, i;

        hiddenPSAs = _arg.hiddenPSAs;
        if (hide) {
          hiddenPSAs.push(text);
          hiddenPSAs = hiddenPSAs.slice(-5);
        } else {
          $.event('CloseMenu');
          i = hiddenPSAs.indexOf(text);
          hiddenPSAs.splice(i, 1);
        }
        PSAHiding.sync(hiddenPSAs);
        return $.set('hiddenPSAs', hiddenPSAs);
      });
    },
    sync: function(hiddenPSAs) {
      var hr, psa;

      psa = $.id('globalMessage');
      psa.hidden = PSAHiding.btn.hidden = hiddenPSAs.contains(PSAHiding.trim(psa)) ? true : false;
      if ((hr = psa.nextElementSibling) && hr.nodeName === 'HR') {
        return hr.hidden = psa.hidden;
      }
    },
    trim: function(psa) {
      return psa.textContent.replace(/\W+/g, '').toLowerCase();
    }
  };

  CatalogLinks = {
    init: function() {
      var el, input;

      if (!Conf['Catalog Links']) {
        return;
      }
      el = $.el('label', {
        id: 'toggleCatalog',
        href: 'javascript:;',
        innerHTML: "<input type=checkbox " + (Conf['Header catalog links'] ? 'checked' : '') + ">Catalog Links",
        title: "Turn catalog links " + (Conf['Header catalog links'] ? 'off' : 'on') + "."
      });
      input = $('input', el);
      $.on(input, 'change', this.toggle);
      $.sync('Header catalog links', CatalogLinks.set);
      $.event('AddMenuEntry', {
        type: 'header',
        el: el,
        order: 95
      });
      return $.on(d, '4chanXInitFinished', function() {
        return CatalogLinks.set(Conf['Header catalog links']);
      });
    },
    toggle: function() {
      var useCatalog;

      $.event('CloseMenu');
      $.set('Header catalog links', useCatalog = this.checked);
      return CatalogLinks.set(useCatalog);
    },
    set: function(useCatalog) {
      var a, board, path, _i, _len, _ref;

      path = useCatalog ? 'catalog' : '';
      _ref = $$("#board-list a[href*=\"boards.4chan.org\"],\n#boardNavDesktop a[href*=\"boards.4chan.org\"],\n#boardNavDesktopFoot a[href*=\"boards.4chan.org\"]");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        board = a.pathname.split('/')[1];
        if (['f', 'status', '4chan'].contains(board) || !board) {
          continue;
        }
        if (Conf['External Catalog']) {
          a.href = useCatalog ? CatalogLinks.external(board) : "//boards.4chan.org/" + board + "/";
        } else {
          a.pathname = "/" + board + "/" + path;
        }
        a.title = useCatalog ? "" + a.title + " - Catalog" : a.title.replace(/\ -\ Catalog$/, '');
      }
      return this.title = "Turn catalog links " + (useCatalog ? 'off' : 'on') + ".";
    },
    external: function(board) {
      return (['a', 'c', 'g', 'co', 'k', 'm', 'o', 'p', 'v', 'vg', 'w', 'cm', '3', 'adv', 'an', 'cgl', 'ck', 'diy', 'fa', 'fit', 'int', 'jp', 'mlp', 'lit', 'mu', 'n', 'po', 'sci', 'toy', 'trv', 'tv', 'vp', 'x', 'q'].contains(board) ? "http://catalog.neet.tv/" + board : ['d', 'e', 'gif', 'h', 'hr', 'hc', 'r9k', 's', 'pol', 'soc', 'u', 'i', 'ic', 'hm', 'r', 'w', 'wg', 'wsg', 't', 'y'].contains(board) ? "http://4index.gropes.us/" + board : "//boards.4chan.org/" + board + "/catalog");
    }
  };

  IDColor = {
    init: function() {
      if (!Conf['Color User IDs']) {
        return;
      }
      return Post.prototype.callbacks.push({
        name: 'Reveal Spoilers',
        cb: this.node
      });
    },
    node: function(post) {
      var str, uid;

      if (!(uid = $('.hand', this.nodes.uniqueID))) {
        return;
      }
      str = this.info.uniqueID;
      if (uid.nodeName === 'SPAN') {
        return uid.style.cssText = IDColor.apply.call(str);
      }
    },
    ids: {},
    compute: function(str) {
      var hash, rgb;

      hash = this.hash(str);
      rgb = [(hash >> 24) & 0xFF, (hash >> 16) & 0xFF, (hash >> 8) & 0xFF];
      rgb[3] = ((rgb[0] * 0.299) + (rgb[1] * 0.587) + (rgb[2] * 0.114)) > 125;
      this.ids[str] = rgb;
      return rgb;
    },
    apply: function() {
      var rgb;

      rgb = IDColor.ids[this] || IDColor.compute(this);
      return ("background-color: rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "); color: ") + (rgb[3] ? "black;" : "white; border-radius: 3px; padding: 0px 2px;");
    },
    hash: function(str) {
      var i, j, msg;

      msg = 0;
      i = 0;
      j = str.length;
      while (i < j) {
        msg = ((msg << 5) - msg) + str.charCodeAt(i);
        ++i;
      }
      return msg;
    }
  };

  CustomCSS = {
    init: function() {
      if (!Conf['Custom CSS']) {
        return;
      }
      return this.addStyle();
    },
    addStyle: function() {
      return this.style = $.addStyle(Conf['usercss']);
    },
    rmStyle: function() {
      if (this.style) {
        $.rm(this.style);
        return delete this.style;
      }
    },
    update: function() {
      if (!this.style) {
        this.addStyle();
      }
      return this.style.textContent = Conf['usercss'];
    }
  };

  Emoji = {
    init: function() {
      var css, icon, name, pos, _ref;

      if (!Conf['Emoji']) {
        return;
      }
      pos = Conf['emojiPos'];
      css = ["a.useremail[href]:last-of-type::" + pos + " {\n  vertical-align: top;\n  margin-" + (pos === "before" ? "right" : "left") + ": 5px;\n}\n"];
      this.icons["PlanNine"] = Emoji.icons["Plan9"];
      this.icons['Sage'] = Emoji.sage[Conf['sageEmoji']];
      _ref = this.icons;
      for (name in _ref) {
        icon = _ref[name];
        if (!this.icons.hasOwnProperty(name)) {
          continue;
        }
        css.push("a.useremail[href*='" + name + "']:last-of-type::" + pos + ",\na.useremail[href*='" + (name.toLowerCase()) + "']:last-of-type::" + pos + ",\na.useremail[href*='" + (name.toUpperCase()) + "']:last-of-type::" + pos + " {\n  content: url('data:image/png;base64," + icon + "');\n}\n");
      }
      return $.addStyle(css.join(""), 'emoji');
    },
    sage: {
      '4chan SS': 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAa9JREFUKFOdkt0rg2EUwM95b2zlL0CRRLngksznXrJsNtYW1tjYhM3mY6+IXZAbikhTKJp8XZAp81UmWYhIRHHhUi60e7s6ntdCa2449es8PfU7z+k5B6AbyuE/wQlc4BcO2d06unAUBCgFE0hianOd3NHIcy8NPwrUf9NBPZcOEi7ayXZiea/1V7+ljaXeYAfOgg2So2TOwQWGnwQafOgi962TnMFmatozUeNu4yetASspVvgXiUvii5K5Nm6z56ol3Hdtpy+cwSYy+HRUt1nLsoEato0kXyh6wTac+24brThWv6MNOYNW9prlG/uxmbRrFaT0VrCspZoNPSUNJNyCBcoiLZuhLH0o9U6UrAfGKCz7RlLM81Q8XUwqr4oKPLIQmnA8IupBigacVy7yrya/2JouhryJHJJNykg+UxLGOtz6+SQNpEiMcduls4Wvoli9WklVKz+ol5SU4U6ngql8Qj2eRI+GyajBhSRH4r3cUxhSeRVhsYBmWUWiyM+UMDmDUI2nsfuSC1I27nLgYZJlP8jhjJ3PY8iE+L8tWx4kQC6MQA5b1D9HNiRCFhx8AF/e2qh92VnKAAAAAElFTkSuQmCC',
      'appchan': 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAABa1BMVEUAAACqrKiCgYIAAAAAAAAAAACHmX5pgl5NUEx/hnx4hXRSUVMiIyKwrbFzn19SbkZ1d3OvtqtpaWhcX1ooMyRsd2aWkZddkEV8vWGcpZl+kHd7jHNdYFuRmI4bHRthaV5WhUFsfGZReUBFZjdJazpGVUBnamYfHB9TeUMzSSpHgS1cY1k1NDUyOC8yWiFywVBoh1lDSEAZHBpucW0ICQgUHhBjfFhCRUA+QTtEQUUBAQFyo1praWspKigWFRZHU0F6j3E9Oz5VWFN0j2hncWONk4sAAABASDxJWkJKTUgAAAAvNC0fJR0DAwMAAAA9QzoWGhQAAAA8YytvrFOJsnlqyT9oqExqtkdrsExpsUsqQx9rpVJDbzBBbi5utk9jiFRuk11iqUR64k5Wf0JIZTpadk5om1BkyjmF1GRNY0FheFdXpjVXhz86XSp2yFJwslR3w1NbxitbtDWW5nNnilhFXTtYqDRwp1dSijiJ7H99AAAAUnRSTlMAJTgNGQml71ypu3cPEN/RDh8HBbOwQN7wVg4CAQZ28vs9EDluXjo58Ge8xwMy0P3+rV8cT73sawEdTv63NAa3rQwo4cUdAl3hWQSWvS8qqYsjEDiCzAAAAIVJREFUeNpFx7GKAQAYAOD/A7GbZVAWZTBZFGQw6LyCF/MIkiTdcOmWSzYbJVE2u1KX0J1v+8QDv/EkyS0yXF/NgeEILiHfyc74mICTQltqYXBeAWU9HGxU09YqqEvAElGjyZYjPyLqitjzHSEiGkrsfMWr0VLe+oy/djGP//YwfbeP8bN3Or0bkqEVblAAAAAASUVORK5CYII='
    },
    icons: {
      'Plan9': 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAAGn5h7fAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AoYAzE15J1s7QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACAElEQVQoz3WSz4sSARTHvzMjygpqYg3+KIhkE83DKtKlf0C9SrTRuZNEx0VowU6CuSeJNlwwpEO2kJ6SQBiIUAzFjRDF4wrjKosnGx3HmdehFDfpe/2+z/s++D5gU7IsEwRByICIiAEAIiIAYAFAXsjYVr/fLxMRNVvN+prJ5/OA3+/XERFNf02JyeVyDx0OxyvLNQsnimLKfcf9KRQKXQAAnE6nlf5qMpnQycnbP/kAoKoqsSwLAJhOp+AAwOv1otvtpqxWq73dbt/r9XqvEQ6HUalUEvF4XLd5IpvNZqlerzd5nlf6/f6tTCZjBACk0+nb+XxeW4UrikLJZPImAGA0Gq0NIqJyuSyyANDr9Q5Wu1utFvR6/SULAI1G4+vK8Pv90DTtGwsAJpPpaGUYDAZ0Op3PHAAEg8H3tVqtbrtu21sqyxuRSOQJk0ql9IvF4r7b7f7pcrlejkaj57IsH58Pzp8dvjhc/lsBk0gkbLFYrFqtVvd27+4qOk733ePxPDCbzVBVFfP5fCiK4rvhxfDN/qP9wSasGwwGMv1HiqJQsVg8ZlfTHMepkiR1t05gGJBGmM/nMBqNj9nN9kql0lNN064ARISzH2cQBAGz2ewLu2na7XYLwzBbvxYIBBCNRrFj3BmsAZ/PZ+J5/kOhUIAkSVeA8XiMZqt5efrx9OA3GfcgvyVno9cAAAAASUVORK5CYII=',
      'Neko': 'iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAMAAAAIRmf1AAACoFBMVEUAAABnUFZoUVddU1T6+PvFwLzn4eFXVlT/+vZpZGCgm5dKU1Cfnpz//flbWljr5uLp5OCalpNZWFb//f3r6+n28ff9+PRaVVH59Pr//vr38vj57/Dp7eyjn5zq8O5aVVJbYV9nVFhjUFRiWFlZVlFgZGOboJzm5uZhamfz9/bt8fDw6+drb26bl5j/8/lkX1z06uldWFS5r61UT0tfWlbDwr3Ew76moqNRTU7Mx8P75OpeY19pWl1XW1qzr6x5eHaLiojv7+1UT0xIU0uzqadVS0nV0MxkZGT5+PPk497///ra29Xq5eFtY2H28e2hnJignJlUUE1dXV2vrqxkY2FkYF/m3d5vZmfDuruhl5aZlJHx8O75+PZWVVP29vT/9fTj3trv6ubh5eRdXFqTkpBOTUtqZmX88/RMQ0T78vPEvr7HwcHDwsDq6ef///3Gx8H++fXEv7tZWVedmZZXXVudnJp0c3FZU1f79fnb1dlXUVVjXWFrZmy8t7359/qLj455e3q4s69vamZjX1zy4+avpaReWFz/+f1NR0vu6Ozp4+f48/lnYmi8ur3Iw7/69fHz7+xbV1SZmJZVUk1ZV1zq5ez++f/c196uqbDn4uj9+P7z7vRVVVXt6ORiXl/OycXHw8CPi4ihoJ5aWF3/+v/k3+axrLOsp67LzMZYU1m2sq9dWF5WUU1WUk/Au7eYlJGqpqObmphYVV749f7p5Or38fPu6OpiXFz38fH79vLz7urv6+hhYF5cWWKal6D//f/Z09Xg29exraqbl5RqaW6kpKTq5uPv7Of/+PDj29D//vP18Ozs5+OloJymoZ1ZVVJZWVlkYF2hnpmblIyspJmVjYKQi4enop5STUlRTUpcWUhqY1BgWT9ZUjhcV1NiXVkkhke3AAAABHRSTlMA5vjapJ+a9wAAAP9JREFUGBk9wA1EAwEAhuHv3dTQAkLiUlJFJWF0QDLFYDRXIMkomBgxNIYxhOk4wwCqQhQjxgxSGIsALFA5BiYbMZHajz1oJlx51sBJpf6Gd3zONcrqm/r1W8ByK0r+XV1LXyOLLnjW6hMGpu0u1IzPSdO17DgrGC6AadrVodGcDQYbhguP6wAvAaC0BRZQalkUQ8UQDz5tAof0XbejOFcV5xiUoCfjj3O/nf0ZbqAMPYmzU18KSDaRQ08qnfw+B2JNdAEQt2O5vctUGjhoIBU4ygPsj2Vh5zYopDK73hsirdkPTwGCbSHpiYFwYVVC/17pCFSBeUmoqwYQuZtWxx+BVEz0LeVKIQAAAABJRU5ErkJggg==',
      'Madotsuki': 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAMAAADTRh9nAAAALVBMVEUAAAC3iopWLTtWPkHnvqUcBxx5GCZyAAARERGbdXJrRUyGRUyYbY23coZFGDRFGEYfAAAAAXRSTlMAQObYZgAAAGhJREFUeF5Vy1kOQyEMQ1Fshzd12P9y61AixLX4yJFo1cvVUfT23GaflF0HPLln6bhnZVKCcrIWGqpCUcKYSP3JSIRySKTtULPNwMaD8/NC8tsyqsd1hR+6qeqIDHc3LD0B3KdtV1f2A+LJBBIHSgcEAAAAAElFTkSuQmCC',
      'Sega': 'iVBORw0KGgoAAAANSUhEUgAAACwAAAALBAMAAAD2A3K8AAAAMFBMVEUAAACMjpOChImytLmdnqMrKzDIyM55dnkODQ94foQ7PkXm5Olsb3VUUVVhZmw8Sl6klHLxAAAAAXRSTlMAQObYZgAAANFJREFUGJVjYIACRiUlJUUGDHBk4syTkxQwhO3/rQ/4ZYsuymi3YEFUqAhC4LCJZJGIi1uimKKjk3KysbOxsaMnAwNLyqoopaXhttf2it1anrJqke1pr1DlBAZhicLnM5YXZ4RWlIYoezx0zrjYqG6czCDsYRzxIko6Q/qFaKy0690Ij0MxN8K2MIhJXF+hsfxJxuwdpYGVaUU3Mm5bqgKFOZOFit3Vp23J3pgsqLxFUXpLtlD5bgcGBs45794dn6mkOVFQUOjNmXPPz8ysOcAAANw6SHLtrqolAAAAAElFTkSuQmCC',
      'Sakamoto': 'iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAxVJREFUOE+Nk19IU1EYwK+GQQTVQ39egh6ibKlzw91z7rn3bvfOmddNszl1bjKXc5rJJGmBUr7Yg9qTD0IalFgRBEYg6EDQQB+GovQyQgiaUZsoLcgHMcr069w7MgcGXfi453zn+37fv3MYZt/n99e76tzVj4JN/hP79fvXnV3hnNabwUBjoOHcgTYOu/JQspgTzsqKgn9BfD4vkWTzur287PqLVy+zM+yePB7KsRXLywTjnSpnZctBkPCdW8ccDuU55vBO8RXbkC/oP5ph19V5+7LIky0OY1BKbZEbLcFSt7u6pN7jLmltCVrr3DV5jY3+KovFEsccB1KJNVpefe10BqS2tqqO4/AuphBB4L/LkrRqNgtJs1lMypLls1kU38mytMLz/E8VIlutqVqX6/weZG52OttRXjbE0cP/FYLRlpVjDXuQ/r77x2XZPKkCHA4HBAIBkCQpAygIAvh8Pu2MZgO0Lz+QSa/sQfwN9RfpVN66XC6Ynp6GhYUFGBwczAC1t7fD0tISxONx6O7upgHILmsqvLcHodOggfiV/v5+SCaT4HQ6IRaLgdfr1bIRRREmJyfBZrNBNBqF+fl5sNsdgE2GiAbp6bmbdbXC7qWQbxMTE7C2tgY6nQ5SqRSEw2ENopaoZpCXlwdTU1NaoECgCbgiU6y8QH+ECYWaTymK7TWdys7MzIwGaWtrg42NDejo6AB1WjU1NZo+FArB2NgYrK6uQrAlCASxn2z6wkuMp87VIAhkE2MEAwMDkEgkYHx8HBYXF0HtkQpRy1BLiEQisLy8rPVNKSsFjEzrXH4+z1hlS4xDhKadNu7t7YPR0VHweDzAEVWfHru6HxkZgeHhYVAURYNjkylVWKArZjjMzqmdVi+QCsLUkQiEjvDvncEkvU7/qQ0Vgukeo48Go87IiCJnZNmipxiz7wXEbVDnbUxQOgM12h9n6qTq6NvapRdtkwaP0XK8RmPuYSbxYfaQ/sJJhjfknuFRURUi7AMOozcCwl94hLZp5F+EioDQVwqYI6jomZU1NFtM+rOSxZjVazcyvwHr/p/Kws1jegAAAABJRU5ErkJggg==',
      'Baka': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA0pJREFUOE91k3tI01EUx39JOpA0H4jNx0pbD3XTalISWf8YFlEgldqDsBLLyqjEKBCiLLWiggh6/KEV1WZ7OaelLZvDdDafNW1JFraWe/32+01FrUZ9uy4ylLpw4Z5z7/nc77n3HIqaMRIjZJyEcNX+uFCFeGmI/GZciEIsCFJUTvoAzDz+1y7K76MSwhX5hXl6z+WSbrzU2KB8YEGDwgrTaxZ3b7xHcaHhR3xw7Z5/UviB1ReP5XSg3+TAqYJOxMzWISFIC0GQDomhTVA9skCnsaAwp/vnMq66dBokNuBR9uFd7T9Z1zCunjci0qcRJUVdoJ3DYOhRnC/qBZ+jQbfeCc+37yjY2UEg0iwvJE0k9l8Z+8xqHmTgot0QLdQgTaQFQ2AsOzlHvOu1S5pwOLsHHo8HjHMCq2MazNvTlByKHyrJLDvdR25jMWRxYx5HjeMH2r1BDOOeguRua4OI14jx8a8YH5tA+al3EHKlW6mYOapb2oZBOOwMbEMseAE12L+jjUh3w+VipyAZ65oxn1NP/GMYGR6Ftn4Qsf7qa9S82Y/l/X122G0uL2TbxmZEz1WhXW8mUol8moXu+SCi/OoQ6VsDh3UUwyQ1k9GOaI5MTkX4yWTGHutvgI1F28sviAlRgxeoRm62HvsyW8En9pZ1TYgi6TntoyQtFm86rVgUoJZRvDnKMmXVAGxWmkAYOBwudBqGcHCvHulrGpGT2Uy+z4yT+QYsCXtCUpp8GxbKhx8gDK0ro+KjJGvzdjfDZnN6VdisLD5/JjArQ2zW66PJOj2lEZtStaBphkwah7K6kMJ/GEulp1bMWhAmMbTozOQRaWRtfoZVgjo4iRra4SYgGi26TwjxVeDKhR7Y7U606ixICq9tr7hd7+OthRWL7yUnJ1WPmXotqLhpRICPHCePtuFV6xdUPTAhcWEtRHEqfHpPyto4hPXLXnzflSEJnFaN3OCKDcsFsrEntR9RUmxARLAUgT5iBPuJsXWDBj0dZjRU9yNV+PTbpjTp9OA/pOSk24nRkXf1J462oPxcJ65f6ULlHSMulepRerYDgvj7A0cKpNz/tyTZqbzXO4t0ZZGQJ34RH11lFHIlA8LIqreCCMUZRY3cd2bwL/5/RmjNSXqtAAAAAElFTkSuQmCC',
      'Ponyo': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAuNJREFUOE+Nk3tI01EUx39BTytConQTt1am07m5abi5KT5S8z2dj1yOEMUC7aUgIoimlmUEWX9kBZGWaamEmE6U1BI1XNPNGTrnHs33IwuSXrL4NgcJ0mNdOHDh3PPhnPP9XoKwcroJYvMQiRSicHCQKCgUyZC9/T5rNet5KUFs0zCZbZMsFmZ9fTEjEEBDp4/KSSSb/4JoGIyWaTYbiykpWEhOxhSHAzWD0aqkUGhWAcVkW58xlvuPhfh4zItEmOHxYDR3MhcdDaNAsKJydAz5IySKRNjEUmy88vjOVaU8F0iPCqCNjEBHkC/UYaGYFwqxmJoKLYOhkxPElg0QsbNtTlmox9yjRD9UCbnoOR+J/lwRWtOCcdXfDc2BPpg0d7CQlIQZPh9KKlVkAQjJ2x2zmOSsQu7hpzUJfBhLjsNQmADjxcT10Bcl4rE4EHc5LjBEhEPn7f1WTqXSLQB/s1Tp7vslsoIkyPPiMJAbi86McBguiaHKjoEqR4jJy2K0nAxApzMN5iUGrclrKVaz2fUvuF4tRbxDKA90w5VjTFyLZKHpTBSq4/1QnxGB2qxoVIZx0JopRCPHFSNOThfWZzfrXDcZEowH4iA05ATg68hDtBaL0HAuCm3lJ9Bfcx2fFNUoi/DCjRgfNHHd1wCZA2TyXjNkE6F0cBDpPFiojeNi8EkJdFoN3vXch0nbBJOhDd907dANv8JITxNqziag3ZsJbUDAwLin50Q9QWwl1qSYoNOVvUcOoqOqAAa9Fu9H2/F9+B5WZLcwOyxFX18flLI+VASyMGVeoJHD+Tzq5BS1PoaKRrNT8127P74swsq4FCa9FKvqBqwaOiz3hdEuLKueYSyECT2LNW0eIfo3E/WmEbvnG1MUJnWdpWhDGDvxQXZHo+RR0uW2tnv+auPX+TvtJm7zKpaen/4y2yjBUlcxlvtvmvT16ZWDpQeoVv3/60F/NrHjTf4ugazIXtJ8ivjnz/sJ+yGQRjcqUdIAAAAASUVORK5CYII=',
      'Rabite': 'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAD/0lEQVR4Xl2MXUxbdQDFz/9+9Lb3tkBLCxTKhzgoOOZAsokbJmZxDFHnd+LL4hKVzBgfNCY++ODbjDEaZowvErOM6HRu6hKZY2rIAOkCY4OSDTpFaAsrlJa2t5+39+NvjT7tnJzknIfzI98Nf/C6TuXdguWBd1q9rcb8/CwsZiu2Ywm4nDVo3VWLZCKDaDwJq9mCg31PgjAMKKUwmcyYvTbek9iJRDm6M/XswEDjwNz6plWW6wdZhjUAintFCEEhn0N04zYskljaDLaj8ar49oUrsYR6mrFJNj322w46H8y+mitM/ZJKZmyE4XAvjJSsazpyuSzslVZIkgWKOvvRgQ6Xrdlhqmds7o7bFZoLkctreKxf7GtuCE7IyUQjBQcQ8j/lvxCGQJZz0IoCVpamTtzfIh9nwiaIrCQyjNg8mq11oDLUhNXRJfT1Ozr3tS/PqpnQ80qRgjAmKIqBfK4ItbSLKoOZqR/6neLkENlSUAIhlktvEf+sD2rkm8nWTHtvZCGMVON1ePuaoBER31/MXGly1wSqq9Uug6FluYyWXJiPqFXmjd4Dh9oF9ZKKimYXRtYCx8lmMIDIxlIPGz591av0mtanF7FcCEN6iMXeox2wOJ0QJAmUAoRQaIqCnWAQY1/ewKNGNeQuYXkm0d2NC2e+wvmRr/Hx+6+8PHayrbDyyQBNDb9As3PHKDWG6MTM23RoeJAWsqeoWvyUUv0UHf7pBB0fe4OeeXe3/vmHbx3+8dwIGJ4IsFpMMFe0fbtAn+nwZePr1u4MBK8XIALG/Rt479wYrs2vgeNNAMNgMbiNzybuoKVvn+Gs9kbr6qpBfJfGYHFIkJUCoGwfqcoMX/b27EGhwgOjoCADDlP+CA51ugFFRzoB8FYNaQ1oqKD44+eNL+wNj7zJGQSIhe8+jgQ9thk+27v/KRY6L4FSCkVOwtlQj6P73Qgt/o1ERoKt4iUkE7+jrZMHyzIoK9cOBFfT4LbWAk+0a7ZLnvqHcTNdACgFScfAcjxEdy00VQclHGo7dqGeYxHbvIo6hwhSghCehb3G5p6eW7VxXC5/xGWToMgrKKoaCnIalI9CIARasQAqloMI/x4BWrLLYwE1AEPTwCGHaGjz7pw/leZUNV8wNm9BLy6CxsvxZ1kMbaY4TKIIXlNBsynoVjvAC4CuAoYOVi+CMfLYCUfg95tPHuzZB0YtKzsb58RMucWE/fZmhCbdOP9rNnLnxko6GVoB8lFwyVVw8b/AyeulHoJyN4Rb19dTFyeqBlu6njvfsWcvOJvLs7DMmw/7bvpeE4pU2OIcgcqmp4fGAgt2Txwvqr7lTp5V7LquZxXC6+BqEvGcY5pyjaM1tffJbk89NE3FP5VQ6y7a+paZAAAAAElFTkSuQmCC',
      'Arch': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABCFBMVEUAAAAA//8rqtVAqtUQj88tpdIYks46otwVldUbktEaldMjldM2qNcXk9IWktQZkdIYlc8mnNUXlNEZktEZlNIYktIWlNMXktE7o9klmdMXktFHqdkXk9EWk9EYk9IlmtQXlNEXktAWk9AWlNEYlNFDptkZldMYk9E4otg/p9kXktEXk9AXlNA4otclmdQXk9IYktEXlNEwn9YXk9IXk9FFp9o3otgXk9FPrdwXk9E2otdCptkXk9E/ptkcldIXk9Edl9IXk9EjmdUXk9EXk9EXk9EbldIcldIjmdMmmtQsndUvntYyn9YyoNYzoNc0odc1odc2odc6pNg7pNg9pdlDp9pJqttOrdzlYlFbAAAARXRSTlMAAQYMEBEVFhgcHR0mLS8zNTY3PT4/RU1kdXp6e3+Cg4WIiYqMjZGXl5mbnqSnrbS3zMzV3OPk7Ozv8fT29vf4+fz8/f7SyXIjAAAAmUlEQVR4XlXI1WLCUBQF0YM3SHB3a1B3l7Bx1///E6ANkDtva0jKbCW2XIH1z2hiZEZ4uUgxo7JedTQye/KN/Sb5tbJ+7V9OXd1n+O+38257TL+tah3mADAwSMM7wzQWF4Hff6ubQIZIAIb6vxEF4CZyATXhZa4HwEnEA+2QgoiyQDnIEWkjVSBBZBqXbCRlKYo8+Rwkyx54AOYfFe7HhFa7AAAAAElFTkSuQmCC',
      'CentOS': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB5lBMVEUAAADy8tng4Ovs9tnk5O3c7bX44LLduNO1tdDh7r/eutj43q2kocX23az07N+qqsvUqcmXl7331ZXJj7r40o/Pn8T42qP63KjNw9n21p3Y387Ml7732JzR55z05MSxtMLGn8TC4Hx8eqt8e62Af6/B4HnG4oPC4HzH44fBf7LCgbOkoMTcsrmtn8PWqcfFtKrj4Jvs2ZOz2FnMqLXT3KfY5p60Z6NUU5XRuqHzwWSywqDn3JaiiLWahrWhkry5zJjRmqm1Z6P1wmb1y319fK632mK5cKi5nH+73Gu73Gy73W283W+9eK17e6y1yZS3aqRZWJdcW5ldXJplXZppaKBwb6VwcKV5eKswL306OYNPTpGkfK+m0kGpUJWq1EnEqIuXK3+Xh7ahP4qhkryMfK6BgK+CdpGMaKKMa6O9ea2+eq6+oYW/eq+NbqWVlL2Wlr7AjanA4HnA4HrBkqbBlafB33rCgbLCmKjCxIzC1mSs1UytV5mtxIWt1lCuz2evWpuvXJywxYzHjrvH4oXIjrrN2HXO5pTO5pXUlYnUlYvVl5Hb0G7e0XTg03rhr5fpzHPpzXTp0Hvtz3/wrDHytknyt0zyuE3yuVHzvVr0wGP1x3T1yHf1yXe0ZaL2zYP30o730pD31ZeRIcF5AAAAQ3RSTlMAFBkbHEhJS0xMTk5UWWBsd4SEiIiPkJCVlZaam6CjpK29wMPDxMTFxcnK193e3+Dg4uTn5+fo6e/v8/P4+fn7/P7+J4XBAAAAAOBJREFUeF5Vj1OvAwEYBb/yGlu717atLW0b17Zt2/6nze42TTpvMw8nOZCAmwUpiIY6c5IiLi9tPX64GairqszHQ4X2VB64v1Cs6PxMPJSdHM777s6/jyaMRGiRLyyrb88OpjZ3CzAXrm1sqzSNNeN7kVBPNgB7cG51abE5l9cXDces7emQ1uadHhutFUg6gpPKkSIqQGavwz7r7O/+/3t/rSdjI9XDM3qz4fr3B/3iA0aJTG9x71+9oR/PLDwUe2wm19bly+fTIxHyEETatbPewGEw6Mk/tKZCEqSQQUlIHB/QNBEjjVN1AAAAAElFTkSuQmCC',
      'Debian': 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAZ5JREFUOE+Nkk0oBHEYxv8fu5GQj3JwcaDkIAc5IpR87M7MKnIVJVKclaIQ5Sy5OLkgR7n5OigcSNpmd2c2Vyfl4KT8/muWiVU79TTv+7zv837NCBF6PG1X+NpZyEYSD9mIc+tHnBPe23B9xKrCuTmbQA/JKfABrhBswa1hH4A38IwfOxPdX1qcjiCQxO5NyrjKV70TnSbeRPwJvGN3i4yyqnEucPY8ZZX9GSEgGK+RvFfyjk2VKZxzBNG8wJWWgh/xtDOeUXZ7Slr6TrSLYL9N4SMgYTTcwdc2ArvJcElhSVcM6mCNSV8n9hA59yTU5UWMG6HIbLhIWlglgWiC2L4Z79qTdo40D6ISuOWwKCWHyk9Fv8ldpUHOuGTuynwSBUynddPdlbEosVpP9Eu4FnOsRzUYNTsdmZN/d5LDiqM0w+2CMdAFFsFGWgfXxZnheqe/z+0puwEM0HHYV3Z9Sgz8TEz7GkQvpuJ/36ggj2AaHLrSlkULWV5x+h2E8xkZL16YVjGNaAUscfZ/f6c/k9ywLKI2MMcRWl0RLy007idmRbQJ7RIfDAAAAABJRU5ErkJggg==',
      'Fedora': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABPlBMVEUAAAApQXIpQXIpQXIqQ3UpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIpQXIqQ3QpQXIpQXIqRHYpQXIpQXIqQ3QqRHYpQXI8brT///8uTYMpQnM5Zqg5ZqnS1+I4ZaY4ZactSn8uRnYrQ3MrRXgsRHUsR3s8bbM8brMtSX4wUosxVI01XZw2X50vUIguToQvR3c6X5o6aKs6aq08Un8qQnM9VIFDWINJXohKcKlXapEqQ3UvUIc2X55bhcBdcJVgcpdhfapmd5tuk8dxgqJ1hKR5jbB6iah/m8Shudq3v9C4wNG/x9bFy9nFzNnFzNrIz9zK0NzK0t/O2+3P1eA2YaDU2eTb3+jb4Oje4urj6fHm6e/s7/Tz9fj3+fz7/P38/f3+/v83YaEa/NNxAAAAHnRSTlMABAoVGyY1SVlpeIuQsLfDzdHW4+3y8/b39/n6+vr4+ns8AAAAyklEQVR4XiWN5XrDMAxF75KOknYdZJS0klNmHjMzMzO9/wvMcH7I37mSJShsJ+5NjMT6umDoHyXDcI/2qJadh++P3cle1de+9yPe3/bTY92wzfzr7wGtP3JrAI72BZGVtcAdQlwHy+JS1pDbBE9qamZF3BYrjQxPEXwKc6dC8bXFm0QIpmt8kn0Rn093q82UCtK8oXZckwFJzuulV8bHkajPyXdbnJnARfDHs0trz+JQ+5AFvzp/L0+cL2qPAINUPrq5OC6p/64F/AMnrST+Dq/r7QAAAABJRU5ErkJggg==',
      'FreeBSD': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAABIAAAASABGyWs+AAAABmJLR0QA/wD/AP+gvaeTAAADXklEQVQYGQXBS2wUZQDA8f83j33M9rF9d7u4loaWklaDpkSo9KDGaIKUaGxshD2YSPRiuDVeTDyhBxosJCoa40ktpAkPDcUqAYVIpUSUPrAulEdD2bbb7e7ObGcfM/P5+4kwKDvq6yJ1FYYcvb+YAkqAHo/HQ7FYrFIoCiurq9ZXJ06YSOkA+kBzfX06bys3zHxS9EL0tXDVyZfefacqV+X/ZSJx5+qLbx98LhaL9RiGEZWlEsWC/Thd9q6Pf3vs2u6Orc83rFsvTwwfLf5obgywT1Vjh2Hh+rbNsnTssJdNLedK5aIrpSuldKVXKsnH4+Pyn6FDXn5tMef9O+3NvdkvP1V4+EYw2AoQ+KSx8dRYS6NXXnwovaItXduSrrkinWxGOmZWJi9OyOK9m1LmsjIz9IH8QUMOd3WfAQwNKCy2tJwbHB5+XasPaxIHmc4g7WWEZ1MquBiRFlJTf1E7+Tl/H/8asavPzTY1nWd2ZkMDRPeBeHPz5ojwsilEQCBvTSKunCF3M8FSNkBGVTHDYYrLj8jVNhDZ2SMa2zo3MTamaIC/u6Ojr3DtrOrvP0BpdATnyBeIhTxpR5ABUlKSUlXS1dWstbVxdz6hPL0l1quGqkLaKwNvVcjEXNRd/4mit4Z19DjefBEPyCKxgQJQcF28dBrHNDGTSZSezsjeff0hraa2Vs2vrvit81O4vj9xLJcC4ADrQA7YAGqBGsAql/EtLdFQE/L7dF1XZmdnSrbPMJfXoLDmolQK8gJyQBowgQhQDRQBD+hsraVhd4e5MH+/oExfvWLJ9q3/3S7qMpNH2hsS40kFS4EUUAMA2IANRIBXv4uzuO67c2PykqkA5YmZ6bN18YPi0Yoknxc4AsJPCMLVAk2BLKDosCWqs/PZaulkuxk9fekcUBAAQGDks5FT0W++3NuYuC0DVUL4DIEdlIQDAj0IRkigaMjArkFx0tf523sffrQHyKsAgHPhwoXLL+yP9/kePNhk5ExUTyKFkJVAUAiCFZrQup4Rv9ftuLV/6ONBYBVABQAArMvJ5MXW7duD6P62sD8UrPAFRU1TpeCpCnGvPZr7WW///v0jpw+VC9ZdAAABAAAAAMLo7drWrmQyPWG/r8tnaGIjaM05ujr16x/ZBFh5AACA/wGZnIuw4Z4A3AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wNy0wNFQxMDowOTo0OS0wNDowMOPVpFwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDctMDRUMTA6MDk6NDktMDQ6MDCSiBzgAAAAAElFTkSuQmCC',
      'Gentoo': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB9VBMVEUAAAD///+AgICqqv+AgIC/v9+Ojqqii9GAgKptYZKQkOmPj/ddUYBgW4eVjeCTgfiWjO5wbJaZkvPBvepkXomYkNldV4Bzbpl6dJ+Uj7ynoO6Vi+1qZI63se2mnudjXYjOy+GCfaqZjvWlm/Pc2e+Oh7NeWIOWjfeXjeW1sd+gl+diXIfp5/KHgKnn5/F2cZx6c6ZgWoXc2e6dltrAvNu0scrX1eTOyujCvup4c5qpovVpY43///+6uPPJyPXq6fvm5vrz8/z8/P7+/v/d3PixqvmxrPSyrfe0sPO0sfS3tMve2/3r6vy6ufPz8/3d3fi3tM63tPO4tsu5tsu5tvO6tfe6t/Vva5KRjKy7tvW7t/W9vPO/vM+/vvPCwfPEw/TFwvTFxOfGxfTGxvTHxvTIx/TJx/aTiOrNzPXNzfXQzfnRzuHS0fbS0vbT0uHU0e/U0uTU0/bW0+zW1ffX1vfY1/jZ2Pjb2/jc2uSTiemVkLSlnvbe3PTe3vng3fzg3f3g4Pnh4Pnh4fri4enj4/nk5Prl5Prm4/ymn/bn5vro5/rp6O/p6funoPWsqs3t7Pvt7fXv7vzv7v3w7/nx7/3y8f3y8v3z8vytqPWuqPX09P319P319P719f339v739/34+P35+f37+/+uqev9/f6vqvSwrPQAR0dcAAAAPHRSTlMAAQIDBAgJCwwVFyAsNUFHSVBneH+Bh4mVmZmanKCxsrK2tr3ExtDW19rb4ODl5u3t7u/w8/T6+/z9/f4MkNJ1AAAA8ElEQVR4XjXNw5aDURSE0YrRtm3b54+dtm3btm3bz9k3Wek9+2pSYFwT8ibzE93hwAtdJqK3nZo4J9hFXbP+vFHOthV6gnGzstZq94wdCs4UCCDymQ2v7X0LdYoSQ0MIENRYzJbRlPTTHu73ZNAL8vivmVui98PpzuqffX0mIPHJGtOQenukteJ+aS3b9htNpDnT9TeZH1bHAwBRMhGpd6e6uNrLoRgxBKmsX47nBlp678ojpEA40fejcmW4e/No0V8IIPfj6eKgbEJ3ZUnzgE1OqWp9Q3VeWRAsg51f1dZ8c31RmAsc+N5JGbG+zvj3BzDCPrzMDC9SAAAAAElFTkSuQmCC',
      'Mint': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACVVBMVEUAAADh4eEAAAAAAAAAAAAAAAAAAAAsLCyXl5dgYGCnp6eTk5N3d3fBwcGqqqq8vLzNzc3Ozs7Ozs7Pz8/Pz9DQ0NHR0dLS0tLS0tPT09Pf3t/Pz8/i4eLb29vZ2drZ2tna2dra2trf3t/u7O/u7e/u7O/r6+vt7O/w7/Lw8PDy8fTz8fXz8fbx8fHz8/P19fb49/j49/n6+vuPxlmWyGOx437h9NDr9eD6/fj////+/v75/vTA5Jv6/fb7/fnL5bDL5q+AxjeDxUCEzTyGxUaGzjyHxkiHzz6J0D+Kxk6K0kCLyE2M00WNy06P00mSz1OUyF+W2FGX1FiY0F6Z02CZ21ac0Wiez2yfz2+f2mOh4GCi4GOi4WKi4mOk12+k3Wul32um1Hin0nun4G6n5Gin5Wmo23Op2Huq1n+q43Cr526s4Hit23+v6XSw34Cw34Gw6nWx4IKy4IOy44Cy63ez146z34az4IWz4YW03Y217nu38H2625e645G74pK83pu98Iq984W+4ZjA4px0tzDA5ZrB8ZDC5p7D55/E947F6KHF+JHH4qvH6qTI46/K5LLL5LN1tzLL5bN1uTDL57DM5bPM6qzM66/N5rTP6LbP6bTR6rfS573T67vT7LrV7r3X68XX7MHX773Y77/Y9rvZ8cHa7cjd88bi88/j8tTk8djk9tHm8trn89vo89zo9N3p9N3p9d7p9tvq9d/s+93s/dzy+erz+O73+vT4/PX5/fT5/fX5/vN1uzB3vTD6/ff6/fh5uTj8/fv9/vr9/vx8wjV/xDmrMRH0AAAAOXRSTlMAAAECAwQJDzk/RUlNU3F0kpSVlpeYmpucnaKjpKWqqqqtu8LExMTEzdTU1NXY4evy8vP+/v7+/v6LaR1mAAABD0lEQVR4XiXI03bEABAA0KltW9kaW3eSZW3btm3btm3b/q4mp/fxgqKOtpamhrqaqoqykrQYABh+PVMU9fjE5Xp8o54kgPHN0EBHU2N5YXZykiua0HHd2759VF2Sk5IYE5GGsmCEWLV1kVWwt5O+3x/qpgsy8k4ja+cJl2/v5C22tlgCAHtw9TQSa4s+AzfPSm0BRNl9SydhWJzLC567KrNhgrNwHIJ5qTz/2f9w7Jw/DNqIjVr04exW0AEOXcN3Ab7enr9eDW2VTJgehONyc2Z8XP5YdD0Tcuhcc4/r45OjGX51TEjYPbh8THRPvbz+CHusgSZlT7rP8PkCwfQKaQUi9Igr6JsRBMFiWZgb/AHKElRzKopZJQAAAABJRU5ErkJggg==',
      'Osx': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABrVBMVEUAAAD///////+qqqr///+ZmZn///+qqqqAgID///////+tra339/eAgICoqKjx8fGMjIzm5ubh4eGPj4/g4ODIyMiAgICSkpKLi4vS1tbPz8+Xl5eMjIypqanIyMjW1tZ2dnbR0dGamprFxcV3d3d+fn60tbV3d3dcXFx3d3epqal7fHxxcXF+foCnp6hYWFhyc3Ojo6SMjI5fX196enp+fn6Li4xERERqamqgoKFpaWmFhoeen6A/Pz9QUFCWlpeSk5SUlZWUlZaOjo+Tk5RHR0cuLi5YWFgwMDAeHh40NDQ3Nzc6OjpcXF1rbG0XFxdSU1NVVVVXV1dZWVlbW1tnZ2lwcHABAQEEBAQXFxchISI+P0BISUpaW1xHR0kNDg4qKyszNDU1NTY9Pj8NDQ1cXF4XFxhSU1QSEhIDAwMrKywtLS4uLi4wMDFHSElISEggISE0NDVJSktNTU1FRUVWVlhGRkYEBAVBQUE0NTZQUVJQUVMFBQUqKitWV1lXV1daWlpaWlw+Pj8bGxtcXV9dXV1fX19fYGFgYGBkZGRlZmhpaWlsbGxwcHB2dna844Y9AAAAV3RSTlMAAQIDAwUFBggMDhkeICMkKCgqMDIzPj9ERFBib4CCg4iMjZCcnp+jqamrw83W1tvb3ePl6Ojp6+vs7u7v8PHy9PT09PT3+vr7/f39/f39/v7+/v7+/v50ou7NAAAA30lEQVR4XkXIY3vDYABG4SepMdq2bRSz/capzdm2fvOuDO397Rw0Ly4tz2QAQPbcxuZ2E/STJwfxPhWgG355fRrVAIVb1zeP9UDLfiSwkAcADe8fn7tFxWuEXFRDoer/OgoMTRBCumj8yJwPBo8Zhpk14U856/HI8n0ZUtpZ1udrSzfVneA4roNKjdrwpcMRilb8d8G60+lKnrpWcn9bO+B23w2O8Tzfq4aiNSZJqzn5O4Kw16h06fPZ+VUlUHfo97+VAEb7rSh2UgDd4/U+TBlQY7FMj5gBIGvcarVVfQPVPTG94D0j9QAAAABJRU5ErkJggg==',
      'Rhel': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABj1BMVEUAAAD///////8AAAD///////8AAAD///8AAAD///////8AAAD///8AAAD+/v4AAAAAAAAAAAArKysAAAD///////8AAAAAAAAAAAAAAAD///8AAAAAAAAAAAD///8AAAD///8AAAAAAAAAAAAAAAB5eXn+/v5JSUnKysrS0tJ5eXmqqqqxsrL+/v4ZCgknJyeHh4eIiIjo6OgZCAdOTk7t7e3///8GCwwPAAArKyv19fX29vb9/f0EAAD////+/v4AAAAGBgYHAAAJAAAMAAANAQAPAQAVAQFyCQV9fX2pIRzmEQjn5+cBAAAFAAAAAADnEQjvEgn////uEQjyEgnsEQjzEgnxEgljBwPaEAj9EwnwEglHBQJHBQNNBQIBAAB3CQR5CQSHCgWLCgWRCgWTCwadDAWmDAapDAa/DgfKDwjWEAgGAADh4eHiEQjmEQjmEQkKAADoEQgLAQDtEQgMAQDuEQnvEQjvEQkPAQAfAgEuAwEvAwE8BAL1Egn3Egn4Egn6Egk+BAL+/v5CBQJrB0muAAAAT3RSTlMAAAMEBAkYGhsbMTRLUmpvcHeIjLe6vcHCxM3P0NbW3Ojp6u/w9ff5+fn6+vr6+/v7+/v8/Pz9/f39/f39/f7+/v7+/v7+/v7+/v7+/v7+Q8UoNAAAAO5JREFUeF4tiwVPA0EYRL9SXIsWl+LuxfcOd2Z3764quLu788NZNrxkksmbDP2R7vH6GioLs+iffEzNXd4+TqPErUUpVqMOvwgdzMPn1rv5vPsVeufBTaBK/bH2FPvkEUuIG5jIIc+sHYn/HJ3dC/Hxuo4y8s44dzwBbFkisHN8bVIdXs6jb+H97aCwbHEIqgcml64CD7YllNkAVQC940MLYe5YzvIeQAXNrd19Roc5MdzfdQLUUKaUYyuG9I8y1g4gj6hIak4X5cBIT2MquZJrJdOqpY11ZpAiqVwbY/C7KY1cRCrZxX4pWXVuiuq/hs49kg4OyP4AAAAASUVORK5CYII=',
      'Sabayon': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABvFBMVEUAAAAcUaYdVKwAAAAAAAUABAwWRY4YSZYhZtIhaNYHDx0KCgoFDBcKCgoRMmYSNm0fXL0fXb8AAAAYS5gaTp8fXLwgXsEGBgYFBQUZSpgZTZ4JFSgODg4IEiIOJkwOKVIkW7EnXbQLGzUTExMKGC8LHjwMIkITExMiIiIPEBEPJ00QEhMXOXAaPncOJEgoXbApXbEcHBwwMDAEAgAfHRgQDgo3NC8AAAAHBwcKCgoLCwsJCQkaGhofHx8lJSUwMDA0NDQ4ODiRkZEICQocHBweHh4GBgYHCg8mJiYnJycpKSkrKystLS0uLi4ICAgODg43NzcRERF1dXUUFBSjo6O1tbUbGxsEBAMLGS8MDA0iIiIjIyMkJCQNDQ0NHTYKCQkoKCgPDw8QEBArMDkKCgkRERIREhMxMTEyMjISIz00Njk1NTU2NjYCAgIVFRU5OTo5P0c8PD0+Pj4/QURAQEBHR0dKSkpMTExSUlJiYmJlZWVnZ2cWFhZ2dnZ4eHh8fHx9fX2FhYUXFxeVlZWXl5eYmJiZmZmcnJwZGRmlpaWrq6usrKyvr68KFiq/v7/FxcXY2Nji4uLn5+ft7e0yif9uAAAAN3RSTlMAAAApKSkqKioqg4OEhISEhoa1tra3t7y9vr7S09PT09TU+Pj5+fn5+/v7+/v7+/v7/v7+/v7+70RY/wAAAPpJREFUeF4dyWNjw2AUBeC7dfYyorM6rx1exKltzLZt2/rDa/J8OgBVVlFDX39jcTZoUqCse251a2dvu6ccUtWlanLQ4Vpel+ThlWq1l3wEz58tx4dOt1dMlAJk9A5gMjG75LHwo46hzkwosGOMbejumoRvubC9EOrMviT0E0Us9fvN9dA6zxJCNv6+ECGsb6oNWsgmpZT9/UTUZo3Em6AW34guTL4jiAudiCM1kLcw8/SmHERfT1/eueBiDqR1GK1n9w+K8nglxYxd6QAML4ztXoQuj8YFgWcgqdJp8qzty26vaboCNIxBCshyQDKov0aXr29v1ufq1PwPx5Q7bCoh6eoAAAAASUVORK5CYII=',
      'Slackware': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AcEDi0qZWWDgAAAAx1JREFUOMt9kktoXHUchb/ffc1M7rySSdJMOknFPMRitLgoNKKI8ZHGKkgrjU8SitidimSh2UkXoQmoO1dGQSxJjdvOtqSaqlR0USEGSjVJGxuSmWR6M3fu4/93YX0g4rc9HA6cc4Q7DI+fpzz7PA8++2mxvZAeBZ4xhHtFcJRmXWsWvb36/OLcyxf5B/KHeYHy7DmGx1+YSDjmWTdlobTGMAStQGkNoLXS4tXDq7u7tUcWz49tA8jR8QUuzB5n5NTCV13F9JEo1JJwTLKuzU61QiOMcd0UDb+BncwQK3Rl15eNja3ui/Njq8aF2eMcO/XlBz0H8oO2ZUkum6A13WB99TtyzXlaCi24SaFa+ZFCzsG2DNnfkdbFjsI1APPhk+d6ujqznycdCxFozadYWvyMpx47wa+bPkGksKwUNnsk3TaCGASRXDZh5LpHXPPg4Rcni+3uYBxrtBbQghlscOVKmYHeEm0ZIZ9xyLffw41ND6VAa43SmjiMByzHYtjzwr9arfshxf5jOKlvKZfn8es77N2uks24PPfSFD/9Uvt7AtPKWmEU9d645eHYJo5tcKi/FX/zG+zmQxQH+rANk862DOW5N/hhaY64cJSa5xNFCgDDILZACMKYWAmh73HmzFsMlBQJ06LeiMinE1S3KzRCm5rXIIoUIoKIYCVM36urZFbEoiBLNMIhAE6/NsSB7h6SKZdL8xsUOnpx9j1KbTdARACIowArYe1ergfNT2i0mIbJys0GI6PT3N1/hJvrPxOFdRJNBQIy/FapI4Bpgohgcjuw+jq8jy8tV55MNBWI4ohS802CpizKv8q+FgALZAfYgSyAZtNro1oLaU1VvxCA029Oraxs7u/tKnXiNjn8HyKwur6lI++6vPK4V7IA7u+1Dyu1tr183ddNbkHuXP8/zEIYeFqiLRl6YO/p0bHJdflT/PD9qZa1W+ry99fcvlAlcZwUpuUAglIRYVgnDEIOlna4q0M/NPnuO1/PzMwg/045O/XeibUt5/Xangx6viSVFpK2jtMpvdyWCz+5ryf10clX3/amp6eZmJjgd441URWWJY8BAAAAAElFTkSuQmCC',
      'Trisquel': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABjFBMVEX///8AAAAAAAAAAAAAADMAAGYAAAAAHFUAGWYAF10AImYAIGAAHloAHGMAKGsAGmYAJmYAJGEAKnUAJ1gAMXYAJnEAJGQAI2EAK28AK3cAGTEAMHgALXEALXgALG0AFUAAI2oAK3EAMngANoYALXMANIAAM4IANIIAL3gANIcANokANoQANYQAOY0ANIYANooAN4kAN40AOY0APZMANIUAOY0AO5AAPZUAPJAAP5MAPpQAQJUAOYsAPpYANoUAPpoAPpUAM4AAQJkAPZIAPJEAQpgAN4cAPpQAPZUAPJEAO4oAOosAOo8AQJoAOYsAO44AQpsAO48AQp0AP5UAQpoARJwAQ58ARaAAQZgAQ54AQ50AQpgARaIARqMARaMARaIAR6QARaIARaEASakARKEAR6MASqsARKEASKcAR6MARqYAR6UATbEATa8ARqUARKAAR6oARqMASKgATK8AR6QATbIATbAASq0AR6cASKgASqwAR6UASKcATa8ASqoASqwAS6wASKoAS60ATbHn4CTpAAAAhHRSTlMAAQIFBQUGCQoLDxAREhMUFBUYGhobHB0eHh8gIiIjJCQkJCYoLC0xMTE0NDo6Oz1BQUNHSUxOVFVVVldaWl5iY2RkZWZoamtsb3FycnR1ent9f4KDhIiJioyNkJGYm5+foqOkpqamqKmqrKytsLKzs7e4uLy8v8TFxcXGx8rO0NXY2eZc4XYcAAAA00lEQVR4XkWN1VoCUQAG/3NWtwh7CTsQJOyk7BaDxuxA6bbrxf32gt25m7kZqDRYxziooDV7+1AalMUavQh2AsEZoWvzigLun+T17/c8QiJZ7qu2QKiNmyZthdcR1/as353jIeU1GxMHo5XHdqPFeX8IaDMdHPYN6dRN7LR4qQewdTa35HWkyh+fbxERAMjwlAWJv3CPSKDQ+H7XvHdkV4Pua3Gtm4sPKIF/WV8dop4VKBw/NU33B3x1JbTt+XwhkJQoqRfWvHOy28uqH8JIdomR/R+s9yR3Cso77AAAAABJRU5ErkJggg==',
      'Ubuntu': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABKVBMVEX////ojFzplGf1zbnqnHLvs5P10b3yuZv1xKrytZXvtJXys5LysI32waT0n3HxiVHwg0jxhk31kFn0h0zxf0P0hUrveTv2iU3yfkD1hEfyejv5eDLybSX0aR7zZxvyayH6ZxnxZBj4YhH7XAb5WALlUQLeTwHgUAHeTgHfTwD65NzdTQDdTQHdTgD31MfcTgLcTADcTQD////xt5/31Mf54dfmfE/dUAbeVQ/jcUDcTgHeWBnnflHohFvpjGbqkGztnX342Mz53dLgXiP65d399PHdUgrtoYLyu6Xzvaf76eLfXB/rkm/fWhvupojwrpTeVhTgYSfgYynzwa30xbL1ybnngFT31snngljhZS3539XhZzDiajbibDn77OX88Ovrl3X99vTjbz1fisGCAAAAMHRSTlMABgYGBwcHJiorMDA1NXGHjY2Nl5mZmZyfn6O5u8XHzc3X193j9fj4+vr6/f39/f08OUojAAAAx0lEQVR4Xi3HZVbDYBhGwQctWqzFPXiQ+36pu+LubvtfBKcN82/UEhld2vWXxyL6F92gbTPabse8hU/uHMx1SZoyyJWPTwq1Rs7GpYE9+Cg+OJcs1MHvU9y4fnrN31yUm18vMCIPjtw3QMndw4rs8ieVzAAcBlewpe1KM3uaBuD3Dda1BhWXAsi6AFY1a2SqifxZ+rnxWYcJDRkUS3fO1R5vwe+XZgw4D4L3RAJiknoXCVX3WeiUpJ5pIxTvVmg45pl5k4Ot/AGV2iqZBWgJJAAAAABJRU5ErkJggg==',
      'Windows': 'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA+pJREFUOE+F0n84FHYcB3CWSsL9ojo/6ik64c6PnTjmSS0limmrpBm2G002y++xzXRz6zE0R4nbw+RnTj/WD4sbanLkkAe55ccYlyNme4SrO9u9d13PI3/saZ+/vs/3831ez+f9eb5aWsuqy2mjRYeNUa7YmtjfTico7jNJ8z0eG24NB9vvnDrvufzpq89Npnr8VjMddNmuRh9rDfp36mFg91oM7qPIc5JdbDJq3An/JfCu7Hl53W2lpS220pP2OuniN299jAYbYizSENIoAgbCTdrTKtxOJVdvGo8psUwKy7Vxe4ez1YEVudGP8YEZzyveInFJ6mZRHHqYazDspw/pJwTIuERM5JIwmUdGdyo9K7/BszGzzg6fXzZHGJ8KvzQqXKOpoIeZLjofWR++BPWyCEnPY4xFGEKWQcLjMjKmr1MwfcMYwmz/Y4KOgNki0V5k1dkjUWCK93Kp2PMFFawos8cm1gZ2GqjLXktL4mbQPHLQ4B9ZDFE5+S356fQlyuJMqzH++HnTo6ui2OO1ko9Ul+4fxfd3d4F7k4YTReqpuFS88bGZUE2QNNDobuIq8Q5CduHb7lFJaTnvnym9ergjMWD/FG8zf+aKS3G9JO5C01Asah6wUXrvALKEDoitMMHhDKrKJdg8RU2s0EB2EWWur8dd7PDPFv6dUC0Gv3kAN36VPRGP/5k5NS6lljWxG0TDiSr1VKhoPwhevRMSqkwRxDObc/DavGtpP6zoi8XOyZfhnyNEvKANBU0P8VPfI/wyNCGXSn7wlEmyA9KrgmOKGth3eDVvPfyywq2dnUEv2R9qG2rLsH7xJXziKnWcI8tlTvEC7Mu8hROlImTU9aKqcwQ1vWOihWFu+sJknmph5CvxQh87c7bNh/NXo03hrMCosyvLmMNgMF7TQL6J1dsZIUVwjKqEO+cajp5vxPN439U/gKBt8PTcYHzL/BgHCyOf4unAISj6mFC2bYC82kB5Ls460NHRUVsDeYSXpGw7UgC7sAtwShDgzdM38W7BbURXtqpqhfmB8sEQuXwoCM/6faGQuGCxyxyKWhIm+PrSD495WL3cT0hhi8Whc3NbAs9KaOyCTvrJ8qkdX19XBeTUDU00+55USFzVU2yHstcaix0mUAjJkJeuRU868Ucmk0lcguiBnMAVxjbbdHV1yeq8+u4Hgo22huSG+iQXp83ftaxW3lsPZcs6KG5T8OwaAfJiPcxlrVRVRhvF02i0F/t5VbHZ7JWDfErKTLnhE3mFPuRFepg/uxqz6TqLv6euGj3ut87t/4ylvre3t3ZehOWWO1zjSFEqMVP4GfGb/DBykJcjmaZOoLsc+hcVY/LaAgcTQAAAAABJRU5ErkJggg==',
      'OpenBSD': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AoYAykIPu64pQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADTklEQVQ4y32RXUxTdxjGn3N6eujoKT3SUkuk3VoBGfVjgFXAsZ7WkipyYXQbuu3CzUXZmGRbssnFEseFkWzgcGzGXky9MWL8TsC4IeFgtK4oAqOnG5vMVl1pCMVWQD7b/y5M6jLdflfvxfPked/nBQA0NDSChqnGVrLuGkES742NhJAdhAKAuk9yyUs5Gry7RQMZAARCWgivpQiPe71P5DUfH0xaqTL7m/iiLkJmphawa+e4SM2PvUyC4yUIBu8CnAQKAK53rCA5OUtQtStVpJ4Gw/FOBddZVKhCfq4MP4n6+at+DUsJm/e0G9JZzYEvI2tHwlEYjDxomkZ+3nG8WroRtHihZVOhVlorDQzh0okhcByDP4ZGcf+X9XAsvY5/RsBa7Kq5H/CqLctKyl/g08S2i6fq8W/MS3P34T9wNDVYSeDX1eTD9xhiLXbtB/Akwmmv6Kr+ICFkLpGhtNSM3qsSstS3oX8lSsmsxS6ZVn3j6PvVVqhUcvC8AtPxVPxwygVKvngN89WOjgVprggGA4eenjB4nsXsTASpC63I0wVTZYPR11FoKRB8Ax54PCFk6BhMTk5CPR3GSbHouGzknr/bYFq9EAvfc9Tu1sLjHcXNKxLuTOTgzOlOe7IHBc/beAXWpWmXlz8a84nhcLQ+ecVzsAEQrMWuMX+f9HZF2YPZ28FVSNfoPWqOzMUmqYMAJm7+/OOzXQFwHGpyEV+vi+yvtxBC9pDmpgJC4tvI3mo9GTitIxvW24nT7ug67HY/3eDs2bbyrVsrY2day70rV6kRfDAHk5lDLJqAmmeRiD9GJDKHvwb74R8G0mkTPjrQTTG122xkTTbwaV2b1H4u16JQKXGr7yG2b8/H1MQ09IsTSEmRwzf4CCwzD+dmE1re8CI7wwi5XNlFf9vaTXX4dWJg4LLl7h05fpNGwNAMWpp9CIVYNO/tRCzGwpDFQaVMQTS2CKY0BWr3GVGWNSXKACDDaA4Mh976pq9f5Sy09GgKlmeAMIBKzUKpU+BFoxJecRhUfAbMxDi4eADfHVmE79v7q575gvvYeVvjZ58LD5mwsKUyX0hnf0feslnQCWD4zxnc6reKisxsfH2oscqcmTmK/+Ow252cna7K52r+Bky6PqmoT5HBAAAAAElFTkSuQmCC',
      'Gnu': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AoYAywUV5gQrwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADcElEQVQ4y43Tb0jjBRzH8c9v+7nNMebcUW21Cc78g/wcuhByIScoMRwoTBmFlZCmIJ14axqkgoYIkXIqKIVBEuJNUBEUPRlpqDC3Q2Ex0nTezun2YOaPLXNIv7Vvj7zgiOj1+PPk/eADjuNEuHN6ekqMw+H4IzMz8xChUCjV1NT0JbO7uxtfXFy8NZvNr21tbd0AAEQikY6I0m1tbQbx2NjYZiqV+vn29jY+PDw8xhYWFj45PDzcb25uhlQqfSTief6X0dFRpqKigvF4PPPipaWlY7lcXhCLxXJnZmY+ZTY2NnzX19ePGxsbHw0MDLivrq5mc3Jy2pPJZLVWq/2cdbvdDSzLholoNJ1OMy6Xq0Ymk5HNZktOTU29qMgA8HYqlaKDgwNKp9M0PT09BgAM/iGuqqoimUx2yPP8U5/P9wEAMB0dHRUKheJHiUTyeGhoqAUAnE7nR0qlsjcQCLwjlsvlz+bm5mQWi0VSWlr6bXV1tU6hUMj6+/vfN5lMN0xxcfG1zWZ7SETTSqWSGhoamPHxcajV6s+8Xu9Xou7u7t9VKtW00+mkSCTC6PV6aDQa8Dw/Wl9fP8UAQCgUosvLSyovL2eWl5dRUFBw7Ha7v9vc3By5K3g1EAg8FQSBiIguLi4IgBwA2LtEjuPuJxKJ62AwKFpdXf0eQBIvYVmW/cLlchEAWK1WAADT09NzX6PR/OTz+eKVlZUzKpVqTyqVvsnzfLCkpGSrtrb2t97eXnFeXl5ZKpWyZ2RkPPP7/UUnJyefGI3GU+zt7aU4jotOTk7mAUBfX1+b1Wq9kcvlBIAcDgctLCyQxWKhoqIi6uzs/BoAVlZW3qqpqbllZmdnf1hfX//Q4/HEzWbzX+3t7fcMBgMFg0EYjUYmEolAEAREo1Hk5+fT+fk5Mzg4GD86OpJ0dXXJGQBoaWl5Ra/XP6yrq3tQVlam2N7ehslkAsuySCaTUKvVSCQS2NnZSXAcJxYEQTEyMvKeIAhLDADY7fZ7BoPhm6ysLFpbWzuan5//WKvVvsHzPEWjUSYSiSA3N5d0Oh0TjUaf+/1+S2Nj46/4FwYAr7e2tnbF4/E/iYjC4TCFw+F0LBaj/f19mpiYeID/IAagAyABYLXb7cLZ2Rml02nyer3POY6rwv8hEr34u0IkEk1mZ2cTgGMA7768/RtL5JKsGzrLIgAAAABJRU5ErkJggg==',
      'CrunchBang': 'iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAQAAAC45EetAAAA8ElEQVR4XnWOsUpCYQBGz1TIHYu2Qix6g0DEtSeQu/UIISJtUS8gJq61F1wcdMohcBDxKUR8hsz1xA/y44/cs3znbB+RJ0Skl3pSkeFQbUs79VAPzrwPFRmN1Ja0Ug/16I93+1oi4lKte+zMXv32WuoAm43lXMrqzbFncgWw21lORf4+/PREKpAhYqZuPXZ+T/3yXbZEajV1JavUQ104sRcq0myqc5mnHurWqc/7yhExVwuPncl+C4Bu13L60ueAwcByOtLhgAIRCzU38fRGTmSxUBvSSD3Ui1NvQkXWa7Uq1dRD9R17HiqyRUSy1NP6B7e1Yu2GtlUKAAAAAElFTkSuQmCC',
      'Yuno': 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAABDtJREFUOE+FlHtMm1UYxrtsi8aEgCb+oTFmZur+WNS5RaPERU10C2qGaBgb6hgwLwMmHTIKlIKlQIHSQrmU24BSSmnpBVooUmihtEC5yKWDjVu5uOkcEca4lG5E93j6EQmELX7Jky/fOed9fu973vMdGu0xT3Cgz57yXMZLDdXcy821PFWLKmuA6HqLMqtLX5POl4iYb2ukWW8IOOFe/qfe3/M4n0eOjwyZD8//bldODOk37N1yDJgl+LVdjEGLFKO9KkzZm8hbje7mIrTXZ7sMtTydrJh15H8hHW11XvN/jGS7VudcD5w34ZZzeQYb67fwYO03LN4exo1+LWzNxbA05O5QuzbHqRYn+++CHDx4YK9WLfaedfQzV5em54g5Zbi8OIml+VFMDLWQ7GXoaSmFWZsDZVGCO2u0EbkhHTrhFqi9PmelSsQ8tAtSVch60dpUeGe4kxgZxegzVkBzlQ2NKBG2+iJIMqMok9r8OLRIMqApToSqmAWTmk9B2+o2YW79oshU7ABcuvAFrVGWXkVKpBYoSaBSxIS2mINpiwbjZiUMZRloVfJQyaXDKObBpimBScpHFe8KmmXpaKhK3arGrBVuVBclHN2CiPNin1OVs1tVJYlQlyZBxA6DviQVo6ZaOKd7sTplw53BVugruBBzfsRslw7rZPxaczWutSpQV/gzJPxo1JexyfaxKBBpuiEx+tw+CpKdEvGWTprGlhcwqbIzL5/DYKMYndpK3L1hxf3ZfkrzwybUZjPhnOqmvlcmutFF1jis9QSShOrcWNSXJ1MA0ou/NZWc8Ddfe4VGO3bk0JON1dyMMlK+gmxNrZCFhZF2Kng7YNO0awt4b7wLNp2EqtAsF6ImP56SG0B6siovTYpIjg15gapCVhAfJRUyIBFEo6k8AyuTtkcC/qvG/XbDexulWJvqgYH0o0nKhVHFJ40XwFQnWM5OCX+XMg86c3KvVMSMapCmPpSTIygTxGKZZOcOXhrr3Mp4uzkFuG6B3ajE3TELDDU8qEmsmvRATxquKkxAnSTFjwKEfv3JU9JC5unG6rQ1bTkbQ4Yq/DVgxOqwBWt2K9Yne3ZCZvrgHO2k5paHzOhSiVCZSkdNTgzy40JRlPgDhDHBCxUZdCs91G8fLeK87zOl6XSOICZYXMGNhDqX9fDP/mbK2DXVi/szm03eLpejl5pzOfqwOt4JBT8OeYwQt/4R/BR0OzXiLCM5LOCji/4nXt46rpywgG+zor5RxgSdupBzJdglSY+5ZZbl3XNY6mbn7W0Lcx06zBg1WBjtcC6OmG+OmRTrFrnIUZESZeVeCpwh8TpiPsQ47/tloM97T+/6m8mg55mT3tStyL54mhlwwtszNvjzD8/6HH8i7PvvPPRioZdRWuDBZUR6pEWG7I8P9Xs1Jsj36MfvvO5J/+rTw58dP7afJPfBgeef3XGz/gskFVpJc4HwGwAAAABJRU5ErkJggg=='
    }
  };

  ExpandComment = {
    init: function() {
      if (g.VIEW !== 'index' || !Conf['Comment Expansion']) {
        return;
      }
      if (g.BOARD.ID === 'g') {
        this.callbacks.push(Fourchan.code);
      }
      if (g.BOARD.ID === 'sci') {
        this.callbacks.push(Fourchan.math);
      }
      return Post.prototype.callbacks.push({
        name: 'Comment Expansion',
        cb: this.node
      });
    },
    node: function() {
      var a;

      if (a = $('.abbr > a:not([onclick])', this.nodes.comment)) {
        return $.on(a, 'click', ExpandComment.cb);
      }
    },
    callbacks: [],
    cb: function(e) {
      var post;

      e.preventDefault();
      post = Get.postFromNode(this);
      return ExpandComment.expand(post);
    },
    expand: function(post) {
      var a;

      if (post.nodes.longComment && !post.nodes.longComment.parentNode) {
        $.replace(post.nodes.shortComment, post.nodes.longComment);
        post.nodes.comment = post.nodes.longComment;
        return;
      }
      if (!(a = $('.abbr > a', post.nodes.comment))) {
        return;
      }
      a.textContent = "Post No." + post + " Loading...";
      return $.cache("//api.4chan.org" + a.pathname + ".json", function() {
        return ExpandComment.parse(this, a, post);
      });
    },
    contract: function(post) {
      var a;

      if (!post.nodes.shortComment) {
        return;
      }
      a = $('.abbr > a', post.nodes.shortComment);
      a.textContent = 'here';
      $.replace(post.nodes.longComment, post.nodes.shortComment);
      return post.nodes.comment = post.nodes.shortComment;
    },
    parse: function(req, a, post) {
      var callback, clone, comment, href, postObj, posts, quote, spoilerRange, status, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;

      status = req.status;
      if (![200, 304].contains(status)) {
        a.textContent = "Error " + req.statusText + " (" + status + ")";
        return;
      }
      posts = JSON.parse(req.response).posts;
      if (spoilerRange = posts[0].custom_spoiler) {
        Build.spoilerRange[g.BOARD] = spoilerRange;
      }
      for (_i = 0, _len = posts.length; _i < _len; _i++) {
        postObj = posts[_i];
        if (postObj.no === post.ID) {
          break;
        }
      }
      if (postObj.no !== post.ID) {
        a.textContent = "Post No." + post + " not found.";
        return;
      }
      comment = post.nodes.comment;
      clone = comment.cloneNode(false);
      clone.innerHTML = postObj.com;
      _ref = $$('.quotelink', clone);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        quote = _ref[_j];
        href = quote.getAttribute('href');
        if (href[0] === '/') {
          continue;
        }
        quote.href = "/" + post.board + "/res/" + href;
      }
      post.nodes.shortComment = comment;
      $.replace(comment, clone);
      post.nodes.comment = post.nodes.longComment = clone;
      post.parseComment();
      post.parseQuotes();
      _ref1 = ExpandComment.callbacks;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        callback = _ref1[_k];
        callback.call(post);
      }
    }
  };

  ExpandThread = {
    init: function() {
      if (g.VIEW !== 'index' || !Conf['Thread Expansion']) {
        return;
      }
      return Thread.prototype.callbacks.push({
        name: 'Thread Expansion',
        cb: this.node
      });
    },
    node: function() {
      var a, span;

      if (!(span = $('.summary', this.OP.nodes.root.parentNode))) {
        return;
      }
      a = $.el('a', {
        textContent: "+ " + span.textContent,
        className: 'summary',
        href: 'javascript:;'
      });
      $.on(a, 'click', ExpandThread.cbToggle);
      return $.replace(span, a);
    },
    cbToggle: function() {
      var op;

      op = Get.postFromRoot(this.previousElementSibling);
      return ExpandThread.toggle(op.thread);
    },
    toggle: function(thread) {
      var a, inlined, num, post, replies, reply, threadRoot, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;

      threadRoot = thread.OP.nodes.root.parentNode;
      a = $('.summary', threadRoot);
      switch (thread.isExpanded) {
        case false:
        case void 0:
          thread.isExpanded = 'loading';
          _ref = $$('.thread > .postContainer', threadRoot);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            post = _ref[_i];
            ExpandComment.expand(Get.postFromRoot(post));
          }
          if (!a) {
            thread.isExpanded = true;
            return;
          }
          thread.isExpanded = 'loading';
          a.textContent = a.textContent.replace('+', '× Loading...');
          $.cache("//api.4chan.org/" + thread.board + "/res/" + thread + ".json", function() {
            return ExpandThread.parse(this, thread, a);
          });
          break;
        case 'loading':
          thread.isExpanded = false;
          if (!a) {
            return;
          }
          a.textContent = a.textContent.replace('× Loading...', '+');
          break;
        case true:
          thread.isExpanded = false;
          if (a) {
            a.textContent = a.textContent.replace('-', '+');
            num = (function() {
              if (thread.isSticky) {
                return 1;
              } else {
                switch (g.BOARD.ID) {
                  case 'b':
                  case 'vg':
                  case 'q':
                    return 3;
                  case 't':
                    return 1;
                  default:
                    return 5;
                }
              }
            })();
            replies = $$('.thread > .replyContainer', threadRoot).slice(0, -num);
            for (_j = 0, _len1 = replies.length; _j < _len1; _j++) {
              reply = replies[_j];
              if (Conf['Quote Inlining']) {
                while (inlined = $('.inlined', reply)) {
                  inlined.click();
                }
              }
              $.rm(reply);
            }
          }
          _ref1 = $$('.thread > .postContainer', threadRoot);
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            post = _ref1[_k];
            ExpandComment.contract(Get.postFromRoot(post));
          }
      }
    },
    parse: function(req, thread, a) {
      var link, node, nodes, post, posts, replies, reply, spoilerRange, status, _i, _len;

      if (a.textContent[0] === '+') {
        return;
      }
      status = req.status;
      if (![200, 304].contains(status)) {
        a.textContent = "Error " + req.statusText + " (" + status + ")";
        $.off(a, 'click', ExpandThread.cb.toggle);
        return;
      }
      thread.isExpanded = true;
      a.textContent = a.textContent.replace('× Loading...', '-');
      posts = JSON.parse(req.response).posts;
      if (spoilerRange = posts[0].custom_spoiler) {
        Build.spoilerRange[g.BOARD] = spoilerRange;
      }
      replies = posts.slice(1);
      posts = [];
      nodes = [];
      for (_i = 0, _len = replies.length; _i < _len; _i++) {
        reply = replies[_i];
        if (post = thread.posts[reply.no]) {
          nodes.push(post.nodes.root);
          continue;
        }
        node = Build.postFromObject(reply, thread.board);
        post = new Post(node, thread, thread.board);
        link = $('a[title="Highlight this post"]', node);
        link.href = "res/" + thread + "#p" + post;
        link.nextSibling.href = "res/" + thread + "#q" + post;
        posts.push(post);
        nodes.push(node);
      }
      Main.callbackNodes(Post, posts);
      $.after(a, nodes);
      return Fourchan.parseThread(thread.ID, 1, nodes.length);
    }
  };

  FileInfo = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['File Info Formatting']) {
        return;
      }
      this.funk = this.createFunc(Conf['fileInfo']);
      return Post.prototype.callbacks.push({
        name: 'File Info Formatting',
        cb: this.node
      });
    },
    node: function() {
      if (!this.file || this.isClone) {
        return;
      }
      return this.file.text.innerHTML = FileInfo.funk(FileInfo, this);
    },
    createFunc: function(format) {
      var code;

      code = format.replace(/%(.)/g, function(s, c) {
        if (c in FileInfo.formatters) {
          return "' + FileInfo.formatters." + c + ".call(post) + '";
        } else {
          return s;
        }
      });
      return Function('FileInfo', 'post', "return '" + code + "'");
    },
    convertUnit: function(size, unit) {
      var i;

      if (unit === 'B') {
        return "" + (size.toFixed()) + " Bytes";
      }
      i = 1 + ['KB', 'MB'].indexOf(unit);
      while (i--) {
        size /= 1024;
      }
      size = unit === 'MB' ? Math.round(size * 100) / 100 : size.toFixed();
      return "" + size + " " + unit;
    },
    escape: function(name) {
      return name.replace(/<|>/g, function(c) {
        return c === '<' && '&lt;' || '&gt;';
      });
    },
    formatters: {
      t: function() {
        return this.file.URL.match(/\d+\..+$/)[0];
      },
      T: function() {
        return "<a href=" + this.file.URL + " target=_blank>" + (FileInfo.formatters.t.call(this)) + "</a>";
      },
      l: function() {
        return "<a href=" + this.file.URL + " target=_blank>" + (FileInfo.formatters.n.call(this)) + "</a>";
      },
      L: function() {
        return "<a href=" + this.file.URL + " target=_blank>" + (FileInfo.formatters.N.call(this)) + "</a>";
      },
      n: function() {
        var fullname, shortname;

        fullname = this.file.name;
        shortname = Build.shortFilename(this.file.name, this.isReply);
        if (fullname === shortname) {
          return FileInfo.escape(fullname);
        } else {
          return "<span class=fntrunc>" + (FileInfo.escape(shortname)) + "</span><span class=fnfull>" + (FileInfo.escape(fullname)) + "</span>";
        }
      },
      N: function() {
        return FileInfo.escape(this.file.name);
      },
      p: function() {
        if (this.file.isSpoiler) {
          return 'Spoiler, ';
        } else {
          return '';
        }
      },
      s: function() {
        return this.file.size;
      },
      B: function() {
        return FileInfo.convertUnit(this.file.sizeInBytes, 'B');
      },
      K: function() {
        return FileInfo.convertUnit(this.file.sizeInBytes, 'KB');
      },
      M: function() {
        return FileInfo.convertUnit(this.file.sizeInBytes, 'MB');
      },
      r: function() {
        if (this.file.isImage) {
          return this.file.dimensions;
        } else {
          return 'PDF';
        }
      }
    }
  };

  Fourchan = {
    init: function() {
      var board;

      if (g.VIEW === 'catalog') {
        return;
      }
      board = g.BOARD.ID;
      if (board === 'g') {
        $.globalEval("window.addEventListener('prettyprint', function(e) {\n  var pre = e.detail;\n  pre.innerHTML = prettyPrintOne(pre.innerHTML);\n}, false);");
        Post.prototype.callbacks.push({
          name: 'Parse /g/ code',
          cb: this.code
        });
      }
      if (board === 'sci') {
        $.globalEval("window.addEventListener('jsmath', function(e) {\n  if (jsMath.loaded) {\n    // process one post\n    jsMath.ProcessBeforeShowing(e.detail);\n  } else {\n    // load jsMath and process whole document\n    jsMath.Autoload.Script.Push('ProcessBeforeShowing', [null]);\n    jsMath.Autoload.LoadJsMath();\n  }\n}, false);");
        return Post.prototype.callbacks.push({
          name: 'Parse /sci/ math',
          cb: this.math
        });
      }
    },
    code: function() {
      var pre, _i, _len, _ref;

      if (this.isClone) {
        return;
      }
      _ref = $$('.prettyprint', this.nodes.comment);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pre = _ref[_i];
        $.event('prettyprint', pre, window);
      }
    },
    math: function() {
      if (this.isClone || !$('.math', this.nodes.comment)) {
        return;
      }
      return $.event('jsmath', this.nodes.post, window);
    },
    parseThread: function(threadID, offset, limit) {
      return $.event('4chanParsingDone', {
        threadId: threadID,
        offset: offset,
        limit: limit
      });
    }
  };

  Keybinds = {
    init: function() {
      var init;

      if (g.VIEW === 'catalog' || !Conf['Keybinds']) {
        return;
      }
      init = function() {
        var node, _i, _len, _ref;

        $.off(d, '4chanXInitFinished', init);
        $.on(d, 'keydown', Keybinds.keydown);
        _ref = $$('[accesskey]');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          node.removeAttribute('accesskey');
        }
      };
      return $.on(d, '4chanXInitFinished', init);
    },
    keydown: function(e) {
      var form, key, notification, notifications, op, target, thread, threadRoot, _i, _len;

      if (!(key = Keybinds.keyCode(e))) {
        return;
      }
      target = e.target;
      if (['INPUT', 'TEXTAREA'].contains(target.nodeName)) {
        if (!/(Esc|Alt|Ctrl|Meta)/.test(key)) {
          return;
        }
      }
      threadRoot = Nav.getThread();
      if (op = $('.op', threadRoot)) {
        thread = Get.postFromNode(op).thread;
      }
      switch (key) {
        case Conf['Toggle board list']:
          if (Conf['Custom Board Navigation']) {
            Header.toggleBoardList();
          }
          break;
        case Conf['Toggle header']:
          if (!$('#menu.left')) {
            Header.menuButton.click();
          }
          Header.headerToggler.click();
          break;
        case Conf['Open empty QR']:
          Keybinds.qr(threadRoot);
          break;
        case Conf['Open QR']:
          Keybinds.qr(threadRoot, true);
          break;
        case Conf['Open settings']:
          Settings.open();
          break;
        case Conf['Close']:
          if (Settings.dialog) {
            Settings.close();
          } else if ((notifications = $$('.notification')).length) {
            for (_i = 0, _len = notifications.length; _i < _len; _i++) {
              notification = notifications[_i];
              $('.close', notification).click();
            }
          } else if (QR.nodes) {
            if (Conf['Persistent QR']) {
              QR.hide();
            } else {
              QR.close();
            }
          }
          break;
        case Conf['Spoiler tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('spoiler', target);
          break;
        case Conf['Code tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('code', target);
          break;
        case Conf['Eqn tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('eqn', target);
          break;
        case Conf['Math tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('math', target);
          break;
        case Conf['Toggle sage']:
          if (QR.nodes) {
            Keybinds.sage();
          }
          break;
        case Conf['Submit QR']:
          if (QR.nodes && !QR.status()) {
            QR.submit();
          }
          break;
        case Conf['Watch']:
          ThreadWatcher.toggle(thread);
          break;
        case Conf['Update']:
          ThreadUpdater.update();
          break;
        case Conf['Expand image']:
          Keybinds.img(threadRoot);
          break;
        case Conf['Expand images']:
          Keybinds.img(threadRoot, true);
          break;
        case Conf['fappeTyme']:
          if (!$('#menu.left')) {
            Header.menuButton.click();
          }
          FappeTyme.input.click();
          break;
        case Conf['Front page']:
          window.location = "/" + g.BOARD + "/0#delform";
          break;
        case Conf['Open front page']:
          $.open("/" + g.BOARD + "/#delform");
          break;
        case Conf['Next page']:
          if (form = $('.next form')) {
            window.location = form.action;
          }
          break;
        case Conf['Previous page']:
          if (form = $('.prev form')) {
            window.location = form.action;
          }
          break;
        case Conf['Open catalog']:
          if (Conf['External Catalog']) {
            window.location = CatalogLinks.external(g.BOARD.ID);
          } else {
            window.location = "/" + g.BOARD + "/catalog";
          }
          break;
        case Conf['Next thread']:
          if (g.VIEW === 'thread') {
            return;
          }
          Nav.scroll(+1);
          break;
        case Conf['Previous thread']:
          if (g.VIEW === 'thread') {
            return;
          }
          Nav.scroll(-1);
          break;
        case Conf['Expand thread']:
          ExpandThread.toggle(thread);
          break;
        case Conf['Open thread']:
          Keybinds.open(thread);
          break;
        case Conf['Open thread tab']:
          Keybinds.open(thread, true);
          break;
        case Conf['Next reply']:
          Keybinds.hl(+1, threadRoot);
          break;
        case Conf['Previous reply']:
          Keybinds.hl(-1, threadRoot);
          break;
        case Conf['Hide']:
          if (g.VIEW === 'index') {
            ThreadHiding.toggle(thread);
          }
          break;
        default:
          return;
      }
      e.preventDefault();
      return e.stopPropagation();
    },
    keyCode: function(e) {
      var kc, key;

      key = (function() {
        switch (kc = e.keyCode) {
          case 8:
            return '';
          case 13:
            return 'Enter';
          case 27:
            return 'Esc';
          case 37:
            return 'Left';
          case 38:
            return 'Up';
          case 39:
            return 'Right';
          case 40:
            return 'Down';
          default:
            if ((48 <= kc && kc <= 57) || (65 <= kc && kc <= 90)) {
              return String.fromCharCode(kc).toLowerCase();
            } else {
              return null;
            }
        }
      })();
      if (key) {
        if (e.altKey) {
          key = 'Alt+' + key;
        }
        if (e.ctrlKey) {
          key = 'Ctrl+' + key;
        }
        if (e.metaKey) {
          key = 'Meta+' + key;
        }
        if (e.shiftKey) {
          key = 'Shift+' + key;
        }
      }
      return key;
    },
    qr: function(thread, quote) {
      if (!(Conf['Quick Reply'] && QR.postingIsEnabled)) {
        return;
      }
      QR.open();
      if (quote) {
        QR.quote.call($('input', $('.post.highlight', thread) || thread));
      }
      QR.nodes.com.focus();
      if (Conf['QR Shortcut']) {
        return $.rmClass($('.qr-shortcut'), 'disabled');
      }
    },
    tags: function(tag, ta) {
      var range, selEnd, selStart, value;

      value = ta.value;
      selStart = ta.selectionStart;
      selEnd = ta.selectionEnd;
      ta.value = value.slice(0, selStart) + ("[" + tag + "]") + value.slice(selStart, selEnd) + ("[/" + tag + "]") + value.slice(selEnd);
      range = ("[" + tag + "]").length + selEnd;
      ta.setSelectionRange(range, range);
      return $.event('input', null, ta);
    },
    sage: function() {
      var isSage;

      isSage = /sage/i.test(QR.nodes.email.value);
      return QR.nodes.email.value = isSage ? "" : "sage";
    },
    img: function(thread, all) {
      var post;

      if (all) {
        return ImageExpand.cb.toggleAll();
      } else {
        post = Get.postFromNode($('.post.highlight', thread) || $('.op', thread));
        return ImageExpand.toggle(post);
      }
    },
    open: function(thread, tab) {
      var url;

      if (g.VIEW !== 'index') {
        return;
      }
      url = "/" + thread.board + "/res/" + thread;
      if (tab) {
        return $.open(url);
      } else {
        return location.href = url;
      }
    },
    hl: function(delta, thread) {
      var headRect, next, postEl, rect, replies, reply, root, topMargin, _i, _len;

      if (Conf['Fixed Header'] && Conf['Bottom header']) {
        topMargin = 0;
      } else {
        headRect = Header.bar.getBoundingClientRect();
        topMargin = headRect.top + headRect.height;
      }
      if (postEl = $('.reply.highlight', thread)) {
        $.rmClass(postEl, 'highlight');
        rect = postEl.getBoundingClientRect();
        if (rect.bottom >= topMargin && rect.top <= doc.clientHeight) {
          root = postEl.parentNode;
          next = $.x('child::div[contains(@class,"post reply")]', delta === +1 ? root.nextElementSibling : root.previousElementSibling);
          if (!next) {
            this.focus(postEl);
            return;
          }
          if (!(g.VIEW === 'thread' || $.x('ancestor::div[parent::div[@class="board"]]', next) === thread)) {
            return;
          }
          rect = next.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > doc.clientHeight) {
            if (delta === -1) {
              window.scrollBy(0, rect.top - topMargin);
            } else {
              next.scrollIntoView(false);
            }
          }
          this.focus(next);
          return;
        }
      }
      replies = $$('.reply', thread);
      if (delta === -1) {
        replies.reverse();
      }
      for (_i = 0, _len = replies.length; _i < _len; _i++) {
        reply = replies[_i];
        rect = reply.getBoundingClientRect();
        if (delta === +1 && rect.top >= topMargin || delta === -1 && rect.bottom <= doc.clientHeight) {
          this.focus(reply);
          return;
        }
      }
    },
    focus: function(post) {
      return $.addClass(post, 'highlight');
    }
  };

  Nav = {
    init: function() {
      var append, next, prev, span;

      switch (g.VIEW) {
        case 'index':
          if (!Conf['Index Navigation']) {
            return;
          }
          break;
        case 'thread':
          if (!Conf['Reply Navigation']) {
            return;
          }
          break;
        default:
          return;
      }
      span = $.el('span', {
        id: 'navlinks'
      });
      prev = $.el('a', {
        textContent: '▲',
        href: 'javascript:;'
      });
      next = $.el('a', {
        textContent: '▼',
        href: 'javascript:;'
      });
      $.on(prev, 'click', this.prev);
      $.on(next, 'click', this.next);
      $.add(span, [prev, $.tn(' '), next]);
      append = function() {
        $.off(d, '4chanXInitFinished', append);
        return $.add(d.body, span);
      };
      return $.on(d, '4chanXInitFinished', append);
    },
    prev: function() {
      if (g.VIEW === 'thread') {
        return window.scrollTo(0, 0);
      } else {
        return Nav.scroll(-1);
      }
    },
    next: function() {
      if (g.VIEW === 'thread') {
        return window.scrollTo(0, d.body.scrollHeight);
      } else {
        return Nav.scroll(+1);
      }
    },
    getThread: function(full) {
      var headRect, i, rect, thread, threads, topMargin, _i, _len;

      if (Conf['Bottom header']) {
        topMargin = 0;
      } else {
        headRect = Header.bar.getBoundingClientRect();
        topMargin = headRect.top + headRect.height;
      }
      threads = $$('.thread:not([hidden])');
      for (i = _i = 0, _len = threads.length; _i < _len; i = ++_i) {
        thread = threads[i];
        rect = thread.getBoundingClientRect();
        if (rect.bottom > topMargin) {
          if (full) {
            return [threads, thread, i, rect, topMargin];
          } else {
            return thread;
          }
        }
      }
      return $('.board');
    },
    scroll: function(delta) {
      var i, rect, thread, threads, top, topMargin, _ref, _ref1;

      _ref = Nav.getThread(true), threads = _ref[0], thread = _ref[1], i = _ref[2], rect = _ref[3], topMargin = _ref[4];
      top = rect.top - topMargin;
      if (!((delta === -1 && Math.ceil(top) < 0) || (delta === +1 && top > 1))) {
        i += delta;
      }
      top = ((_ref1 = threads[i]) != null ? _ref1.getBoundingClientRect().top : void 0) - topMargin;
      return window.scrollBy(0, top);
    }
  };

  RelativeDates = {
    INTERVAL: $.MINUTE / 2,
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Relative Post Dates']) {
        return;
      }
      $.on(d, 'visibilitychange ThreadUpdate', this.flush);
      this.flush();
      return Post.prototype.callbacks.push({
        name: 'Relative Post Dates',
        cb: this.node
      });
    },
    node: function() {
      var dateEl;

      if (this.isClone) {
        return;
      }
      dateEl = this.nodes.date;
      dateEl.title = dateEl.textContent;
      return RelativeDates.setUpdate(this);
    },
    relative: function(diff, now, date) {
      var days, months, number, rounded, unit, years;

      unit = (number = diff / $.DAY) >= 1 ? (years = now.getYear() - date.getYear(), months = now.getMonth() - date.getMonth(), days = now.getDate() - date.getDate(), years > 1 ? (number = years - (months < 0 || months === 0 && days < 0), 'year') : years === 1 && (months > 0 || months === 0 && days >= 0) ? (number = years, 'year') : (months = (months + 12) % 12) > 1 ? (number = months - (days < 0), 'month') : months === 1 && days >= 0 ? (number = months, 'month') : 'day') : (number = diff / $.HOUR) >= 1 ? 'hour' : (number = diff / $.MINUTE) >= 1 ? 'minute' : (number = Math.max(0, diff) / $.SECOND, 'second');
      rounded = Math.round(number);
      if (rounded !== 1) {
        unit += 's';
      }
      return "" + rounded + " " + unit + " ago";
    },
    stale: [],
    flush: function() {
      var now, update, _i, _len, _ref;

      if (d.hidden) {
        return;
      }
      now = new Date();
      _ref = RelativeDates.stale;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        update = _ref[_i];
        update(now);
      }
      RelativeDates.stale = [];
      clearTimeout(RelativeDates.timeout);
      return RelativeDates.timeout = setTimeout(RelativeDates.flush, RelativeDates.INTERVAL);
    },
    setUpdate: function(post) {
      var markStale, setOwnTimeout, update;

      setOwnTimeout = function(diff) {
        var delay;

        delay = diff < $.MINUTE ? $.SECOND - (diff + $.SECOND / 2) % $.SECOND : diff < $.HOUR ? $.MINUTE - (diff + $.MINUTE / 2) % $.MINUTE : diff < $.DAY ? $.HOUR - (diff + $.HOUR / 2) % $.HOUR : $.DAY - (diff + $.DAY / 2) % $.DAY;
        return setTimeout(markStale, delay);
      };
      update = function(now) {
        var date, diff, relative, singlePost, _i, _len, _ref;

        date = post.info.date;
        diff = now - date;
        relative = RelativeDates.relative(diff, now, date);
        _ref = [post].concat(post.clones);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          singlePost = _ref[_i];
          singlePost.nodes.date.firstChild.textContent = relative;
        }
        return setOwnTimeout(diff);
      };
      markStale = function() {
        return RelativeDates.stale.push(update);
      };
      return update(new Date());
    }
  };

  RemoveSpoilers = {
    init: function() {
      if (!Conf['Remove Spoilers']) {
        return;
      }
      if (Conf['Indicate Spoilers']) {
        this.wrapper = function(text) {
          return "[spoiler]" + text + "[/spoiler]";
        };
      }
      return Post.prototype.callbacks.push({
        name: 'Reveal Spoilers',
        cb: this.node
      });
    },
    wrapper: function(text) {
      return text;
    },
    node: function(post) {
      var spoiler, spoilers, _i, _len;

      spoilers = $$('s', this.nodes.comment);
      for (_i = 0, _len = spoilers.length; _i < _len; _i++) {
        spoiler = spoilers[_i];
        $.replace(spoiler, $.tn(RemoveSpoilers.wrapper(spoiler.textContent)));
      }
    }
  };

  Report = {
    init: function() {
      if (!/report/.test(location.search)) {
        return;
      }
      return $.ready(this.ready);
    },
    ready: function() {
      var field, form;

      form = $('form');
      field = $.id('recaptcha_response_field');
      $.on(field, 'keydown', function(e) {
        if (e.keyCode === 8 && !field.value) {
          return $.globalEval('Recaptcha.reload("t")');
        }
      });
      return $.on(form, 'submit', function(e) {
        var response;

        e.preventDefault();
        response = field.value.trim();
        if (!/\s/.test(response)) {
          field.value = "" + response + " " + response;
        }
        return form.submit();
      });
    }
  };

  Sauce = {
    init: function() {
      var link, links, _i, _len, _ref;

      if (g.VIEW === 'catalog' || !Conf['Sauce']) {
        return;
      }
      links = [];
      _ref = Conf['sauces'].split('\n');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        if (link[0] === '#') {
          continue;
        }
        links.push(this.createSauceLink(link.trim()));
      }
      if (!links.length) {
        return;
      }
      this.links = links;
      this.link = $.el('a', {
        target: '_blank'
      });
      return Post.prototype.callbacks.push({
        name: 'Sauce',
        cb: this.node
      });
    },
    createSauceLink: function(link) {
      var m, text;

      link = link.replace(/%(T?URL|MD5|board)/ig, function(parameter) {
        switch (parameter) {
          case '%TURL':
            return "' + encodeURIComponent(post.file.thumbURL) + '";
          case '%URL':
            return "' + encodeURIComponent(post.file.URL) + '";
          case '%MD5':
            return "' + encodeURIComponent(post.file.MD5) + '";
          case '%board':
            return "' + encodeURIComponent(post.board) + '";
          default:
            return parameter;
        }
      });
      text = (m = link.match(/;text:(.+)$/)) ? m[1] : link.match(/(\w+)\.\w+\//)[1];
      link = link.replace(/;text:.+$/, '');
      return Function('post', 'a', "a.href = '" + link + "';\na.textContent = '" + text + "';\nreturn a;");
    },
    node: function() {
      var link, nodes, _i, _len, _ref;

      if (this.isClone || !this.file) {
        return;
      }
      nodes = [];
      _ref = Sauce.links;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        nodes.push($.tn('\u00A0'), link(this, Sauce.link.cloneNode(true)));
      }
      return $.add(this.file.info, nodes);
    }
  };

  Time = {
    init: function() {
      if (g.VIEW === 'catalog' || !Conf['Time Formatting']) {
        return;
      }
      this.funk = this.createFunc(Conf['time']);
      return Post.prototype.callbacks.push({
        name: 'Time Formatting',
        cb: this.node
      });
    },
    node: function() {
      if (this.isClone) {
        return;
      }
      return this.nodes.date.textContent = Time.funk(Time, this.info.date);
    },
    createFunc: function(format) {
      var code;

      code = format.replace(/%([A-Za-z])/g, function(s, c) {
        if (c in Time.formatters) {
          return "' + Time.formatters." + c + ".call(date) + '";
        } else {
          return s;
        }
      });
      return Function('Time', 'date', "return '" + code + "'");
    },
    day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    zeroPad: function(n) {
      if (n < 10) {
        return "0" + n;
      } else {
        return n;
      }
    },
    formatters: {
      a: function() {
        return Time.day[this.getDay()].slice(0, 3);
      },
      A: function() {
        return Time.day[this.getDay()];
      },
      b: function() {
        return Time.month[this.getMonth()].slice(0, 3);
      },
      B: function() {
        return Time.month[this.getMonth()];
      },
      d: function() {
        return Time.zeroPad(this.getDate());
      },
      e: function() {
        return this.getDate();
      },
      H: function() {
        return Time.zeroPad(this.getHours());
      },
      I: function() {
        return Time.zeroPad(this.getHours() % 12 || 12);
      },
      k: function() {
        return this.getHours();
      },
      l: function() {
        return this.getHours() % 12 || 12;
      },
      m: function() {
        return Time.zeroPad(this.getMonth() + 1);
      },
      M: function() {
        return Time.zeroPad(this.getMinutes());
      },
      p: function() {
        if (this.getHours() < 12) {
          return 'AM';
        } else {
          return 'PM';
        }
      },
      P: function() {
        if (this.getHours() < 12) {
          return 'am';
        } else {
          return 'pm';
        }
      },
      S: function() {
        return Time.zeroPad(this.getSeconds());
      },
      y: function() {
        return this.getFullYear() - 2000;
      }
    }
  };

  Settings = {
    init: function() {
      var link, settings;

      link = $.el('a', {
        className: 'settings-link',
        textContent: 'Settings',
        href: 'javascript:;'
      });
      $.on(link, 'click', Settings.open);
      Header.addShortcut(link);
      $.get('previousversion', null, function(item) {
        var changelog, curr, el, prev, previous;

        if (previous = item['previousversion']) {
          if (previous === g.VERSION) {
            return;
          }
          prev = previous.match(/\d+/g).map(Number);
          curr = g.VERSION.match(/\d+/g).map(Number);
          changelog = 'https://github.com/seaweedchan/4chan-x/blob/master/CHANGELOG.md';
          el = $.el('span', {
            innerHTML: "4chan X has been updated to <a href='" + changelog + "' target=_blank>version " + g.VERSION + "</a>."
          });
          new Notification('info', el, 30);
        } else {
          $.on(d, '4chanXInitFinished', Settings.open);
        }
        return $.set({
          lastupdate: Date.now(),
          previousversion: g.VERSION
        });
      });
      Settings.addSection('Main', Settings.main);
      Settings.addSection('Filter', Settings.filter);
      Settings.addSection('Sauce', Settings.sauce);
      Settings.addSection('Advanced', Settings.advanced);
      Settings.addSection('Keybinds', Settings.keybinds);
      $.on(d, 'AddSettingsSection', Settings.addSection);
      $.on(d, 'OpenSettings', function(e) {
        return Settings.open(e.detail);
      });
      settings = JSON.parse(localStorage.getItem('4chan-settings')) || {};
      if (settings.disableAll) {
        return;
      }
      settings.disableAll = true;
      return localStorage.setItem('4chan-settings', JSON.stringify(settings));
    },
    open: function(openSection) {
      var dialog, html, link, links, overlay, section, sectionToOpen, _i, _len, _ref;

      $.off(d, '4chanXInitFinished', Settings.open);
      if (Settings.dialog) {
        return;
      }
      $.event('CloseMenu');
      html = "<nav><div class=sections-list></div><p class='imp-exp-result warning'></p><div class=credits><a class=export>Export</a> |\n  <a class=import>Import</a> |\n  <input type=file style='display: none;'><a href='http://seaweedchan.github.io/4chan-x/' target=_blank>4chan X</a> |\n<a href='https://github.com/seaweedchan/4chan-x/blob/master/CHANGELOG.md' target=_blank>" + g.VERSION + "</a> |\n<a href='https://github.com/seaweedchan/4chan-x/blob/master/README.md#reporting-bugs-and-suggestions' target=_blank>Issues</a> |\n<a href=javascript:; class=close title=Close>×</a></div></nav><div class=section-container><section></section></div>";
      Settings.overlay = overlay = $.el('div', {
        id: 'overlay'
      });
      Settings.dialog = dialog = $.el('div', {
        id: 'fourchanx-settings',
        className: 'dialog',
        innerHTML: html
      });
      $.on($('.export', Settings.dialog), 'click', Settings["export"]);
      $.on($('.import', Settings.dialog), 'click', Settings["import"]);
      $.on($('input', Settings.dialog), 'change', Settings.onImport);
      links = [];
      _ref = Settings.sections;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        section = _ref[_i];
        link = $.el('a', {
          className: "tab-" + section.hyphenatedTitle,
          textContent: section.title,
          href: 'javascript:;'
        });
        $.on(link, 'click', Settings.openSection.bind(section));
        links.push(link, $.tn(' | '));
        if (section.title === openSection) {
          sectionToOpen = link;
        }
      }
      links.pop();
      $.add($('.sections-list', dialog), links);
      (sectionToOpen ? sectionToOpen : links[0]).click();
      $.on($('.close', dialog), 'click', Settings.close);
      $.on(overlay, 'click', Settings.close);
      d.body.style.width = "" + d.body.clientWidth + "px";
      $.addClass(d.body, 'unscroll');
      return $.add(d.body, [overlay, dialog]);
    },
    close: function() {
      if (!Settings.dialog) {
        return;
      }
      d.body.style.removeProperty('width');
      $.rmClass(d.body, 'unscroll');
      $.rm(Settings.overlay);
      $.rm(Settings.dialog);
      delete Settings.overlay;
      return delete Settings.dialog;
    },
    sections: [],
    addSection: function(title, open) {
      var hyphenatedTitle, _ref;

      if (typeof title !== 'string') {
        _ref = title.detail, title = _ref.title, open = _ref.open;
      }
      hyphenatedTitle = title.toLowerCase().replace(/\s+/g, '-');
      return Settings.sections.push({
        title: title,
        hyphenatedTitle: hyphenatedTitle,
        open: open
      });
    },
    openSection: function() {
      var section, selected;

      if (selected = $('.tab-selected', Settings.dialog)) {
        $.rmClass(selected, 'tab-selected');
      }
      $.addClass($(".tab-" + this.hyphenatedTitle, Settings.dialog), 'tab-selected');
      section = $('section', Settings.dialog);
      $.rmAll(section);
      section.className = "section-" + this.hyphenatedTitle;
      this.open(section, g);
      return section.scrollTop = 0;
    },
    main: function(section) {
      var arr, button, description, div, fs, hiddenNum, input, inputs, items, key, obj, _ref;

      items = {};
      inputs = {};
      _ref = Config.main;
      for (key in _ref) {
        obj = _ref[key];
        fs = $.el('fieldset', {
          innerHTML: "<legend>" + key + "</legend>"
        });
        for (key in obj) {
          arr = obj[key];
          description = arr[1];
          div = $.el('div', {
            innerHTML: "<label><input type=checkbox name=\"" + key + "\">" + key + "</label><span class=description>: " + description + "</span>"
          });
          input = $('input', div);
          $.on(input, 'change', $.cb.checked);
          items[key] = Conf[key];
          inputs[key] = input;
          $.add(fs, div);
        }
        $.add(section, fs);
      }
      $.get(items, function(items) {
        var val;

        for (key in items) {
          val = items[key];
          inputs[key].checked = val;
        }
      });
      div = $.el('div', {
        innerHTML: "<button></button><span class=description>: Clear manually-hidden threads and posts on all boards. Refresh the page to apply."
      });
      button = $('button', div);
      hiddenNum = 0;
      $.get('hiddenThreads', {
        boards: {}
      }, function(item) {
        var ID, board, thread, _ref1;

        _ref1 = item.hiddenThreads.boards;
        for (ID in _ref1) {
          board = _ref1[ID];
          for (ID in board) {
            thread = board[ID];
            hiddenNum++;
          }
        }
        return button.textContent = "Hidden: " + hiddenNum;
      });
      $.get('hiddenPosts', {
        boards: {}
      }, function(item) {
        var ID, board, post, thread, _ref1;

        _ref1 = item.hiddenPosts.boards;
        for (ID in _ref1) {
          board = _ref1[ID];
          for (ID in board) {
            thread = board[ID];
            for (ID in thread) {
              post = thread[ID];
              hiddenNum++;
            }
          }
        }
        return button.textContent = "Hidden: " + hiddenNum;
      });
      $.on(button, 'click', function() {
        this.textContent = 'Hidden: 0';
        return $.get('hiddenThreads', {
          boards: {}
        }, function(item) {
          var boardID;

          for (boardID in item.hiddenThreads.boards) {
            localStorage.removeItem("4chan-hide-t-" + boardID);
          }
          return $["delete"](['hiddenThreads', 'hiddenPosts']);
        });
      });
      return $.after($('input[name="Stubs"]', section).parentNode.parentNode, div);
    },
    "export": function(now, data) {
      var a, db, p, _i, _len;

      if (typeof now !== 'number') {
        now = Date.now();
        data = {
          version: g.VERSION,
          date: now
        };
        Conf['WatchedThreads'] = {};
        for (_i = 0, _len = DataBoards.length; _i < _len; _i++) {
          db = DataBoards[_i];
          Conf[db] = {
            boards: {}
          };
        }
        $.get(Conf, function(Conf) {
          data.Conf = Conf;
          return Settings["export"](now, data);
        });
        return;
      }
      a = $.el('a', {
        className: 'warning',
        textContent: 'Save me!',
        download: "4chan X v" + g.VERSION + "-" + now + ".json",
        href: "data:application/json;base64," + (btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))),
        target: '_blank'
      });
      p = $('.imp-exp-result', Settings.dialog);
      $.rmAll(p);
      return $.add(p, a);
    },
    "import": function() {
      return this.nextElementSibling.click();
    },
    onImport: function() {
      var file, output, reader;

      if (!(file = this.files[0])) {
        return;
      }
      output = $('.imp-exp-result');
      if (!confirm('Your current settings will be entirely overwritten, are you sure?')) {
        output.textContent = 'Import aborted.';
        return;
      }
      reader = new FileReader();
      reader.onload = function(e) {
        var data, err;

        try {
          data = JSON.parse(e.target.result);
          Settings.loadSettings(data);
          if (confirm('Import successful. Refresh now?')) {
            return window.location.reload();
          }
        } catch (_error) {
          err = _error;
          output.textContent = 'Import failed due to an error.';
          return c.error(err.stack);
        }
      };
      return reader.readAsText(file);
    },
    loadSettings: function(data) {
      var key, val, version, _ref;

      version = data.version.split('.');
      if (version[0] === '2') {
        data = Settings.convertSettings(data, {
          'Disable 4chan\'s extension': '',
          'Catalog Links': '',
          'Reply Navigation': '',
          'Show Stubs': 'Stubs',
          'Image Auto-Gif': 'Auto-GIF',
          'Expand From Current': '',
          'Unread Tab Icon': 'Unread Favicon',
          'Post in Title': 'Thread Excerpt',
          'Auto Hide QR': '',
          'Open Reply in New Tab': '',
          'Remember QR size': '',
          'Quote Inline': 'Quote Inlining',
          'Quote Preview': 'Quote Previewing',
          'Indicate OP quote': 'Mark OP Quotes',
          'Indicate Cross-thread Quotes': 'Mark Cross-thread Quotes',
          'Reply Hiding': 'Reply Hiding Buttons',
          'Thread Hiding': 'Thread Hiding Buttons',
          'uniqueid': 'uniqueID',
          'mod': 'capcode',
          'country': 'flag',
          'md5': 'MD5',
          'openEmptyQR': 'Open empty QR',
          'openQR': 'Open QR',
          'openOptions': 'Open settings',
          'close': 'Close',
          'spoiler': 'Spoiler tags',
          'code': 'Code tags',
          'submit': 'Submit QR',
          'watch': 'Watch',
          'update': 'Update',
          'unreadCountTo0': '',
          'expandAllImages': 'Expand images',
          'expandImage': 'Expand image',
          'zero': 'Front page',
          'nextPage': 'Next page',
          'previousPage': 'Previous page',
          'nextThread': 'Next thread',
          'previousThread': 'Previous thread',
          'expandThread': 'Expand thread',
          'openThreadTab': 'Open thread',
          'openThread': 'Open thread tab',
          'nextReply': 'Next reply',
          'previousReply': 'Previous reply',
          'hide': 'Hide',
          'Scrolling': 'Auto Scroll',
          'Verbose': ''
        });
        data.Conf.sauces = data.Conf.sauces.replace(/\$\d/g, function(c) {
          switch (c) {
            case '$1':
              return '%TURL';
            case '$2':
              return '%URL';
            case '$3':
              return '%MD5';
            case '$4':
              return '%board';
            default:
              return c;
          }
        });
        _ref = Config.hotkeys;
        for (key in _ref) {
          val = _ref[key];
          if (!(key in data.Conf)) {
            continue;
          }
          data.Conf[key] = data.Conf[key].replace(/ctrl|alt|meta/g, function(s) {
            return "" + (s[0].toUpperCase()) + s.slice(1);
          }).replace(/(^|.+\+)[A-Z]$/g, function(s) {
            return "Shift+" + s.slice(0, -1) + (s.slice(-1).toLowerCase());
          });
        }
        data.Conf.WatchedThreads = data.WatchedThreads;
      } else if (version[0] === '3') {
        data = Settings.convertSettings(data, {
          'Reply Hiding': 'Reply Hiding Buttons',
          'Thread Hiding': 'Thread Hiding Buttons',
          'Bottom header': 'Bottom Header',
          'Unread Tab Icon': 'Unread Favicon'
        });
      }
      return $.set(data.Conf);
    },
    convertSettings: function(data, map) {
      var newKey, prevKey;

      for (prevKey in map) {
        newKey = map[prevKey];
        if (newKey) {
          data.Conf[newKey] = data.Conf[prevKey];
        }
        delete data.Conf[prevKey];
      }
      return data;
    },
    filter: function(section) {
      var select;

      section.innerHTML = "<select name=filter><option value=guide>Guide</option><option value=name>Name</option><option value=uniqueID>Unique ID</option><option value=tripcode>Tripcode</option><option value=capcode>Capcode</option><option value=email>E-mail</option><option value=subject>Subject</option><option value=comment>Comment</option><option value=flag>Flag</option><option value=filename>Filename</option><option value=dimensions>Image dimensions</option><option value=filesize>Filesize</option><option value=MD5>Image MD5</option></select><div></div>";
      select = $('select', section);
      $.on(select, 'change', Settings.selectFilter);
      return Settings.selectFilter.call(select);
    },
    selectFilter: function() {
      var div, name, ta;

      div = this.nextElementSibling;
      if ((name = this.value) !== 'guide') {
        $.rmAll(div);
        ta = $.el('textarea', {
          name: name,
          className: 'field',
          spellcheck: false
        });
        $.get(name, Conf[name], function(item) {
          return ta.value = item[name];
        });
        $.on(ta, 'change', $.cb.value);
        $.add(div, ta);
        return;
      }
      return div.innerHTML = "  <div class=warning " + (Conf['Filter'] ? 'hidden' : '') + "><code>Filter</code> is disabled.</div><p>\nUse <a href=https://developer.mozilla.org/en/JavaScript/Guide/Regular_Expressions>regular expressions</a>, one per line.<br>\nLines starting with a <code>#</code> will be ignored.<br>\nFor example, <code>/weeaboo/i</code> will filter posts containing the string `<code>weeaboo</code>`, case-insensitive.<br>\nMD5 filtering uses exact string matching, not regular expressions.\n</p><ul>You can use these settings with each regular expression, separate them with semicolons:\n<li>\n  Per boards, separate them with commas. It is global if not specified.<br>\n  For example: <code>boards:a,jp;</code>.\n</li><li>\n  Filter OPs only along with their threads (`only`), replies only (`no`), or both (`yes`, this is default).<br>\n  For example: <code>op:only;</code>, <code>op:no;</code> or <code>op:yes;</code>.\n</li><li>\n  Overrule the `Show Stubs` setting if specified: create a stub (`yes`) or not (`no`).<br>\n  For example: <code>stub:yes;</code> or <code>stub:no;</code>.\n</li><li>\n  Highlight instead of hiding. You can specify a class name to use with a userstyle.<br>\n  For example: <code>highlight;</code> or <code>highlight:wallpaper;</code>.\n</li><li>\n  Highlighted OPs will have their threads put on top of board pages by default.<br>\n  For example: <code>top:yes;</code> or <code>top:no;</code>.\n</li></ul>";
    },
    sauce: function(section) {
      var sauce;

      section.innerHTML = "  <div class=warning " + (Conf['Sauce'] ? 'hidden' : '') + "><code>Sauce</code> is disabled.</div><div>Lines starting with a <code>#</code> will be ignored.</div><div>You can specify a display text by appending <code>;text:[text]</code> to the URL.</div><ul>These parameters will be replaced by their corresponding values:\n<li><code>%TURL</code>: Thumbnail URL.</li><li><code>%URL</code>: Full image URL.</li><li><code>%MD5</code>: MD5 hash.</li><li><code>%board</code>: Current board.</li></ul><textarea name=sauces class=field spellcheck=false></textarea>";
      sauce = $('textarea', section);
      $.get('sauces', Conf['sauces'], function(item) {
        return sauce.value = item['sauces'];
      });
      return $.on(sauce, 'change', $.cb.value);
    },
    advanced: function(section) {
      var archiver, event, input, inputs, items, name, toSelect, _i, _j, _len, _len1, _ref;

      section.innerHTML = "  <fieldset><legend>Archiver</legend>\nSelect an Archiver for this board:\n<select name=archiver></select></fieldset><fieldset><legend>Custom Board Navigation</span></legend><div><input name=boardnav class=field spellcheck=false></div><div>In the following, <code>board</code> can translate to a board ID (<code>a</code>, <code>b</code>, etc...), the current board (<code>current</code>), or the Status/Twitter link (<code>status</code>, <code>@</code>).</div><div>\n  For example:<br><code>[ toggle-all ] [current-title] [g-title / a-title / jp-title] [x / wsg / h] [t-text:\"Piracy\"]</code><br>\n  will give you<br><code>[ + ] [Technology] [Technology / Anime & Manga / Otaku Culture] [x / wsg / h] [Piracy]</code><br>\n  if you are on /g/.\n</div><div>Board link: <code>board</code></div><div>Title link: <code>board-title</code></div><div>Board link (Replace with title when on that board): <code>board-replace</code></div><div>Full text link: <code>board-full</code></div><div>Custom text link: <code>board-text:\"VIP Board\"</code></div><div>Index-only link: <code>board-index</code></div><div>Catalog-only link: <code>board-catalog</code></div><div>Combinations are possible: <code>board-index-text:\"VIP Index\"</code></div><div>Full board list toggle: <code>toggle-all</code></div></fieldset><fieldset><legend>Time Formatting <span class=warning " + (Conf['Time Formatting'] ? 'hidden' : '') + ">is disabled.</span></legend><div><input name=time class=field spellcheck=false>: <span class=time-preview></span></div><div>Supported <a href=//en.wikipedia.org/wiki/Date_%28Unix%29#Formatting>format specifiers</a>:</div><div>Day: <code>%a</code>, <code>%A</code>, <code>%d</code>, <code>%e</code></div><div>Month: <code>%m</code>, <code>%b</code>, <code>%B</code></div><div>Year: <code>%y</code></div><div>Hour: <code>%k</code>, <code>%H</code>, <code>%l</code>, <code>%I</code>, <code>%p</code>, <code>%P</code></div><div>Minute: <code>%M</code></div><div>Second: <code>%S</code></div></fieldset><fieldset><legend>Quote Backlinks formatting <span class=warning " + (Conf['Quote Backlinks'] ? 'hidden' : '') + ">is disabled.</span></legend><div><input name=backlink class=field spellcheck=false>: <span class=backlink-preview></span></div></fieldset><fieldset><legend>File Info Formatting <span class=warning " + (Conf['File Info Formatting'] ? 'hidden' : '') + ">is disabled.</span></legend><div><input name=fileInfo class=field spellcheck=false>: <span class='fileText file-info-preview'></span></div><div>Link: <code>%l</code> (truncated), <code>%L</code> (untruncated), <code>%T</code> (Unix timestamp)</div><div>Original file name: <code>%n</code> (truncated), <code>%N</code> (untruncated), <code>%t</code> (Unix timestamp)</div><div>Spoiler indicator: <code>%p</code></div><div>Size: <code>%B</code> (Bytes), <code>%K</code> (KB), <code>%M</code> (MB), <code>%s</code> (4chan default)</div><div>Resolution: <code>%r</code> (Displays 'PDF' for PDF files)</div></fieldset><fieldset><legend>Unread Favicon <span class=warning " + (Conf['Unread Favicon'] ? 'hidden' : '') + ">is disabled.</span></legend><select name=favicon><option value=ferongr>ferongr</option><option value=xat->xat-</option><option value=Mayhem>Mayhem</option><option value=Original>Original</option></select><span class=favicon-preview></span></fieldset><fieldset><legend>Emoji <span class=warning " + (Conf['Emoji'] ? 'hidden' : '') + ">is disabled.</span></legend><div>\n  Sage Icon: <select name=sageEmoji><option value=\"4chan SS\">4chan SS</option><option value=\"appchan\">appchan</option></select><span class=sage-icon-preview></span></div><div>\n  Position: <select name=emojiPos><option value=\"before\">Before</option><option value=\"after\">After</option></select></div></fieldset><fieldset><legend>Thread Updater <span class=warning " + (Conf['Thread Updater'] ? 'hidden' : '') + ">is disabled.</span></legend><div>\n  Interval: <input type=number name=Interval class=field min=1 value=" + Conf['Interval'] + "></div></fieldset><fieldset><legend><label><input type=checkbox name='Custom CSS' " + (Conf['Custom CSS'] ? 'checked' : '') + "> Custom CSS</label></legend><button id=apply-css>Apply CSS</button><textarea name=usercss class=field spellcheck=false " + (Conf['Custom CSS'] ? '' : 'disabled') + "></textarea></fieldset>";
      items = {};
      inputs = {};
      _ref = ['boardnav', 'time', 'backlink', 'fileInfo', 'favicon', 'sageEmoji', 'emojiPos', 'usercss'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        input = $("[name=" + name + "]", section);
        items[name] = Conf[name];
        inputs[name] = input;
        event = ['favicon', 'usercss', 'sageEmoji', 'emojiPos'].contains(name) ? 'change' : 'input';
        $.on(input, event, $.cb.value);
      }
      archiver = $('select[name=archiver]', section);
      toSelect = Redirect.select(g.BOARD.ID);
      if (!toSelect[0]) {
        toSelect = ['No Archive Available'];
      }
      for (_j = 0, _len1 = toSelect.length; _j < _len1; _j++) {
        name = toSelect[_j];
        $.add(archiver, $.el('option', {
          textContent: name
        }));
      }
      if (toSelect[1]) {
        Conf['archivers'][g.BOARD];
        archiver.value = Conf['archivers'][g.BOARD] || toSelect[0];
        $.on(archiver, 'change', function() {
          Conf['archivers'][g.BOARD] = this.value;
          return $.set('archivers', Conf.archivers);
        });
      }
      $.get(items, function(items) {
        var key, val;

        for (key in items) {
          val = items[key];
          if (['usercss', 'emojiPos', 'archiver'].contains(key)) {
            continue;
          }
          input = inputs[key];
          input.value = val;
          $.on(input, event, Settings[key]);
          Settings[key].call(input);
        }
      });
      $.on($('input[name=Interval]', section), 'change', ThreadUpdater.cb.interval);
      $.on($('input[name="Custom CSS"]', section), 'change', Settings.togglecss);
      return $.on($.id('apply-css'), 'click', Settings.usercss);
    },
    boardnav: function() {
      return Header.generateBoardList(this.value);
    },
    time: function() {
      var funk;

      funk = Time.createFunc(this.value);
      return this.nextElementSibling.textContent = funk(Time, new Date());
    },
    backlink: function() {
      return this.nextElementSibling.textContent = this.value.replace(/%id/, '123456789');
    },
    fileInfo: function() {
      var data, funk;

      data = {
        isReply: true,
        file: {
          URL: '//images.4chan.org/g/src/1334437723720.jpg',
          name: 'd9bb2efc98dd0df141a94399ff5880b7.jpg',
          size: '276 KB',
          sizeInBytes: 276 * 1024,
          dimensions: '1280x720',
          isImage: true,
          isSpoiler: true
        }
      };
      funk = FileInfo.createFunc(this.value);
      return this.nextElementSibling.innerHTML = funk(FileInfo, data);
    },
    favicon: function() {
      Favicon["switch"]();
      if (g.VIEW === 'thread' && Conf['Unread Favicon']) {
        Unread.update();
      }
      return this.nextElementSibling.innerHTML = "<img src=" + Favicon["default"] + ">\n<img src=" + Favicon.unreadSFW + ">\n<img src=" + Favicon.unreadNSFW + ">\n<img src=" + Favicon.unreadDead + ">";
    },
    sageEmoji: function() {
      return this.nextElementSibling.innerHTML = "<img src=data:image/png;base64," + Emoji.sage[this.value] + ">";
    },
    togglecss: function() {
      if ($('textarea[name=usercss]', $.x('ancestor::fieldset[1]', this)).disabled = !this.checked) {
        CustomCSS.rmStyle();
      } else {
        CustomCSS.addStyle();
      }
      return $.cb.checked.call(this);
    },
    usercss: function() {
      return CustomCSS.update();
    },
    keybinds: function(section) {
      var arr, input, inputs, items, key, tbody, tr, _ref;

      section.innerHTML = "<div class=warning " + (Conf['Keybinds'] ? 'hidden' : '') + "><code>Keybinds</code> are disabled.</div><div>Allowed keys: <kbd>a-z</kbd>, <kbd>0-9</kbd>, <kbd>Ctrl</kbd>, <kbd>Shift</kbd>, <kbd>Alt</kbd>, <kbd>Meta</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>, <kbd>Up</kbd>, <kbd>Down</kbd>, <kbd>Right</kbd>, <kbd>Left</kbd>.</div><div>Press <kbd>Backspace</kbd> to disable a keybind.</div><table><tbody><tr><th>Actions</th><th>Keybinds</th></tr></tbody></table>";
      tbody = $('tbody', section);
      items = {};
      inputs = {};
      _ref = Config.hotkeys;
      for (key in _ref) {
        arr = _ref[key];
        tr = $.el('tr', {
          innerHTML: "<td>" + arr[1] + "</td><td><input class=field></td>"
        });
        input = $('input', tr);
        input.name = key;
        input.spellcheck = false;
        items[key] = Conf[key];
        inputs[key] = input;
        $.on(input, 'keydown', Settings.keybind);
        $.add(tbody, tr);
      }
      return $.get(items, function(items) {
        var val;

        for (key in items) {
          val = items[key];
          inputs[key].value = val;
        }
      });
    },
    keybind: function(e) {
      var key;

      if (e.keyCode === 9) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if ((key = Keybinds.keyCode(e)) == null) {
        return;
      }
      this.value = key;
      return $.cb.value.call(this);
    }
  };

  Main = {
    init: function(items) {
      var db, flatten, _i, _len;

      flatten = function(parent, obj) {
        var key, val;

        if (obj instanceof Array) {
          Conf[parent] = obj[0];
        } else if (typeof obj === 'object') {
          for (key in obj) {
            val = obj[key];
            flatten(key, val);
          }
        } else {
          Conf[parent] = obj;
        }
      };
      flatten(null, Config);
      for (_i = 0, _len = DataBoards.length; _i < _len; _i++) {
        db = DataBoards[_i];
        Conf[db] = {
          boards: {}
        };
      }
      Conf['archivers'] = {};
      $.get(Conf, Main.initFeatures);
      return $.on(d, '4chanMainInit', Main.initStyle);
    },
    initFeatures: function(items) {
      var init, pathname;

      Conf = items;
      pathname = location.pathname.split('/');
      g.BOARD = new Board(pathname[1]);
      g.VIEW = (function() {
        switch (pathname[2]) {
          case 'res':
            return 'thread';
          case 'catalog':
            return 'catalog';
          default:
            return 'index';
        }
      })();
      if (g.VIEW === 'thread') {
        g.THREADID = +pathname[3];
      }
      switch (location.hostname) {
        case 'api.4chan.org':
          return;
        case 'sys.4chan.org':
          Report.init();
          return;
        case 'images.4chan.org':
          $.ready(function() {
            var url;

            if (Conf['404 Redirect'] && d.title === '4chan - 404 Not Found') {
              url = Redirect.image(pathname[1], pathname[3]);
              if (url) {
                return location.href = url;
              }
            }
          });
          return;
      }
      init = function(features) {
        var err, module, name;

        for (name in features) {
          module = features[name];
          try {
            module.init();
          } catch (_error) {
            err = _error;
            Main.handleErrors({
              message: "\"" + name + "\" initialization crashed.",
              error: err
            });
          }
        }
      };
      init({
        'Polyfill': Polyfill,
        'Redirection': Redirect,
        'Header': Header,
        'Catalog Links': CatalogLinks,
        'Settings': Settings,
        'Announcement Hiding': PSAHiding,
        'Fourchan thingies': Fourchan,
        'Emoji': Emoji,
        'Color User IDs': IDColor,
        'Remove Spoilers': RemoveSpoilers,
        'Custom CSS': CustomCSS,
        'Linkify': Linkify,
        'Resurrect Quotes': Quotify,
        'Filter': Filter,
        'Thread Hiding Buttons': ThreadHiding,
        'Reply Hiding Buttons': PostHiding,
        'Recursive': Recursive,
        'Strike-through Quotes': QuoteStrikeThrough,
        'Quick Reply': QR,
        'Menu': Menu,
        'Report Link': ReportLink,
        'Thread Hiding (Menu)': ThreadHiding.menu,
        'Reply Hiding (Menu)': PostHiding.menu,
        'Delete Link': DeleteLink,
        'Filter (Menu)': Filter.menu,
        'Download Link': DownloadLink,
        'Archive Link': ArchiveLink,
        'Quote Inlining': QuoteInline,
        'Quote Previewing': QuotePreview,
        'Quote Backlinks': QuoteBacklink,
        'Mark Quotes of You': QuoteYou,
        'Mark OP Quotes': QuoteOP,
        'Mark Cross-thread Quotes': QuoteCT,
        'Anonymize': Anonymize,
        'Time Formatting': Time,
        'Relative Post Dates': RelativeDates,
        'File Info Formatting': FileInfo,
        'Fappe Tyme': FappeTyme,
        'Sauce': Sauce,
        'Image Expansion': ImageExpand,
        'Image Expansion (Menu)': ImageExpand.menu,
        'Reveal Spoilers': RevealSpoilers,
        'Image Replace': ImageReplace,
        'Image Hover': ImageHover,
        'Comment Expansion': ExpandComment,
        'Thread Expansion': ExpandThread,
        'Thread Excerpt': ThreadExcerpt,
        'Favicon': Favicon,
        'Unread': Unread,
        'Quote Threading': QuoteThreading,
        'Thread Stats': ThreadStats,
        'Thread Updater': ThreadUpdater,
        'Thread Watcher': ThreadWatcher,
        'Index Navigation': Nav,
        'Keybinds': Keybinds
      });
      $.on(d, 'AddCallback', Main.addCallback);
      return $.ready(Main.initReady);
    },
    initStyle: function() {
      var MutationObserver, mainStyleSheet, observer, setStyle, style, styleSheets, _ref;

      $.off(d, '4chanMainInit', Main.initStyle);
      if (!Main.isThisPageLegit()) {
        return;
      }
      if ((_ref = $('link[href*=mobile]', d.head)) != null) {
        _ref.disabled = true;
      }
      $.addClass(doc, 'gecko');
      $.addClass(doc, 'fourchan-x');
      $.addStyle(Main.css);
      if (g.VIEW === 'catalog') {
        $.addClass(doc, $.id('base-css').href.match(/catalog_(\w+)/)[1].replace('_new', '').replace(/_+/g, '-'));
        return;
      }
      style = 'yotsuba-b';
      mainStyleSheet = $('link[title=switch]', d.head);
      styleSheets = $$('link[rel="alternate stylesheet"]', d.head);
      setStyle = function() {
        var styleSheet, _i, _len;

        $.rmClass(doc, style);
        for (_i = 0, _len = styleSheets.length; _i < _len; _i++) {
          styleSheet = styleSheets[_i];
          if (styleSheet.href === mainStyleSheet.href) {
            style = styleSheet.title.toLowerCase().replace('new', '').trim().replace(/\s+/g, '-');
            break;
          }
        }
        return $.addClass(doc, style);
      };
      setStyle();
      if (!mainStyleSheet) {
        return;
      }
      if (MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.OMutationObserver) {
        observer = new MutationObserver(setStyle);
        return observer.observe(mainStyleSheet, {
          attributes: true,
          attributeFilter: ['href']
        });
      } else {
        return $.on(mainStyleSheet, 'DOMAttrModified', setStyle);
      }
    },
    initReady: function() {
      var board, boardChild, err, errors, href, posts, thread, threadChild, threads, _i, _j, _len, _len1, _ref, _ref1;

      if (d.title === '4chan - 404 Not Found') {
        if (Conf['404 Redirect'] && g.VIEW === 'thread') {
          href = Redirect.to({
            boardID: g.BOARD.ID,
            threadID: g.THREADID,
            postID: +location.hash.match(/\d+/)
          });
          location.href = href || ("/" + g.BOARD + "/");
        }
        return;
      }
      if (!$.hasClass(doc, 'fourchan-x')) {
        Main.initStyle();
      }
      if (board = $('.board')) {
        threads = [];
        posts = [];
        _ref = board.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          boardChild = _ref[_i];
          if (!$.hasClass(boardChild, 'thread')) {
            continue;
          }
          thread = new Thread(boardChild.id.slice(1), g.BOARD);
          threads.push(thread);
          _ref1 = boardChild.children;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            threadChild = _ref1[_j];
            if (!$.hasClass(threadChild, 'postContainer')) {
              continue;
            }
            try {
              posts.push(new Post(threadChild, thread, g.BOARD));
            } catch (_error) {
              err = _error;
              if (!errors) {
                errors = [];
              }
              errors.push({
                message: "Parsing of Post No." + (threadChild.id.match(/\d+/)) + " failed. Post will be skipped.",
                error: err
              });
            }
          }
        }
        if (errors) {
          Main.handleErrors(errors);
        }
        Main.callbackNodes(Thread, threads);
        Main.callbackNodesDB(Post, posts, function() {
          $.event('4chanXInitFinished');
          return Main.checkUpdate();
        });
        return;
      }
      $.event('4chanXInitFinished');
      return Main.checkUpdate();
    },
    callbackNodes: function(klass, nodes) {
      var callback, err, errors, i, len, node, _i, _j, _len, _ref;

      len = nodes.length;
      _ref = klass.prototype.callbacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        for (i = _j = 0; 0 <= len ? _j < len : _j > len; i = 0 <= len ? ++_j : --_j) {
          node = nodes[i];
          try {
            callback.cb.call(node);
          } catch (_error) {
            err = _error;
            if (!errors) {
              errors = [];
            }
            errors.push({
              message: "\"" + callback.name + "\" crashed on " + klass.name + " No." + node + " (/" + node.board + "/).",
              error: err
            });
          }
        }
      }
      if (errors) {
        return Main.handleErrors(errors);
      }
    },
    callbackNodesDB: function(klass, nodes, cb) {
      var errors, func, i, len, node, queue, softTask;

      queue = [];
      softTask = function() {
        var args, func, task;

        task = queue.shift();
        func = task[0];
        args = Array.prototype.slice.call(task, 1);
        func.apply(func, args);
        if (!queue.length) {
          return;
        }
        if ((queue.length % 7) === 0) {
          return setTimeout(softTask, 0);
        } else {
          return softTask();
        }
      };
      len = nodes.length;
      i = 0;
      errors = null;
      func = function(node, i) {
        var callback, err, _i, _len, _ref;

        _ref = klass.prototype.callbacks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          callback = _ref[_i];
          try {
            callback.cb.call(node);
          } catch (_error) {
            err = _error;
            if (!errors) {
              errors = [];
            }
            errors.push({
              message: "\"" + callback.name + "\" crashed on " + klass.name + " No." + node + " (/" + node.board + "/).",
              error: err
            });
          }
        }
        if (i === len) {
          if (errors) {
            Main.handleErrors(errors);
          }
          if (cb) {
            return cb();
          }
        }
      };
      while (i < len) {
        node = nodes[i];
        queue.push([func, node, ++i]);
      }
      return softTask();
    },
    addCallback: function(e) {
      var Klass, obj;

      obj = e.detail;
      if (typeof obj.callback.name !== 'string') {
        throw new Error("Invalid callback name: " + obj.callback.name);
      }
      switch (obj.type) {
        case 'Post':
          Klass = Post;
          break;
        case 'Thread':
          Klass = Thread;
          break;
        default:
          return;
      }
      obj.callback.isAddon = true;
      return Klass.prototype.callbacks.push(obj.callback);
    },
    checkUpdate: function() {
      var freq, items, now;

      if (!(Conf['Check for Updates'] && Main.isThisPageLegit())) {
        return;
      }
      now = Date.now();
      freq = 7 * $.DAY;
      items = {
        lastupdate: 0,
        lastchecked: 0
      };
      return $.get(items, function(items) {
        if (items.lastupdate > now - freq || items.lastchecked > now - $.DAY) {
          return;
        }
        return $.ajax('http://seaweedchan.github.io/4chan-x/version', {
          onload: function() {
            var el, version;

            if (this.status !== 200) {
              return;
            }
            version = this.response;
            if (!/^\d\.\d+\.\d+$/.test(version)) {
              return;
            }
            if (g.VERSION === version) {
              $.set('lastupdate', now);
              return;
            }
            $.set('lastchecked', now);
            el = $.el('span', {
              innerHTML: "Update: 4chan X v" + version + " is out, get it <a href=http://seaweedchan.github.io/4chan-x/ target=_blank>here</a>."
            });
            return new Notification('info', el, 120);
          }
        });
      });
    },
    handleErrors: function(errors) {
      var div, error, logs, _i, _len;

      if (!(errors instanceof Array)) {
        error = errors;
      } else if (errors.length === 1) {
        error = errors[0];
      }
      if (error) {
        new Notification('error', Main.parseError(error), 15);
        return;
      }
      div = $.el('div', {
        innerHTML: "" + errors.length + " errors occurred. [<a href=javascript:;>show</a>]"
      });
      $.on(div.lastElementChild, 'click', function() {
        var _ref;

        return _ref = this.textContent === 'show' ? ['hide', false] : ['show', true], this.textContent = _ref[0], logs.hidden = _ref[1], _ref;
      });
      logs = $.el('div', {
        hidden: true
      });
      for (_i = 0, _len = errors.length; _i < _len; _i++) {
        error = errors[_i];
        $.add(logs, Main.parseError(error));
      }
      return new Notification('error', [div, logs], 30);
    },
    parseError: function(data) {
      var error, message;

      Main.logError(data);
      message = $.el('div', {
        textContent: data.message
      });
      error = $.el('div', {
        textContent: data.error
      });
      return [message, error];
    },
    errors: [],
    logError: function(data) {
      if (!Main.errors.length) {
        $.on(window, 'unload', Main.postErrors);
      }
      c.error(data.message, data.error.stack);
      return Main.errors.push(data);
    },
    postErrors: function() {
      var errors;

      errors = Main.errors.map(function(d) {
        return d.message + ' ' + d.error.stack;
      });
      return $.ajax('http://seaweedchan.github.io/4chan-x/errors', {}, {
        sync: true,
        form: $.formData({
          n: "4chan X v" + g.VERSION,
          t: 'userscript',
          ua: window.navigator.userAgent,
          url: window.location.href,
          e: errors.join('\n')
        })
      });
    },
    isThisPageLegit: function() {
      var _ref;

      if (!('thisPageIsLegit' in Main)) {
        Main.thisPageIsLegit = location.hostname === 'boards.4chan.org' && !$('link[href*="favicon-status.ico"]', d.head) && ((_ref = d.title) !== '4chan - Temporarily Offline' && _ref !== '4chan - Error');
      }
      return Main.thisPageIsLegit;
    },
    css: "/* General */\n.dialog {\nbox-shadow: 0 1px 2px rgba(0, 0, 0, .15);\nborder: 1px solid;\ndisplay: block;\npadding: 0;\n}\n.captcha-img,\n.field {\nbackground-color: #FFF;\nborder: 1px solid #CCC;\n-moz-box-sizing: border-box;\nbox-sizing: border-box;\ncolor: #333;\nfont: 13px sans-serif;\noutline: none;\ntransition: color .25s, border-color .25s;\ntransition: color .25s, border-color .25s;\n}\n.field::-moz-placeholder,\n.field:hover::-moz-placeholder {\ncolor: #AAA !important;\nfont-size: 13px !important;\nopacity: 1.0 !important;\n}\n.captch-img:hover,\n.field:hover {\nborder-color: #999;\n}\n.field:hover, .field:focus {\ncolor: #000;\n}\n.field[disabled] {\nbackground-color: #F2F2F2;\ncolor: #888;\n}\n.move {\ncursor: move;\noverflow: hidden;\n}\nlabel, .favicon {\ncursor: pointer;\n}\na[href=\"javascript:;\"] {\ntext-decoration: none;\n}\n.warning {\ncolor: red;\n}\n#boardNavDesktop {\ndisplay: none !important;\n}\n\n/* 4chan style fixes */\n.opContainer, .op {\ndisplay: block !important;\noverflow: visible !important;\n}\n[hidden] {\ndisplay: none !important;\n}\n\n/* fixed, z-index */\n#overlay,\n#fourchanx-settings,\n#qp, #ihover,\n#navlinks, .fixed #header-bar,\n#watcher,\n:root.float #updater,\n:root.float #thread-stats,\n#qr {\nposition: fixed;\n}\n#fourchanx-settings {\nz-index: 999;\n}\n#overlay {\nz-index: 900;\n}\n#notifications {\nz-index: 70;\n}\n#qp, #ihover {\nz-index: 60;\n}\n#menu {\nz-index: 50;\n}\n#navlinks, #updater, #thread-stats {\nz-index: 40;\n}\n.fixed #header-bar.autohide {\nz-index: 35;\n}\n#qr {\nz-index: 30;\n}\n#watcher {\nz-index: 20;\n}\n.fixed #header-bar {\nz-index: 10;\n}\n/* Header */\n.fixed.top body {\npadding-top: 2em;\n}\n.fixed.bottom body {\npadding-bottom: 2em;\n}\n.fixed #header-bar {\nright: 0;\nleft: 0;\npadding: 3px 4px 4px;\n}\n.fixed.top #header-bar {\ntop: 0;\n}\n.fixed.bottom #header-bar {\nbottom: 0;\n}\n#header-bar {\nborder-width: 0;\ntransition: all .1s .05s ease-in-out;\n}\n.fixed.top #header-bar {\nborder-bottom-width: 1px;\n}\n.fixed.bottom #header-bar {\nbox-shadow: 0 -1px 2px rgba(0, 0, 0, .15);\nborder-top-width: 1px;\n}\n.fixed.bottom #header-bar .menu-button i {\nborder-top: none;\nborder-bottom: 6px solid;\n}\n#board-list {\ntext-align: center;\n}\n.fixed #header-bar.autohide:not(:hover) {\nbox-shadow: none;\ntransition: all .8s .6s cubic-bezier(.55, .055, .675, .19);\n}\n.fixed.top #header-bar.autohide:not(:hover) {\nmargin-bottom: -1em;\n-webkit-transform: translateY(-100%);\ntransform: translateY(-100%);\n}\n.fixed.bottom #header-bar.autohide:not(:hover) {\n-webkit-transform: translateY(100%);\ntransform: translateY(100%);\n}\n#scroll-marker {\nleft: 0;\nright: 0;\nheight: 10px;\nposition: absolute;\n}\n#header-bar #scroll-marker {\ndisplay: none;\n}\n.fixed #header-bar #scroll-marker {\ndisplay: block;\n}\n.fixed.top #header-bar #scroll-marker {\ntop: 100%;\n}\n.fixed.bottom #header-bar #scroll-marker {\nbottom: 100%;\n}\n#header-bar a:not(.entry):not(.close) {\ntext-decoration: none;\npadding: 1px;\n}\n#header-bar input {\nmargin: 0;\nvertical-align: bottom;\n}\n#shortcuts:empty {\ndisplay: none;\n}\n.brackets-wrap::before {\ncontent: \"\\00a0[\";\n}\n.brackets-wrap::after {\ncontent: \"]\\00a0\";\n}\n.disabled,\n.expand-all-shortcut {\nopacity: .45;\n}\n#shortcuts {\nfloat: right;\n}\n#navbotright,\n#navtopright {\ndisplay: none;\n}\n#toggleMsgBtn {\ndisplay: none !important;\n}\n\n/* Notifications */\n#notifications {\nposition: fixed;\ntop: 0;\nheight: 0;\ntext-align: center;\nright: 0;\nleft: 0;\ntransition: all .8s .6s cubic-bezier(.55, .055, .675, .19);\n}\n.fixed.top #header-bar #notifications {\nposition: absolute;\ntop: 100%;\n}\n.notification {\ncolor: #FFF;\nfont-weight: 700;\ntext-shadow: 0 1px 2px rgba(0, 0, 0, .5);\nbox-shadow: 0 1px 2px rgba(0, 0, 0, .15);\nborder-radius: 2px;\nmargin: 1px auto;\nwidth: 500px;\nmax-width: 100%;\nposition: relative;\ntransition: all .25s ease-in-out;\n}\n.notification.error {\nbackground-color: hsla(0, 100%, 38%, .9);\n}\n.notification.warning {\nbackground-color: hsla(36, 100%, 38%, .9);\n}\n.notification.info {\nbackground-color: hsla(200, 100%, 38%, .9);\n}\n.notification.success {\nbackground-color: hsla(104, 100%, 38%, .9);\n}\n.notification a {\ncolor: white;\n}\n.notification > .close {\npadding: 6px;\ntop: 0;\nright: 5px;\nposition: absolute;\n}\n.message {\n-moz-box-sizing: border-box;\nbox-sizing: border-box;\npadding: 6px 20px;\nmax-height: 200px;\nwidth: 100%;\noverflow: auto;\n}\n\n/* Settings */\n:root.fourchan-x body {\n-moz-box-sizing: border-box;\nbox-sizing: border-box;\n}\n#overlay {\nbackground-color: rgba(0, 0, 0, .5);\ntop: 0;\nleft: 0;\nheight: 100%;\nwidth: 100%;\n}\n#fourchanx-settings {\n-moz-box-sizing: border-box;\nbox-sizing: border-box;\nbox-shadow: 0 0 15px rgba(0, 0, 0, .15);\nheight: 600px;\nmin-height: 0;\nmax-height: 100%;\nwidth: 900px;\nmin-width: 0;\nmax-width: 100%;\nmargin: auto;\npadding: 3px;\ntop: 50%;\nleft: 50%;\n-moz-transform: translate(-50%, -50%);\n-webkit-transform: translate(-50%, -50%);\n-o-transform: translate(-50%, -50%);\ntransform: translate(-50%, -50%);\n}\n#fourchanx-settings > nav {\npadding: 2px 2px 0;\nheight: 15px;\n}\n#fourchanx-settings > nav a {\ntext-decoration: underline;\n}\n#fourchanx-settings > nav a.close {\ntext-decoration: none;\npadding: 2px;\n}\n.section-container {\noverflow: auto;\nposition: absolute;\ntop: 2.1em;\nright: 5px;\nbottom: 5px;\nleft: 5px;\npadding-right: 5px;\n}\n.sections-list {\npadding: 0 3px;\nfloat: left;\n}\n.credits {\nfloat: right;\n}\n.tab-selected {\nfont-weight: 700;\n}\n.section-sauce ul,\n.section-advanced ul {\nlist-style: none;\nmargin: 0;\npadding: 8px;\n}\n.section-sauce li,\n.section-advanced li {\npadding-left: 4px;\n}\n.section-main label {\ntext-decoration: underline;\n}\n.section-filter ul {\npadding: 0;\n}\n.section-filter li {\nmargin: 10px 40px;\n}\n.section-filter textarea {\nheight: 500px;\n}\n.section-sauce textarea {\nheight: 350px;\n}\n.section-advanced .field[name=\"boardnav\"] {\nwidth: 100%;\n}\n.section-advanced textarea {\nheight: 150px;\n}\n#fourchanx-settings fieldset {\nborder: 1px solid;\nborder-radius: 3px;\n}\n#fourchanx-settings legend {\nfont-weight: 700;\n}\n#fourchanx-settings textarea {\nfont-family: monospace;\nmin-width: 100%;\nmax-width: 100%;\n}\n#fourchanx-settings code {\ncolor: #000;\nbackground-color: #FFF;\npadding: 0 2px;\n}\n.unscroll {\noverflow: hidden;\n}\n\n/* Announcement Hiding */\n:root.hide-announcement #globalMessage {\ndisplay: none;\n}\na.hide-announcement {\nfloat: left;\n}\n\n/* Unread */\n#unread-line {\nmargin: 0;\nborder-color: rgb(255,0,0);\n}\n\n/* Thread Updater */\n#updater {\nbackground: none;\nborder: none;\nbox-shadow: none;\n}\n#updater > .move {\npadding: 5px 3px 0px;\nmargin-bottom: -3px;\n}\n#updater > div:last-child {\ntext-align: center;\n}\n#updater input[type=number] {\nwidth: 4em;\n}\n:root.float #updater {\npadding: 0px 3px;\n}\n.new {\ncolor: limegreen;\n}\n#update-status.warning, #update-status.new {\nmargin-right: 5px;\n}\n#update-timer {\ncursor: pointer;\n}\n\n/* Thread Watcher */\n#watcher {\npadding-bottom: 3px;\noverflow: hidden;\nwhite-space: nowrap;\n}\n#watcher:not(:hover) {\nmax-height: 220px;\n}\n#watcher > .move {\npadding-top: 3px;\n}\n#watcher > div {\nmax-width: 200px;\noverflow: hidden;\npadding-left: 3px;\npadding-right: 3px;\ntext-overflow: ellipsis;\n}\n#watcher a {\ntext-decoration: none;\n}\n\n/* Thread Stats */\n#thread-stats {\nbackground: none;\nborder: none;\nbox-shadow: none;\n}\n:root.float #post-count, :root.float #file-count {\npointer-events: none;\n}\n:root.float #thread-stats {\npadding: 0px 3px;\n}\n\n/* Quote */\n.deadlink {\ntext-decoration: none !important;\n}\n.backlink.deadlink:not(.forwardlink), .quotelink.deadlink:not(.forwardlink) {\ntext-decoration: underline !important;\n}\n.inlined {\nopacity: .5;\n}\n#qp input, .forwarded {\ndisplay: none;\n}\n.quotelink.forwardlink,\n.backlink.forwardlink {\ntext-decoration: none;\nborder-bottom: 1px dashed;\n}\n.filtered {\ntext-decoration: underline line-through;\n}\n.inline {\nborder: 1px solid;\ndisplay: table;\nmargin: 2px 0;\n}\n.inline .post {\nborder: 0 !important;\nbackground-color: transparent !important;\ndisplay: table !important;\nmargin: 0 !important;\npadding: 1px 2px !important;\n}\n#qp > .opContainer::after {\ncontent: '';\nclear: both;\ndisplay: table;\n}\n#qp .post {\nborder: none;\nmargin: 0;\npadding: 2px 2px 5px;\n}\n#qp img {\nmax-height: 300px;\nmax-width: 500px;\nmax-height: 80vh;\nmax-width: 50vw;\n}\n.qphl {\noutline: 2px solid rgba(216, 94, 49, .7);\n}\n.highlight-own .yourPost>.reply {\nborder-left: 2px solid rgba(221,0,0,.5);\n}\n/* Quote Threading */\n.threadContainer {\nmargin-left: 20px;\nborder-left: 1px solid rgba(128,128,128,.3);\n}\n.threadOP {\nclear: both;\n} \n\n/* File */\n.fileText:hover .fntrunc,\n.fileText:not(:hover) .fnfull,\n.expanded-image > .post > .file > .fileThumb > img[data-md5],\n:not(.expanded-image) > .post > .file > .fileThumb > .full-image {\ndisplay: none;\n}\n.expanding {\nopacity: .5;\n}\n.expanded-image {\nclear: both;\n}\n.expanded-image > .op > .file::after {\ncontent: '';\nclear: both;\ndisplay: table;\n}\n:root.fit-width .full-image {\nmax-width: 100%;\n}\n:root.gecko.fit-width .full-image,\n:root.presto.fit-width .full-image {\nwidth: 100%;\n}\n#ihover {\n-moz-box-sizing: border-box;\nbox-sizing: border-box;\nmax-height: 100%;\nmax-width: 75%;\npadding-bottom: 16px;\n}\n.fappeTyme  .thread > .noFile,\n.fappeTyme .threadContainer > .noFile {\ndisplay: none;\n}\n\n/* Index/Reply Navigation */\n#navlinks {\nfont-size: 16px;\ntop: 25px;\nright: 10px;\n}\n\n/* Filter */\n.opContainer.filter-highlight {\nbox-shadow: inset 5px 0 rgba(255, 0, 0, .5);\n}\n.filter-highlight > .reply {\nbox-shadow: -5px 0 rgba(255, 0, 0, .5);\n}\n\n/* Thread & Reply Hiding */\n.hide-thread-button,\n.hide-reply-button {\nfloat: left;\nmargin-right: 2px;\n}\n.stub ~ .sideArrows,\n.stub ~ .hide-reply-button,\n.stub ~ .post {\ndisplay: none !important;\n}\n.stub input {\ndisplay: inline-block;\n}\n\n/* QR */\n:root.hide-original-post-form #postForm,\n:root.hide-original-post-form .postingMode,\n:root.hide-original-post-form #togglePostForm,\n#qr.autohide:not(.has-focus):not(:hover) > form,\n.postingMode ~ #qr select,\n#file-n-submit:not(.has-file) #qr-filerm {\ndisplay: none;\n}\n#qr select, #dump-button, .remove, .captcha-img {\ncursor: pointer;\n}\n#qr {\nz-index: 20;\nposition: fixed;\npadding: 1px;\nborder: 1px solid transparent;\nmin-width: 248px;\nborder-radius: 3px 3px 0 0;\n}\n#qrtab {\nborder-radius: 3px 3px 0 0;\n}\n#qrtab {\nmargin-bottom: 1px;\n}\n#qr .close {\nfloat: right;\npadding: 0 3px;\n}\n#qr .warning {\nmin-height: 1.6em;\nvertical-align: middle;\npadding: 0 1px;\nborder-width: 1px;\nborder-style: solid;\n}\n.qr-link {\ntext-align: center;\n}\n.persona {\nwidth: 248px;\nmax-width: 100%;\nmin-width: 100%;\n}\n#dump-button {\nbackground: linear-gradient(#EEE, #CCC);\nborder: 1px solid #CCC; \nwidth: 10%;\nmargin: 0;\nfont: 13px sans-serif;\npadding: 1px 0px 2px;\n}\n.persona .field:not(#dump) {\nwidth: 95px;\nmin-width: 30%;\nmax-width: 30%;\n}\n#qr textarea.field {\nheight: 14.8em;\nmin-height: 9em;\n}\n#qr.has-captcha textarea.field {\nheight: 9em;\n}\ninput.field.tripped:not(:hover):not(:focus) {\ncolor: transparent !important;  text-shadow: none !important;\n}\n#qr textarea {\nresize: both;\n}\n.captcha-img {\nmargin: 0px;\ntext-align: center;\nbackground-image: #fff;\nfont-size: 0px;\nmin-height: 59px;\nmin-width: 302px;\n}\n.captcha-input {\nwidth: 100%;\nmargin: 1px 0 0;\n}\n.field {\n-moz-box-sizing: border-box;\nmargin: 0px;\npadding: 2px 4px 3px;\n}\n#qr textarea {\nmin-width: 100%;\n}\n#qr [type='submit'] {\nwidth: 25%;\nvertical-align: top;\n}\n/* Fake File Input */\n#qr-filename,\n.has-file #qr-no-file {\ndisplay: none;\n}\n#qr-no-file,\n.has-file #qr-filename {\ndisplay: block;\npadding: 0px 4px;\nmargin-bottom: 2px;\noverflow: hidden;\ntext-overflow: ellipsis;\n}\n#qr-no-file {\ncolor: #AAA;\n}\n#qr-filename-container {\n-moz-box-sizing: border-box;\ndisplay: inline-block;\nposition: relative;\nwidth: 100px;\nmin-width: 74.6%;\nmax-width: 74.6%;\nmargin-right: 0.4%;\nmargin-top: 1px;\noverflow: hidden;\npadding: 2px 1px 0;\nheight: 22px;\n}\n#qr-filename-container:hover {\ncursor: text;\n}\n#qr-filerm {\nposition: relative;\nright: 14px;\nbottom: 6px;\nmargin-right: -8px;\nz-index: 2;\n}\n#file-n-submit {\nheight: 23px;\n}\n#qr input[type=file] {\ndisplay: none;\n}\n/* Thread Select / Spoiler Label */\n#qr select {\nfloat: right;\n}\n/* Dumping UI */\n.dump #dump-list-container {\ndisplay: block;\n}\n#dump-list-container {\ndisplay: none;\nposition: relative;\noverflow-y: hidden;\nmargin-top: 1px;\n}\n#dump-list {\noverflow-x: auto;\noverflow-y: hidden;\nwhite-space: pre;\nwidth: 248px;\nmax-width: 100%;\nmin-width: 100%;\n}\n#dump-list:hover {\noverflow-x: auto;\n}\n.qr-preview {\n-moz-box-sizing: border-box;\ncounter-increment: thumbnails;\ncursor: move;\ndisplay: inline-block;\nheight: 90px;\nwidth: 90px;\npadding: 2px;\nopacity: .5;\noverflow: hidden;\nposition: relative;\ntext-shadow: 0 1px 1px #000;\n-moz-transition: opacity .25s ease-in-out;\nvertical-align: top;\n}\n.qr-preview:hover,\n.qr-preview:focus {\nopacity: .9;\n}\n.qr-preview::before {\ncontent: counter(thumbnails);\ncolor: #fff;\nposition: absolute;\ntop: 3px;\nright: 3px;\ntext-shadow: 0 0 3px #000, 0 0 8px #000;\n}\n.qr-preview#selected {\nopacity: 1;\n}\n.qr-preview.drag {\nbox-shadow: 0 0 10px rgba(0,0,0,.5);\n}\n.qr-preview.over {\nborder-color: #fff;\n}\n.qr-preview > span {\ncolor: #fff;\n}\n.remove {\nbackground: none;\ncolor: #e00;\nfont-weight: 700;\npadding: 3px;\n}\na:only-of-type > .remove {\ndisplay: none;\n}\n.remove:hover::after {\ncontent: \" Remove\";\n}\n.qr-preview > label {\nbackground: rgba(0,0,0,.5);\ncolor: #fff;\nright: 0; bottom: 0; left: 0;\nposition: absolute;\ntext-align: center;\n}\n.qr-preview > label > input {\nmargin: 0;\n}\n#add-post {\ncursor: pointer;\nfont-size: 2em;\nposition: absolute;\ntop: 50%;\nright: 10px;\n-moz-transform: translateY(-50%);\n}\n.textarea {\nposition: relative;\n}\n#char-count {\ncolor: #000;\nbackground: hsla(0, 0%, 100%, .5);\nfont-size: 8pt;\nposition: absolute;\nbottom: 1px;\nright: 1px;\npointer-events: none;\n}\n\n/* Menu */\n.menu-button {\ndisplay: inline-block;\nposition: relative;\ncursor: pointer;\n}\n.menu-button i {\nborder-top:   6px solid;\nborder-right: 4px solid transparent;\nborder-left:  4px solid transparent;\ndisplay: inline-block;\nmargin: 2px;\nvertical-align: middle;\n}\n#menu {\nposition: fixed;\noutline: none;\n}\n.entry {\nborder-bottom: 1px solid rgba(0,0,0,.25);\ncursor: pointer;\ndisplay: block;\noutline: none;\npadding: 3px 7px;\nposition: relative;\ntext-decoration: none;\nwhite-space: nowrap;\n}\n.left>.entry.has-submenu {\npadding-right: 17px !important;\n}\n.entry:last-child {\nborder-bottom: 0;\n}\n.has-submenu::after {\ncontent: \"\";\nborder-left: .5em solid;\nborder-top: .3em solid transparent;\nborder-bottom: .3em solid transparent;\ndisplay: inline-block;\nmargin: .3em;\nposition: absolute;\nright: 3px;\n}\n.left .has-submenu::after {\nborder-left: 0;\nborder-right: .5em solid;\n}\n.submenu {\ndisplay: none;\nposition: absolute;\nleft: 100%;\ntop: -1px;\n}\n.focused .submenu {\ndisplay: block;\n}\n.imp-exp-result {\nposition: absolute;\ntext-align: center;\nmargin: auto;\nright: 0px;\nleft: 0px;\nwidth: 200px;\n}\n.export, .import {\ncursor: pointer;\ntext-decoration: none !important;\n}\n/* Link Title Favicons */\n.linkify.YouTube {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAABIklEQVQoz53LvUrDUBjG8bOoOammSf1IoBSvoCB4JeIqOHgBLt6AIMRBBQelWurQ2kERnMRBsBUcIp5FJSBI5oQsJVkkUHh8W0o5nhaFHvjBgef/Mq+Q46RJBMkI/vE+aOus956tnEswIZe1LV0QyJ5sE2GzgZfVMtRNIdiDpccEssdlB1mW4bvTwdvWJtRdErM7U+8S/FJykCRJX5qm+KpVce8UMNLRLbulz4iSjTAMh6Iowsd5BeNadp3nUF0VlxAEwZBotXC0Usa4ll3meZdA1iguwvf9vpvDA2wvmKgYGtSud8suDB4TyGr2PF49D/vra9jRZ1BVdknMzgwuCGSnZEObwu6sBnVTCHZiaC7BhFx2PKdxUidiAH/4lLo9Mv0DELVs9qsOHXwAAAAASUVORK5CYII=') center left no-repeat!important;\npadding-left: 18px;\n}\n.linkify.Vimeo {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAASJJREFUOE9jYAAC7ln7/pODQXrBmq333PvPu/YaSRikB6QXbACpmmHqsRoAMll7+20UQ0H8tmuv/pdffPFfZtNNuByGASBFIPDh5x+4IV6HHoDFYGDJgw+YBoBMBUkgA5BtIKduuvvy//svX+FSB+88wTTAc+/t/83bj/0HScLA5BPXwc7lKJ36f+L6XXDxhUfOYxrAPWUnWKFp9UQUm3iWQxSDXAEDSX3zcIcB96wD/x+8eA1XDNKMHAYg20GW4Y0FkCIYAAUqzEBQOIBciRzlWKMxZelOlMCEcVxq+jHSC1YDJPs3YBgA8jey0/F6ARRwsFAHORukmat9NdbUijMpg/wKcrJodDFOzSBXwA3Alh9AToZFI7a8Asu98BxJbnYGAJb5vYLDANzSAAAAAElFTkSuQmCC') center left no-repeat!important;\npadding-left: 18px;\n}\n.linkify.SoundCloud {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABsklEQVQ4y5WTy2pUQRCGv2rbzDjJeAlIBmOyipGIIJqFEBDElwh4yULGeRFXPoEIBl/AvQ/gC2RnxCAoxijiwks852S6+3dxzslcHJCpTXVX11/Xv0097gLPgVNMJxnQNfX4zsqleWbnpoMf/oa9d988MM9MC/rp+E0a+A0dsVobMNMCOO8B6McRoABJI+A6gJmN3D2A8jgEBCEkSEMBrcrsDAzDWWn3AjgKFaDMmgRqniGFgsaDp1jrLOngDf1XT1D+A1dFc4MKAkkiCVKjjVu7g9+4Rzx4i1u6hjXbuMWr0O5QPNvCu7IaCZwEKQukLGDrm5x8uI0tr6MkiGlkiv7yLfzN+6S5i6QsIMABkEfcxhbWWYMkVAOjxvYAjc3HNHrbKI9VBQBFwF25XQKSBjqIf1YBuAurEMrczgDygD6/x2LCpFLXLUyQ+PoldphhBhYfIX09XU1+Flaukz7uYqs3SHs7cG4BmTsmkBUF9mmXEwa28BNLPaQPLepuNcbGSWQquQC2/Kdcox1FUGkcB0ykck1nA2+wTzMs8stGnP4rbWGw74EuS/GFQWfK7/wF6P4F7fzIAYkdmdEAAAAASUVORK5CYII=') center left no-repeat!important;\npadding-left: 18px;\n}\n.linkify.audio {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAitJREFUOE9jYCAWKJWwavr0KyXWb/FIbDtUFFyzJx6nVofE2Xo5nXsj0rqPNSR0nVkR2Hjmgmfd+U9Otdf+m5Vf/6+SfeU/R9ChVVgNYDRtlfJuuPA/rPfe/4QpD/6nznj0P27Kw/9unff/69Xf+69c/+C/SO7N/0z+OAxgMmmRCe++/r9i3ev/KWvf/vdY8PK/bt/9/wrNV3/IN5y/IVt1YqNg4pGTTP4HsbuA2bhZ2qvpyn+xjIObxAp3VwqlrgngLFyryVy5nhPmZJHANS2cwYexG8BmVC/pWn3hP4NZlzWuQDJI3dIiFnUUuwEsQAOcq87jNcC7fHeLUtJxHF4AGmBWeAavAWH1+1rUUk7giAWjOknllON4DXAs2NEiG4/DBQxAF/CFHfrPYI4jDFSLuJVjNrUJhB/B7gIGo1pJRt99GAZYJK7wLJ1z7Xzl4vu/7aqv/GRBj0bjqAX2qb0nJ7mXH17C4HcUxQA+hymWtSue/C5a9up/9Ozn/7Vr7v1nRY7GqMb91T3b3v6vWvPmf/S0p/9ZQk+DDLCBRSOz06Jqk+o7/21nvfqvsebDf7kZL/5zBaxphkezd+OFn7HzXvz3Wvjmv9a8N//5Ek//ZTBpVYUrMG2X5wjcdl68+uI/wa5Lr3hSNjczGFeywOVZ/bbcVGp//F9izfv/Ql03f3P4LC/HSEQquYwMFnUCDJ7dzBhyjGZNQpye89M5gpfnMvtNUyE2h4PUAQBovvT7lyNljwAAAABJRU5ErkJggg==') center left no-repeat!important;\npadding-left: 18px;\n}\n.linkify.LiveLeak {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAydJREFUOE9Nk1tIk2EYx79NyUNqTk0o6KYrnZeChodLDxfeZpCbJk4RXU5Nm7tYRYhiYXbQlaeGutyW2gxtpB1RIyKDEjKwA6Ti2dR5KNDn+fq/S6TBj/f93r3P732e53s/qfnkSdej4GB2SBLbwf+jmB+gUMgOheLg/z7EdCUnO6Ref392SpK8Hyh3I+gBwBo7lUp2xcbyQEoKD6alyQOpqd754/h4FjJXZCRJTl9ftmEzoK5/wdQJxPgkLY2WV1dpc2uLtnZ2eHNnhza3t2nd46GhjAzuValY6jx0iIfS03msoIDuQ9COQCtoUSjohU5HuwgaN5loeXycd3d3aW9vzwvW2K5SkdTi58fvzGb+3tdHFggA3QONEAzn59PvjQ1yqNX0zenkvX0B4ffWaGRraChJd/385JGqKvlzTw/fRqOaIGkEd1DjU52O/3g83BkTw5MOh7yJuUCUM2o0yi2hoSw1IIOhykr+YLNRHYKu4XQvyKA/N5c8yMCCDD7Z7bz26xcJ1rH2rKKCG0UJdRAMlJbyG6uVrkJQjWAB5tSbk0Nr2HwDgvcQiIYur6zQyvo6ucvLueHIEZKuQPBQr+dXra1kRuqXEOwFArtWSytra1QdFUVjNhvPLS3R3OIiLUDUD0F1WBhJJtwDW2Ehu5uaqBICI4IFlRB0QLCEzaboaHrd0cHzCBYsIIuesjK+LAQXkEFrXh676uupGCWcR6AeghLQptGQONUAwfOuLp6Zn6eZuTmaXVig7pISrhI90ENgQbdHhoep32JhFzLpu3WLio8epUYIfs7OUjF6UKJW88XERLqYkEBNej11oG8XhCAvMFAuOn5cNiclsTkhQTbhmpri4lgbEMANWi1DwC/xit3t7bK7rY0Fo4OD3G4wyEURESzloAdnceezlErK8vH5N4KzPj50PTOTfkxP0+THj/RlYoInJyZI8HVqim5qNFwQHk7SucBAPo2PKRMNPLM/4pnFszYkhJsNBu6uqWFHba1sr61lQSveQFZQkFx07BhJmhMnrLn4NLMPH/aSExR0QDbmWhwgyEapwDvXoDxdWBiXnjrV/Bdm2kYUxLwmEgAAAABJRU5ErkJggg==') center left no-repeat!important;\npadding-left: 18px;\n}\n.linkify.Vocaroo {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAw9JREFUOE9jYMABuMwYmCyTJKUCGlSnFSy02TTzeOyCiQcDViX26qVz2TAyYtWmEMwuoZ3M7V40LcB79pHkc0svpvzY8jD//87nxf+3Pyn8v/ZO8v+VNyP/2mZJumI1QCWSI8232Hjumitlfw5+qPp/9l8TCt76JP//xkdx/wsXWCzjtWFkwTCkbWFe9plPk/+ga4Txz/xt/D/hkN//gMXif21a+NbyWjIwoRiy6GDT5rP/mlFsPfyp5n/NpOj/22+0gMUXXIz/H7hC/L/bFKFbPDZMrHAD5H35OPt2J9zacDv/f3V7xv9FhwrBGubsT/1//Pjx/1GJ/mD+/nfl/1v3Ovy3KRJNQbHdOlXCvOO03/+pm1P/v3v37n90hhtYw9HPtf8Xb2v937cmHswHeWPRxYj/LvkK3igGKARwicTO07118H3V/5kbi/4vPZMJtK3s/6YH2f+Pfq1B8VbjWrdnMu5s4nAD9CNFhKwz5DTUvLl419zKvAcLtG1P84BRl/b/5M/6/6f/NPzf/qzo84yj0Uus0xUU4Zor54bm9+4OfZG02OCuoAMTb9ZkC9ull1Nvrr2Z+XvRpaRfc65H/68F+jl9svEhzyLFWoccWVc+eyTHq/twydjlKRln7jX9bNMkMJnbhoFRL1xCqmKx6/yi2fYXa/c5/e846PV/5fW0/7OPx/yfcjzop34ulxdGGvDuU8mMXaX507lBuiN6ueadmQeT/p/93vf/1O+G//sP5fw/eL3o/5JLif8zVxs+Tlir9S26UyeFQQvJGBE7FvaFZ9LfN+1y+WjbItSb3GmXvXd15v8zroH/HxgE/D+aGPx/18vi/z07PeZNPRKxe/Kh0Ae8toxscCO4zBkYXArk9C1SxJUYjBkYPPIVtbbuTftz3cz//2O9wP/75iSAXdO72/dt2HL5F6YlfBW4MiJYXMiBiW3t7azHBx+V/t89N+H/8a+1//e9K/9attDp5LQjYX8SuvVL8RoAkmxa65299Erq1FnHo0qrl7t4BddriIs4MrM3rfWcFd+pGwVSAwBZ0bKP8yrZPAAAAABJRU5ErkJggg==') center left no-repeat!important;\npadding-left: 18px;\n}\n.linkify.pastebin {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAtZJREFUOE+NU91LWmEc7sJtQew/2MUY7INg7CLY3W5GMHazyzEQo9UmfYxZTbAiVlgRqLMSZ+XnDC3z2+Y0+8JGakKZTtR0Tl2wtgtLLQh29cz3ZZ3h3Q68vOc95zzP73l+z+/U1f292O09DRxubxOH23P//1bvtQts3dPnry7LZnXJhcUl5Avf8dHtwY+fv2AyW5DOfIXFakMm+w0G4wISyRRm55TQG0y/Wzv6mikJ52Xf9TmVBoFAAD6fDwqFAqFQCJubmzCbzZiensbp6SmkUikikQi0Wi0kEgm6ewVaStDCfXPDandifn6egoaGhrCzswO1Wg2Hw4HBwUGk02kIBAL4/X4IhUJMTk6ii8dfYggy2RwymQzOz88Rj8dRLpexv7+PSqWCYDCIQqGAra0tJBIJrK2t0XdVAjNDEIl+wfj4OEqlEq2wt7dHrchkMmrBYDCAz+fTIjweD7FYrJbgIJOlgLOzM8jlcip1eXmZ2rFarVAqlRCLxcjlchCJRFRljYJYPAG32418Pg+n04lsNouVlRUcHh7C4/FQIOlHNBqlezgcJgQWxkIgGMbExASVNjY2hvX1dVo9mUzS5wREFLhcLrqTcw2B//M2RkdHodPp4PV6oVKpqH+SCom3v7+fNnF4eJiJusbCJ6+PviSyScakiaR5RIHRaKQpmEwmbAdCeD8zB6vdhebHT8SMhcUlC83bbrdTJRsbG3RwiCVCRNJJpDIoVeNNJJJQzKryV+rrmxiCtyNCCmaz2VhdXQWXy6XDpNfrodFoYLXZUTw+pk222Z3lW3ca26rgSwzBwqIZAwMDlITMAVEwNTVFR5fEJpK8Qyp1AJvDVbrTeLenCmxgfiZ22+urCtWHyu7uLp2wVCpFKx0dHaFYLOLk5KT6Y9kgk89kb95ubK0BX7A8a+1qannRLeW0daj/rU51S3tn9dypfvDw0QiLxbpX/Z7FVK7e/AEj4Wf24/2f5AAAAABJRU5ErkJggg==') center left no-repeat!important;\npadding-left: 18px;\n}\n.linkify.gist {\nbackground: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk1JREFUeNqUkzuIE1EUhv955MnsbB6r4kYQLUQQFncV3SnCIqJsoWGDYOGjsIiCtY2Kla1sjLBIsFFcXJC1kaSwENQmXUQSRSUSjCQSTCbkbR4z47lXEgtBNwcu3DNzvvO8R8jlcj7LshKmaWqYQERRTAmCcEru9/sJr9er0QF92BJMAVGr1TQ6CeZAc7lcGAwGkyQAxpTLZU0eDoc8crfbRTgcRjAYRCQSYSmi1WpxY7fbjU6ng1gshmaziXg8zhnGIpVKWbquW9ls1mLZsaMoiqWq6lgnBxY55He/328Vi0XOMFZmqVMD4fF4QBAajcY48khY9JE4HA4enTGMFVkaTHmy+ZzD/5NSqYSNB484w1h55ODO3TVu4FXcWDywl24Cmp0e1WBhyuWELAtIf/qKUrWOONmev3Lpt4NRCXq1gplpBS/v3cDc0nGg9h1o1ZkfwO4Atu1B8cM7HLt8k37V/y5B2b4bJxf2Y+7oEbyJrkMvUjki0YYJ03LidfQxAt4dOHdCw5RdGZcgGobBlQtnV/BDr1GfDai7ZiHZZRi9PoY/e5SCCTUwC9gk1GmMh5YWOcNYkR4Sv1y9uAJbYB82N57h4OnDmN7phjQ0qUkWRJuB+TMaPn/5iFfvv+Ha7eucYey4iWw8q6tRJJNJ3Fp7ClUawEkViBTfkCR0YUNTVHD/4Tpm/P4/U2CeKpUKfD4fJDIMhUKEhP45St50XedZyLQY6Xw+v8AUemVb2oNqtYpCocCWKi2TLLfb7ReZTGZ+kmUi7i2VvfxLgAEAZChMriPcl+IAAAAASUVORK5CYII=') center left no-repeat!important;\npadding-left: 18px;\n}\n/* General */\n:root.yotsuba .dialog {\nbackground-color: #F0E0D6;\nborder-color: #D9BFB7;\n}\n:root.yotsuba .field:focus {\nborder-color: #EA8;\n}\n\n/* Header */\n:root.yotsuba #header-bar, :root.yotsuba #notifications {\nfont-size: 9pt;\ncolor: #B86;\n}\n:root.yotsuba #header-bar a, :root.yotsuba #notifications a {\ncolor: #800000;\n}\n\n/* Settings */\n:root.yotsuba #fourchanx-settings fieldset {\nborder-color: #D9BFB7;\n}\n\n/* Quote */\n:root.yotsuba .backlink.deadlink {\ncolor: #00E !important;\n}\n:root.yotsuba .inline {\nborder-color: #D9BFB7;\nbackground-color: rgba(255, 255, 255, .14);\n}\n\n/* QR */\n.yotsuba #dump-list::-webkit-scrollbar-thumb {\nbackground-color: #F0E0D6;\nborder-color: #D9BFB7;\n}\n:root.yotsuba .qr-preview {\nbackground-color: rgba(0, 0, 0, .15);\n}\n\n/* Menu */\n:root.yotsuba #menu {\ncolor: #800000;\n}\n:root.yotsuba .entry {\nborder-bottom: 1px solid #D9BFB7;\nfont-size: 10pt;\n}\n:root.yotsuba .focused.entry {\nbackground: rgba(255, 255, 255, .33);\n}\n\n/* General */\n:root.yotsuba-b .dialog {\nbackground-color: #D6DAF0;\nborder-color: #B7C5D9;\n}\n:root.yotsuba-b .field:focus {\nborder-color: #98E;\n}\n\n/* Header */\n:root.yotsuba-b #header-bar, :root.yotsuba-b #notifications {\nfont-size: 9pt;\ncolor: #89A;\n}\n:root.yotsuba-b #header-bar a, :root.yotsuba-b #notifications a {\ncolor: #34345C;\n}\n\n/* Settings */\n:root.yotsuba-b #fourchanx-settings fieldset {\nborder-color: #B7C5D9;\n}\n\n/* Quote */\n:root.yotsuba-b .backlink.deadlink {\ncolor: #34345C !important;\n}\n:root.yotsuba-b .inline {\nborder-color: #B7C5D9;\nbackground-color: rgba(255, 255, 255, .14);\n}\n\n/* QR */\n.yotsuba-b #dump-list::-webkit-scrollbar-thumb {\nbackground-color: #D6DAF0;\nborder-color: #B7C5D9;\n}\n:root.yotsuba-b .qr-preview {\nbackground-color: rgba(0, 0, 0, .15);\n}\n\n/* Menu */\n:root.yotsuba-b #menu {\ncolor: #000;\n}\n:root.yotsuba-b .entry {\nborder-bottom: 1px solid #B7C5D9;\nfont-size: 10pt;\n}\n:root.yotsuba-b .focused.entry {\nbackground: rgba(255, 255, 255, .33);\n}\n\n/* General */\n:root.futaba .dialog {\nbackground-color: #F0E0D6;\nborder-color: #D9BFB7;\n}\n:root.futaba .field:focus {\nborder-color: #EA8;\n}\n\n/* Header */\n:root.futaba #header-bar, :root.futaba #notifications {\nfont-size: 11pt;\ncolor: #B86;\n}\n:root.futaba #header-bar a, :root.futaba #notifications a {\ncolor: #800000;\n}\n\n/* Settings */\n:root.futaba #fourchanx-settings fieldset {\nborder-color: #D9BFB7;\n}\n\n/* Quote */\n:root.futaba .backlink.deadlink {\ncolor: #00E !important;\n}\n:root.futaba .inline {\nborder-color: #D9BFB7;\nbackground-color: rgba(255, 255, 255, .14);\n}\n\n/* QR */\n.futaba #dump-list::-webkit-scrollbar-thumb {\nbackground-color: #F0E0D6;\nborder-color: #D9BFB7;\n}\n:root.futaba .qr-preview {\nbackground-color: rgba(0, 0, 0, .15);\n}\n\n/* Menu */\n:root.futaba #menu {\ncolor: #800000;\n}\n:root.futaba .entry {\nborder-bottom: 1px solid #D9BFB7;\nfont-size: 12pt;\n}\n:root.futaba .focused.entry {\nbackground: rgba(255, 255, 255, .33);\n}\n\n/* General */\n:root.burichan .dialog {\nbackground-color: #D6DAF0;\nborder-color: #B7C5D9;\n}\n:root.burichan .field:focus {\nborder-color: #98E;\n}\n\n/* Header */\n:root.burichan #header-bar, :root.burichan #header-bar #notifications {\nfont-size: 11pt;\ncolor: #89A;\n}\n:root.burichan #header-bar a, :root.burichan #header-bar #notifications a {\ncolor: #34345C;\n}\n\n/* Settings */\n:root.burichan #fourchanx-settings fieldset {\nborder-color: #B7C5D9;\n}\n\n/* Quote */\n:root.burichan .backlink.deadlink {\ncolor: #34345C !important;\n}\n:root.burichan .inline {\nborder-color: #B7C5D9;\nbackground-color: rgba(255, 255, 255, .14);\n}\n\n/* QR */\n.burichan #dump-list::-webkit-scrollbar-thumb {\nbackground-color: #D6DAF0;\nborder-color: #B7C5D9;\n}\n:root.burichan .qr-preview {\nbackground-color: rgba(0, 0, 0, .15);\n}\n\n/* Menu */\n:root.burichan #menu {\ncolor: #000000;\n}\n:root.burichan .entry {\nborder-bottom: 1px solid #B7C5D9;\nfont-size: 12pt;\n}\n:root.burichan .focused.entry {\nbackground: rgba(255, 255, 255, .33);\n}\n\n/* General */\n:root.tomorrow .dialog {\nbackground-color: #282A2E;\nborder-color: #111;\n}\n:root.tomorrow .field:focus {\nborder-color: #000;\n}\n\n/* Header */\n:root.tomorrow #header-bar, :root.tomorrow #notifications {\nfont-size: 9pt;\ncolor: #C5C8C6;\n}\n:root.tomorrow #header-bar a, :root.tomorrow #notifications a {\ncolor: #81A2BE;\n}\n\n/* Settings */\n:root.tomorrow #fourchanx-settings fieldset {\nborder-color: #111;\n}\n\n/* Quote */\n:root.tomorrow .backlink.deadlink {\ncolor: #81A2BE !important;\n}\n:root.tomorrow .inline {\nborder-color: #111;\nbackground-color: rgba(0, 0, 0, .14);\n}\n\n/* QR */\n.tomorrow #dump-list::-webkit-scrollbar-thumb {\nbackground-color: #282A2E;\nborder-color: #111;\n}\n:root.tomorrow #qr select {\ncolor: #C5C8C6;\n}\n:root.tomorrow #qr option {\ncolor: #000;\n}\n:root.tomorrow .qr-preview {\nbackground-color: rgba(255, 255, 255, .15);\n}\n\n/* Menu */\n:root.tomorrow #menu {\ncolor: #C5C8C6;\n}\n:root.tomorrow .entry {\nborder-bottom: 1px solid #111;\nfont-size: 10pt;\n}\n:root.tomorrow .focused.entry {\nbackground: rgba(0, 0, 0, .33);\n}\n\n/* General */\n:root.photon .dialog {\nbackground-color: #DDD;\nborder-color: #CCC;\n}\n:root.photon .field:focus {\nborder-color: #EA8;\n}\n\n/* Header */\n:root.photon #header-bar, :root.photon #notifications {\nfont-size: 9pt;\ncolor: #333;\n}\n:root.photon #header-bar a, :root.photon #notifications a {\ncolor: #FF6600;\n}\n\n/* Settings */\n:root.photon #fourchanx-settings fieldset {\nborder-color: #CCC;\n}\n\n/* Quote */\n:root.photon .backlink.deadlink {\ncolor: #F60 !important;\n}\n:root.photon .inline {\nborder-color: #CCC;\nbackground-color: rgba(255, 255, 255, .14);\n}\n\n/* QR */\n.photon #dump-list::-webkit-scrollbar-thumb {\nbackground-color: #DDD;\nborder-color: #CCC;\n}\n:root.photon .qr-preview {\nbackground-color: rgba(0, 0, 0, .15);\n}\n\n/* Menu */\n:root.photon #menu {\ncolor: #333;\n}\n:root.photon .entry {\nborder-bottom: 1px solid #CCC;\nfont-size: 10pt;\n}\n:root.photon .focused.entry {\nbackground: rgba(255, 255, 255, .33);\n}\n"
  };

  Main.init();

}).call(this);
