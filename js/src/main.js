(function (global) {

    'use strict';


    function getCommand(data) {
        return $.ajax({
            url: 'php/index.php',
            method: 'post',
            data: data
        });
    }


    var ViewRenderer = function (data) {

        var $mainElement = $('#main-contener');
        var triggerCounter = 0;
        var styleType = {
            one: 'one',
            two: 'two',
            three: 'three'
        };

        function swapStyle(className) {
            $mainElement.removeClass().addClass(className);
        }

        function resetView() {
            $mainElement.empty();
        }


        function showView(responseData) {
            var response = JSON.parse(responseData);
            switch (response.type) {
                case 'display':
                {
                    display(response.data);
                    break;
                }
                case 'trigger':
                {
                    trigger(response.data);
                    break;
                }
                default: break;
            }
        }

        function display(data) {
            resetView();
            var rootKeys = _.keys(data);

            var source = $('#entry-template').html();
            var template = Handlebars.compile(source);
            var context = {
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
            $mainElement.append(template(context));
        }

        function trigger(data) {
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

        return {
            showView: showView
        };
    };


    var ManagerView = function () {
        var data = {};
        var viewRenderer = new ViewRenderer();

        function init() {
            for (var i = 1, j = 0; i <= 9000; i++, j++) {
                setTimeout(function (counter) {
                    return function () {
                        data.action_id = counter;
                        getCommand(data).done(function (responseData) {
                            viewRenderer.showView(responseData);
                        });
                    };
                }(j), 1000 * i);
            }
        }


        return {
            init: init
        };
    };

    var managerView = new ManagerView();
    managerView.init();

}(this));
