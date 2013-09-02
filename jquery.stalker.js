/**
 * jQuery.stalker plugin
 * jQuery plugin to analyze DOM events.
 * @author : Alejandro Gomez <alexserverone@gmail.com>
 */
(function( $ ) {
    var stalkEvents = function(domObj, eventFilter) {
        var result = [];
        var eventInformation;
        var eventGroups = $._data(domObj,'events');
        var eventType, i, oneEvent, f, matches;
        var ajaxPattern = /\$(\(.*\))?\.(load|ajax|get|post)\(/;
        for (eventType in eventGroups) {
            //if eventFilter then apply it
            if (typeof eventFilter != 'undefined' && eventType != eventFilter) {
                continue;
            }
            //walk throught eventGroup
            for (i in eventGroups[eventType]) {
                oneEvent = eventGroups[eventType][i];
                if (typeof oneEvent.handler == 'undefined') {
                    continue;
                }
                f = oneEvent.handler.toString();
                eventInformation = { "ajax": false, "method": f, "eventType" : eventType, "ajaxMethod":null };
                if ( ajaxPattern.test(f) ) {
                    eventInformation.ajax = true;
                    matches = ajaxPattern.exec(f);
                    eventInformation['ajaxMethod'] = (matches.length >2)? matches[2] : '';
                }
                else {
                    eventInformation.ajax = false;
                }
                result.push(eventInformation);
            }
        }
        return result;
    };
    $.fn.stalk = function(eventType) {
        var results = [];
        this.each(function() {
            results.push({
                'domObject' : this,
                'events' : stalkEvents(this, eventType)
            });
        });
        return results;
    };
})( jQuery );