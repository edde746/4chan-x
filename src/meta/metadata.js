// ==UserScript==
// @name         <%= meta.name %><%= (channel === '-beta') ? ' beta' : '' %>
// @version      <%= readJSON('/version.json').version %>
// @minGMVer     <%= meta.min.greasemonkey %>
// @minFFVer     <%= meta.min.firefox %>
// @namespace    <%= name %>
// @description  <%= description %>
// @license      MIT; <%= meta.license %> 
<%=
  (function() {
    function expand(items, regex, substitutions) {
      var results = [];
      items.forEach(function(item) {
        if (regex.test(item)) {
          substitutions.forEach(function(s) {
            results.push(item.replace(regex, s));
          });
        } else {
          results.push(item);
        }
      });
      return results;
    }
    function expandMatches(matches) {
      return expand(matches, /^\*/, ['http', 'https']);
    }
    return [].concat(
      expandMatches(meta.matches).map(function(match) {
        return '// @include      ' + match;
      }),
      expandMatches(meta.exclude_matches).map(function(match) {
        return '// @exclude      ' + match;
      })
    ).join('\n');
  })()
%>
<%=
  meta.grants.map(function(grant) {
    return '// @grant        ' + grant;
  }).join('\n')
%>
// @run-at       document-start
// @updateURL    <%= (channel !== '-noupdate') ? `${meta.downloads}${name}${channel}.meta.js` : 'https://noupdate.invalid/' %>
// @downloadURL  <%= (channel !== '-noupdate') ? `${meta.downloads}${name}${channel}.user.js` : 'https://noupdate.invalid/' %>
// @icon         data:image/png;base64,<%= readBase64('/src/meta/icon48.png') %>
// ==/UserScript==
