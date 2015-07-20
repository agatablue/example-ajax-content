$(function () {

    'use strict';

    /* Get command object
       @param object data (with action_id)
       @return deferred object
     */
    function getCommand(data) {
        return $.ajax({
            url: 'php/index.php',
            method: 'post',
            data: data
        });
    }

    /* Render view Class
        @param object data
        @return function handleData
     */
    var ViewRenderer = function (data) {
        var $mainElement = $('#main-contener');
        var triggerCounter = 0;
        var styleType = {
            one: 'one',
            two: 'two',
            three: 'three'
        };

        /* Change class
            @param string className
         */
        function swapStyle(className) {
            $mainElement.removeClass().addClass(className);
        }

        /* Reset view
         */
        function resetView() {
            $mainElement.empty();
        }

        /* Render template using Handlebars
          TODO: Create a template converter
          @param object data
         */
        function renderView(data) {
            resetView();
            var rootKeys = _.keys(data);

            var source = $('#entry-template').html();
            var template = Handlebars.compile(source);
            var content = {
               'divFirst': {
                    'className': rootKeys[0].substring(rootKeys[0].indexOf('.') + 1),
                    'h1_text_contents': data['div.first'].h1.text_contents,
                    'p_text_contents': data['div.first'].p.text_contents
                },
                'divSecond': {
                    'className': rootKeys[1].substring(rootKeys[1].indexOf('.') + 1),
                    'b_text_contents': data['div.second'].b.text_contents,
                    'span_text_contents': data['div.second'].span.span.text_contents
                }
            };
            $mainElement.append(template(content));
        }

        /* According to triggerCounter swap class for content
         */
        function trigger() {
            switch (triggerCounter % 3) {
                case 0:
                {
                    swapStyle(styleType.one);
                    break;
                }
                case 1:
                {
                    swapStyle(styleType.two);
                    break;
                }
                case 2:
                {
                    swapStyle(styleType.three);
                    break;
                }
            }
            triggerCounter++;
        }


        /* Manage view according to type of response object
         @param string responseData
         */
        function handleData(responseData) {
            if (responseData) {
                try {
                    var response = JSON.parse(responseData);
                    switch (response.type) {
                        case 'display':
                        {
                            renderView(response.data);
                            break;
                        }
                        case 'trigger':
                        {
                            trigger();
                            break;
                        }
                        default:
                            break;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        return {
            handleData: handleData
        };
    };

    /* Controller Class to get data from server
      @return function init
     */
    var Controller = function () {
        var data = {};
        var viewRenderer = new ViewRenderer();

        function init() {
            for (var i = 1; i <= 9000; i++) {
                setTimeout(function (counter) {
                    return function () {
                        data.action_id = counter;
                        getCommand(data)
                                        .done(function (responseData) {
                                            viewRenderer.handleData(responseData);
                                        })
                                        .fail(function(jqXHR, textStatus, errorThrown) {
                                            throw new Error(errorThrown);
                                        });
                    };
                }(i), 1000 * i);
            }
        }


        return {
            init: init
        };
    };

    var controller = new Controller();
    controller.init();

}());
